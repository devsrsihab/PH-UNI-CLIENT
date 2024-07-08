import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { routeGenerator } from "../utils/routeGenerator";
import { adminPaths } from "./admin.route";
import { facultyPaths } from "./faculty.route";
import { studentPaths } from "./student.route";
import Login from "../pages/auth/Login";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  {
    path: "/admin",
    element: <App />,
    children: routeGenerator(adminPaths),
  },
  {
    path: "/faculty",
    element: <App />,
    children: routeGenerator(facultyPaths),
  },
  {
    path: "/student",
    element: <App />,
    children: routeGenerator(studentPaths),
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
]);

export default router;
