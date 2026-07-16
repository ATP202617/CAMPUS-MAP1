const markersContainer = document.getElementById("markers");
const popup = document.getElementById("popup");
const buildingName = document.getElementById("buildingName");
const buildingDescription = document.getElementById("buildingDescription");
const closePopup = document.getElementById("closePopup");
const navigateBtn = document.getElementById("navigateBtn");

const userLocation = document.getElementById("userLocation");
const map = document.getElementById("map-container");
const canvas = document.getElementById("routeCanvas");
const ctx = canvas.getContext("2d");

let currentBuilding = null;
let userX = null;
let userY = null;

// Resize canvas to match the map
function resizeCanvas() {
    canvas.width = map.offsetWidth;
    canvas.height = map.offsetHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Create building markers
buildings.forEach(building => {
    const marker = document.createElement("div");
    marker.className = "marker building";

    marker.style.left = building.x + "%";
    marker.style.top = building.y + "%";

    marker.onclick = () => {
        currentBuilding = building;
        buildingName.textContent = building.name;
        buildingDescription.textContent = building.description;
        popup.classList.remove("hidden");
    };

    markersContainer.appendChild(marker);
});

// Close popup
closePopup.onclick = () => {
    popup.classList.add("hidden");
};

// User location
if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(position => {

        // DEMO POSITION
        // We will replace this later with accurate map coordinates.

        userX = 97;
        userY = 25;

        userLocation.style.left = userX + "%";
        userLocation.style.top = userY + "%";

        userLocation.classList.remove("hidden");

    });
}

// Draw navigation line
navigateBtn.onclick = () => {

    if (!currentBuilding || userX === null) return;

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.beginPath();

    ctx.moveTo(
        canvas.width * userX/100,
        canvas.height * userY/100
    );

    ctx.lineTo(
        canvas.width * currentBuilding.x/100,
        canvas.height * currentBuilding.y/100
    );

    ctx.lineWidth = 5;
    ctx.strokeStyle = "#2196f3";
    ctx.stroke();

};
