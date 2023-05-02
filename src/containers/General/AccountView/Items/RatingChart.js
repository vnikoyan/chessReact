import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
  Tooltip,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation, EventTracker } from "@devexpress/dx-react-chart";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { green, red } from "@material-ui/core/colors";

const RatingChart = ({ user }) => {
  const customizeTooltip = (pointInfo) => {
    let isPositive = true;
    let diff = 0;
    const index = pointInfo.targetItem.point;
    if (index > 0) {
      const currentValue = pointInfo.text;
      const previusValue = user.statistic[index - 1].rating;
      if (currentValue < previusValue) {
        isPositive = false;
        diff = previusValue - currentValue;
      }
      diff = currentValue - previusValue;
    } else {
      diff = pointInfo.text;
    }
    return (
      <>
        {isPositive ? (
          <>
            <Typography align="center" variant="h5">
              {pointInfo.text}
            </Typography>
            <div style={{ color: green[500] }}>
              <KeyboardArrowUpIcon />
              <Typography display="inline" variant="body2">
                {diff}
              </Typography>
            </div>
          </>
        ) : (
          <>
            <Typography align="center" variant="h5">
              {pointInfo.text}
            </Typography>
            <div style={{ color: red[500] }}>
              <KeyboardArrowDownIcon />
              <Typography display="inline" variant="body2">
                {0 - diff}
              </Typography>
            </div>
          </>
        )}
      </>
    );
  };

  return (
    <Card>
      <CardContent>
        <Chart data={user.statistic}>
          <ArgumentAxis />
          <ValueAxis />
          <LineSeries
            color="#f57c00"
            valueField="rating"
            argumentField="date"
          />
          <Animation />
          <EventTracker />
          <Tooltip contentComponent={customizeTooltip} />
        </Chart>
      </CardContent>
    </Card>
  );
};

export default RatingChart;
