import axios from "axios";
import { useState } from "react";
import { urlStem } from "../utils/data";
import { useDispatch } from "react-redux";
import { setEventFilter } from "../redux/reducers/eventsSlice";
import { apiNoradCall } from "../utils/apiNoradCall";

const NoradSearch = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [dropList, setDropList] = useState([]);

  //handle form submission
  const formHandler = async (e) => {
    e.preventDefault();
    const data = await apiNoradCall(input);

    dispatch(setEventFilter(data));
    setInput("");
  };
  // handle quick results for search box
  const changeHandler = async (input) => {
    input === "" && setInput("");
    if (input) {
      const list = await axios.get(`${urlStem}/searchList/${input}`);
      setInput(input);
      setDropList(list.data);
    } else {
      setDropList([]); //clear drop list when input field is empty
    }
  };

  const listClickHandler = async (id) => {
    const data = await apiNoradCall(id);
    dispatch(setEventFilter(data));
    setInput(""); //clear drop list when input field is empty
    setDropList([]);
  };
  return (
    <>
      <form className="searchBox" onSubmit={formHandler}>
        <input
          type="text"
          value={input}
          placeholder="search by Name or Norad ID"
          onChange={(e) => changeHandler(e.target.value)}
        />
        <ul className="dropList">
          {dropList.map((e, i) => (
            <li key={i} onClick={() => listClickHandler(e.noradId)}>
              {e.name}
            </li>
          ))}
        </ul>
      </form>
    </>
  );
};

export default NoradSearch;
