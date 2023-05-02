import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardHeader,
  Divider,
  CardContent,
  Grid,
  Typography,
  Button,
  NativeSelect,
  MenuItem,
  TextField,
  Box,
} from "@material-ui/core";
import Page from "components/Page";
import { useAction } from "utils/hooks";
import { problems, categories } from "modules/coach/actions";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import BootstrapInput from "components/Forms/BootstrapInput";
import { useNavigate } from "react-router-dom";
import Chess from "chess.js";

const pgnParser = require("pgn-parser");

const UploadProblems = () => {
  const { t } = useTranslation();
  const getCategories = useAction(categories.request);
  const insertProblems = useAction(problems.insert);
  const [files, setFiles] = useState([]);
  const [category, setCategory] = useState(0);
  const [level, setLevel] = useState(1);
  const { categoriesList, categoriesLoading } = useSelector(
    (state) => state.coach
  );
  const { difficulty } = useSelector((state) => state.common);
  const navigate = useNavigate();

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const uploadFiles = async () => {
    const array = [];
    await files.forEach(async (file, fileIndex) => {
      let fileReader = new FileReader();
      fileReader.onloadend = async () => {
        const content = fileReader.result;
        const [result] = pgnParser.parse(content);
        const fenKey = result.headers.find((value) => value.name === "FEN");
        const fen = fenKey
          ? fenKey.value
          : "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 1";
        const moveCount = result.headers.find(
          (value) => value.name === "PlyCount"
        ).value;
        const chess = new Chess(fen);
        const turn = chess.turn();
        const problemItem = {
          solution: JSON.stringify(result.moves.map((item) => item.move)),
          solutions: JSON.stringify([]),
          categoryId: category,
          colorOfUser: turn === "w" ? "white" : "black",
          description: "",
          fen: fen,
          level: level,
          title: "",
          moveCount: moveCount,
          priceComplete: 13,
          priceMistake: 9,
        };
        await array.push(problemItem);
        if (fileIndex === files.length - 1) {
          insertProblems(array);
          navigate("/coach/problems");
        }
      };
      await fileReader.readAsText(file);
      // await console.log('problemItems', problemItems)
    });
  };

  return (
    <>
      <Page title={t("coach.problems.upload.upload_problems")}>
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid item container spacing={3}>
              <Grid item lg={12} md={12} xs={12}>
                <Card>
                  <CardHeader
                    title={`${t(
                      "coach.problems.upload.upload_problems"
                    )} (PGN)`}
                    subheaderTypographyProps={{ style: { fontSize: 14 } }}
                  />
                  <Divider />
                  <CardContent>
                    <Grid container spacing={3} direction="column">
                      <Grid xs={12} item container spacing={2}>
                        <Grid item xs={12}>
                          <Typography
                            color="textPrimary"
                            gutterBottom
                            variant="body1"
                          >
                            {t(
                              "coach.problems.upload.upload_problems_description"
                            )}
                          </Typography>
                          <Divider />
                        </Grid>
                        <Grid container item>
                          <Grid item xs={12}>
                            <Typography
                              color="textPrimary"
                              gutterBottom
                              variant="body1"
                            >
                              {t("coach.problems.upload.files_with_pgn")}
                            </Typography>
                          </Grid>
                          <Grid item container xs={12}>
                            <Button
                              color="primary"
                              variant={files.length ? "contained" : "outlined"}
                              component="label"
                            >
                              {t("coach.problems.upload.upload_files")}
                              <input
                                type="file"
                                accept=".pgn"
                                onChange={(event) =>
                                  setFiles([...event.target.files])
                                }
                                multiple
                                hidden
                              />
                            </Button>
                            <Grid item>
                              <Box ml={2}>
                                <TextField
                                  multiline
                                  fullWidth
                                  value={files.map((file) => file.name)}
                                  size="small"
                                  label={t("coach.problems.upload.files")}
                                  variant="outlined"
                                />
                              </Box>
                            </Grid>
                          </Grid>
                          <Grid item md={12}>
                            <Typography
                              color="textPrimary"
                              gutterBottom
                              variant="body2"
                            >
                              {t("coach.problems.upload.files_description")}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container item direction="column">
                          <Grid item>
                            <Typography gutterBottom variant="body1">
                              {t("coach.problems.upload.category")}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <NativeSelect
                              value={category}
                              onChange={(event) =>
                                setCategory(event.target.value)
                              }
                              variant="outlined"
                              name="category"
                              input={<BootstrapInput />}
                              inputProps={{
                                id: "name-native-error",
                              }}
                            >
                              <option value={0} disabled>
                                {t("coach.problems.upload.select_category")}
                              </option>
                              {categoriesLoading &&
                              categoriesList.length === 0 ? (
                                <option>
                                  {t("coach.trainings.add_edit.loading")}
                                </option>
                              ) : (
                                categoriesList.map((category, index) => (
                                  <React.Fragment key={index}>
                                    <option
                                      key={category.category.id}
                                      value={category.category.id}
                                    >
                                      {category.category.name} (
                                      {category.category.tasks})
                                    </option>
                                    {category.subcategories.map(
                                      (subCategory) => (
                                        <option
                                          key={subCategory.id}
                                          value={subCategory.id}
                                        >
                                          {/* <option key={subCategory.id} value={subCategory.id} disabled={!Boolean(subCategory.tasks)}> */}
                                          {subCategory.name} (
                                          {subCategory.tasks})
                                        </option>
                                      )
                                    )}
                                  </React.Fragment>
                                ))
                              )}
                            </NativeSelect>
                          </Grid>
                          <Grid item md={12}>
                            <Typography
                              color="textPrimary"
                              gutterBottom
                              variant="body2"
                            >
                              {t("coach.problems.upload.category_description")}:
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container item direction="column">
                          <Grid item>
                            <Typography gutterBottom variant="body1">
                              {t("coach.problems.upload.difficulty_level")}:
                            </Typography>
                          </Grid>
                          <Grid item>
                            <TextField
                              select
                              name="level"
                              value={level}
                              onChange={(event) => setLevel(event.target.value)}
                              variant="outlined"
                            >
                              {difficulty.map((option) => (
                                <MenuItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Grid>
                          <Grid item md={12}>
                            <Typography
                              color="textPrimary"
                              gutterBottom
                              variant="body2"
                            >
                              {t(
                                "coach.problems.upload.difficulty_level_description"
                              )}
                              :
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          disabled={!category || !files.length}
                          variant="contained"
                          component="label"
                          color="primary"
                          onClick={uploadFiles}
                        >
                          Upload
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Page>
    </>
  );
};

export default UploadProblems;
