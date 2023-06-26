import React, { useContext } from "react";
import SideNav from "../components/SideNav";
import { YoutubeContext } from "../context/YoutubeContext";
import loading from "../assets/loading.gif";
import VideoCard from "../components/VideoCard";

const Feed = () => {
  const { searchResult } = useContext(YoutubeContext);
  return (
    <div className="flex">
      <SideNav />
      <div className="grid lg:grid-cols-3 w-full p-8 gap-5">
        {!searchResult ? (
          <img className="mx-auto mt-[200px]" src={loading} />
        ) : (
          searchResult.map((video) => {
            if (video.type !== "video") return;
            return <VideoCard videoInfo={video} />;
          })
        )}
      </div>
    </div>
  );
};

export default Feed;
