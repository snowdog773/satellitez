import { CChart } from "@coreui/react-chartjs";
import { degreesToCompass } from "../utils/degreesToCompass";
import { Link } from "react-router-dom";
import { apiNoradCall } from "../utils/apiNoradCall";
import { useDispatch } from "react-redux";
import { setData } from "../redux/reducers/dataSlice";
const EventItem = ({ data, refTime }) => {
  const dispatch = useDispatch();

  const { name, azimuth, minutes, elevation, alt, noradId } = data.data[0];
  const minutesToDateTime = (mins) => {
    const options = { hour: "2-digit", minute: "2-digit" };
    return new Date(refTime.getTime() + mins * 60000).toLocaleTimeString(
      [], // default locale
      options
    );
  };

  const getDate = (mins) => {
    return new Date(refTime.getTime() + mins * 60000).toLocaleDateString([], {
      dateStyle: "long",
    });
  };

  const trackHandler = async () => {
    const data = await apiNoradCall(noradId);

    dispatch(setData(data));
  };
  ///////////////set up data for chart plotting///////////
  const elevationSet = data.data.map((e) => e.elevation);
  const timeSet = data.data.map((_, i) => i);
  const azimuthSet = data.data.map((e) => e.azimuth);

  return (
    <>
      <div className="visibleItem">
        <h3>{name}</h3>
        <h4>Norad ID : {noradId}</h4>
        <div style={{ width: "60%", margin: "auto" }}>
          <CChart
            type="line"
            data={{
              labels: timeSet,
              datasets: [
                {
                  label: "Elevation",
                  backgroundColor: "#a00",
                  borderColor: "rgba(179,181,198,1)",
                  pointBackgroundColor: "rgba(179,181,198,1)",
                  pointBorderColor: "#fff",
                  fill: "origin",
                  // pointHoverBackgroundColor: "#fff",
                  // pointHoverBorderColor: "rgba(179,181,198,1)",
                  // tooltipLabelColor: "rgba(179,181,198,1)",
                  data: elevationSet,
                  tension: 0.4, //curvature of line
                },
              ],
            }}
            options={{
              plugins: { legend: { display: false } },
              aspectRatio: 1.5,

              scales: {
                y: {
                  title: {
                    display: true,
                    text: "Elevation (deg)",
                    color: "#bbb",
                  },
                  grid: { color: "#555" },
                  ticks: { color: "#bbb" },
                },
                x: {
                  title: { display: true, text: "Time (mins)", color: "#bbb" },
                  grid: { color: "#555" },
                  ticks: { color: "#bbb" },
                },
              },
              tooltips: {
                enabled: false,
              },

              events: [], //disables annoying hover effect on chart
            }}
          />
        </div>{" "}
        <ul>
          <li>Date : {getDate(minutes)} </li>
          <li>Visible from : {minutesToDateTime(minutes)} </li>
          <li>
            Visible until : {minutesToDateTime(minutes + data.data.length - 1)}
          </li>
          <li>
            {" "}
            Max Elevation : {data.maxElevation.toFixed(0)} <sup>o</sup>
          </li>
          <li>
            {" "}
            Rises : {degreesToCompass(azimuth)} {azimuth.toFixed(0)}{" "}
            <sup>o</sup>{" "}
          </li>
          <li>
            Sets :{" "}
            {degreesToCompass(
              data.data[data.data.length - 1].azimuth.toFixed(0)
            )}{" "}
            {data.data[data.data.length - 1].azimuth.toFixed(0)}
            <sup>o</sup>
          </li>
          <li>Altitude : {alt.toFixed(0)}km</li>
        </ul>
        <Link to="/tracking">
          {" "}
          <button className="button-6" onClick={() => trackHandler()}>
            TRACK
          </button>
        </Link>
      </div>
    </>
  );
};

export default EventItem;
