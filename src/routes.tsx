import { createBrowserRouter } from "react-router-dom";
import IndexPage from "./pages/index";
import LoginPage from "./pages/login";
import NewProjectPage from "./pages/new";
import RegistPage from "./pages/regist";

export const routes = [
  {
    path: "/",
    element: <IndexPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/regist",
    element: <RegistPage />,
  },
  {
    path: "/new",
    element: <NewProjectPage />,
  },
];

const router = createBrowserRouter(routes);

export default router;
