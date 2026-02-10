import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./Component/Dashboard";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import { ToastContainer } from "react-toastify";
const DefultRouter = () => {
  const data = JSON.parse(localStorage.getItem("blog_rdata"));
  if (data) {
    <Navigate to="/login" replace />;
  } else {
    <Navigate to="/register" replace />;
  }
};
function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <DefultRouter />,
    },
    {
      path: "/register",
      element: <Register></Register>,
    },
    {
      path: "/login",
      element: <Login></Login>,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
  ]);

  return (
    <>
      return <RouterProvider router={route} />
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHoverr
        theme="light"
      ></ToastContainer>
    </>
  );
}

export default App;
