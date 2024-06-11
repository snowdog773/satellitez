import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Events from "./Events";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../redux/reducers/dataSlice";
import { urlStem } from "../utils/data";
import TrackingPage from "./TrackingPage";
const Body = () => {
  const dispatch = useDispatch();

  const satFilter = useSelector((state) => state.filter.query);

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
      <Routes>
        <Route path="/tracking" element={<TrackingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </>
  );
};
export default Body;
