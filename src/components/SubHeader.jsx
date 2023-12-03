import { useDispatch, useSelector } from "react-redux";
import Filter from "./Filter";

const SubHeader = () => {
  const group = useSelector((state) => state.filter.query.group);

  return (
    <>
      <div className="satListDropDown">
        <div>Current Satellite Group :</div> <div>{group}</div>
        <Filter />
      </div>
    </>
  );
};

export default SubHeader;
