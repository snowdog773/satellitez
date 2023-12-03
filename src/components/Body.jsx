import React, { useEffect } from "react";
import axios from "axios";
import Earth3d from "./Earth3d";
import GlobeControls from "./GlobeControls";
import { useDispatch, useSelector } from "react-redux";
import { setIss } from "../redux/reducers/dataSlice";
import Filter from "./Filter";
import Timer from "./Timer";
import { urlStem } from "../utils/data";
const Body = () => {
  const dispatch = useDispatch();
  const issTrue = useSelector((state) => state.data.issTrue);
  const satFilter = useSelector((state) => state.filter.query);
  console.log(satFilter, "satfilter");
  useEffect(() => {
    const getSatData = async () => {
      const { data } = await axios.get(
        `${urlStem}/getSatellites/${satFilter.query}`
      );
      console.log(data);
      dispatch(setIss(data));
    };

    getSatData();
  }, [satFilter]);

  return (
    <>
      <div id="globe">{issTrue && <Earth3d />}</div>
      <GlobeControls />
      <Timer />
    </>
  );
};
export default Body;
