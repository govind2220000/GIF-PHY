// import React from "react";

// const Favourites = () => {
//   return <div>Favourites</div>;
// };

// export default Favourites;

import { useEffect, useState } from "react";
import Gif from "../components/Gif.jsx";
import { Gifstate } from "../context/gif-context.jsx";
import { Navigate } from "react-router-dom";

const Favourites = ({ user }) => {
  const { gf, favourites } = Gifstate();
  const [favoriteGIFs, setFavoriteGIFs] = useState([]);

  const fetchFavoriteGIFs = async () => {
    const { data: gifs } = await gf.gifs(favourites);
    setFavoriteGIFs(gifs);
  };

  useEffect(() => {
    fetchFavoriteGIFs();
  }, []);
  if (!user) {
    return <Navigate to="/login"></Navigate>;
  }
  return (
    <div className="mt-2">
      <span className="faded-text ">My Favorites</span>
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2 mt-2">
        {favoriteGIFs.map((gif) => (
          <Gif gif={gif} key={gif.id} />
        ))}
      </div>
    </div>
  );
};

export default Favourites;
