import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Admin from "../Layout/Admin";
import Dashboard from "../Admin/Dashboard";
import AddCategory from "../Admin/AddCategory";
import QuestionsList from "../Admin/QuestionsList";
import AddQuestion from "../Admin/AddQuestion";
import EditCategory from "../Admin/EditCategory";
import EditQuestion from "../Admin/EditQuestion";
import Home from "../Pages/Home";
import Registration from "../Pages/Registration";
import Login from "../Pages/Login";
import Quiz from "../Pages/Quiz";
import Result from "../Pages/Result";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "register",
        Component: Registration,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "quiz/:categoryId",
        Component: Quiz,
      },
      {
        path: "result",
        Component: Result,
      },
    ],
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        index: true,
        Component: Dashboard,
      },
      {
        path: "add-category",
        Component: AddCategory,
      },
      {
        path: "questions/:id",
        Component: QuestionsList,
      },
      {
        path: "add-question/:id",
        Component: AddQuestion,
      },
      {
        path: "edit-category/:id",
        Component: EditCategory,
      },
      {
        path: "edit-question/:categoryId/:questionId",
        Component: EditQuestion,
      },
    ],
  },
]);
export default router;
