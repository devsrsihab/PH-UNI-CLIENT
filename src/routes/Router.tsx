import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { routeGenerator } from "../utils/routeGenerator";
import { adminPaths } from "./admin.route";
import { facultyPaths } from "./faculty.route";
import { studentPaths } from "./student.route";
import Login from "../pages/auth/Login";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import PasswordChange from "../pages/auth/PasswordChange";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <App />
      </ProtectedRoute>
    ),
    children: routeGenerator(adminPaths),
  },
  {
    path: "/faculty",
    element: (
      <ProtectedRoute role="faculty">
        <App />
      </ProtectedRoute>
    ),
    children: routeGenerator(facultyPaths),
  },
  {
    path: "/student",
    element: (
      <ProtectedRoute role="student">
        <App />
      </ProtectedRoute>
    ),
    children: routeGenerator(studentPaths),
  },
  {
    path: "/auth/change-password",
    element: <PasswordChange />,
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
]);

export default router;
