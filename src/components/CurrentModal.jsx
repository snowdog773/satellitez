import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import ModalGroup from "./ModalGroup";
import ModalSingle from "./ModalSingle";
const CurrentModal = () => {
  const data = useSelector((state) => state.data.data);

  return (
    <>
      {data.length > 0 && (
        <div>
          {data.length > 1 ? (
            <ModalGroup rawData={data} />
          ) : (
            <ModalSingle rawData={data} />
          )}
        </div>
      )}
    </>
  );
};

export default CurrentModal;
