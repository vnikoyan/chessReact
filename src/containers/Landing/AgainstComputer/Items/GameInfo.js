import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const GameInfo = ({ minPerGame, secPerStep, setTimeLimit, moves, side }) => {
  const { t } = useTranslation();
  const { difficulty } = useSelector((state) => state.common);

  return (
    <Card className="w-100">
      <CardContent>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>{side === "white" ? "You" : "Opponent"}</TableCell>
                  <TableCell>{side === "white" ? "Opponent" : "You"}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {moves.map((move, moveIndex) => (
                  <TableRow
                    key={moveIndex}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {moveIndex + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {move[0]}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {move[1]}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </CardContent>
    </Card>
  );
};

GameInfo.propTypes = {
  className: PropTypes.string,
};

export default GameInfo;
