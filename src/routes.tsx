import { createBrowserRouter } from "react-router-dom";
import RouterLayout from "./common/components/router-layout";
import IndexPage from "./pages/index";
import LoginPage from "./pages/login";
import NewProjectPage from "./pages/new";
import ProfilePage from "./pages/profile";
import ProjectDetail from "./pages/project-detail";
import RegistPage from "./pages/regist";

export const routes: Parameters<typeof createBrowserRouter>[0] = [
  {
    path: "/",
    element: <RouterLayout />,
    children: [
      {
        path: "",
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
      {
        path: "/:username/profile",
        element: <ProfilePage />,
      },
      {
        path: "/:username/:projectName",
        element: <ProjectDetail />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
