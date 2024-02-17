import { satFilters } from "../utils/data";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../redux/reducers/filterSlice";
const Filter = () => {
  const dispatch = useDispatch();
  //   const issTrue = useSelector((state) => state.data.issTrue);
  const clickHandler = (id) => {
    dispatch(setFilter(id));
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
          return <li onClick={() => clickHandler(e)}>{e.group}</li>;
        })}
      </ul>
    </>
  );
};

export default Filter;
