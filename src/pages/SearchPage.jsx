import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Gifstate } from "../context/gif-context.jsx";
import FilterGif from "../components/FilterGif.jsx";
import Gif from "../components/Gif.jsx";

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);

  const { gf, filter } = Gifstate();
  const { query } = useParams();

  const fetchSearchUserResults = async () => {
    const { data } = await gf.search(query, {
      sort: "relevant",
      lang: "en",
      type: filter,
      limit: 20,
    });

    setSearchResults(data);
  };

  useEffect(() => {
    fetchSearchUserResults();
  }, [filter]);
  return (
    <div className="my-4">
      {" "}
      <h2 className="text-5xl pb-3 font-extrabold">{query}</h2>
      <FilterGif alignLeft={true}></FilterGif>
      {searchResults.length > 0 ? (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-2">
          {searchResults.map((gif) => (
            <Gif gif={gif} key={gif.id} />
          ))}
        </div>
      ) : (
        <span>
          No GIFs found for {query}. Try searching for Stickers instead?
        </span>
      )}
    </div>
  );
};

export default SearchPage;
