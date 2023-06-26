import ReactPlayer from "react-player";
import VideoContents from "../components/VideoContents";
import { BiLike, BiDislike, BiDotsHorizontalRounded } from "react-icons/bi";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { PiShareFat } from "react-icons/pi";
import { HiDownload } from "react-icons/hi";
import StringArea from "../components/StringArea";
import { options } from "../utils/api";
import loading from "../assets/loading.gif";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import millify from "millify";
import Comments from "../components/Comments";
const VideoDetail = () => {
  const params = useParams();
  const [videoDetails, setVideoDetails] = useState(null);
  const [relatedContents, setRelatedContents] = useState(null);
  // console.log(params);
  // console.log(videoDetails);
  // console.log(relatedContents);
  useEffect(() => {
    setRelatedContents(null);
    setVideoDetails(null);
    // video detayları
    axios
      .get(
        `https://youtube138.p.rapidapi.com/video/details/?id=${params.videoId}`,
        options
      )
      .then((res) => setVideoDetails(res.data))
      .catch((err) => console.log(err));
    // benzer içerikler

    axios
      .get(
        `https://youtube138.p.rapidapi.com/video/related-contents/?id=${params.videoId}`,
        options
      )
      .then((res) => setRelatedContents(res.data.contents))
      .catch((err) => console.log(err));
  }, [params.videoId]);

  return (
    <>
      {!videoDetails && <img className="mx-auto mt-[200px]" src={loading} />}

      {videoDetails && (
        <div className="flex flex-col md:flex-row justify-between gap-5">
          <div className="w-[436px] h-[245px] md:w-[896px] md:h-[504px] 2xl:w-[1280px] 2xl:h-[720px] mx-auto mt-5 md:ml-16">
            <div className="h-full aspect-video">
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${videoDetails?.videoId}`}
                width={"auto"}
                height={"100%"}
                controls={true}
                pip={true}
              />
            </div>
            {/* video kanal ve acımalar  */}
            <div className="flex flex-col mt-2">
              <h1 className="font-semibold text-lg">{videoDetails?.title}</h1>
              <div className="flex flex-col justify-center lg:flex-row lg:justify-between ">
                {/* kanal hakkında bilgiler ve abone ol */}
                <div className="flex items-center gap-3 mt-3">
                  <img
                    className="w-[40px] h-[40px] rounded-full"
                    src={videoDetails?.author?.avatar[0]?.url}
                  />
                  <div className="flex lg:flex-row items-center gap-10">
                    <div className="flex item flex-col">
                      <h4 className="flex items-center gap-1 font-semibold">
                        {videoDetails?.author?.title}
                        {videoDetails?.author?.badges[0]?.text ===
                          "Doğrulandı" && (
                          <span className="text-sm text-gray-400">
                            <BsFillPatchCheckFill />
                          </span>
                        )}
                      </h4>
                      <p className="text-sm text-gray-300">
                        {videoDetails?.author?.stats?.subscribersText}
                      </p>
                    </div>
                    <button className="px-4 py-2 bg-white text-xs text-black font-semibold rounded-full hover:bg-gray-200">
                      Abone ol
                    </button>
                  </div>
                </div>
                {/* button paylaş indir */}
                <div className="flex mt-2 items-center gap-3">
                  {/* beğeni butonları */}
                  <div
                    className="flex rounded-md shadow-sm opacity-90 "
                    role="group"
                  >
                    <button className="flex items-center gap-2 font-semibold px-4 py-2 text-md text-white bg-gray-800 border border-gray-800 rounded-l-full hover:bg-gray-600 duration-500">
                      <BiLike className="text-xl" />
                      <span>{millify(videoDetails?.stats?.likes)}</span>
                    </button>
                    <button className="px-4 py-2 text-md text-white bg-gray-800 border-t border-b border-gray-800 rounded-r-full hover:bg-gray-600 duration-500">
                      <BiDislike className="text-xl" />
                    </button>
                  </div>
                  <button className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full hover:bg-gray-600 duration-500">
                    <PiShareFat className="text-xl" />
                    <span className="text-md font-semibold">Paylaş</span>
                  </button>
                  <button className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full hover:bg-gray-600 duration-500">
                    <HiDownload className="text-xl" />
                    <span className="text-md font-semibold">İndir</span>
                  </button>
                  <button className="flex items-center gap-2 bg-gray-800 p-2.5 rounded-full hover:bg-gray-600 duration-500">
                    <BiDotsHorizontalRounded className="text-xl" />
                  </button>
                </div>
              </div>
              {/* video hakkında kısmı */}
              <div className="flex flex-col mt-5 p-4 bg-gray-800 hover:bg-opacity-50 rounded">
                <div className="flex items-center font-semibold gap-3">
                  <p>{millify(videoDetails?.stats?.views)} görüntülenme</p>
                  <p>{videoDetails?.publishedDate}</p>
                </div>
                <StringArea description={videoDetails?.description} />
              </div>
              <div className="mt-5 hidden lg:block">
                <Comments videoDetails={videoDetails} />
              </div>
              {/* önerilen videolar */}
            </div>
            <div className="block lg:hidden">
              {!relatedContents && <p>Loading...</p>}
              {relatedContents && <VideoContents contents={relatedContents} />}
            </div>
            <p className="mt-2 block lg:hidden">
              <Comments />
            </p>
          </div>
          <div className="flex flex-col">
            <div className="hidden lg:block">
              {!relatedContents && <p>Loading...</p>}
              {relatedContents && <VideoContents contents={relatedContents} />}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default VideoDetail;
