const getLocationBtn = document.getElementById("getLocationBtn");
const removeLocationBtn = document.getElementById("removeLocationBtn");
const mapDiv = document.getElementById("map");

// check if the Geolocation API is supported by the browser
if ("geolocation" in navigator) {
  getLocationBtn.addEventListener("click", getLocation);
  const lat = localStorage.getItem("lat");
  const long = localStorage.getItem("long");
  if (lat && long) {
    getLocationBtn.disabled = true;
    showMap(lat, long);
  }
} else {
  getLocationBtn.disabled = true;
  alert("Geolocation is not supported by this browser.");
}

// function to get the user's location
function getLocation() {
  getLocationBtn.disabled = true;
  navigator.geolocation.getCurrentPosition(showPosition, showError);
}

// function to handle successful geolocation
function showPosition(position) {
  const lat = position.coords.latitude;
  const long = position.coords.longitude;
  localStorage.setItem("lat", lat);
  localStorage.setItem("long", long);
  showMap(lat, long);
}

// function to handle geolocation error
function showError(error) {
  alert(`Geolocation error: ${error.message}`);
  getLocationBtn.disabled = false;
}

// function to display the map
function showMap(lat, long) {
  const mapUrl = `https://www.google.com/maps/embed/v1/view?key=YOUR_API_KEY&center=${lat},${long}&zoom=15`;
  const mapHtml = `<iframe width="100%" height="100%" frameborder="0" style="border:0" src="${mapUrl}" allowfullscreen></iframe>`;
  mapDiv.innerHTML = mapHtml;
  getLocationBtn.disabled = true;
  removeLocationBtn.disabled = false;
}

// function to remove location from local storage
function removeLocation() {
  localStorage.removeItem("lat");
  localStorage.removeItem("long");
  getLocationBtn.disabled = false;
  removeLocationBtn.disabled = true;
  mapDiv.innerHTML = "";
}

removeLocationBtn.addEventListener("click", removeLocation);
