import { useContext } from "react";
import { YoutubeContext } from "../context/YoutubeContext";
import { categories } from "../utils/constans";

const SideNav = () => {
  const { selectedCategory, setSelectedCategory } = useContext(YoutubeContext);
  return (
    <nav className="flex flex-col xl:w-[10%] lg:w-[10%] md:w-[10%] w-[10%]">
      {categories.map((category) => (
        <>
          <div
            onClick={() => setSelectedCategory(category.name)}
            className={`${selectedCategory === category.name && "bg-gray-800"}
            flex items-center p-4 gap-5 cursor-pointer hover:bg-gray-800 duration-500 rounded-md mx-auto sm:mx-0 `}
          >
            <div className="flex items-center gap-5">
              <span className={`text-2xl hover:${category.name}`}>
                {category.icon}
              </span>
              <h4 className={`hidden md:block`}>{category.name}</h4>
            </div>
          </div>
          {category.divider && <hr />}
        </>
      ))}
    </nav>
  );
};

export default SideNav;
