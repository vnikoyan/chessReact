import React from "react";
import Paper from "@material-ui/core/Paper";
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
  Tooltip,
} from "@devexpress/dx-react-chart-material-ui";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Animation, EventTracker } from "@devexpress/dx-react-chart";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { green, red } from "@material-ui/core/colors";
import { Card, CardHeader, Divider, CardContent } from "@material-ui/core";

const MyActivity = () => {
  const { t } = useTranslation();
  const { statistic } = useSelector((state) => state.me);
  const customizeTooltip = (pointInfo) => {
    let isPositive = true;
    let diff = 0;
    const index = pointInfo.targetItem.point;
    if (index > 0) {
      const currentValue = pointInfo.text;
      const previusValue = statistic[index - 1].rating;
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
          <div style={{ color: green[500] }}>
            <KeyboardArrowUpIcon />
            {diff}
          </div>
        ) : (
          <div style={{ color: red[500] }}>
            <KeyboardArrowDownIcon />
            {0 - diff}
          </div>
        )}
      </>
    );
  };

  return (
    <Card>
      <CardHeader title={t("student.dashboard.my_activity")} />
      <Divider />
      <CardContent>
        <Paper>
          <Chart data={statistic}>
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
        </Paper>
      </CardContent>
    </Card>
  );
};

export default MyActivity;
