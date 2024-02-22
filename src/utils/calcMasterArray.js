import { observedGroundCalc } from "../utils/observedGroundCalc";

export const calcMasterArray = (data, coordinates, minutes) => {
  const timestamp = new Date().getTime();
  const tempArray = [];
  data.forEach((item) => {
    for (let i = 10; i < minutes; i++) {
      //get rid of first 10 minutes
      const groundObs = {
        ...observedGroundCalc(item, i, coordinates),
        minutes: i,
      };
      if (groundObs.elevation > 0) {
        tempArray.push(groundObs);
      }
    }
  });
  let lastMinute = 0;
  let maxElevation = 0;
  const masterArray = [];
  let subArray = [];
  tempArray.forEach((e, i) => {
    // console.log(e);
    if (i === 0) {
      // console.log("init");
      lastMinute = e.minutes;
      maxElevation = e.elevation; //initialise loop
      return;
    } else {
      // console.log(e.minutes, "e minutes", lastMinute, "lastminute");

      if (e.minutes !== lastMinute + 1) {
        //handle setting single pass array to master array
        // console.log("do something with temp array");
        if (maxElevation > 30) {
          masterArray.push({ data: subArray, maxElevation });
        }
        subArray = [];
        maxElevation = 0;
        lastMinute = e.minutes;
      } else {
        // console.log("same group");
        subArray.push(e);
        if (e.elevation > maxElevation) {
          maxElevation = e.elevation;
        }
      }
      lastMinute = e.minutes;
    }
    // console.log(maxElevation, "max elev");
  });
  const orderedMasterArray = masterArray.sort(
    (a, b) => a.data[0].minutes - b.data[0].minutes
  );
  console.log(new Date().getTime() - timestamp);
  return orderedMasterArray;
};
