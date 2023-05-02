import React, { useEffect, useRef, useState } from "react";
import { Box, Grid, Container } from "@material-ui/core";
import { useAction } from "utils/hooks";
import { useSelector } from "react-redux";
import { trainings } from "modules/coach/actions";
import Page from "components/Page";
import TrainingInfo from "./Items/TrainingInfo";
import DoneTrainingInfo from "./Items/DoneTrainingInfo";
import ProblemInfo from "./Items/ProblemInfo";
import PlayProblemBlock from "./Items/PlayProblemBlock";
import TrainingBoardActions from "./Items/TrainingBoardActions";
import { problems } from "modules/student/actions";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Loading from "components/Loading";

const PlayTraining = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id } = useParams();
  const location = useLocation();
  const locationType = location.pathname.split("/")[1];
  const getTraining = useAction(trainings.get);
  const setSolvedProblem = useAction(problems.setSolved);
  const setStartProblem = useAction(problems.setStart);
  const setEndProblem = useAction(problems.setEnd);
  const { currentTraining, isLoaded } = useSelector((state) => state.coach);
  const [turn, setTurn] = useState("");
  const [orientation, setOrientation] = useState("");
  const [currentProblem, setCurrentProblem] = useState(false);
  const [done, setDone] = useState(false);
  const [boardStatus, setBoardStatus] = useState("your_turn");
  const [problemIndex, setProblemIndex] = useState(0);
  const [problemViewIndex, setProblemViewIndex] = useState(0);
  const [moves, setMoves] = useState("");
  const [index, setIndex] = useState(0);
  const [trainingIndex, setTrainingIndex] = useState(0);
  const [trainingTimerActive, setTrainingTimerActive] = useState(false);
  const [trainingTime, setTrainingTime] = useState(0);
  const [problemTime, setProblemTime] = useState(0);
  const [trainingTimeLimit, setTrainingTimeLimit] = useState(0);
  const [problemTimeLimit, setProblemTimeLimit] = useState(0);
  const [problemTimerActive, setProblemTimerActive] = useState(false);
  const [unresolvedProblems, setUnresolvedProblems] = useState([]);
  const boardRef = useRef([]);

  useEffect(() => {
    if (!Boolean(currentTraining.length)) {
      getTraining(id);
    }
  }, []);

  useEffect(() => {
    setProblemTimeLimit(currentTraining.limitTimeTask * 1000);
    setTrainingTimeLimit(currentTraining.limitTimeAll * 1000);
  }, [currentTraining]);

  useEffect(() => {
    if (unresolvedProblems.length) {
      setStartProblem({
        problemId: unresolvedProblems[problemIndex].id,
        trainingId: currentTraining.id,
      });
    }
  }, [problemIndex]);

  const startTraining = () => {
    let viewIndex = 0;
    let unresolvedProblems = currentTraining.problems.filter(
      (item) => !item.solved
    );
    if (unresolvedProblems.length) {
      viewIndex = currentTraining.problems.findIndex(
        (item) => item.id === unresolvedProblems[0].id
      );
    } else {
      unresolvedProblems = currentTraining.problems;
    }
    setProblemViewIndex(viewIndex);
    setUnresolvedProblems(unresolvedProblems);
    setProblemIndex(0);
    setCurrentProblem(unresolvedProblems[0]);
    setStartProblem({
      problemId: unresolvedProblems[0].id,
      trainingId: currentTraining.id,
    });
    setOrientation(unresolvedProblems[0].colorOfUser);
    setTrainingTimerActive(true);
    setProblemTimerActive(true);
  };

  const restartTraining = () => {
    setDone(false);
    setProblemIndex(0);
    setTrainingTime(0);
    setIndex(index + 1);
    setTrainingIndex(index + 1);
    setTrainingTimerActive(true);
    setProblemTimerActive(true);
    setBoardStatus("your_turn");
    setCurrentProblem(currentTraining.problems[0]);
    setOrientation(currentTraining.problems[0].colorOfUser);
  };

  const repeatMove = (action) => {
    if (action === "reset") {
      setStartProblem({
        problemId: unresolvedProblems[problemIndex].id,
        trainingId: currentTraining.id,
      });
    }
    boardRef.current.repeatMove(action);
  };

  const skipProblem = () => {
    if (problemIndex + 2 <= currentTraining.problems.length) {
      const viewIndex = currentTraining.problems.findIndex(
        (item) => item.id === unresolvedProblems[problemIndex + 1].id
      );
      setProblemViewIndex(viewIndex);
      setProblemIndex(problemIndex + 1);
      setIndex(index + 1);
      setBoardStatus("your_turn");
      setCurrentProblem(unresolvedProblems[problemIndex + 1]);
      setOrientation(unresolvedProblems[problemIndex + 1].colorOfUser);
      setProblemTimerActive(true);
    } else {
      doneTraining();
    }
  };

  const doneProblem = () => {
    setBoardStatus("solved");
    setSolvedProblem({
      problemId: unresolvedProblems[problemIndex].id,
      trainingId: currentTraining.id,
    });
    setEndProblem({
      problemId: unresolvedProblems[problemIndex].id,
      trainingId: currentTraining.id,
    });
    setProblemTimerActive(false);
    if (unresolvedProblems.length - 1 === problemIndex) {
      doneTraining();
    }
  };

  const doneTraining = () => {
    setDone(true);
    setCurrentProblem(false);
    setOrientation("");
    setTrainingTimerActive(false);
    setProblemTimerActive(false);
  };

  const showHint = () => {
    boardRef.current.showHint();
  };

  const quitGame = () => {
    navigate(`/${locationType}/trainings/`);
  };

  return isLoaded ? (
    <Page title={t("trainings.play.play_training")}>
      <Container maxWidth="xl">
        <Grid item container spacing={3}>
          <Grid item container spacing={3}>
            <Grid item lg={7} md={12} xs={12}>
              <Grid item xs={12}>
                {done ? (
                  <DoneTrainingInfo
                    locationType={locationType}
                    restartTraining={restartTraining}
                  />
                ) : currentProblem ? (
                  <>
                    <PlayProblemBlock
                      key={problemIndex}
                      trainingId={currentTraining.id}
                      boardRef={boardRef}
                      setBoardStatus={setBoardStatus}
                      problem={currentProblem}
                      setTurn={setTurn}
                      boardOrientation={orientation}
                      doneProblem={doneProblem}
                      setMoves={setMoves}
                    />
                  </>
                ) : (
                  <TrainingInfo
                    locationType={locationType}
                    startTraining={startTraining}
                  />
                )}
              </Grid>
            </Grid>
            <Grid item lg={5} md={12} xs={12}>
              <Grid container item xs={12}>
                <ProblemInfo
                  problemIndex={problemViewIndex}
                  problem={currentProblem}
                />
              </Grid>
              {currentProblem && (
                <Grid container item xs={12}>
                  <Box mt={3} width="100%">
                    <TrainingBoardActions
                      showHint={showHint}
                      showHints={currentTraining.showHints}
                      skipProblem={skipProblem}
                      boardStatus={boardStatus}
                      chessTurn={turn}
                      problem={currentProblem}
                      orientation={orientation}
                      setOrientation={setOrientation}
                      repeatMove={repeatMove}
                      moves={moves}
                      index={index}
                      trainingTimeLimit={trainingTimeLimit}
                      problemTimeLimit={problemTimeLimit}
                      trainingTime={trainingTime}
                      problemTime={problemTime}
                      trainingIndex={trainingIndex}
                      trainingTimerActive={trainingTimerActive}
                      problemTimerActive={problemTimerActive}
                      setTrainingTime={setTrainingTime}
                      setProblemTime={setProblemTime}
                      onTimerFinish={doneTraining}
                      onProblemTimerFinish={skipProblem}
                      quitGame={quitGame}
                    />
                  </Box>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Page>
  ) : (
    <Loading />
  );
};

export default PlayTraining;
