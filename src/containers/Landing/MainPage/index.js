import "./index.scss";
import "./landing.css";
import "./site.css";
import React from "react";
import YoutubeBackground from "react-youtube-background";
import getVideoId from "get-video-id";
import { ContentMain } from "./ContentMain";
import { ContentWrapper } from "./ContentWrapper";
import { makeStyles } from "@material-ui/core";
import { Grossmeisters } from "./Grossmeisters";
import { Review } from "./Review";
import { Tariffs } from "./Tariffs";

const useStyles = makeStyles((theme) => ({
  youtubeBackground: {},
}));

const MainPage = () => {
  const classes = useStyles();

  const { id } = getVideoId("https://www.youtube.com/watch?v=7v8oQn5uyk8");

  return (
    <>
      <YoutubeBackground
        className={classes.youtubeBackground}
        videoId={"7v8oQn5uyk8"}
        overlay="rgba(0,0,0,.4)"
      >
        <ContentMain />
      </YoutubeBackground>
      <ContentWrapper />
      <Grossmeisters />
      <Review />
      {/* <Tariffs /> */}
      {/* <MainLayout>{renderRoutes(routes)}</MainLayout> */}
    </>
  );
};

export default MainPage;
