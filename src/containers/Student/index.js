import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAction } from "utils/hooks";
import Loading from "components/Loading";
import { categories, problems } from "modules/student/actions";

const Student = () => {
  const getPublicProblems = useAction(problems.request);
  const getCategories = useAction(categories.request);
  const { loading } = useSelector((state) => state.student);

  useEffect(() => {
    getCategories();
    getPublicProblems({ page: 1 });
  }, [getCategories, getPublicProblems]);

  return <>{loading ? <Loading /> : <Outlet />}</>;
};

export default Student;
