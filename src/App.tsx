import { RouterProvider } from "react-router-dom";
import router from "./routes";
import RouterLayout from "./common/components/router-layout";

import "./App.css";

function App() {
  return (
    <RouterLayout>
      <RouterProvider router={router} />
    </RouterLayout>
  );
}

export default App;
