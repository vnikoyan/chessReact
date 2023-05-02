import React, { useState, useEffect, createRef } from "react";
import PropTypes from "prop-types";
import { Card, CardContent, Grid } from "@material-ui/core";
import Chessboard from "chessboardjsx";
import {
  highlightLastMove,
  calcWidthChess,
  getPgn,
  isPromoting,
  boardStyle,
} from "utils/chessHelpers";
import { useAction } from "utils/hooks";
import { problems } from "modules/student/actions";
import Chess from "chess.js";
import PromotionModal from "components/PromotionModal";

const PlayProblemBlock = ({
  setBoardStatus,
  problem,
  boardOrientation,
  setTurn,
  boardRef,
  doneProblem,
  setMoves,
  fromLanding,
}) => {
  const setFailedProblem = useAction(problems.setFailed);
  const solution =
    typeof problem.solution === "string"
      ? JSON.parse(problem.solution)
      : problem.solution;
  const solutions =
    typeof problem.solutions === "string"
      ? JSON.parse(problem.solutions)
      : problem.solutions;
  const startingPosition = problem.fen;
  const [draggable, setDraggable] = useState(true);
  const [chess] = useState(new Chess(startingPosition));
  const [position, setPosition] = useState(startingPosition);
  const [index, setIndex] = useState(0);
  const [openPromotionModal, setOpenPromotionModal] = useState(false);
  const [pandingMove, setPandingMove] = useState({});
  const [rightMove, setRightMove] = useState();
  const [squareStyles, setSquareStyles] = useState({});
  const [pieceSquare, setPieceSquare] = useState("");
  const [history, setHistory] = useState([]);
  const chessboard = createRef();

  useEffect(() => {
    if (getPgn(chess.pgn()) !== false) {
      setMoves(getPgn(chess.pgn()));
    } else {
      setMoves(chess.pgn());
    }
  }, [chess.pgn()]);

  useEffect(() => {
    boardRef.current.repeatMove = repeatMove;
    boardRef.current.showHint = showHint;
  });

  useEffect(() => {
    updateChessboard();
  }, []);

  useEffect(() => {
    const history = chess.history();
    setTurn(chess.turn());
    if (history.length === solution.length && compareSolution()) {
      finishProblem();
    }
  }, [position]);

  useEffect(() => {
    if (history.length) {
      setSquareStyles(highlightLastMove(pieceSquare, history));
    }
  }, [history]);

  const highlightSquare = (sourceSquare, squaresToHighlight) => {
    const highlightStyles = [sourceSquare, ...squaresToHighlight].reduce(
      (a, c) => {
        return {
          ...a,
          ...{
            [c]: {
              background:
                "radial-gradient(circle, rgb(181 180 105) 36%, transparent 40%)",
              borderRadius: "50%",
            },
          },
          [sourceSquare]: { backgroundColor: "rgba(181, 180, 105, 1)" },
        };
      },
      {}
    );
    return highlightStyles;
  };

  const onDrop = (move) => {
    if (
      isPromoting(position, {
        from: move.sourceSquare,
        to: move.targetSquare,
      })
    ) {
      setOpenPromotionModal(true);
      setPandingMove(move);
    } else {
      handleMove({
        from: move.sourceSquare,
        to: move.targetSquare,
        promotion: "q",
      });
    }
    setHistory(chess.history({ verbose: true }));
  };

  const highlightCorrectMoves = (square) => {
    let moves = chess.moves({
      square: square,
      verbose: true,
    });
    if (moves.length === 0) return;
    let squaresToHighlight = [];
    for (var i = 0; i < moves.length; i++) {
      squaresToHighlight.push(moves[i].to);
    }
    setSquareStyles(highlightSquare(square, squaresToHighlight));
  };

  const onSquareClick = (square) => {
    setPieceSquare(square);
    highlightCorrectMoves(square);

    if (pieceSquare && square) {
      handleMove({
        from: pieceSquare,
        to: square,
        promotion: "q",
      });
      setHistory(chess.history({ verbose: true }));
      setPieceSquare("");
    }
  };

  const showHint = () => {
    repeatMove("undo");
    const moveInfo = chess.move(rightMove);
    const { from, to } = moveInfo;
    setSquareStyles({
      ...squareStyles,
      [from]: { backgroundColor: "#99af6f" },
      [to]: { backgroundColor: "#c6d590" },
    });
    chess.undo();
    updateChessboard();
  };

  const updateChessboard = () => {
    setPosition(chess.fen());
    setIndex(index + 1);
  };

  const opponentMove = (move) => {
    setTimeout(() => {
      chess.move(move);
      updateChessboard();
      setBoardStatus("your_turn");
    }, 500);
  };

  const repeatMove = (aciton) => {
    if (aciton === "undo") {
      chess.undo();
    } else {
      chess.load(startingPosition);
    }
    updateChessboard();
    setBoardStatus("your_turn");
    setDraggable(true);
    setSquareStyles({});
  };

  const compareSolution = () => {
    var solutionsVariants = [];
    if (solutions && solutions.length) {
      solutionsVariants = [...solutions, solution];
    } else {
      solutionsVariants = [solution];
    }
    var response = false;
    const history = chess.history();
    solutionsVariants.some((solution) => {
      var isCurrect = true;
      history.forEach((value, index) => {
        const parsedValue = value.replace("+", "").replace("#", "");
        const parsedSolution = solution[index]
          ? solution[index].replace("+", "").replace("#", "")
          : false;
        if (parsedValue !== parsedSolution) {
          setRightMove(parsedSolution);
          isCurrect = false;
        }
      });
      if (isCurrect) {
        if (solution[history.length]) {
          opponentMove(solution[history.length]);
        } else {
          finishProblem();
        }
        response = true;
        return true;
      }
    });
    return response;
  };

  const handleMove = (move) => {
    setSquareStyles({});
    const doneMove = chess.move(move);
    if (doneMove) {
      if (!compareSolution()) {
        setBoardStatus("wrong");
        setDraggable(false);
        if (!fromLanding) {
          setFailedProblem({ problemId: problem.id });
        }
      } else {
        setBoardStatus("right");
      }
    }
    updateChessboard();
  };

  const finishProblem = () => {
    setDraggable(false);
    setTimeout(() => {
      doneProblem();
    }, 500);
  };

  const handleSelectPiece = (piece) => {
    handleMove({
      from: pandingMove.sourceSquare,
      to: pandingMove.targetSquare,
      promotion: piece,
    });
    setOpenPromotionModal(false);
  };

  return (
    <Card>
      <CardContent>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          {openPromotionModal && (
            <PromotionModal
              color={chess.turn()}
              handleSelectPiece={handleSelectPiece}
            />
          )}
          <Chessboard
            key={index}
            calcWidth={calcWidthChess}
            squareStyles={squareStyles}
            onSquareClick={onSquareClick}
            onDrop={onDrop}
            ref={chessboard}
            draggable={draggable}
            showNotation={true}
            position={position}
            boardStyle={boardStyle}
            orientation={boardOrientation}
            transitionDuration={300}
          />
        </Grid>
      </CardContent>
    </Card>
  );
};

PlayProblemBlock.propTypes = {
  className: PropTypes.string,
};

export default PlayProblemBlock;
