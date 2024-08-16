import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "@/pages/SignUp";
import PageLayout from "@/layout/PageLayout";
import Login from "@/pages/Login";
import ProtectedRoute from "@/layout/ProtectedRoute";
import Home from "@/pages/Home";

function App() {
  // Define route configurations
  const routes = [
    { path: "/", element: <Home />, authentication: true },
    { path: "/sign-up", element: <SignUp />, authentication: false },
    { path: "/login", element: <Login />, authentication: false },
  ];

  // Create router with protected routes
  const router = createBrowserRouter(
    routes.map(({ path, element, authentication }) => ({
      path,
      element: (
        <ProtectedRoute authentication={authentication}>
          {element}
        </ProtectedRoute>
      ),
    })),
  );

  return (
    <PageLayout>
      <RouterProvider router={router} />
    </PageLayout>
  );
}

export default App;
