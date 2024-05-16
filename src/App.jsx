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
import { useEffect, useState } from "react";
import Register from "./pages/Register.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import { auth } from "./firebase/firebase.js";

export default function App() {
  //const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [user, setUser] = useState(null);
  const [isfetching, setIsFetching] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsFetching(false);
        return;
      }
      setUser(null);
    });
    return () => unsubscribe();
  });

  const router = createBrowserRouter([
    {
      element: <AppLayout user={user}></AppLayout>,

      children: [
        {
          path: "/",
          element: <Home />,
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
          element: (
            <ProtectedRoute user={user}>
              <Favourites user={user}></Favourites>
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  if (isfetching) {
    return <h2>Loading....</h2>;
  }
  return (
    <GifProvider>
      <RouterProvider router={router}></RouterProvider>
    </GifProvider>
  );
}
