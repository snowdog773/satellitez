export const degreesToCompass = (degree) => {
  switch (true) {
    case degree > 348.75 || degree < 11.25:
      return "North";
      break;
    case degree > 11.25 && degree < 33.75:
      return "North-North-East";
      break;
    case degree > 33.75 && degree < 56.25:
      return "North-East";
      break;
    case degree > 56.25 && degree < 78.75:
      return "East=North-East";
      break;
    case degree > 78.75 && degree < 101.25:
      return "East";
      break;
    case degree > 101.25 && degree < 123.75:
      return "East-South-East";
      break;
    case degree > 123.75 && degree < 146.25:
      return "South-East";
      break;
    case degree > 146.25 && degree < 168.75:
      return "South-South-East";
      break;
    case degree > 168.75 && degree < 191.25:
      return "South";
      break;
    case degree > 191.25 && degree < 213.75:
      return "South-South-West";
      break;
    case degree > 213.75 && degree < 236.25:
      return "South-West";
      break;
    case degree > 236.25 && degree < 258.75:
      return "West-South-West";
      break;
    case degree > 258.75 && degree < 281.25:
      return "West";
      break;
    case degree > 281.25 && degree < 303.75:
      return "West-North-West";
      break;
    case degree > 303.75 && degree < 326.25:
      return "North-West";
      break;
    case degree > 326.25 && degree < 348.75:
      return "North-North-West";
      break;
  }
};
