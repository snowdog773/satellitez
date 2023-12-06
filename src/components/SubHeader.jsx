import { useDispatch, useSelector } from "react-redux";
import Filter from "./Filter";
import NoradSearch from "./NoradSearch";
import CurrentlyDisplaying from "./CurrentlyDisplaying";

const SubHeader = () => {
  const group = useSelector((state) => state.filter.query.group);

  return (
    <>
      <CurrentlyDisplaying />
      <div className="filterWrapper">
        <NoradSearch />
        <div className="satListDropDown">
          <div className="current-group">
            Select by Group
            <Filter />
          </div>
        </div>
      </div>
    </>
  );
};

export default SubHeader;
