import React, { useEffect, useRef, useState } from "react";
import { Box, Grid, Container } from "@material-ui/core";
import { useAction } from "utils/hooks";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Page from "components/Page";
import DoneSelfTraining from "components/Play/DoneSelfTraining";
import ProblemInfo from "components/Play/ProblemInfo";
import PlayProblemBlock from "components/Play/PlayProblemBlock";
import FakePlayProblemBlock from "components/Play/FakePlayProblemBlock";
import TrainingBoardActions from "./Items/TrainingBoardActions";
import SelectCategories from "./Items/SelectTraining";
import { problems } from "modules/student/actions";
import { useTranslation } from "react-i18next";

const PlayTraining = () => {
  const { state } = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [turn, setTurn] = useState("");
  const [fromLanding, setFromLanding] = useState(false);
  const [orientation, setOrientation] = useState("");
  const [currentProblem, setCurrentProblem] = useState(false);
  const [done, setDone] = useState(false);
  const [boardStatus, setBoardStatus] = useState("your_turn");
  const [problemIndex, setProblemIndex] = useState(0);
  const [trainingIndex, setTrainingIndex] = useState(0);
  const [index, setIndex] = useState(0);
  const { selfProblemsList } = useSelector((state) => state.student);
  const setSolvedProblem = useAction(problems.setSolved);
  const getRandomProblems = useAction(problems.requestRandom);
  const [moves, setMoves] = useState("");
  const boardRef = useRef([]);
  const [trainingTimerActive, setTrainingTimerActive] = useState(false);
  const [trainingTime, setTrainingTime] = useState(0);
  const [problemTimerActive, setProblemTimerActive] = useState(false);
  const [solvedProblemsCount, setSolvedProblemsCount] = useState(0);

  useEffect(() => {
    if (state === "fromLanding") {
      getRandomProblems();
      setFromLanding(true);
    } else if (state === "fromStudentCabinet") {
      setCurrentProblem(false);
    } else {
      navigate("/");
    }
  }, [state]);

  useEffect(() => {
    if (selfProblemsList.length) {
      setCurrentProblem(selfProblemsList[0]);
      setOrientation(selfProblemsList[0].colorOfUser);
      setTrainingTimerActive(true);
      setProblemTimerActive(true);
    }
  }, [selfProblemsList]);

  const repeatMove = (action) => {
    boardRef.current.repeatMove(action);
  };

  const skipProblem = () => {
    if (problemIndex + 2 <= selfProblemsList.length) {
      setProblemIndex(problemIndex + 1);
      setIndex(index + 1);
      setBoardStatus("your_turn");
      setCurrentProblem(selfProblemsList[problemIndex + 1]);
      setOrientation(selfProblemsList[problemIndex + 1].colorOfUser);
      setProblemTimerActive(true);
    } else {
      doneTraining();
    }
  };

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
    setCurrentProblem(selfProblemsList[0]);
    setOrientation(selfProblemsList[0].colorOfUser);
  };

  const doneProblem = () => {
    setBoardStatus("solved");
    if (!fromLanding) {
      setSolvedProblem({ problemId: currentProblem.id });
    }
    setProblemTimerActive(false);
    setSolvedProblemsCount(solvedProblemsCount + 1);
    if (selfProblemsList.length - 1 === problemIndex) {
      doneTraining();
    }
  };

  const doneTraining = () => {
    setDone(true);
    setTrainingTimerActive(false);
    setProblemTimerActive(false);
  };

  const showHint = () => {
    boardRef.current.showHint();
  };

  return (
    <Page
      title={
        fromLanding ? t("student.self.solve_100") : t("student.self.self_learn")
      }
    >
      <Container maxWidth="xl">
        <Grid item container spacing={3}>
          <Grid item container spacing={3}>
            <Grid item lg={7} md={12} xs={12}>
              <Grid item xs={12}>
                {done ? (
                  <>
                    <DoneSelfTraining
                      fromLanding={fromLanding}
                      trainingTime={trainingTime}
                      solvedProblemsCount={solvedProblemsCount}
                      problemsCount={selfProblemsList.length}
                      restartTraining={restartTraining}
                    />
                    <PlayProblemBlock
                      key={index}
                      fromLanding={fromLanding}
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
                    fromLanding={fromLanding}
                    boardRef={boardRef}
                    setBoardStatus={setBoardStatus}
                    problem={currentProblem}
                    setTurn={setTurn}
                    boardOrientation={orientation}
                    doneProblem={doneProblem}
                    setMoves={setMoves}
                  />
                ) : (
                  !fromLanding && (
                    <>
                      <FakePlayProblemBlock />
                      <SelectCategories />
                    </>
                  )
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
                      fromLanding={fromLanding}
                      showHint={showHint}
                      skipProblem={skipProblem}
                      boardStatus={boardStatus}
                      chessTurn={turn}
                      problem={currentProblem}
                      orientation={orientation}
                      quitGame={doneTraining}
                      repeatMove={repeatMove}
                      moves={moves}
                      index={index}
                      trainingIndex={trainingIndex}
                      trainingTimerActive={trainingTimerActive}
                      problemTimerActive={problemTimerActive}
                      setTrainingTime={setTrainingTime}
                      setOrientation={setOrientation}
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

export default PlayTraining;
