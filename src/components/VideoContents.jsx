import millify from "millify";
import { BsDot } from "react-icons/bs";
import { Link } from "react-router-dom";

const VideoContents = ({ contents }) => {
  // console.log(contents);
  return (
    <>
      {contents.map((item) => {
        // console.log(item);
        if (item.type !== "video") return;
        return (
          <Link to={`/watch/${item?.video?.videoId}`}>
            <div className="flex gap-2 mt-6 md:p-1 ">
              <img
                className="w-[168px] h-[94px] rounded"
                src={item?.video?.thumbnails[0]?.url}
              />
              <div className="flex flex-col ">
                <p className="font-semibold">{item?.video?.title}</p>
                <p className="text-sm text-gray-400">
                  {item?.video?.author?.title}
                </p>
                <p className="flex items-center text-xs md:text-sm  text-gray-400">
                  <span>{millify(item?.video?.stats?.views)} görüntüleme</span>
                  <span>
                    <BsDot />
                  </span>
                  <span>{item?.video?.publishedTimeText}</span>
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
};

export default VideoContents;
