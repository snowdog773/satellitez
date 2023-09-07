export default function epochTimeCalc(rawTLE, timeNow) {
  //extract date & time element

  const split = rawTLE.split(" ");

  const rawEpoch = split[5];

  const year = parseInt(rawEpoch.slice(0, 2));
  const daysArray = rawEpoch.slice(2).split(".");
  const days = parseInt(daysArray[0]);
  const fraction = parseFloat("0." + daysArray[1]);
  //time from 1970 to now in milliseconds
  const nowMilliseconds = timeNow;
  //time from 1970 to TLE in milliseconds
  let tleYear;
  //1957 year of first sattelite launch
  year <= 99 && year >= 57 ? (tleYear = year + 1900) : (tleYear = year + 2000);
  const tleTime = new Date(tleYear, 0, days).getTime() + fraction * 86400000;
  //tleTime is completed days in milliseconds + fraction of a day in milliseconds
  //return difference between now and TLE timestamp in minutes
  return (nowMilliseconds - tleTime) / 60000;
}
