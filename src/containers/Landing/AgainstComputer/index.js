import React, { useEffect, useState } from "react";
import { Grid, Container, Card, CardContent } from "@material-ui/core";
import Page from "components/Page";
import FakePlayProblemBlock from "components/Play/FakePlayProblemBlock";
import SelectOptions from "./Items/SelectOptions";
import Chessboard from "chessboardjsx";
import {
  calcWidthChess,
  boardStyle,
  onOpponentTimeFinish,
  onYourTimeFinish,
  onOpponentWin,
  onYourWin,
} from "utils/chessHelpers";
import Timer from "react-timer-wrapper";
import Timecode from "react-timecode";
import StockFish from "./integrations/Stockfish.js";
import { useTranslation } from "react-i18next";
import GameInfo from "./Items/GameInfo";
import MyAlert from "components/Alert";

const PlayTraining = () => {
  const { t } = useTranslation();
  const [difficultyLevel, setDifficultyLevel] = useState(1);
  const [side, setSide] = useState("random");
  const [minPerGame, setMinPerGame] = useState(0);
  const [secPerStep, setSecPerStep] = useState(0);
  const [timeLimit, setTimeLimit] = useState(false);
  const [moves, setMoves] = useState([]);
  const [start, setStart] = useState(false);
  const [turn, setTurn] = useState("");

  const [opponentTimerActive, setOpponentTimerActive] = useState(false);
  const [opponentTimeLimit, setOpponentTimeLimit] = useState(0);
  const [opponentTime, setOpponentTime] = useState(0);

  const [yourTimerActive, setYourTimerActive] = useState(false);
  const [yourTimeLimit, setYourTimeLimit] = useState(0);
  const [yourTime, setYourTime] = useState(0);

  const startGame = ({
    difficultyLevel,
    side,
    minPerGame,
    secPerStep,
    timeLimit,
  }) => {
    setSide(side);
    setDifficultyLevel(difficultyLevel);
    if (timeLimit) {
      setYourTimeLimit(minPerGame * 60 * 1000);
      setOpponentTimeLimit(minPerGame * 60 * 1000);
    }
    if (timeLimit) {
      if (side === "white") {
        setYourTimerActive(true);
      } else {
        setOpponentTimerActive(true);
      }
      setMinPerGame(minPerGame * 1000);
      setSecPerStep(secPerStep * 1000);
    }
    setStart(true);
    setTimeLimit(timeLimit);
  };

  useEffect(() => {
    if (moves.length) {
      if (turn === side[0]) {
        setOpponentTimerActive(false);
        setYourTimerActive(true);
        const updatedOpponentTimeLimit = opponentTimeLimit + secPerStep;
        setOpponentTimeLimit(updatedOpponentTimeLimit);
      } else {
        setYourTimerActive(false);
        setOpponentTimerActive(true);
        const updatedYourTimeLimit = yourTimeLimit + secPerStep;
        setYourTimeLimit(updatedYourTimeLimit);
      }
    }
  }, [moves]);

  const handleChangeMoves = (moves, turn) => {
    setTurn(turn);
    const movesPair = moves.filter(
      (value, index) => index === 0 || index % 2 === 0
    );
    const movesArray = [];
    movesPair.forEach((move, i) => {
      const currIndex = i === 0 ? i : i * 2;
      const movePair = [move, moves[currIndex + 1] || ""];
      movesArray.push(movePair);
    });
    setMoves(movesArray);
  };

  return (
    <Page title="Play vs stockfish">
      <Container maxWidth="xl">
        <Grid item container spacing={3}>
          <Grid item lg={7} md={12} xs={12}>
            <Grid item container spacing={3} justifyContent="center">
              <Card>
                <SelectOptions startGame={startGame} />
                <CardContent>
                  <Grid container spacing={3} justifyContent="center">
                    {timeLimit && (
                      <Grid item xs={12}>
                        Timer
                        <Timer
                          active={opponentTimerActive}
                          duration={yourTimeLimit}
                        />
                        <Timer
                          active={opponentTimerActive}
                          duration={opponentTimeLimit}
                          onTimeUpdate={({ time }) => {
                            setOpponentTime(time);
                          }}
                          onFinish={onOpponentTimeFinish}
                        />
                        {/* <CircleIndicator progress={opponentTimeLimit - opponentTime} /> */}
                        <Timecode time={opponentTimeLimit - opponentTime} />
                      </Grid>
                    )}
                    <Grid item>
                      {start ? (
                        <StockFish
                          side={side}
                          difficultyLevel={difficultyLevel}
                          handleChangeMoves={handleChangeMoves}
                          onOpponentWin={onOpponentWin}
                          onYourWin={onYourWin}
                        >
                          {({ position, onDrop, draggable }) => (
                            <Chessboard
                              id="stockfish"
                              draggable={draggable}
                              calcWidth={calcWidthChess}
                              position={position}
                              onDrop={onDrop}
                              boardStyle={boardStyle}
                              transitionDuration={300}
                              orientation={side}
                            />
                          )}
                        </StockFish>
                      ) : (
                        <FakePlayProblemBlock />
                      )}
                    </Grid>
                    {timeLimit && (
                      <Grid item xs={12}>
                        Timer
                        <Timer
                          active={yourTimerActive}
                          duration={yourTimeLimit}
                          onTimeUpdate={({ time }) => {
                            setYourTime(time);
                          }}
                          onFinish={onYourTimeFinish}
                        />
                        <Timecode time={yourTimeLimit - yourTime} />
                      </Grid>
                    )}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid item lg={5} md={12} xs={12}>
            <GameInfo
              minPerGame={minPerGame}
              secPerStep={secPerStep}
              timeLimit={timeLimit}
              moves={moves}
              side={side}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default PlayTraining;
