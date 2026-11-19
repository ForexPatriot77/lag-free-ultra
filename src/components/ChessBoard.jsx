import { useEffect, useRef, useState } from "react";
import { Chess } from "chess.js";
import { Chessground } from "chessground";
import "chessground/assets/chessground.base.css";
import "chessground/assets/chessground.brown.css";
import "chessground/assets/chessground.cburnett.css";

const makeDests = (game) => {
  const dests = new Map();
  for (const move of game.moves({ verbose: true })) {
    const squares = dests.get(move.from) || [];
    squares.push(move.to);
    dests.set(move.from, squares);
  }
  return dests;
};

const getStatus = (game) => {
  if (game.isCheckmate()) return `Checkmate — ${game.turn() === "w" ? "Black" : "White"} wins`;
  if (game.isStalemate()) return "Draw by stalemate";
  if (game.isThreefoldRepetition()) return "Draw by repetition";
  if (game.isInsufficientMaterial()) return "Draw — insufficient material";
  if (game.isDraw()) return "Draw";
  return game.isCheck() ? "Check" : `${game.turn() === "w" ? "White" : "Black"} to move`;
};

export default function ChessBoard() {
  const elementRef = useRef(null);
  const gameRef = useRef(new Chess());
  const boardRef = useRef(null);
  const [fen, setFen] = useState(gameRef.current.fen());
  const [orientation, setOrientation] = useState("white");
  const [lastMove, setLastMove] = useState(null);
  const [status, setStatus] = useState("White to move");
  const [moveCount, setMoveCount] = useState(0);

  useEffect(() => {
    if (!elementRef.current) return undefined;

    boardRef.current = Chessground(elementRef.current, {
      fen: gameRef.current.fen(),
      orientation: "white",
      coordinates: true,
      turnColor: "white",
      movable: {
        free: false,
        color: "white",
        dests: makeDests(gameRef.current),
      },
      events: {
        move: (from, to) => {
          const game = gameRef.current;
          try {
            const move = game.move({ from, to, promotion: "q" });
            if (!move) return;
            setLastMove([move.from, move.to]);
            setFen(game.fen());
            setStatus(getStatus(game));
            setMoveCount(game.history().length);
          } catch {
            // Chessground only offers legal destinations; ignore stale drag events.
          }
        },
      },
    });

    return () => {
      boardRef.current?.destroy();
      boardRef.current = null;
    };
  }, []);

  useEffect(() => {
    const game = gameRef.current;
    boardRef.current?.set({
      fen,
      orientation,
      turnColor: game.turn() === "w" ? "white" : "black",
      lastMove,
      check: game.isCheck(),
      movable: {
        free: false,
        color: game.isGameOver() ? undefined : game.turn() === "w" ? "white" : "black",
        dests: makeDests(game),
      },
    });
  }, [fen, lastMove, orientation]);

  const reset = () => {
    gameRef.current = new Chess();
    setFen(gameRef.current.fen());
    setLastMove(null);
    setStatus("White to move");
    setMoveCount(0);
  };

  const undo = () => {
    const game = gameRef.current;
    const move = game.undo();
    if (!move) return;
    const history = game.history({ verbose: true });
    const previous = history.at(-1);
    setFen(game.fen());
    setLastMove(previous ? [previous.from, previous.to] : null);
    setStatus(getStatus(game));
    setMoveCount(history.length);
  };

  return (
    <div className="w-full max-w-[520px] mx-auto space-y-3">
      <div className="flex items-center justify-between gap-3 px-1 text-xs sm:text-sm">
        <span className="font-semibold text-foreground">{status}</span>
        <span className="text-muted-foreground tabular-nums">{Math.ceil(moveCount / 2)} moves</span>
      </div>
      <div
        ref={elementRef}
        className="chessground-board w-full aspect-square overflow-hidden rounded-sm shadow-md"
        aria-label="Interactive chessboard. Drag a piece to a highlighted legal destination."
      />
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={undo}
            disabled={moveCount === 0}
            className="rounded-sm border border-border px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
          >
            Undo
          </button>
          <button
            type="button"
            onClick={reset}
            className="rounded-sm border border-border px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted"
          >
            New game
          </button>
        </div>
        <button
          type="button"
          onClick={() => setOrientation((current) => current === "white" ? "black" : "white")}
          className="rounded-sm border border-border px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted"
        >
          Flip board
        </button>
      </div>
      <p className="text-[11px] leading-relaxed text-muted-foreground">
        Local board demo · legal moves and promotion to queen · no online opponent connected yet
      </p>
    </div>
  );
}
