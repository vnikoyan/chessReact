import React, { useEffect, useState } from "react";
import {
  Grid,
  Container,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";
import Page from "components/Page";
import FakePlayProblemBlock from "components/Play/FakePlayProblemBlock";
import { unsubscribe } from "pusher-redux";
import SelectOptions from "./Items/SelectOptions";
import { useAction } from "utils/hooks";
import { useNavigate } from "react-router";
import { game, room } from "modules/game/actions";
import { useParams } from "react-router-dom";
import Chessboard from "chessboardjsx";
import MyAlert from "components/Alert";
import {
  calcWidthChess,
  boardStyle,
  onOpponentTimeFinish,
  onYourTimeFinish,
  isPromoting,
  onOpponentWin,
  onYourWin,
  onYourSurrender,
  onOpponentSurrender,
} from "utils/chessHelpers";
import Timer from "react-timer-wrapper";
import Timecode from "react-timecode";
import { useTranslation } from "react-i18next";
import GameInfo from "./Items/GameInfo";
import WaitingModal from "./Items/WaitingModal";
import { useSelector } from "react-redux";
import PromotionModal from "components/PromotionModal";
import Chess from "chess.js";
import { getChannel } from "pusher-redux";

const PlayRoom = () => {
  const { t } = useTranslation();
  const { token } = useParams();
  const navigate = useNavigate();
  const joinRoom = useAction(room.join);
  const getGame = useAction(game.getGame);
  const setMove = useAction(game.setMove);
  const win = useAction(game.win);
  const lose = useAction(game.lose);
  const endGame = useAction(game.endGame);
  const cancelGame = useAction(game.cancelGame);

  const { myRoom, started, mySide, myOpponent, me, ended } = useSelector(
    (state) => state.game
  );

  const [ip, setIP] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState(1);
  const [side, setSide] = useState("random");
  const [minPerGame, setMinPerGame] = useState(0);
  const [secPerStep, setSecPerStep] = useState(0);
  const [timeLimit, setTimeLimit] = useState(false);
  const [moves, setMoves] = useState([]);
  const [start, setStart] = useState(false);
  const [turn, setTurn] = useState("");
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState(false);
  const [squareStyles, setSquareStyles] = useState({});
  const [pieceSquare, setPieceSquare] = useState("");
  const [history, setHistory] = useState([]);
  const [openPromotionModal, setOpenPromotionModal] = useState(false);
  const [pandingMove, setPandingMove] = useState({});
  const [index, setIndex] = useState(0);
  const [timerIndex, setTimerIndex] = useState(0);

  const [opponent, setOpponent] = useState({});
  const [opponentTimerActive, setOpponentTimerActive] = useState(false);
  const [opponentTimeLimit, setOpponentTimeLimit] = useState(0);
  const [opponentTime, setOpponentTime] = useState(0);

  const [you, setYou] = useState({});
  const [yourTimerActive, setYourTimerActive] = useState(false);
  const [yourTimeLimit, setYourTimeLimit] = useState(0);
  const [yourTime, setYourTime] = useState(0);

  const [chess] = useState(new Chess());

  useEffect(() => {
    return () => {
      cancelGame();
    };
  }, []);

  useEffect(() => {
    if (started) {
      console.log(myRoom);
      console.log(myRoom.timeControl);
      setTimeLimit(myRoom.timeControl);
      setStart(true);
      setSide(myRoom.side);
      setYourTimeLimit(me.time * 1000);
      setOpponentTimeLimit(myOpponent.time * 1000);
      setOpponent(myOpponent);
      setYou(me);
    } else {
      setStart(false);
      joinRoom({ guest: true, token });
    }
  }, [started]);

  useEffect(() => {
    if (myRoom.winner) {
      setDraggable(false);
      setOpponentTimerActive(false);
      setYourTimerActive(false);
      if (myRoom.winner.id === me.id) {
        if (myRoom.reason === "surrender") {
          onOpponentSurrender(endGame, handleBack, false);
        } else if (myRoom.reason === "time_end") {
          onOpponentTimeFinish(endGame, handleBack, false);
        } else if (myRoom.reason === "mat") {
          onYourWin(endGame, handleBack, false);
        }
      } else {
        if (myRoom.reason === "surrender") {
          onYourSurrender(endGame, handleBack, false);
        } else if (myRoom.reason === "time_end") {
          onYourTimeFinish(endGame, handleBack, false);
        } else if (myRoom.reason === "mat") {
          onOpponentWin(endGame, handleBack, false);
        }
      }
    }
  }, [ended]);

  useEffect(() => {
    if (myRoom) {
      chess.load(myRoom.fen);
      setPosition(chess.fen());
      const turn = chess.turn();
      if (chess.game_over()) {
        if (turn === mySide[0]) {
          lose({ reason: "mat" });
        } else {
          win({ reason: "mat" });
        }
      } else {
        if (turn === mySide[0]) {
          setSquareStyles({});
          setDraggable(true);
        }
        handleTimeChange();
      }
    }
  }, [myRoom]);

  const handleTimeChange = () => {
    if (started) {
      const lastMoveTime = myRoom.last_move_time || myRoom.lastMoveTime;
      console.log("lastMoveTime", lastMoveTime);
      if (lastMoveTime) {
        const turn = chess.turn();
        setYourTimeLimit(me.time * 1000);
        setOpponentTimeLimit(myOpponent.time * 1000);
        setYourTime(0);
        setOpponentTime(0);
        setTimerIndex(timerIndex + 1);
        if (turn === mySide[0]) {
          setYourTimerActive(true);
          setOpponentTimerActive(false);
        } else {
          setYourTimerActive(false);
          setOpponentTimerActive(true);
        }
      }
    }
  };

  const handleBack = () => {
    navigate(-1);
    endGame();
  };

  const handleOponentTimeFinish = () => {
    win({ reason: "time_end", token: myRoom.token });
  };

  const handleYourTimeFinish = () => {
    lose({ reason: "time_end", token: myRoom.token });
  };

  const sendMoveRequest = (move) => {
    setMove({ matchId: myRoom.id, move });
  };

  const updateChessboard = () => {
    setIndex(index + 1);
  };

  const onSquareClick = (square) => {
    if (draggable) {
      setPieceSquare(square);
      highlightCorrectMoves(square);
      if (pieceSquare && square) {
        handleMove({
          from: pieceSquare,
          to: square,
          promotion: "q",
        });
        setPieceSquare("");
      }
    }
  };

  const handleMove = (move) => {
    setSquareStyles({});
    const doneMove = chess.move(move);
    if (doneMove) {
      setDraggable(false);
      setPosition(chess.fen());
      sendMoveRequest({
        from: move.from,
        to: move.to,
        promotion: move.promotion,
      });
    }
    updateChessboard();
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
  };

  const surrenderGame = () => {
    MyAlert({
      text: "Are you sure that you want to surrender?",
      icon: "warning",
      confirmButton: "Confirm",
      cancelButton: "Cancel",
      method: () => {
        lose({ reason: "surrender", token: myRoom.token });
      },
    });
  };

  const handleSelectPiece = (piece) => {
    handleMove({
      from: pandingMove.sourceSquare,
      to: pandingMove.targetSquare,
      promotion: piece,
    });
    setOpenPromotionModal(false);
  };

  const highlightCorrectMoves = (square) => {
    const chess = new Chess(myRoom.fen);
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

  return (
    <Page title="Play vs player">
      <Container maxWidth="xl">
        <Grid item container spacing={3} justifyContent="center">
          <Grid item lg={7} md={12} xs={12}>
            <Grid item container spacing={3} justifyContent="center">
              {/* <SelectOptions startGame={startGame} /> */}
              {openPromotionModal && (
                <PromotionModal
                  color={chess.turn()}
                  handleSelectPiece={handleSelectPiece}
                />
              )}
              <Card>
                {!start ? (
                  <>
                    <WaitingModal />
                    <CardContent>
                      <Grid container spacing={3} justifyContent="center">
                        <FakePlayProblemBlock />
                      </Grid>
                    </CardContent>
                  </>
                ) : (
                  <CardContent>
                    <Grid container spacing={3} justifyContent="center">
                      <Grid item xs={12}>
                        <Typography variant="h5">{opponent.name}</Typography>
                      </Grid>
                      {timeLimit && (
                        <Grid item xs={12}>
                          Timer
                          <Timer
                            key={timerIndex + 1}
                            active={opponentTimerActive}
                            duration={yourTimeLimit}
                          />
                          <Timer
                            key={timerIndex + 2}
                            active={opponentTimerActive}
                            duration={opponentTimeLimit}
                            onTimeUpdate={({ time }) => {
                              setOpponentTime(time);
                            }}
                            onFinish={handleOponentTimeFinish}
                          />
                          {/* <CircleIndicator progress={opponentTimeLimit - opponentTime} /> */}
                          <Timecode time={opponentTimeLimit - opponentTime} />
                        </Grid>
                      )}
                      <Grid item>
                        {start ? (
                          <Chessboard
                            draggable={draggable}
                            squareStyles={squareStyles}
                            onSquareClick={onSquareClick}
                            calcWidth={calcWidthChess}
                            position={position}
                            onDrop={onDrop}
                            boardStyle={boardStyle}
                            transitionDuration={300}
                            orientation={mySide}
                          />
                        ) : (
                          <FakePlayProblemBlock />
                        )}
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h5">{me.name}</Typography>
                      </Grid>
                      {timeLimit && (
                        <Grid item xs={12}>
                          Timer
                          <Timer
                            key={timerIndex + 3}
                            active={yourTimerActive}
                            duration={yourTimeLimit}
                            onTimeUpdate={({ time }) => {
                              setYourTime(time);
                            }}
                            onFinish={handleYourTimeFinish}
                          />
                          <Timecode time={yourTimeLimit - yourTime} />
                        </Grid>
                      )}
                    </Grid>
                  </CardContent>
                )}
              </Card>
            </Grid>
          </Grid>
          <Grid item lg={5} md={12} xs={12}>
            <GameInfo
              turn={chess.turn()}
              surrenderGame={surrenderGame}
              minPerGame={minPerGame}
              secPerStep={secPerStep}
              timeLimit={timeLimit}
              history={history}
              side={mySide}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default PlayRoom;
