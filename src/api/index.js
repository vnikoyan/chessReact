import axios from "axios";

import { API_SERVER_URL } from "configs";

import { refreshTokenIfNeeded } from "./tokenRefresh";
import cookies from "js-cookie";

const multipartConfig = { headers: { "Content-Type": "multipart/form-data" } };

const axiosInstance = axios.create({
  baseURL: API_SERVER_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "client-language": cookies.get("i18next") || "en",
  },
});

export const Api = {
  /** -- AUTH -- */
  setAuthToken: (token) => {
    axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
  },

  watchTokenExpire: (myStore) => {
    axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => refreshTokenIfNeeded(error, myStore)
    );
  },

  clearAuthToken: () => {
    axiosInstance.defaults.headers.Authorization = null;
  },

  subscribe: () => {
    return axiosInstance.get("queue/subscribe");
  },

  /** COMMON LISTS */

  getCountriesList: () => {
    return axiosInstance.get("getCountries");
  },

  getCitiesList: (data) => {
    return axiosInstance.get(`getCities`, { params: { ...data } });
  },

  getAlerts: () => {
    return axiosInstance.get(`getAlerts`);
  },

  /** -- AUTH -- */

  register: (data) => {
    return axiosInstance.post("sign-up", data);
  },

  login: (data) => {
    return axiosInstance.post("sign-in", data);
  },

  /** -- RECOVERY -- */

  findEmail: (email) => {
    return axiosInstance.post("recovery/find", email);
  },

  checkCode: (email) => {
    return axiosInstance.post("recovery/check", email);
  },

  setNewPassword: (email) => {
    return axiosInstance.post("recovery/setPassword", email);
  },

  /** -- ACCOUNT -- */

  getUserProfile: (data) => {
    return axiosInstance.get(`findUser`, { params: data });
  },

  getUserAwards: (data) => {
    return axiosInstance.get(`awards`, { params: data });
  },

  /** -- NOTIFICATION -- */

  getNotifications: () => {
    return axiosInstance.get(`notifications/list`);
  },

  deleteNotification: (notificationID) => {
    return axiosInstance.delete("notifications/delete", {
      data: { id: notificationID },
    });
  },

  sendActionNotification: (actionUrl) => {
    return axiosInstance.post(actionUrl);
  },

  viewedNotification: (notificationID) => {
    return axiosInstance.post("notifications/viewed", notificationID);
  },

  /** -- SETTINGS -- */

  setGeneral: (data) => {
    return axiosInstance.post("settings/changeInfo", data);
  },

  setAvatar: (data) => {
    return axiosInstance.post("settings/changePhoto", data, multipartConfig);
  },

  setAdditional: (data) => {
    return axiosInstance.post("settings/changeInfoAdditional", data);
  },

  setPassword: (data) => {
    return axiosInstance.post("settings/changePassword", data);
  },

  /** -- CHAT -- */

  getDialogList: (data) => {
    return axiosInstance.get("dialogs", { params: data });
  },

  getMessages: (data) => {
    return axiosInstance.get(`getMessages`, { params: data });
  },

  sendMessage: (data) => {
    return axiosInstance.post("send", data);
  },

  /** -- GAME -- */

  createMatchroom: (data) => {
    return axiosInstance.post("matchroom/create", data);
  },

  joinMatchroom: (data) => {
    return axiosInstance.post("matchroom/join", data);
  },

  createRoom: (data) => {
    return axiosInstance.post("room/create", data);
  },

  joinRoom: (data) => {
    return axiosInstance.post("room/join", data);
  },

  getRoomList: (data) => {
    return axiosInstance.post("room/list", data);
  },

  getMyMatch: (data) => {
    return axiosInstance.get("match/myMatch", { params: data });
  },

  joinMatch: (data) => {
    return axiosInstance.post(`match/join`, data);
  },

  setMove: (data) => {
    return axiosInstance.post("match/move", data);
  },

  lose: (data) => {
    return axiosInstance.post("match/lose", data);
  },

  win: (data) => {
    return axiosInstance.post("match/win", data);
  },

  /** -- STATIC PAGES -- */

  getPagesList: (data) => {
    return axiosInstance.get("pages/list", { params: { orientation: data } });
  },

  getPageView: (data) => {
    return axiosInstance.get(`pages/view`, { params: data });
  },

  /** -- COACH -- */

  /** -- STUDENT -- */

  getStudents: ({ page }) => {
    return axiosInstance.get("students/list", {
      params: { page: page },
    });
  },

  getStudentsStatistics: (data) => {
    return axiosInstance.post("students/statistic/filter", data);
  },

  getAllStudents: () => {
    return axiosInstance.get("students/list/all");
  },

  getStudentsActivity: () => {
    return axiosInstance.get("students/activity");
  },

  addStudent: (data) => {
    return axiosInstance.post("students/add", data);
  },

  deleteStudent: (studentsID) => {
    return axiosInstance.delete("students/out", {
      data: { id: studentsID },
    });
  },

  setStudentsGroup: (data) => {
    return axiosInstance.post("coach/student/edit/group", data);
  },

  /** -- CATEGORIES -- */

  getCategories: () => {
    return axiosInstance.get("coach/getCategories");
  },

  getCategoriesData: (categoriesIds) => {
    return axiosInstance.post("coach/getCategoriesData", categoriesIds);
  },

  importCategories: (data) => {
    return axiosInstance.post("coach/importCategories", data);
  },

  getPublicCategories: () => {
    return axiosInstance.get("coach/getPublicCategories");
  },

  createCategory: (data) => {
    return axiosInstance.post("coach/createCategory", data);
  },

  deleteCategory: (categoryID) => {
    return axiosInstance.delete("coach/removeCategory", {
      data: { id: categoryID },
    });
  },

  editCategory: (data) => {
    return axiosInstance.post("coach/updateCategory", data);
  },

  /** -- CATEGORIES -- */

  getGroups: () => {
    return axiosInstance.post("coach/get/students/group");
  },

  createGroup: (data) => {
    return axiosInstance.post("coach/create/students/group", data);
  },

  editGroup: (data) => {
    return axiosInstance.post("coach/update/group/name", data);
  },

  deleteGroup: (groupID) => {
    return axiosInstance.post("coach/delete/group", groupID);
  },

  /** -- PROBLEMS -- */

  getProblems: (params) => {
    return axiosInstance.get("problems/list", { params: params });
  },

  getProblemData: (problemID) => {
    return axiosInstance.get("problems/get", { params: problemID });
  },

  createProblem: (data) => {
    return axiosInstance.post("problems/create", data);
  },

  insertProblems: (data) => {
    return axiosInstance.post("problems/insert", data);
  },

  deleteProblem: (problemID) => {
    return axiosInstance.delete("problems/delete", {
      data: { id: problemID },
    });
  },

  setFavoriteProblem: (problemID) => {
    return axiosInstance.post("coach/favorite/problem", {
      problem_id: problemID,
    });
  },

  setSolvedProblem: (data) => {
    return axiosInstance.post("problem/solved", data);
  },

  setStartProblem: (data) => {
    return axiosInstance.post("problem/start", data);
  },

  setEndProblem: (data) => {
    return axiosInstance.post("problem/end", data);
  },

  setFailedProblem: (data) => {
    return axiosInstance.post("problem/failed", data);
  },

  editProblem: (data) => {
    return axiosInstance.post("problems/update", data);
  },

  /** -- TRAININGS -- */

  getTrainings: ({ page }) => {
    return axiosInstance.get("trainings/list", {
      params: { page: page },
    });
  },

  getLastTrainings: () => {
    return axiosInstance.get("coach/getLastFiveTrainings");
  },

  getTrainingData: (trainingID) => {
    return axiosInstance.get("trainings/view", { params: trainingID });
  },

  getTrainingStatistics: (trainingID) => {
    return axiosInstance.get("trainings/statistics", { params: trainingID });
  },

  createTraining: (data) => {
    return axiosInstance.post("trainings/create", data);
  },

  deleteTraining: (TrainingID) => {
    return axiosInstance.delete("trainings/delete", {
      data: { id: TrainingID },
    });
  },

  editTraining: (data) => {
    return axiosInstance.post("trainings/update", data);
  },

  /** -- STUDENT -- */

  getStudentTrainings: ({ page }) => {
    return axiosInstance.get("students/trainings/list", {
      params: { page: page },
    });
  },

  getStudentTrainingData: (trainingID) => {
    return axiosInstance.get("students/trainings/view", { params: trainingID });
  },

  getStudentTrainingsProblemData: (problemID) => {
    return axiosInstance.get("students/trainings/problems", {
      params: problemID,
    });
  },

  getPublicProblems: ({ page, level, moves }) => {
    return axiosInstance.get("students/sprint/problems", {
      params: { page: page, level: level, moves: moves },
    });
  },

  getSelfProblems: (categories) => {
    return axiosInstance.get("students/self/problems", {
      params: { categories: categories },
    });
  },

  getRandomProblems: () => {
    return axiosInstance.get("problem/random");
  },

  getAcceleratorProblems: (data) => {
    return axiosInstance.post("problem/accelerator", data);
  },

  getSelfCategories: () => {
    return axiosInstance.get("students/self/categories");
  },
};
