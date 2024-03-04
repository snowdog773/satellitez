import { observedGroundCalc } from "../utils/observedGroundCalc";

export const calcMasterArray = (data, coordinates, minutes) => {
  const timestamp = new Date().getTime();
  const tempArray = [];
  console.log(data, "calc master array");
  data.forEach((item) => {
    for (let i = 0; i < minutes; i++) {
      const groundObs = {
        ...observedGroundCalc(item, i, coordinates),
        minutes: i,
        noradId: item.noradId,
      };
      if (groundObs.elevation > 0) {
        tempArray.push(groundObs);
      }
    }
  });

  let lastMinute = 0;
  let maxElevation = 0;
  let noradId = null;
  const masterArray = [];
  let subArray = [];
  tempArray.forEach((e, i, arr) => {
    if (i === 0) {
      lastMinute = e.minutes;
      maxElevation = e.elevation; //initialise loop
      noradId = e.noradId;
      return;
    } else {
      if (e.minutes !== lastMinute + 1 || noradId !== arr[i + 1]?.noradId) {
        //handle setting single pass array to master array - checks norad id and current minutes to complete a pass and add it to
        //master array. Needed both because sometimes the saem object makes multiple passes in a time period so needed to compare
        //id and consecutive minutes.

        if (maxElevation > 30) {
          masterArray.push({ data: subArray, maxElevation });
        }
        subArray = [];
        maxElevation = 0;
        lastMinute = e.minutes;
        noradId = e.noradId;
      } else {
        subArray.push(e);
        if (e.elevation > maxElevation) {
          maxElevation = e.elevation;
        }
      }
      lastMinute = e.minutes;
      noradId = e.noradId;
    }
  });
  const orderedMasterArray = masterArray.sort(
    (a, b) => a.data[0].minutes - b.data[0].minutes
  );
  const calcTime = new Date().getTime() - timestamp;
  return { orderedMasterArray, calcTime };
};
