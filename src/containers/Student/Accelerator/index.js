import React, { useEffect, useRef, useState } from "react";
import { Box, Grid, Container } from "@material-ui/core";
import { useAction } from "utils/hooks";
import { useSelector } from "react-redux";
import Page from "components/Page";
import DoneSelfTraining from "components/Play/DoneSelfTraining";
import ProblemInfo from "components/Play/ProblemInfo";
import PlayProblemBlock from "components/Play/PlayProblemBlock";
import FakePlayProblemBlock from "components/Play/FakePlayProblemBlock";
import TrainingBoardActions from "./Items/TrainingBoardActions";
import SelectCategories from "./Items/SelectTraining";
import { problems } from "modules/student/actions";

const PlayAccelerator = () => {
  const [turn, setTurn] = useState("");
  const [orientation, setOrientation] = useState("");
  const [currentProblem, setCurrentProblem] = useState(false);
  const [done, setDone] = useState(false);
  const [boardStatus, setBoardStatus] = useState("your_turn");
  const [problemIndex, setProblemIndex] = useState(0);
  const [trainingIndex, setTrainingIndex] = useState(0);
  const [index, setIndex] = useState(0);
  const [moves, setMoves] = useState("");
  const [trainingTimerActive, setTrainingTimerActive] = useState(false);
  const [trainingTime, setTrainingTime] = useState(0);
  const [trainingTimeLimit, setTrainingTimeLimit] = useState(0);
  const [problemTimerActive, setProblemTimerActive] = useState(false);
  const [solvedProblemsCount, setSolvedProblemsCount] = useState(0);
  const { aceleratorProblemsList } = useSelector((state) => state.student);
  const setSolvedProblem = useAction(problems.setSolved);
  const boardRef = useRef([]);

  useEffect(() => {
    if (aceleratorProblemsList.length) {
      setCurrentProblem(aceleratorProblemsList[0]);
      setOrientation(aceleratorProblemsList[problemIndex].colorOfUser);
      setTrainingTimerActive(true);
      setProblemTimerActive(true);
    }
  }, [aceleratorProblemsList]);

  const restartTraining = () => {
    setDone(false);
    setProblemIndex(0);
    setSolvedProblemsCount(0);
    setTrainingTime(0);
    setIndex(index + 1);
    setTrainingIndex(index + 1);
    setTrainingTimerActive(true);
    setProblemTimerActive(true);
    setBoardStatus("your_turn");
    setCurrentProblem(aceleratorProblemsList[0]);
    setOrientation(aceleratorProblemsList[0].colorOfUser);
  };

  const repeatMove = (action) => {
    boardRef.current.repeatMove(action);
  };

  const skipProblem = () => {
    if (problemIndex + 2 <= aceleratorProblemsList.length) {
      setProblemIndex(problemIndex + 1);
      setIndex(index + 1);
      setBoardStatus("your_turn");
      setCurrentProblem(aceleratorProblemsList[problemIndex + 1]);
      setOrientation(aceleratorProblemsList[problemIndex + 1].colorOfUser);
      setProblemTimerActive(true);
    } else {
      doneTraining();
    }
  };

  const doneProblem = () => {
    setBoardStatus("solved");
    setSolvedProblem({ problemId: currentProblem.id });
    setProblemTimerActive(false);
    setSolvedProblemsCount(solvedProblemsCount + 1);
    if (aceleratorProblemsList.length - 1 === problemIndex) {
      doneTraining();
    }
  };

  const doneTraining = () => {
    setTrainingTimerActive(false);
    setProblemTimerActive(false);
    setDone(true);
  };

  const setTrainingTimer = (time) => {
    setTrainingTimeLimit(time * 60 * 1000);
  };

  const showHint = () => {
    boardRef.current.showHint();
  };

  return (
    <Page title="Accelerator">
      <Container maxWidth="xl">
        <Grid item container spacing={3}>
          <Grid item container spacing={3}>
            <Grid item lg={7} md={12} xs={12}>
              <Grid item xs={12}>
                {done ? (
                  <>
                    <DoneSelfTraining
                      trainingTime={trainingTime}
                      solvedProblemsCount={solvedProblemsCount}
                      problemsCount={aceleratorProblemsList.length}
                      restartTraining={restartTraining}
                    />
                    <PlayProblemBlock
                      key={index}
                      boardRef={boardRef}
                      setBoardStatus={setBoardStatus}
                      problem={currentProblem}
                      setTurn={setTurn}
                      boardOrientation={orientation}
                      doneProblem={doneProblem}
                      setMoves={setMoves}
                    />
                  </>
                ) : currentProblem ? (
                  <PlayProblemBlock
                    key={index}
                    boardRef={boardRef}
                    setBoardStatus={setBoardStatus}
                    problem={currentProblem}
                    setTurn={setTurn}
                    boardOrientation={orientation}
                    doneProblem={doneProblem}
                    setMoves={setMoves}
                  />
                ) : (
                  <>
                    <FakePlayProblemBlock />
                    <SelectCategories setTrainingTimer={setTrainingTimer} />
                  </>
                )}
              </Grid>
            </Grid>
            <Grid item lg={5} md={12} xs={12}>
              <Grid container item xs={12}>
                <ProblemInfo
                  problemIndex={problemIndex}
                  problem={currentProblem}
                />
              </Grid>
              {currentProblem && (
                <Grid container item xs={12}>
                  <Box mt={3} width="100%">
                    <TrainingBoardActions
                      showHint={showHint}
                      skipProblem={skipProblem}
                      boardStatus={boardStatus}
                      chessTurn={turn}
                      quitGame={doneTraining}
                      repeatMove={repeatMove}
                      moves={moves}
                      index={index}
                      trainingTimeLimit={trainingTimeLimit}
                      trainingTime={trainingTime}
                      trainingIndex={trainingIndex}
                      trainingTimerActive={trainingTimerActive}
                      problemTimerActive={problemTimerActive}
                      setTrainingTime={setTrainingTime}
                      onTimerFinish={doneTraining}
                    />
                  </Box>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default PlayAccelerator;
