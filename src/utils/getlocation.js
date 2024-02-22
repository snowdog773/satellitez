const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

export async function getLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}
