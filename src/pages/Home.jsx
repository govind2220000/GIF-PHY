import React, { useEffect } from "react";
import { Gifstate } from "../context/gif-context.jsx";
import Gif from "../components/Gif.jsx";
import FilterGif from "../components/FilterGif.jsx";

const Home = () => {
  const { gf, filter, gifs, setGifs } = Gifstate();
  //console.log(gf);

  const fetchTrendingGifs = async () => {
    const { data: gifs } = await gf.trending({
      limit: 20,
      type: filter,
      rating: "g",
    });
    setGifs(gifs);
  };

  useEffect(() => {
    fetchTrendingGifs();
    //console.log(data);
  }, [filter]);

  return (
    <div>
      <img
        src="/banner.gif"
        alt="earth banner"
        className="mt-2 rounded w-full"
      ></img>

      <FilterGif showTrending={true}></FilterGif>
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
        {gifs.map((gif) => {
          return <Gif gif={gif} key={gif.id}></Gif>;
        })}
      </div>
    </div>
  );
};

export default Home;
