import React, { useEffect } from "react";
import axios from "axios";
import Globe from "react-globe.gl";
import { useDispatch, useSelector } from "react-redux";
import { setIss } from "../redux/reducers/dataSlice";
import { sgp4 } from "satellite.js";

import globeWrap from "../assets/globewrap.jpg";
import epochTimeCalc from "../utils/epochTimeCalc";

const Body = () => {
  const dispatch = useDispatch();
  const issPos = useSelector((state) => state.data.iss);
  useEffect(() => {
    const getISSData = async () => {
      const { data } = await axios.get("http://localhost:6001/getVisibleSats");
      const tleArray = data.tle.split("\r\n");
      console.log(issPos);
      //get minutes since TLE reading

      const d = new Date(); //ensure consistent time used in calcs
      const timeNow = new Date(
        //correct for non GMT timezones
        d.getUTCFullYear(),
        d.getUTCMonth(),
        d.getUTCDate(),
        d.getUTCHours(),
        d.getUTCMinutes(),
        d.getUTCSeconds(),
        d.getUTCMilliseconds()
      );

      const epochTime = epochTimeCalc(data.tle, timeNow);
      //epochTime is difference between current time and TLE stamp in minutes

      //satellite is provided by a script in the head of index.html
      const satrec = satellite.twoline2satrec(tleArray[0], tleArray[1]);
      //get cartesian position and velocity data
      const posVel = satellite.sgp4(satrec, epochTime); //calculates position and vel at minutes after TLE reading
      //convert from cartesian to geodetic (long, lat, alt)
      const gmst = satellite.gstime(d);
      //gmst - adjust for sidereal time
      const posGd = satellite.eciToGeodetic(posVel.position, gmst);

      //convert log/lat values from radians to degrees
      const longDeg = (posGd.longitude * 180) / Math.PI;
      const latDeg = (posGd.latitude * 180) / Math.PI;
      const altitude = posGd.height;
      dispatch(setIss({ lng: longDeg, lat: latDeg, alt: altitude }));
      console.log(
        "latitude - ",
        latDeg,
        "longitude - ",
        longDeg,
        "altitude - ",
        altitude
      );
    };

    getISSData();
  }, []);

  useEffect(() => {
    console.log(issPos);
  }, [issPos]);
  return (
    <>
      <div id="globe">
        {issPos && (
          <Globe
            showGraticules={true}
            globeImageUrl={globeWrap}
            objectsData={issPos}
            objectLat="lat"
            objectLng="lng"
            objectAltitude="alt"
            objectThreeObject="name"
          />
        )}
      </div>
    </>
  );
};

export default Body;
