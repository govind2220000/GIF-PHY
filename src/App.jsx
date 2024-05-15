//homepage
//categories
//search
//single gif
//favourites

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Category from "./pages/Category.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import GifPage from "./pages/GifPage.jsx";
import Favourites from "./pages/Favourites.jsx";
import AppLayout from "./layout/AppLayout.jsx";
import Home from "./pages/Home.jsx";
import GifProvider from "./context/gif-context.jsx";
import Login from "./pages/Login.jsx";
import { useState } from "react";
import Register from "./pages/Register.jsx";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const router = createBrowserRouter([
    {
      element: <AppLayout></AppLayout>,

      children: [
        {
          path: "/",
          element: isLoggedIn ? <Home /> : <Navigate to="/login" />,
        },
        {
          path: "/:category",
          element: <Category></Category>,
        },
        {
          path: "/login",
          element: <Login></Login>,
        },
        {
          path: "/register",
          element: <Register></Register>,
        },
        {
          path: "/search/:query",
          element: <SearchPage></SearchPage>,
        },
        {
          path: "/:type/:slug",
          element: <GifPage></GifPage>,
        },
        {
          path: "/favourites",
          element: <Favourites></Favourites>,
        },
      ],
    },
  ]);
  return (
    <GifProvider>
      <RouterProvider router={router}></RouterProvider>
    </GifProvider>
  );
}
