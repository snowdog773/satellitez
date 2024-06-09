import { satFilters } from "../utils/data";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEventFilter } from "../redux/reducers/eventsSlice";
const EventFilter = () => {
  const dispatch = useDispatch();
  const [showDropList, setShowDropList] = useState(false);
  const dropListHandler = () => {
    showDropList ? setShowDropList(false) : setShowDropList(true);
  };
  const clickHandler = (id) => {
    dispatch(setEventFilter(id));
  };
  const sortedSatFilters = satFilters.sort(function (a, b) {
    if (a.group < b.group) {
      return -1;
    } else if (a.group > b.group) {
      return 1;
    } else {
      return 0;
    }
  });
  console.log(sortedSatFilters);
  return (
    <>
      <div className="current-group" onClick={() => dropListHandler()}>
        Select By Group
        {showDropList && (
          <ul className="filterList">
            {sortedSatFilters.map((e) => {
              return <li onClick={() => clickHandler(e.query)}>{e.group}</li>;
            })}
          </ul>
        )}
      </div>
    </>
  );
};

export default EventFilter;
