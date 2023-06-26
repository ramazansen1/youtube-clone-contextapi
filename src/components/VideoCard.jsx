import { Link } from "react-router-dom";
import { BsDot, BsFillPatchCheckFill } from "react-icons/bs";
import millify from "millify";

const VideoCard = ({ videoInfo }) => {
  const { video } = videoInfo;
  console.log(video);
  return (
    <Link to={`/watch/${video?.videoId}`}>
      <div className="cursor-pointer">
        <img className="w-full rounded my-4" src={video?.thumbnails[0]?.url} />
        <div className="flex">
          <div className="flex gap-2 mt-1">
            <img
              className="rounded-full h-[40px] w-[40px]"
              src={video?.author?.avatar[0].url}
            />
            <div className="flex flex-col">
              <h4 className="font-semibold">{video?.title}</h4>
              <p className="flex items-center gap-1 mt-1 text-sm text-gray-400">
                <span>{video?.author?.title}</span>
                {video?.author?.badges[0]?.text === "Doğrulandı" && (
                  <span>
                    <BsFillPatchCheckFill />
                  </span>
                )}
              </p>
              <p className="flex items-center mt-1 text-sm text-gray-400">
                <span>{millify(video?.stats?.views)} görüntülenme</span>
                <BsDot />
                <span>{video?.publishedTimeText}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
