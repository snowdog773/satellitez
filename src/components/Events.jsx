import { useEffect, useState } from "react";
import axios from "axios";
import { getLocation } from "../utils/getlocation";
import { urlStem } from "../utils/data";
import { calcMasterArray } from "../utils/calcMasterArray";
const Events = () => {
  const [coordinates, setCoordinates] = useState();
  const [visibleSet, setVisibleSet] = useState();

  ////////////////////USER GEOLOCATION////////////////////////////
  const callGeolocation = async () => {
    const { coords } = await getLocation();

    console.log(coords);
    setCoordinates({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  };
  useEffect(() => {
    callGeolocation(); //get user location
  }, []);
  /////////////////////////////////////////////////////

  //////////////GET SUNRISE SUNSET LOCAL TIMES????????????????????????
  const refTime = new Date();
  const refTime10DaysAfter = new Date(
    refTime.getTime() + 10 * 24 * 60 * 60 * 1000
  );
  const getDaylightHours = async () => {
    const daylight = await axios.get(
      `https://api.sunrisesunset.io/json?lat=38.907192&lng=-77.036873&date_start=${refTime.getFullYear()}-${
        refTime.getMonth() + 1
      }-${refTime.getDate()}&date_end=${refTime10DaysAfter.getFullYear()}-${
        refTime10DaysAfter.getMonth() + 1
      }-${refTime10DaysAfter.getDate()}`
    );
    console.log(daylight);
  };

  useEffect(() => {
    getDaylightHours();
  }, []);
  /////////////////////////////////////////////////

  ///////////////CALCULATE OVERFLIGHTS//////////////////////////
  const getVisibleSet = async () => {
    const { data } = await axios.get(`${urlStem}/getSatellites/visual`);

    const masterArray = calcMasterArray(data, coordinates, 1440);
    setVisibleSet(masterArray);
    console.log(masterArray);
  };

  const minutesToDateTime = (mins) => {
    const options = { dateStyle: "long", timeStyle: "short" };
    return new Date(refTime.getTime() + mins * 60000).toLocaleString(options);
  };

  useEffect(() => {
    coordinates && getVisibleSet(); //get brightest and visible set TLE
  }, [coordinates]);
  //////////////////////////////////////////////////////////////////////////
  return (
    <>
      <h2>Events</h2>
      {visibleSet &&
        visibleSet.map((e, i, arr) => (
          <div className="visibleItem">
            <h3>Object : {e.data[0].name}</h3>
            <p>
              {" "}
              Max Elevation : {e.maxElevation.toFixed(0)}
              <sup>o</sup>
            </p>
            <p>
              Visible from {minutesToDateTime(e.data[0].minutes)} until{" "}
              {minutesToDateTime(e.data[0].minutes + e.data.length - 1)}
            </p>
            <p>
              Rises from {e.data[0].azimuth.toFixed(0)}
              <sup>o</sup>
            </p>
            <p>
              Sets at {e.data[e.data.length - 1].azimuth.toFixed(0)}
              <sup>o</sup>
            </p>
          </div>
        ))}
    </>
  );
};

export default Events;
