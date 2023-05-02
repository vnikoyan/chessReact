import React, { Component, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Chess from "chess.js";
import {
  highlightLastMove,
  getPgn,
  isPromoting,
  boardStyle,
} from "utils/chessHelpers";
import Chessboard from "chessboardjsx";

const ClickToMove = ({
  setBoardStatus,
  problem,
  boardOrientation,
  setTurn,
  boardRef,
  doneProblem,
  setMoves,
}) => {
  const [fen, setFen] = useState("start");
  // square styles for active drop square
  const [dropSquareStyle, setDropSquareStyle] = useState({});
  // custom square styles
  const [squareStyles, setSquareStyles] = useState({});
  // square with the currently clicked piece
  const [pieceSquare, setPieceSquare] = useState("");
  // currently clicked square
  const [square, setSquare] = useState("");
  // array of past game moves
  const [history, setHistory] = useState([]);

  const propTypes = { children: PropTypes.func };

  const [game] = useState(new Chess());

  useEffect(() => {
    if (history.length) {
      setSquareStyles(highlightLastMove(pieceSquare, history));
    }
  }, [history]);

  // show possible moves
  const highlightSquare = (sourceSquare, squaresToHighlight) => {
    const highlightStyles = [sourceSquare, ...squaresToHighlight].reduce(
      (a, c) => {
        return {
          ...a,
          ...{
            [c]: {
              background:
                "radial-gradient(circle, #fffc00 36%, transparent 40%)",
              borderRadius: "50%",
            },
          },
        };
      },
      {}
    );
    setSquareStyles({ ...highlightStyles });
  };

  const onDrop = ({ sourceSquare, targetSquare }) => {
    // see if the move is legal
    let move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return;
    setFen(game.fen());
    setHistory(game.history({ verbose: true }));
  };

  const highlightCorrectMoves = (square) => {
    // get list of possible moves for this square
    let moves = game.moves({
      square: square,
      verbose: true,
    });

    // exit if there are no moves available for this square
    if (moves.length === 0) return;

    let squaresToHighlight = [];
    for (var i = 0; i < moves.length; i++) {
      squaresToHighlight.push(moves[i].to);
    }

    highlightSquare(square, squaresToHighlight);
  };

  const onSquareClick = (square) => {
    // setSquareStyles(squareStyling({ pieceSquare: square, history }))
    setPieceSquare(square);
    highlightCorrectMoves(square);

    let move = game.move({
      from: pieceSquare,
      to: square,
      promotion: "q", // always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return;

    setFen(game.fen());
    setHistory(game.history({ verbose: true }));
    setPieceSquare("");
  };

  return (
    <Chessboard
      id="humanVsHuman"
      width={320}
      position={fen}
      onDrop={onDrop}
      // onMouseOverSquare={onMouseOverSquare}
      // onMouseOutSquare={onMouseOutSquare}
      boardStyle={{
        borderRadius: "5px",
        boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`,
      }}
      squareStyles={squareStyles}
      dropSquareStyle={dropSquareStyle}
      onSquareClick={onSquareClick}
    />
  );
};

export default ClickToMove;
