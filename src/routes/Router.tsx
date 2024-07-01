import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Profile from "../pages/Profile";
import Contact from "../pages/Contact";
import About from "../pages/About";
import CreateStudent from "../pages/admin/CreateStudent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "contact", 
        element: <Contact/>
      }, 
      {
        path: "about",
        element: <About/>
      }
    ],
  },
  {
    path: '/admin',
    element: <App/>, 
    children: [{
        path: 'create-student',
        element: <CreateStudent/>
    }]
  }
]);
export default router;
