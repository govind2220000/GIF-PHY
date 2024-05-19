//homepage
//categories
//search
//single gif
//favourites

import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
  console.log(isfetching);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        setUser(user);
        setIsFetching(false);
        console.log("user Exists");
        return;
      }
      setIsFetching(false);
      setUser(null);
    });
    return () => {
      console.log("Checking for mounting/unmounting");
      unsubscribe();
    };
  });

  const router = createBrowserRouter([
    {
      element: <AppLayout user={user}></AppLayout>,

      children: [
        {
          path: "/",
          element: user ? <Home /> : <Login></Login>,
        },
        {
          path: "/:category",
          element: (
            <ProtectedRoute user={user}>
              <Category></Category>
            </ProtectedRoute>
          ),
        },
        {
          path: "/login",
          element: user ? <Home /> : <Login></Login>,
        },
        {
          path: "/register",
          element: user ? <Home /> : <Register></Register>,
        },
        {
          path: "/search/:query",
          element: (
            <ProtectedRoute user={user}>
              <SearchPage></SearchPage>
            </ProtectedRoute>
          ),
        },
        {
          path: "/:type/:slug",
          element: (
            <ProtectedRoute user={user}>
              <GifPage></GifPage>
            </ProtectedRoute>
          ),
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
  console.log("Useeffect test");
  if (isfetching) {
    return <h2>Loading....</h2>;
  }
  return (
    <GifProvider>
      <RouterProvider router={router}>
        {user ? <AppLayout user={user} /> : <Login></Login>}
      </RouterProvider>
    </GifProvider>
  );
}
