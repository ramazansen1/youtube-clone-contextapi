import { useParams } from "react-router-dom";
import SearchResults from "../components/SearchResults";
import SideNav from "../components/SideNav";
import { useEffect, useState } from "react";
import axios from "axios";
import { options } from "../utils/api";
import loading from "../assets/loading.gif";

const Search = () => {
  const [searchDetail, setSearchDetail] = useState(null);
  // url den parametre değerini alma
  const searchParams = useParams();
  // get methodu yardımıyla arama terimini alma
  //   const query = searchParams.get("search_query");
  const query = searchParams.search_query;

  useEffect(() => {
    setSearchDetail(null);
    axios
      .get(`https://youtube138.p.rapidapi.com/search/?q=${query}`, options)
      .then((res) => setSearchDetail(res.data.contents))
      .catch((err) => console.log(err));
  }, [query]);
  //   console.log(searchDetail);
  return (
    <div className="flex">
      <SideNav />
      <div className="flex justify-center p-5 w-full">
        {!searchDetail && (
          <img className="mx-auto h-[200px] mt-[200px]" src={loading} />
        )}
        <div className="flex flex-col">
          {searchDetail?.map((content, i) => {
            if (content.type !== "video") return;
            return <SearchResults key={i} videoInfo={content} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Search;
