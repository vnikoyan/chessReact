import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/styles";
import { Box, Divider, Typography, Grid } from "@material-ui/core";
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
  Title,
  Legend,
  Tooltip,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation, EventTracker } from "@devexpress/dx-react-chart";
import { withStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { groups, student } from "modules/coach/actions";
import { useAction } from "utils/hooks";
import { useTranslation } from "react-i18next";
import { Overlay } from "components/Tooltip";

const useStyles = makeStyles((theme) => ({
  dialogFooter: {
    padding: 0,
    marginTop: 30,
    marginBottom: 10,
  },
  tooltip: {
    background: "red",
    zIndex: 5000,
  },
  icon: {
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
}));

const format = () => (tick) => tick;
const legendStyles = () => ({
  root: {
    display: "flex",
    margin: "auto",
    flexDirection: "row",
  },
});
const legendLabelStyles = (theme) => ({
  label: {
    paddingTop: theme.spacing(1),
    whiteSpace: "nowrap",
  },
});
const legendItemStyles = () => ({
  item: {
    flexDirection: "column",
  },
});

const legendRootBase = ({ classes, ...restProps }) => (
  <Legend.Root {...restProps} className={classes.root} />
);
const legendLabelBase = ({ classes, ...restProps }) => (
  <Legend.Label className={classes.label} {...restProps} />
);
const legendItemBase = ({ classes, ...restProps }) => (
  <Legend.Item className={classes.item} {...restProps} />
);
const Root = withStyles(legendStyles, { name: "LegendRoot" })(legendRootBase);
const Label = withStyles(legendLabelStyles, { name: "LegendLabel" })(
  legendLabelBase
);
const Item = withStyles(legendItemStyles, { name: "LegendItem" })(
  legendItemBase
);

const ValueLabel = (props) => {
  const { text } = props;
  return <ValueAxis.Label {...props} text={`${text}`} />;
};

const titleStyles = {
  title: {
    whiteSpace: "pre",
  },
};
const TitleText = withStyles(titleStyles)(({ classes, ...props }) => (
  <Title.Text {...props} className={classes.title} />
));

export default function StudentStatistics({
  currentStudent,
  userName,
  handleClose,
}) {
  const { t } = useTranslation();
  const [solvedTasks, setSolvedTasks] = useState([]);
  const [solvedTasksMistake, setSolvedTasksMistake] = useState([]);
  const [startedProblems, setStartedProblems] = useState([]);
  const [statisticsData, setStatisticsData] = useState([]);
  const classes = useStyles();
  const { groupsList } = useSelector((state) => state.coach);

  useEffect(() => {
    const statisticsDataArray = [];
    console.log(currentStudent);
    currentStudent.solvedTasks.forEach((item) => {
      const solvedTasksMistake = currentStudent.solvedTasksMistake.find(
        (i) => i.date === item.date
      );
      const startedProblems = currentStudent.startedProblems.find(
        (i) => i.date === item.date
      );
      const statItem = {
        date: item.date,
        solvedTasks: item.count,
        solvedTasksMistake: solvedTasksMistake ? solvedTasksMistake.count : 0,
        startedProblems: startedProblems ? startedProblems.count : 0,
      };
      statisticsDataArray.push(statItem);
    });
    setStatisticsData(statisticsDataArray);
  }, [currentStudent]);

  console.log(Overlay);

  return (
    <>
      <Dialog
        open
        fullWidth
        maxWidth="lg"
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle disableTypography id="form-dialog-title">
          <Typography variant="h4">
            {userName}`s last week statistics
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container>
            <Grid xs={12} item>
              <Box my={3}>
                <Chart data={statisticsData} className={classes.chart}>
                  <ArgumentAxis tickFormat={format} />
                  <ValueAxis max={50} labelComponent={ValueLabel} />
                  <LineSeries
                    name="Solved Tasks"
                    valueField="solvedTasks"
                    argumentField="date"
                  />
                  <LineSeries
                    name="Solved Tasks with Mistake"
                    valueField="solvedTasksMistake"
                    argumentField="date"
                  />
                  {/* <LineSeries
                  name="Started Problems"
                  valueField="startedProblems"
                  argumentField="date"
                /> */}
                  <Legend
                    position="bottom"
                    rootComponent={Root}
                    itemComponent={Item}
                    labelComponent={Label}
                  />
                  <Title
                    text={`Problems statistics`}
                    textComponent={TitleText}
                  />
                  <EventTracker />
                  <Tooltip overlayComponent={Overlay} />
                  <Animation />
                </Chart>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}
