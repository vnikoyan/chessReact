import React, { useRef, useEffect } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import DashboardLayout from "components/Layouts/DashboardLayout";
import MainLayout from "components/Layouts/MainLayout";
import RegisterView from "containers/Landing/RegisterView";
import MainPage from "containers/Landing/MainPage";
import { useSelector } from "react-redux";
import { Api } from "api";
import { store } from "store";
import { useAction } from "utils/hooks";
import { useLocation } from "react-router-dom";
import { state } from "modules/student/actions";
import { state as coachState } from "modules/coach/actions";
import { profile as myProfile } from "modules/me/actions";
import { notifications, subscribe } from "modules/me/actions";

import AccountView from "containers/General/AccountView";
import SettingsView from "containers/General/SettingsView";
import ChatView from "containers/General/ChatView";
import AwardsView from "containers/General/AwardsView";
import UpdatesView from "containers/General/UpdatesView";
import StaticPage from "containers/General/StaticPage";
import AgainstComputer from "containers/Landing/AgainstComputer";
import AgainstPlayer from "containers/Landing/AgainstPlayer";
import AgainstFriend from "containers/Landing/AgainstFriend";
import AgainstRoom from "containers/Landing/AgainstRoom";
import Lobby from "containers/Landing/Lobby";

// Coach's Cabinet
import Coach from "containers/Coach";
import CoachCabinet from "containers/Coach/Cabinet";
import CoachStudents from "containers/Coach/Students";
import CoachProblems from "containers/Coach/Problems";
import CoachProblemCategories from "containers/Coach/Problems/Categories";
import CoachStudentsGroups from "containers/Coach/Students/Groups";
import CoachStudentsStatistics from "containers/Coach/Students/Statistics";
import CoachAddProblem from "containers/Coach/Problems/Add";
import CoachUploadProblems from "containers/Coach/Problems/Upload";
import CoachEditProblem from "containers/Coach/Problems/Edit";
import CoachTrainings from "containers/Coach/Trainings";
import CoachAddTraining from "containers/Coach/Trainings/Add";
import CoachEditTraining from "containers/Coach/Trainings/Edit";
import CoachStatisticsTraining from "containers/Coach/Trainings/Statistics";
import PlayTraining from "containers/Coach/Trainings/Play";
import TrainingProblems from "containers/Coach/Trainings/Problems";

// Student's dashboard
import Student from "containers/Student";
import StudentDashboard from "containers/Student/Dashboard";
import StudentTrainings from "containers/Student/Trainings";
import StudentProblems from "containers/Student/Problems";
import StudentPlayProblems from "containers/Student/Problems/Play";
import StudentSelfLearn from "containers/Student/Self";
import StudentCollider from "containers/Student/Accelerator";

export const Routes = () => {
  const { user } = useSelector((state) => state.auth);
  const isTokenWatcherSet = useRef(false);
  const clearStudentState = useAction(state.clear);
  const clearCoachState = useAction(coachState.clear);
  const location = useLocation();
  const getMyProfile = useAction(myProfile.request);
  const getNotifications = useAction(notifications.request);
  const subscribeTo = useAction(subscribe.request);

  useEffect(() => {
    clearCoachState();
    clearStudentState();
  }, [location]);

  if (user) {
    if (!isTokenWatcherSet.current) {
      Api.setAuthToken(user.api_token);
      Api.watchTokenExpire(store);
      isTokenWatcherSet.current = true;
    }
  } else {
    Api.clearAuthToken();
  }

  const isLoggedIn = Object.keys(user).length !== 0;

  useEffect(() => {
    if (isLoggedIn) {
      getMyProfile(user.id);
      getNotifications();
      subscribeTo();
    }
  }, [isLoggedIn]);

  const routesList = [
    {
      path: "",
      loggedIn: false,
      element: <MainLayout />,
      children: [
        { path: "/register", element: <RegisterView /> },
        { path: "/refer/:refer", element: <RegisterView /> },
        { path: "/play", element: <Lobby /> },
        { path: "/play/lobby", element: <Lobby /> },
        { path: "/page/:path", element: <StaticPage /> },
        { path: "/problems", element: <StudentSelfLearn /> },
        { path: "/play/computer", element: <AgainstComputer /> },
        { path: "/play/game", element: <AgainstPlayer /> },
        { path: "/play/room/:token", element: <AgainstRoom /> },
        { path: "/play/match/:token", element: <AgainstFriend /> },
        { path: "/", element: <MainPage /> },
        { path: "*", element: <Navigate to="/" /> },
        { path: "/*", element: <Navigate to="/" /> },
      ],
    },
    {
      path: "/",
      loggedIn: true,
      element: <MainLayout />,
      children: [
        { path: "/problems", element: <StudentSelfLearn /> },
        { path: "/page/:path", element: <StaticPage /> },
        { path: "/", element: <MainPage /> },
        { path: "*", element: <Navigate to="/" /> },
        { path: "/*", element: <Navigate to="/" /> },
      ],
    },
    {
      path: "/",
      loggedIn: true,
      element: <DashboardLayout />,
      children: [
        { path: "/play/computer", element: <AgainstComputer /> },
        { path: "/play/game", element: <AgainstPlayer /> },
        { path: "/play/room/:token", element: <AgainstRoom /> },
        { path: "/play/match/:token", element: <AgainstFriend /> },
        { path: "/play/lobby", element: <Lobby /> },
        { path: "/play", element: <Lobby /> },
        { path: "/play/*", element: <Navigate to="/play" /> },
        { path: "/profile", element: <AccountView /> },
        { path: "/profile/settings", element: <SettingsView /> },
        { path: "/chat", element: <ChatView /> },
        { path: "/awards", element: <AwardsView /> },
        { path: "/updates", element: <UpdatesView /> },
        { path: "/awards/:username", element: <AwardsView /> },
        { path: "/page/:path", element: <StaticPage /> },
        // COACH CABINET
        {
          path: "/coach",
          element: <Coach />,
          children: [
            { path: "/cabinet", element: <CoachCabinet /> },
            { path: "/trainings", element: <CoachTrainings /> },
            {
              path: "/problems/categories",
              element: <CoachProblemCategories />,
            },
            {
              path: "/problems/upload",
              element: <CoachUploadProblems />,
            },
            {
              path: "/problems/add",
              element: <CoachAddProblem />,
            },
            {
              path: "/trainings/add",
              element: <CoachAddTraining />,
            },
            {
              path: "/trainings/play/",
              element: <Navigate to="/coach/trainings" />,
            },
            { path: "/trainings/play/:id", element: <PlayTraining /> },
            {
              path: "/trainings/problems/",
              element: <Navigate to="/coach/trainings" />,
            },
            {
              path: "/trainings/problems/:id",
              element: <TrainingProblems />,
            },
            {
              path: "/trainings/:id",
              element: <CoachEditTraining />,
            },
            {
              path: "/trainings/statistics/:id",
              element: <CoachStatisticsTraining />,
            },
            {
              path: "/trainings/statistics/",
              element: <Navigate to="/coach/trainings" />,
            },
            {
              path: "/problems/play",
              element: <Navigate to="/coach/problems" />,
            },
            {
              path: "/problems/play/:id",
              element: <StudentPlayProblems />,
            },
            { path: "/students", element: <CoachStudents /> },
            {
              path: "/students/groups",
              element: <CoachStudentsGroups />,
            },
            {
              path: "/students/statistics",
              element: <CoachStudentsStatistics />,
            },
            { path: "/students/:username", element: <AccountView /> },
            { path: "/problems", element: <CoachProblems /> },
            { path: "/problems/:id", element: <CoachEditProblem /> },
            { path: "/*", element: <Navigate to="/coach/cabinet" /> },
            { path: "/", element: <Navigate to="/coach/cabinet" /> },
          ],
        },
        // STUDENT DASHBOARD
        {
          path: "/student",
          element: <Student />,
          children: [
            { path: "/dashboard", element: <StudentDashboard /> },
            { path: "/trainings", element: <StudentTrainings /> },
            { path: "/problems", element: <StudentProblems /> },
            { path: "/self", element: <StudentSelfLearn /> },
            { path: "/accelerator", element: <StudentCollider /> },
            {
              path: "/trainings/play/",
              element: <Navigate to="/student/trainings" />,
            },
            { path: "/trainings/play/:id", element: <PlayTraining /> },
            {
              path: "/trainings/problems/",
              element: <Navigate to="/student/trainings" />,
            },
            {
              path: "/trainings/problems/:id",
              element: <TrainingProblems />,
            },
            {
              path: "/problems/play",
              element: <Navigate to="/student/problems" />,
            },
            {
              path: "/problems/play/:id",
              element: <StudentPlayProblems />,
            },
            { path: "/*", element: <Navigate to="/student/dashboard" /> },
            { path: "/", element: <Navigate to="/student/dashboard" /> },
          ],
        },
        { path: "*", element: <Navigate to="/" /> },
        { path: "/", element: <Navigate to="/" /> },
      ],
    },
  ];

  const renderedRoutes = routesList.filter(
    ({ loggedIn }) => isLoggedIn === loggedIn
  );

  const routing = useRoutes(renderedRoutes);

  return <>{routing}</>;
};

export default Routes;
