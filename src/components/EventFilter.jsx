import { satFilters } from "../utils/data";
import { useDispatch, useSelector } from "react-redux";
import {
  setEventFilter,
  setIsLastSearchSingle,
} from "../redux/reducers/eventsSlice";
const EventFilter = () => {
  const dispatch = useDispatch();

  const clickHandler = (id) => {
    dispatch(setEventFilter(id));
    dispatch(setIsLastSearchSingle(false));
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
      <ul className="filterList">
        {sortedSatFilters.map((e) => {
          return <li onClick={() => clickHandler(e.query)}>{e.group}</li>;
        })}
      </ul>
    </>
  );
};

export default EventFilter;
