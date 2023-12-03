import { useDispatch, useSelector } from "react-redux";
import Filter from "./Filter";
import NoradSearch from "./NoradSearch";

const SubHeader = () => {
  const group = useSelector((state) => state.filter.query.group);

  return (
    <>
      <div className="satListDropDown">
        <div>Current Satellite Group</div>
        <div> -</div>{" "}
        <div className="current-group">
          {group}
          <Filter />
        </div>
      </div>
      <NoradSearch />
    </>
  );
};

export default SubHeader;
