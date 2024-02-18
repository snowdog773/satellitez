import { useDispatch, useSelector } from "react-redux";
import { useState, useRef } from "react";
import Filter from "./Filter";
import NoradSearch from "./NoradSearch";
import CurrentlyDisplaying from "./CurrentlyDisplaying";
import { setFilter } from "../redux/reducers/filterSlice";
const SubHeader = () => {
  const group = useSelector((state) => state.filter.query);
  const data = useSelector((state) => state.data.data);
  const dispatch = useDispatch();

  console.log(group);
  console.log(data);
  const [showDropList, setShowDropList] = useState(false);
  const dropListHandler = () => {
    showDropList ? setShowDropList(false) : setShowDropList(true);
  };
  const showGroupHandler = () => {
    console.log("group handler ran", group);
    dispatch(setFilter({ ...group }));
  };
  return (
    <>
      <div className="filterWrapper">
        <NoradSearch />
        <div className="satListDropDown">
          {data.length > 1 ? (
            <div className="current-group" onClick={() => dropListHandler()}>
              Select by Group
              {showDropList && <Filter />}
            </div>
          ) : (
            <div className="current-group" onClick={() => showGroupHandler()}>
              Return To Group View
            </div>
          )}
        </div>
      </div>
      <CurrentlyDisplaying />
    </>
  );
};

export default SubHeader;
