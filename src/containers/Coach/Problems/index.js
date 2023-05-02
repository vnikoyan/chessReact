import React, { useState, useEffect } from "react";
import { Container, Grid } from "@material-ui/core";
import Page from "components/Page";
import ProblemsList from "./Items/ProblemsList";
import ProblemsFilter from "./Items/ProblemsFilter";
import { useTranslation } from "react-i18next";
import { useAction } from "utils/hooks";
import { problems } from "modules/coach/actions";

const CoachProblems = () => {
  const [category, setCategory] = useState([]);
  const [complexity, setComplexity] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const [problemId, setproblemId] = useState();
  const [page, setPage] = useState(0);
  const { t } = useTranslation();
  const getProblems = useAction(problems.request);

  useEffect(() => {
    const levels = complexity.map((item) => +item.value);
    const categories = category.map((item) => item.id);
    getProblems({ page: page + 1, levels, categories, favorite });
  }, [complexity, category, favorite, page]);

  const handleSearchByID = () => {
    getProblems({ page: page + 1, problemId });
  };

  return (
    <>
      <Page title={t("coach.problems.my_problems")}>
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid item container spacing={3}>
              <Grid item lg={8} md={12} xs={12}>
                <ProblemsList page={page} setPage={setPage} />
              </Grid>
              <Grid item lg={4} md={12} xs={12}>
                <ProblemsFilter
                  category={category}
                  setCategory={setCategory}
                  complexity={complexity}
                  setComplexity={setComplexity}
                  favorite={favorite}
                  setFavorite={setFavorite}
                  problemId={problemId}
                  setproblemId={setproblemId}
                  handleSearchByID={handleSearchByID}
                />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Page>
    </>
  );
};

export default CoachProblems;
