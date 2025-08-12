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
import ForgotPassword from "../Pages/ForgotPassword";
import PrivateRoute from "../provider/PrivateRoute";
import PublicRoute from "../provider/PublicRoute";
import AdminRoute from "../provider/AdminRoute";
import NotFound from "../Pages/NotFound";

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
        element: (
          <PublicRoute>
            <Registration />
          </PublicRoute>
        ),
      },
      {
        path: "login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: "forgot-password",
        element: (
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        ),
      },
      {
        path: "quiz/:categoryId",
        element: (
          <PrivateRoute>
            <Quiz />
          </PrivateRoute>
        ),
      },
      {
        path: "result/:categoryId",
        element: (
          <PrivateRoute>
            <Result />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <Admin />
      </AdminRoute>
    ),
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
  {
    path: "*",
    Component: NotFound,
  },
]);
export default router;
