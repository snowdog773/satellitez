import { useSelector, useDispatch } from "react-redux";
import { useRef, useEffect } from "react";
import { parseJSON } from "date-fns";
import { setModalHeight } from "../redux/reducers/modalSlice";

const ModalSingle = ({ rawData }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);
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
    launch_site,
    inclination,
    apogee,
    perigee,
    rcs,
  } = rawData[0];

  const linkArray = JSON.parse(links);
  useEffect(() => {
    console.log(ref.current.clientHeight);
    dispatch(setModalHeight(ref.current.clientHeight));
  }, [noradId]);
  return (
    <div ref={ref}>
      <div className="singleDetails">
        <h2>{name}</h2>
      </div>
      <div className="singleDetails">
        <h3> ABOUT</h3>
        <ul>
          <li>Country : {country}</li>
          <li>Norad ID : {noradId}</li>
          {intldes && <li>International Designator : {intldes}</li>}
          {type && <li>Type : {type}</li>}
          {launch_date && (
            <li>Launch Date : {parseJSON(launch_date).toLocaleDateString()}</li>
          )}
          {launch_site && <li>Launch Site : {launch_site}</li>}
          {rcs && (
            <li>
              Radar Cross Section : {rcs} m<sup>2</sup>
            </li>
          )}
        </ul>
      </div>
      <div className="singleDetails">
        <h3>TELEMETRY</h3>
        <ul>
          <li>Longitude : {data.lng.toFixed(2)}</li>
          <li>Latitude : {data.lat.toFixed(2)}</li>
          <li>Altitude : {(data.alt * 6371).toFixed(2)} km</li>
          {orbital_period && <li>Orbital Period : {orbital_period} minutes</li>}
          {inclination && (
            <li>
              Inclination : {inclination}
              <sup>o</sup>
            </li>
          )}
          {apogee && <li>Apogee : {apogee} km</li>}
          {perigee && <li>Perigee : {perigee} km</li>}
        </ul>
      </div>
      {description && (
        <div className="singleDetails">
          <p>{description}</p>
        </div>
      )}
      <ul className="detailLinks">
        {linkArray.length > 0 &&
          linkArray.map((e, i) => (
            <li>
              <a href={e.link_url} target="_blank" key={i}>
                {e.link_name}
              </a>{" "}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ModalSingle;
