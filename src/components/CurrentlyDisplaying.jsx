import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import CurrentModal from "./CurrentModal";
const CurrentlyDisplaying = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const data = useSelector((state) => state.data.data);
  const group = useSelector((state) => state.filter.query.group);
  const modalHandler = () => {
    modal ? setModal(false) : setModal(true);
  };

  return (
    <>
      <div
        className="currentlyDisplaying"
        onClick={data.length === 1 ? modalHandler : undefined}
      >
        <div className="currentlyDisplayingInner">
          <div>Currently Displaying : </div>

          <div>{data.length > 1 ? group : data[0]?.name}</div>
        </div>
        {data.length === 1 && (
          <div className="currentlyDisplayingFooter">Click for details</div>
        )}
      </div>
      <div className={modal ? "modal modalOn" : "modal modalOff"}>
        <CurrentModal modalHandler={modalHandler} />
      </div>
    </>
  );
};

export default CurrentlyDisplaying;
