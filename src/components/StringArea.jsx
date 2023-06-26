import { useState } from "react";
const StringArea = ({ description }) => {
  const [readMore, setReadMore] = useState(false);

  return (
    <p>
      {readMore ? description : `${description.substring(0, 100)}...`}
      <button className="font-semibold" onClick={() => setReadMore(!readMore)}>
        {readMore ? "Daha az göster" : "Daha fazla göster"}
      </button>
    </p>
  );
};

export default StringArea;
