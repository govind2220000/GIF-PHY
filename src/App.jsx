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

const router = createBrowserRouter([
  {
    element: <AppLayout></AppLayout>,

    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/:category",
        element: <Category></Category>,
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

export default function App() {
  return (
    <GifProvider>
      <RouterProvider router={router}></RouterProvider>
    </GifProvider>
  );
}
