import FENBoard from "fen-chess-board";
import Chess from "chess.js";
import MyAlert from "components/Alert";

export const boardStyle = {
  borderRadius: "5px",
  boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`,
};

export const onOpponentTimeFinish = (method, cancelMethod, buttonText) => {
  MyAlert({
    title: "You won",
    text: "Time is up",
    icon: "success",
    confirmButton: buttonText,
    allowOutsideClick: false,
    cancelButton: "Back",
    method: () => {
      window.location.reload();
    },
    cancelMethod: () => {
      cancelMethod();
    },
  });
};

export const onYourTimeFinish = (method, cancelMethod, buttonText) => {
  MyAlert({
    title: "You lose",
    text: "Time is up",
    icon: "error",
    confirmButton: buttonText,
    allowOutsideClick: false,
    cancelButton: "Back",
    method: () => {
      window.location.reload();
    },
    cancelMethod: () => {
      cancelMethod();
    },
  });
};

export const onOpponentWin = (method, cancelMethod, buttonText) => {
  MyAlert({
    title: "You lose",
    text: "Mat",
    icon: "error",
    confirmButton: buttonText,
    allowOutsideClick: false,
    cancelButton: "Back",
    method: () => {
      window.location.reload();
    },
    cancelMethod: () => {
      cancelMethod();
    },
  });
};

export const onYourWin = (method, cancelMethod, buttonText) => {
  MyAlert({
    title: "You won",
    text: "Mat",
    icon: "success",
    confirmButton: buttonText,
    allowOutsideClick: false,
    cancelButton: "Back",
    method: () => {
      method();
      window.location.reload();
    },
    cancelMethod: () => {
      cancelMethod();
    },
  });
};

export const onYourSurrender = (method, cancelMethod, buttonText) => {
  MyAlert({
    title: "You lose",
    text: "Surrender",
    icon: "error",
    confirmButton: buttonText,
    allowOutsideClick: false,
    cancelButton: "Back",
    method: () => {
      method();
    },
    cancelMethod: () => {
      cancelMethod();
    },
  });
};

export const onOpponentSurrender = (method, cancelMethod, buttonText) => {
  MyAlert({
    title: "You won",
    text: "Surrender",
    icon: "success",
    confirmButton: buttonText,
    allowOutsideClick: false,
    cancelButton: "Back",
    method: () => {
      method();
    },
    cancelMethod: () => {
      cancelMethod();
    },
  });
};

export const highlightLastMove = (pieceSquare, history) => {
  const sourceSquare = history.length && history[history.length - 1].from;
  const targetSquare = history.length && history[history.length - 1].to;
  return {
    ...(history.length && {
      [sourceSquare]: {
        backgroundColor: "rgba(255, 255, 0, 0.4)",
      },
    }),
    ...(history.length && {
      [targetSquare]: {
        backgroundColor: "rgba(255, 255, 0, 0.4)",
      },
    }),
  };
};

export const isPromoting = (fen, move) => {
  const chess = new Chess(fen);
  const piece = chess.get(move.from);
  if (piece?.type !== "p") {
    return false;
  }
  if (piece.color !== chess.turn()) {
    return false;
  }
  if (!["1", "8"].some((it) => move.to.endsWith(it))) {
    return false;
  }
  return chess
    .moves({ square: move.from, verbose: true })
    .map((it) => it.to)
    .includes(move.to);
};

export const getPgn = (pgn) => {
  if (Boolean(pgn.split("]")[2])) {
    return pgn.split("]")[2].replace(/(\r\n|\n|\r)/gm, "");
  } else {
    return false;
  }
};

export const calcWidthChess = (size) =>
  size.screenWidth > 1440
    ? 600
    : size.screenWidth > 1200
    ? 500
    : size.screenWidth > 768
    ? 400
    : size.screenWidth > 425
    ? 500
    : 300;

export const getFEN = (currentPosition) => {
  const capitalizeLastLetter = (string) => {
    return string.charAt(1).toLowerCase();
  };
  const fenBoard = new FENBoard();
  const tak = Object.entries(currentPosition);
  tak.forEach((element) => {
    const color = element[1].split("")[0];
    if (color === "b") {
      fenBoard.put(element[0], capitalizeLastLetter(element[1]));
    } else {
      fenBoard.put(element[0], element[1].split("")[1]);
    }
  });
  return fenBoard.fen;
};
