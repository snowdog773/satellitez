import React, { useEffect } from "react";
import axios from "axios";
import Earth3d from "./Earth3d";
import GlobeControls from "./GlobeControls";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../redux/reducers/dataSlice";
import Filter from "./Filter";
import Timer from "./Timer";
import { urlStem } from "../utils/data";
const Body = () => {
  const dispatch = useDispatch();
  const dataTrue = useSelector((state) => state.data.dataTrue);
  const satFilter = useSelector((state) => state.filter.query);
  console.log(satFilter, "satfilter");
  useEffect(() => {
    const getSatData = async () => {
      const { data } = await axios.get(
        `${urlStem}/getSatellites/${satFilter.query}`
      );
      console.log(data);
      dispatch(setData(data));
    };

    getSatData();
  }, [satFilter]);

  return (
    <>
      <div id="globe">{dataTrue && <Earth3d />}</div>
      <GlobeControls />
      <Timer />
    </>
  );
};
export default Body;
