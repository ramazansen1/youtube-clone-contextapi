import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery) return;
    navigate(`/results/${searchQuery}`);
  };
  return (
    <header className="flex items-center justify-between p-2 sticky">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 text-2xl">
          <Link to={"/"}>
            <div className="flex items-center">
              <img
                className="w-[45px] md:w-[50px]"
                src="https://www.freeiconspng.com/thumbs/youtube-logo-png/hd-youtube-logo-png-transparent-background-20.png"
                alt="youtube-logo"
              />
              <h1 className="text-[20px] md:text-2xl">YouTube</h1>
            </div>
          </Link>
        </div>
      </div>

      <form
        onSubmit={handleSearch}
        className="flex items-center rounded-full text-black bg-white w-[40%] md:w-[50%]"
      >
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          className="text-black rounded-full text-left px-2 py-1 w-[100%] md:w-[100%]"
          type="text"
          placeholder="Ara"
        />
        <Link to={`/results/${searchQuery}`}>
          <BsSearch className="mr-2" />
        </Link>
      </form>
      <Link to={"/"}>
        <button className="bg-blue-400 p-2 rounded-full text-[14px] md:text-sm mr-2 text-black hover:text-white duration-300">
          Oturum Aç
        </button>
      </Link>
    </header>
  );
};

export default Header;
