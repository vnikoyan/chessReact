import React from "react";
import Paper from "@material-ui/core/Paper";
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
  Tooltip,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation, EventTracker } from "@devexpress/dx-react-chart";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardHeader,
  Divider,
  CardContent,
  Typography,
} from "@material-ui/core";
import { curveCatmullRom, line } from "d3-shape";

const StudentActivity = () => {
  const { t } = useTranslation();
  const { studentsActivity } = useSelector((state) => state.coach);

  const customizeTooltip = (pointInfo) => {
    return (
      <>
        <Typography color="primary" variant="body2">
          {t("coach.cabinet.solved_problems")}: {pointInfo.text}
        </Typography>
      </>
    );
  };
  const format = () => (tick) => Math.round(tick);

  return (
    <Card>
      <CardHeader title={t("coach.cabinet.student_activity")} />
      <Divider />
      <CardContent>
        <Paper>
          <Chart data={studentsActivity}>
            <ArgumentAxis />
            <ValueAxis tickSize={1} />
            <LineSeries
              color="#f57c00"
              valueField="count"
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

export default StudentActivity;
