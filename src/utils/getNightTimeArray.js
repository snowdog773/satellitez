export const getNightTimeArray = (data) => {
  const output = data.map((e, i, arr) => {
    if (i === arr.length - 1) {
      return null;
    }
    return {
      dusk: new Date(`${e.date} ${arr[i + 1].dusk}`),
      dawn: new Date(`${arr[i + 1].date} ${arr[i + 1].dawn}`),
    };
  });

  return output;
};
// const time = Date.parse(
//     `${daylight.data.results[0].date} ${daylight.data.results[0].dawn}`
