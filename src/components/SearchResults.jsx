import millify from "millify";
import { BsDot } from "react-icons/bs";
import StringArea from "../components/StringArea";
import { Link } from "react-router-dom";

const SearchResults = ({ videoInfo }) => {
  const { video } = videoInfo;
  // console.log(video);
  return (
    <Link to={`/watch/${video.videoId}`}>
      <div className="mx-[10px] p-5 md:mx-[50px]">
        <div className="flex gap-2">
          <img
            className="w-[168px] h-[94px] md:w-[360px] md:h-[202px] rounded"
            src={video?.thumbnails[0]?.url}
          />
          <div className="flex flex-col gap-3">
            <h1 className="font-semibold text-sm md:text-lg">{video?.title}</h1>
            <div className="flex items-center text-xs text-gray-400">
              <span>{millify(video?.stats?.views)}</span>
              <BsDot />
              <span>{video?.publishedTimeText}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-400">
              <img
                className="rounded-full w-[30px] h-[30px]"
                src={video?.author?.avatar[0]?.url}
              />
              <p>{video?.author?.title}</p>
            </div>
            <p className="text-xs md:text-sm text-gray-400">
              {video?.descriptionSnippet}
            </p>
            <p>
              {video?.badges[0] === "Altyazılar" ? (
                <span className="p-1 rounded font-semibold text-xs text-gray-300 bg-gray-600">
                  Altyazılar
                </span>
              ) : (
                ""
              )}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResults;
