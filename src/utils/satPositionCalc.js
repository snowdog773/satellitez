import epochTimeCalc from "./epochTimeCalc";
export const satPositionCalc = (input) => {
  const tleArray = input.tle.split("\r\n");

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

  const epochTime = epochTimeCalc(input.tle, timeNow);
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
  return {
    name: input.info.satname,
    lat: latDeg,
    lng: longDeg,
    alt: altitude / 6371,
    //alt is calculated as a fraction of earth radius 6371
  };
};
