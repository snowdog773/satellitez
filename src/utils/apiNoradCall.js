import axios from "axios";

import { urlStem } from "../utils/data";

export const apiNoradCall = async (input) => {
  console.log(input);
  try {
    const result = await axios.get(`${urlStem}/noradSearch/${input}`);

    if (result.data.length === 0) {
      console.log("Norad Id not found");
      return [];
    } else {
      console.log(result.data);
      return result.data;
    }
  } catch (err) {
    console.log(err, "Invalid ID format, please enter a 5 digit number");
    return [];
  }
};
