import SubHeader from "./SubHeader";
import Timer from "./Timer";
import Earth3d from "./Earth3d";
import { useDispatch, useSelector } from "react-redux";
const TrackingPage = () => {
  const dataTrue = useSelector((state) => state.data.dataTrue);
  return (
    <>
      <SubHeader />
      <div id="globe">{dataTrue && <Earth3d />}</div>

      <Timer />
    </>
  );
};

export default TrackingPage;
