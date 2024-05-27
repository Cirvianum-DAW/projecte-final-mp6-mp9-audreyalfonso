// mobile-menu-button

document
  .getElementById("mobile-menu-button")
  .addEventListener("click", function () {
    var mobileMenu = document.getElementById("mobile-menu");
    if (mobileMenu.style.display === "block") {
      mobileMenu.style.display = "none";
    } else {
      mobileMenu.style.display = "block";
    }
  });

//--------------------------------------

import { isAuthenticated, logout } from "../src/services/auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const driveLink = document.getElementById("drive-link");
  const routesLink = document.getElementById("routes-link");
  const informationLink = document.getElementById("information-link");
  const loginLink = document.getElementById("login-link");
  const logoutLink = document.getElementById("logout-link");

  const mobileDriveLink = document.getElementById("mobile-drive-link");
  const mobileRoutesLink = document.getElementById("mobile-routes-link");
  const mobileInformationLink = document.getElementById(
    "mobile-information-link"
  );
  const mobileLoginLink = document.getElementById("mobile-login-link");
  const mobileLogoutLink = document.getElementById("mobile-logout-link");

  if (isAuthenticated()) {
    driveLink.classList.remove("hidden");
    routesLink.classList.remove("hidden");
    informationLink.classList.remove("hidden");
    logoutLink.classList.remove("hidden");

    mobileDriveLink.classList.remove("hidden");
    mobileRoutesLink.classList.remove("hidden");
    mobileInformationLink.classList.remove("hidden");
    mobileLogoutLink.classList.remove("hidden");

    loginLink.classList.add("hidden");
    mobileLoginLink.classList.add("hidden");
  }

  logoutLink.addEventListener("click", () => {
    logout();
    window.location.reload();
  });

  mobileLogoutLink.addEventListener("click", () => {
    logout();
    window.location.reload();
  });
});

//-------------------------------------------------

import { getAllCars, createCar, deleteCar } from "./services/carsApi.js";

//----------------- Llistar cotxes -------------------------

async function fetchCars() {
  try {
    const cars = await getAllCars();
    return cars;
  } catch (error) {
    throw new Error("Error fetching cars data");
  }
}

function createCarCard(car) {
  return `
    <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
      <div class="h-[200px] overflow-hidden rounded-t-lg">
        <img class="w-full h-full object-cover" src="${car.image}" alt="Image of a ${car.name} ${car.model}">
      </div>
      <div class="p-5">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Drive a ${car.name} ${car.model}
        </h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Enjoy the experience of driving a ${car.name} ${car.model} in ${car.color} color.
        </p>
        <button onclick="(() => handleDeleteCar('${car.id}'))()" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-neutral-600 rounded-lg hover:bg-neutral-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Delete Car
        </button>
      </div>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const cars = await fetchCars();
    const container = document.querySelector(
      ".flex.justify-center.flex-wrap.items-center.py-10.gap-10"
    );
    container.innerHTML = cars.map((car) => createCarCard(car)).join("");
  } catch (error) {
    console.error("Error:", error);
  }
});

//----------------- Fi llistar cotxes -------------------------

//------------------- Crear cotxes ----------------------------

import fetchFromApi from "./services/fetchAPI.js";

const createCarForm = document.getElementById("create-car-form");

createCarForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Obtenim els valors del formulari
  const name = document.getElementById("name").value;
  const model = document.getElementById("model").value;
  const color = document.getElementById("color").value;
  const image = document.getElementById("image").value;

  if (!isAuthenticated()) {
    console.error("User is not authenticated");
    return;
  }

  // Obtenim l'ID de l'usuari autentificat
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;

  try {
    // Contruim l'objecte nou del cotxe
    const newCar = {
      name,
      model,
      color,
      image,
      userId,
    };

    // Realitzem una sol·licitud POST per afegir el nou cotxe a la API de cotxes
    const addedCar = await fetchFromApi("cars", {
      method: "POST",
      body: newCar,
    });

    console.log("Car added successfully:", addedCar);

    // Mostrem un missatge d'èxit
    alert("Car added successfully: " + addedCar.name);

    // Refresquem la pàgina i redirigim
    window.location.href = "drive.html";
  } catch (error) {
    console.error("Error adding car:", error.message);
  }
});

//----------------- Fi crear cotxes -------------------------

//------------------- Eliminar cotxes -----------------------

// window.handleDeleteCar = async function (carId) {
//   try {
//     await fetchFromApi(`cars/${carId}`, {
//       method: "DELETE",
//     });
//     console.log("Car deleted successfully");
//     location.reload();
//   } catch (error) {
//     console.error("Error deleting car:", error);
//   }
// };

//----------------- Fi eliminar cotxes -----------------------
