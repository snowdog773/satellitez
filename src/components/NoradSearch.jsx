import axios from "axios";
import { useState } from "react";
import { urlStem } from "../utils/data";

const NoradSearch = () => {
  const [input, setInput] = useState();
  const formHandler = async (e) => {
    e.preventDefault();
    console.log(input);
    const result = await axios.get(`${urlStem}/noradSearch/${input}`);
    console.log(result);
  };
  return (
    <>
      <form onSubmit={formHandler}>
        <input
          type="text"
          placeholder="search by Norad ID"
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
    </>
  );
};

export default NoradSearch;
