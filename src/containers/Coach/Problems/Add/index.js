import React, { useState } from "react";
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

const AddProblems = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [startPos, setStartPos] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [solutionArray, setSolutionArray] = useState([]);
  const [colorOfUser, setColorOfUser] = useState("w");
  const [solutionCount, setSolutionCount] = useState(1);
  const steps = [
    t("coach.problems.add_edit.starting_position"),
    t("coach.problems.add_edit.solution"),
    t("coach.problems.add_edit.description"),
  ];

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <StartingPosition applyStartingPosition={applyStartingPosition} />
        );
      case 1:
        return (
          startPos &&
          Array.from({ length: solutionCount }, (_, index) => (
            <Solution
              key={index}
              solutionindex={index}
              isLast={solutionCount - 1 === index}
              handleBack={handleBack}
              startingPosition={startPos}
              colorOfUser={colorOfUser}
              saveSolution={saveSolution}
              applySolution={handleNext}
              addOneMoreSolution={() => setSolutionCount(solutionCount + 1)}
            />
          ))
        );
      case 2:
        return (
          <Description
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
    setSolutionCount(1);
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

  return (
    <>
      <Page title={t("coach.problems.add_edit.create_problem")}>
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
    </>
  );
};

export default AddProblems;
