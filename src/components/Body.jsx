import React, { useEffect } from "react";
import axios from "axios";
import Earth3d from "./Earth3d";
import { useDispatch, useSelector } from "react-redux";
import { setIss } from "../redux/reducers/dataSlice";

const Body = () => {
  const dispatch = useDispatch();
  const issTrue = useSelector((state) => state.data.issTrue);

  useEffect(() => {
    const getISSData = async () => {
      const { data } = await axios.get("http://localhost:6001/getVisibleSats");

      dispatch(setIss(data));
    };

    getISSData();
  }, []);

  return <div id="globe">{issTrue && <Earth3d />}</div>;
};
export default Body;
