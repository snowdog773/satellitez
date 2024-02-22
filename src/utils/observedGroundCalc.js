import epochTimeCalc from "./epochTimeCalc";
export const observedGroundCalc = (input, minutes, coords) => {
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
    d.getUTCSeconds() + minutes * 60,
    d.getUTCMilliseconds()
  );

  const epochTime = epochTimeCalc(input.tle, timeNow);
  //epochTime is difference between current time and TLE stamp in minutes

  const observerGround = {
    longitude: satellite.degreesToRadians(coords.longitude),
    latitude: satellite.degreesToRadians(coords.latitude),
    height: 0.37,
  };

  //satellite is provided by a script in the head of index.html
  const satrec = satellite.twoline2satrec(tleArray[0], tleArray[1]);
  //get cartesian position and velocity data
  const posVel = satellite.sgp4(satrec, epochTime); //calculates position and vel at minutes after TLE reading
  //convert from cartesian to geodetic (long, lat, alt)
  const gmst = satellite.gstime(timeNow);
  //gmst - adjust for sidereal time
  const posGd = satellite.eciToGeodetic(posVel.position, gmst);
  //position from observer

  //   const observedLocation = satellite.geodeticToEcf(observerGround);
  const positionEcf = satellite.eciToEcf(posVel.position, gmst);
  const lookAngles = satellite.ecfToLookAngles(observerGround, positionEcf);
  //convert log/lat values from radians to degrees
  //   const longDeg = (posGd.longitude * 180) / Math.PI;
  //   const latDeg = (posGd.latitude * 180) / Math.PI;
  const altitude = posGd.height;
  return {
    name: input.name,
    // lat: latDeg,
    // lng: longDeg,
    alt: altitude, // /6731

    azimuth: (lookAngles.azimuth * 180) / Math.PI,
    elevation: (lookAngles.elevation * 180) / Math.PI,

    //alt is calculated as a fraction of earth radius 6371
  };
};
