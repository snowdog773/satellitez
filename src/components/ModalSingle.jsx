import { useSelector } from "react-redux";
const ModalSingle = ({ rawData }) => {
  const data = useSelector((state) => state.telemetry.telemetry);

  return (
    <>
      <ul>
        <li>Name : {rawData[0].name} </li>
        <li>Longitude : {data.lng.toFixed(2)}</li>
        <li>Latitude : {data.lat.toFixed(2)}</li>
        <li>Altitude : {(data.alt * 6371).toFixed(2)}km</li>
      </ul>
    </>
  );
};

export default ModalSingle;
