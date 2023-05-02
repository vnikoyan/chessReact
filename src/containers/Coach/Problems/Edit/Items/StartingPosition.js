import React, { useState, createRef, useEffect } from "react";
import {
  Grid,
  Card,
  CardHeader,
  Divider,
  CardContent,
  Checkbox,
  Button,
  Select,
  MenuItem,
  FormControlLabel,
  makeStyles,
  TextField,
} from "@material-ui/core";
import Chessboard from "chessboardjsx";
import { getFEN, calcWidthChess } from "utils/chessHelpers";
import { useTranslation } from "react-i18next";

const boardStyle = {
  borderRadius: "5px",
  boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`,
};

const useStyles = makeStyles(() => ({
  mySelect: {
    textAlign: "center",
    padding: 0,
    "& div": {
      padding: 12,
      fontSize: "0.9375rem",
    },
  },
}));

const StartingPosition = ({ problem, applyStartingPosition }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [position, setPosition] = useState({});
  const [fen, setFen] = useState("8/8/8/8/8/8/8/8");
  const [castling, setCastling] = useState(false);
  const [orientation, setOrientation] = useState("white");
  const [fullFen, setFullFen] = useState("");
  const chessboard = createRef();

  useEffect(() => {
    if (Boolean(Object.entries(problem).length)) {
      const currentFen = problem.fen.split(" ")[0];
      setFen(currentFen);
      setPosition(currentFen);
      setOrientation(problem.colorOfUser);
      setCastling(problem.fen.split(" ")[2] === "KQkq");
    }
  }, [problem]);

  useEffect(() => {
    if (!fullFen.includes(fen)) {
      setFullFen(
        `${fen} ${orientation.charAt(0)} ${castling ? "KQkq" : "-"} - 0 1`
      );
    }
  }, [fen, castling, orientation]);

  useEffect(() => {
    setPosition(fullFen);
  }, [fullFen]);

  const handleGetPosition = (currentPosition) => {
    setPosition(currentPosition);
    setFen(getFEN(currentPosition));
  };

  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader
          title={`1. ${t("coach.problems.add_edit.starting_position")}`}
          subheaderTypographyProps={{ style: { fontSize: 14 } }}
        />
        <Divider />
        <CardContent>
          <Grid item container spacing={3}>
            <Grid md={6} container item justifyContent="center">
              <Chessboard
                ref={chessboard}
                calcWidth={calcWidthChess}
                draggable={true}
                sparePieces={true}
                position={position}
                getPosition={handleGetPosition}
                boardStyle={boardStyle}
                orientation={orientation}
                transitionDuration={300}
                dropOffBoard="trash"
              />
            </Grid>
            <Grid md={6} item>
              <Grid xs={12} container item spacing={3}>
                <Grid xs={12} item container spacing={1}>
                  <Grid item md={4}>
                    <Button
                      color="secondary"
                      size="large"
                      variant="outlined"
                      fullWidth
                      onClick={() =>
                        setPosition(
                          "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 1"
                        )
                      }
                    >
                      {t("coach.problems.add_edit.start_position")}
                    </Button>
                  </Grid>
                  <Grid item md={4}>
                    <Button
                      color="secondary"
                      size="large"
                      variant="outlined"
                      fullWidth
                      onClick={() => setPosition("8/8/8/8/8/8/8/8 w - - 0 1")}
                    >
                      {t("coach.problems.add_edit.empty_board")}
                    </Button>
                  </Grid>
                  <Grid item md={4}>
                    <Select
                      className={classes.mySelect}
                      color="secondary"
                      autoWidth
                      value={orientation}
                      variant="outlined"
                      fullWidth
                      onChange={(event) => setOrientation(event.target.value)}
                    >
                      <MenuItem value="white">
                        {t("coach.problems.add_edit.white_move")}
                      </MenuItem>
                      <MenuItem value="black">
                        {t("coach.problems.add_edit.black_move")}
                      </MenuItem>
                    </Select>
                  </Grid>
                </Grid>
                <Grid xs={12} item container justifyContent="flex-start">
                  <Grid xs={12} item>
                    <TextField
                      fullWidth
                      value={fullFen}
                      onChange={(event) => setFullFen(event.target.value)}
                      label={t("coach.problems.add_edit.fen_position")}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Grid xs={12} item container justifyContent="flex-start">
                  <Grid xs={12} item>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={castling}
                          onChange={() => setCastling(!castling)}
                          color="primary"
                        />
                      }
                      label={t("coach.problems.add_edit.castling_possible")}
                    />
                  </Grid>
                </Grid>
                <Divider />
                <Grid xs={12} item container justifyContent="flex-start">
                  <Grid item>
                    <Button
                      color="primary"
                      size="large"
                      variant="contained"
                      fullWidth={false}
                      onClick={() =>
                        applyStartingPosition(fen, castling, orientation)
                      }
                    >
                      {t("coach.problems.add_edit.apply")}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default StartingPosition;
