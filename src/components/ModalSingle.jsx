import { useSelector } from "react-redux";
const ModalSingle = ({ rawData }) => {
  const data = useSelector((state) => state.telemetry.telemetry);
  const {
    name,
    country,
    description,
    intldes,
    launch_date,
    links,
    orbital_period,
    type,
    noradId,
  } = rawData[0];
  const linkArray = JSON.parse(links);

  return (
    <>
      <h2>NAME</h2>
      <p> {name} </p>
      <h2> ABOUT</h2>
      <p>Country : {country}</p>
      <p>Norad ID : {noradId}</p>
      <p>International Designator : {intldes}</p>
      <p>Type : {type}</p>
      <p>Launch Date : {launch_date}</p>
      <p>{description}</p>
      <h2>TELEMETRY</h2>
      <ul>
        <li>Longitude : {data.lng.toFixed(2)}</li>
        <li>Latitude : {data.lat.toFixed(2)}</li>
        <li>Altitude : {(data.alt * 6371).toFixed(2)}km</li>
        <li>Orbital Period : {orbital_period} minutes</li>
      </ul>
      <ul>
        {linkArray.length > 0 &&
          linkArray.map((e) => (
            <li>
              <a href={e.link_url} target="_blank">
                {e.link_name}
              </a>{" "}
            </li>
          ))}
      </ul>
    </>
  );
};

export default ModalSingle;
