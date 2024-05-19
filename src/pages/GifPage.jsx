import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Gifstate } from "../context/gif-context.jsx";
import Gif from "../components/Gif.jsx";
import {
  HiMiniChevronDown,
  HiMiniChevronUp,
  HiMiniHeart,
} from "react-icons/hi2";
import FollowOn from "../components/FollowOn.jsx";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FaPaperPlane } from "react-icons/fa6";
import { IoCodeSharp } from "react-icons/io5";
import {
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
} from "react-share";

const GifPage = () => {
  const contentType = ["gifs", "stickers", "texts"];
  const { type, slug } = useParams();
  const [gif, setGif] = useState({});
  const [relatedGifs, setRelatedGifs] = useState([]);
  const [readMore, setReadMore] = useState(false);

  const { gf, favourites, addToFavorites } = Gifstate();

  const fetchGif = async () => {
    const gifId = slug.split("-");
    const { data } = await gf.gif(gifId[gifId.length - 1]);
    const { data: related } = await gf.related(gifId[gifId.length - 1], {
      limit: 10,
    });

    setGif(data);
    setRelatedGifs(related);
  };

  useEffect(() => {
    if (!contentType.includes(type)) {
      throw new Error("Invalid Content Type");
    }
    fetchGif();
  }, []);

  const shareGif = () => {
    // Assignment
  };

  const EmbedGif = () => {
    // Assignment
  };
  return (
    <div className="grid grid-cols-4 my-10 gap-4">
      <div className="hidden sm:block">
        {gif?.user && (
          <>
            <div className="flex gap-1">
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-14"
              ></img>
              <div className="px-2">
                <div className="font-bold">{gif?.user?.display_name}</div>
                <div className="faded-text">@{gif?.user?.username}</div>
              </div>
            </div>
            {gif?.user?.description && (
              <p className="py-4 whitespace-pre-line text-sm text-gray-400">
                {readMore
                  ? gif?.user?.description.length < 100
                    ? gif?.user?.description
                    : gif?.user?.description
                  : gif?.user?.description.slice(0, 100) + "..."}{" "}
                <div
                  className="flex items-center faded-text cursor-pointer"
                  onClick={() => setReadMore(!readMore)}
                >
                  {readMore ? (
                    <>
                      Read less <HiMiniChevronUp size={20}></HiMiniChevronUp>
                    </>
                  ) : (
                    <>
                      Read more{" "}
                      <HiMiniChevronDown size={20}></HiMiniChevronDown>
                    </>
                  )}
                </div>
              </p>
            )}
          </>
        )}
        <FollowOn></FollowOn>

        <div className="divider"></div>

        {gif?.source && (
          <div>
            <span className="faded-text">Source</span>
            <div className="flex items-center text-sm font-bold gap-1">
              <HiOutlineExternalLink size={25} />
              <a href={gif.source} target="_blank" className="truncate">
                {gif.source}
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="col-span-4 sm:col-span-3">
        <div className="flex gap-6">
          <div className="w-full sm:w-3/4">
            <div className="faded-text truncate mb-2">{gif.title}</div>
            <Gif gif={gif} hover={false}></Gif>

            {/* {mobileUI} */}
            <div className="flex sm:hidden gap-1">
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-14"
              />
              <div className="px-2 mr-2">
                <div className="font-bold">{gif?.user?.display_name}123</div>
                <div className="faded-text">@{gif?.user?.username}</div>
              </div>

              <button onClick={() => addToFavorites(gif.id)} className="mx-3">
                <HiMiniHeart
                  size={30}
                  className={`${
                    favourites.includes(gif.id) ? "text-red-500" : ""
                  }`}
                />
              </button>
              <TelegramShareButton
                url={gif?.images?.fixed_width?.webp}
                className="mx-3"
              >
                <TelegramIcon size={25}></TelegramIcon>
              </TelegramShareButton>

              <FacebookShareButton
                url={gif?.images?.fixed_width?.webp}
                className="mx-3"
              >
                <FacebookIcon size={25}></FacebookIcon>
              </FacebookShareButton>
            </div>
            {/* {mobileUI} */}
          </div>
          <div className="hidden sm:flex flex-col gap-5 mt-6">
            <button
              onClick={() => addToFavorites(gif.id)}
              className="flex gap-5 items-center"
            >
              <HiMiniHeart
                size={26}
                className={`${
                  favourites.includes(gif.id) ? "text-red-500" : ""
                }`}
              />
            </button>
            <TelegramShareButton
              url={gif?.images?.fixed_width?.webp}
              className="mx-1 "
            >
              <FaPaperPlane size={20}></FaPaperPlane>
            </TelegramShareButton>

            <FacebookShareButton
              url={gif?.images?.fixed_width?.webp}
              className="mx-1 mt-1"
            >
              <FacebookMessengerIcon size={25}></FacebookMessengerIcon>
            </FacebookShareButton>
          </div>
        </div>
        <div>
          <span className="font-extrabold">Related GIFs</span>
          <div className="columns-2 md:columns-3 gap-2">
            {relatedGifs.slice(1).map((gif) => (
              <Gif gif={gif} key={gif.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GifPage;
