import React, { useEffect, useRef, useState } from "react";
import { Box, Grid, Container } from "@material-ui/core";
import { useAction } from "utils/hooks";
import { useNavigate, useLocation } from "react-router-dom";
import Page from "components/Page";
import ProblemInfo from "components/Play/ProblemInfo";
import PlayProblemBlock from "components/Play/PlayProblemBlock";
import TrainingBoardActions from "./Items/TrainingBoardActions";
import { problems } from "modules/student/actions";
import Loading from "components/Loading";

const PlayTraining = () => {
  const { state } = useLocation();
  const [turn, setTurn] = useState("");
  const [orientation, setOrientation] = useState("");
  const [currentProblem, setCurrentProblem] = useState(false);
  const [boardStatus, setBoardStatus] = useState("your_turn");
  const [moves, setMoves] = useState("");
  const [problemTimerActive, setProblemTimerActive] = useState(false);
  const setSolvedProblem = useAction(problems.setSolved);
  const boardRef = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const locationType = location.pathname.split("/")[1];

  useEffect(() => {
    if (state !== null) {
      const { problem } = state;
      setCurrentProblem(problem);
      setOrientation(problem.colorOfUser);
      setProblemTimerActive(true);
    } else {
      navigate(`/${locationType}/problems`);
    }
  }, [state]);

  const repeatMove = (action) => {
    boardRef.current.repeatMove(action);
  };

  const skipProblem = () => {
    navigate(`/${locationType}/problems`);
  };

  const doneProblem = () => {
    setBoardStatus("solved");
    setProblemTimerActive(false);
    setSolvedProblem({ problemId: currentProblem.id });
  };

  const showHint = () => {
    boardRef.current.showHint();
  };

  return true ? (
    <Page title="My Problems">
      <Container maxWidth="xl">
        <Grid item container spacing={3}>
          <Grid item container spacing={3}>
            <Grid item lg={7} md={12} xs={12}>
              <Grid item xs={12}>
                {currentProblem ? (
                  <PlayProblemBlock
                    boardRef={boardRef}
                    setBoardStatus={setBoardStatus}
                    problem={currentProblem}
                    setTurn={setTurn}
                    boardOrientation={orientation}
                    doneProblem={doneProblem}
                    setMoves={setMoves}
                  />
                ) : (
                  <Loading />
                )}
              </Grid>
            </Grid>
            <Grid item lg={5} md={12} xs={12}>
              <Grid container item xs={12}>
                <ProblemInfo problem={currentProblem} />
              </Grid>
              {currentProblem && (
                <Grid container item xs={12}>
                  <Box mt={3} width="100%">
                    <TrainingBoardActions
                      skipProblem={skipProblem}
                      boardStatus={boardStatus}
                      chessTurn={turn}
                      problem={currentProblem}
                      orientation={orientation}
                      setOrientation={setOrientation}
                      repeatMove={repeatMove}
                      moves={moves}
                      showHint={showHint}
                      problemTimerActive={problemTimerActive}
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
