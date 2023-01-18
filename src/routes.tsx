import { createBrowserRouter } from "react-router-dom";
import IndexPage from "./pages/index";
import LoginPage from "./pages/login";
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
];

const router = createBrowserRouter(routes);

export default router;
