import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import CurrentModal from "./CurrentModal";
const CurrentlyDisplaying = () => {
  const [modal, setModal] = useState(false);
  const data = useSelector((state) => state.data.data);
  const group = useSelector((state) => state.filter.query.group);
  const modalHandler = () => {
    modal ? setModal(false) : setModal(true);
  };
  return (
    <>
      <div className="currentlyDisplaying" onClick={modalHandler}>
        <div>Currently Displaying</div>
        {data.length === 1 ? (
          <div>{data[0].name}</div>
        ) : (
          <div>{group} group</div>
        )}
      </div>{" "}
      <div className={modal ? "modal modalOn" : "modal modalOff"}>
        <CurrentModal />
      </div>
    </>
  );
};

export default CurrentlyDisplaying;
