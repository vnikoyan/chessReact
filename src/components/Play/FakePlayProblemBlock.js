import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent, Grid } from "@material-ui/core";
import Chessboard from "chessboardjsx";
import { calcWidthChess } from "utils/chessHelpers";

const boardStyle = {
  borderRadius: "5px",
  boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`,
};

const FakePlayProblemBlock = () => {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          <Chessboard
            calcWidth={calcWidthChess}
            draggable={false}
            showNotation={true}
            position="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
            boardStyle={boardStyle}
            orientation="white"
            transitionDuration={300}
          />
        </Grid>
      </CardContent>
    </Card>
  );
};

FakePlayProblemBlock.propTypes = {
  className: PropTypes.string,
};

export default FakePlayProblemBlock;
