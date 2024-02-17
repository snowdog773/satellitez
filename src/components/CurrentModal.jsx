import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import ModalGroup from "./ModalGroup";
import ModalSingle from "./ModalSingle";

const CurrentModal = ({ modalHandler }) => {
  const data = useSelector((state) => state.data.data);
  const modalHeight = useSelector((state) => state.modalHeight.modalHeight);
  return (
    <>
      {data.length > 0 && (
        <div>
          {data.length > 1 ? (
            <ModalGroup rawData={data} />
          ) : (
            <>
              <ModalSingle rawData={data} />
              <div
                className="modalClickLayer"
                style={{ height: modalHeight - 30 }}
                onClick={() => modalHandler()}
              ></div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default CurrentModal;
