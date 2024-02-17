import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Filter from "./Filter";
import NoradSearch from "./NoradSearch";
import CurrentlyDisplaying from "./CurrentlyDisplaying";

const SubHeader = () => {
  const group = useSelector((state) => state.filter.query.group);
  const [showDropList, setShowDropList] = useState(false);
  const dropListHandler = () => {
    showDropList ? setShowDropList(false) : setShowDropList(true);
  };

  return (
    <>
      <div className="filterWrapper">
        <NoradSearch />
        <div className="satListDropDown">
          <div className="current-group" onClick={() => dropListHandler()}>
            Select by Group
            {showDropList && <Filter />}
          </div>
        </div>
      </div>
      <CurrentlyDisplaying />
    </>
  );
};

export default SubHeader;
