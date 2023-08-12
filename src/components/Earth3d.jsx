import Globe from "react-globe.gl";
import globeWrap from "../assets/globewrap.jpg";
import { useSelector, useDispatch } from "react-redux";

import { satPositionCalc } from "../utils/satPositionCalc";

const Earth3d = () => {
  const rawTle = useSelector((state) => state.data.iss);
  const issTrue = useSelector((state) => state.data.issTrue);

  if (issTrue) {
    const outputArray = [];
    rawTle.forEach((item) => {
      const output = satPositionCalc(item); //converts the raw tle data to lat lng alt

      outputArray.push(output);
    });

    return (
      <>
        <Globe
          // showGraticules={true}
          globeImageUrl={globeWrap}
          objectsData={outputArray}
          objectLat="lat"
          objectLng="lng"
          objectAltitude="alt"
          objectLabel="name"
          // objectThreeObject={satObject}
          // pointsData={gData}
          // pointAltitude="size"
          // pointColor="color"
        />
      </>
    );
  } else return <>Waiting for data</>;
};

export default Earth3d;
