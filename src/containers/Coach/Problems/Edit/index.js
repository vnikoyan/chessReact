import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  StepLabel,
  Step,
  Stepper,
  makeStyles,
} from "@material-ui/core";
import Page from "components/Page";
import Chess from "chess.js";
import StartingPosition from "./Items/StartingPosition";
import Solution from "./Items/Solution";
import Description from "./Items/Description";
import MyAlert from "components/Alert";
import { useParams } from "react-router-dom";
import { problems } from "modules/coach/actions";
import { useAction } from "utils/hooks";
import { useSelector } from "react-redux";
import Loading from "components/Loading";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const EditProblems = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { id } = useParams();
  const steps = [
    t("coach.problems.add_edit.starting_position"),
    t("coach.problems.add_edit.solution"),
    t("coach.problems.add_edit.description"),
  ];
  const getProblem = useAction(problems.get);
  const { currentProblem, loadingCurrent } = useSelector(
    (state) => state.coach
  );
  const [activeStep, setActiveStep] = useState(0);
  const [startPos, setStartPos] = useState(currentProblem.fen);
  const [solutionArray, setSolutionArray] = useState([]);
  const [colorOfUser, setColorOfUser] = useState("w");
  const [solutions, setSolutions] = useState([]);

  useEffect(() => {
    getProblem(id);
  }, []);

  useEffect(() => {
    if (Boolean(Object.entries(currentProblem).length)) {
      setStartPos(currentProblem.fen);
      setSolutionArray(solutionArray, ...currentProblem.solution);
      setColorOfUser(currentProblem.colorOfUser);
      setMergedSolutions();
    }
  }, [currentProblem]);

  const addOneMoreSolution = () => {
    setSolutions([...solutions, []]);
  };

  const setMergedSolutions = () => {
    const solution =
      typeof currentProblem.solution === "string"
        ? JSON.parse(currentProblem.solution)
        : currentProblem.solution;
    const solutions =
      typeof currentProblem.solutions === "string"
        ? JSON.parse(currentProblem.solutions)
        : currentProblem.solutions;
    var solutionsVariants = [];
    if (solutions && solutions.length) {
      solutionsVariants = [...solutions, solution];
    } else {
      solutionsVariants = [solution];
    }
    setSolutions([...solutionsVariants]);
  };

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <StartingPosition
            problem={currentProblem}
            applyStartingPosition={applyStartingPosition}
          />
        );
      case 1:
        return (
          startPos &&
          solutions.map((solution, index) => (
            <Solution
              key={index}
              problem={currentProblem}
              problemSolution={solution}
              solutionindex={index}
              isLast={solutions.length - 1 === index}
              handleBack={handleBack}
              startingPosition={startPos}
              colorOfUser={colorOfUser}
              saveSolution={saveSolution}
              applySolution={handleNext}
              addOneMoreSolution={addOneMoreSolution}
            />
          ))
        );
      case 2:
        return (
          <Description
            problem={currentProblem}
            fen={startPos}
            solution={solutionArray}
            colorOfUser={colorOfUser}
            handleBack={handleBack}
          />
        );
      default:
        return "Unknown stepIndex";
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const applyStartingPosition = (fen, castling, orientation) => {
    const chess = new Chess();
    chess.load(
      `${fen} ${orientation.charAt(0)} ${castling ? "KQkq" : "-"} - 0 1`
    );
    try {
      if (chess.game_over()) {
        MyAlert({
          text: t("coach.problems.add_edit.impossible_combination"),
          icon: "error",
          confirmButton: t("coach.problems.add_edit.ok_button"),
        });
      } else {
        const newFen = chess.fen();
        if (newFen !== currentProblem.fen) {
          setSolutions([[]]);
        }
        handleNext();
        setStartPos(newFen);
        setColorOfUser(orientation);
      }
    } catch (error) {
      MyAlert({
        text: t("coach.problems.add_edit.impossible_combination"),
        icon: "error",
        confirmButton: t("coach.problems.add_edit.ok_button"),
      });
    }
  };

  const saveSolution = (index, solution) => {
    const arr = [...solutionArray];
    arr[index] = solution;
    setSolutionArray([...arr]);
  };

  return !loadingCurrent ? (
    <Page title={t("coach.problems.add_edit.edit_problem")}>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div className={classes.root}>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </div>
          </Grid>
          {getStepContent(activeStep)}
        </Grid>
      </Container>
    </Page>
  ) : (
    <Loading />
  );
};

export default EditProblems;
