import { MdOutlineSort } from "react-icons/md";
import { BiLike, BiDislike } from "react-icons/bi";
import pAvatar from "../assets/pAvatar.png";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { options } from "../utils/api";
import StringArea from "./StringArea";

const Comments = ({ videoDetails }) => {
  const [comments, setComments] = useState([]);
  const params = useParams();

  // gelen yorum sayısını tr'ye göre formatlama
  const totalCommets = videoDetails?.stats?.comments;
  const formatTotalComments = new Intl.NumberFormat("tr-TR").format(
    totalCommets
  );

  useEffect(() => {
    axios
      .get(
        `https://youtube138.p.rapidapi.com/video/comments/?id=${params.videoId}`,
        options
      )
      .then((res) => setComments(res.data.comments))
      .catch((err) => console.log(err));
  }, [params.videoId]);

  // console.log(comments);
  return (
    <>
      <div className="flex flex-col p-3">
        <div className="flex items-center gap-6">
          <span>{formatTotalComments} Yorum</span>
          <div className="flex items-center gap-2">
            <MdOutlineSort className="text-2xl" />
            <span>Sıralama ölçütü:</span>
          </div>
        </div>
        <div className="flex gap-2 mt-5">
          <img className="rounded-full w-[40px] h-[40px]" src={pAvatar} />
          <input
            className="text-left w-full bg-gray-600 p-1 h-[30px] text-sm outline-none rounded font-medium border-b-2"
            type="text"
            placeholder="Yorum ekleyin..."
          />
        </div>
      </div>
      {comments.map((comment) => (
        <div className="flex flex-col gap-4 p-3">
          <div className="flex gap-2 mt-3">
            <img
              className="rounded-full w-[40px] h-[40px]"
              src={comment?.author?.avatar[0]?.url}
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span>{comment?.author?.title}</span>
                <span className="text-sm text-gray-400">
                  {comment?.publishedTimeText}
                </span>
              </div>
              <StringArea
                key={comment.commentId}
                description={comment?.content}
              />
              <div className="flex items-center gap-1 mt-3">
                <BiLike role="button" className="text-2xl" />
                <span>{comment?.stats?.votes}</span>
                <BiDislike role="button" className="text-2xl ml-2" />
                <span className="ml-7">Yanıtla</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Comments;
