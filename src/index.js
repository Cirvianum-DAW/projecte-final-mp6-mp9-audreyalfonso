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

import { isAuthenticated, logout } from "./services/auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const driveLink = document.getElementById("drive-link");
  const routesLink = document.getElementById("routes-link");
  const informationLink = document.getElementById("information-link");
  const loginLink = document.getElementById("login-link");
  const registerLink = document.getElementById("register-link");
  const logoutLink = document.getElementById("logout-link");

  const mobileDriveLink = document.getElementById("mobile-drive-link");
  const mobileRoutesLink = document.getElementById("mobile-routes-link");
  const mobileInformationLink = document.getElementById(
    "mobile-information-link"
  );
  const mobileLoginLink = document.getElementById("mobile-login-link");
  const mobileRegisterLink = document.getElementById("mobile-register-link");
  const mobileLogoutLink = document.getElementById("mobile-logout-link");

  if (isAuthenticated()) {
    driveLink.classList.remove("hidden");
    routesLink.classList.remove("hidden");
    informationLink.classList.remove("hidden");
    logoutLink.classList.remove("hidden");
    loginLink.classList.add("hidden");
    registerLink.classList.add("hidden");

    mobileDriveLink.classList.remove("hidden");
    mobileRoutesLink.classList.remove("hidden");
    mobileInformationLink.classList.remove("hidden");
    mobileLogoutLink.classList.remove("hidden");
    mobileLoginLink.classList.add("hidden");
    mobileRegisterLink.classList.add("hidden");
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
import { getAllCars, deleteCar } from "./services/carsApi.js";

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
        <a href="editCar.html?id=${car.id}" class="edit-car inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit</a>
        <button class="delete-car-button inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" data-car-id="${car.id}">
          Delete
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

    // Afegir event listeners als botons d'eliminar i editar
    const deleteButtons = document.querySelectorAll(".delete-car-button");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", async (event) => {
        const carId = event.target.getAttribute("data-car-id");

        // Obtenir userId de l'emmagatzament local
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user.id;

        await handleDeleteCar(userId, carId);
      });
    });
  } catch (error) {
    console.error("Error:", error);
  }
});

//----------------- Fi llistar cotxes -------------------------

//------------------- Eliminar cotxes -----------------------

import { deleteCar } from "./services/carsApi.js";

async function handleDeleteCar(userId, carId) {
  try {
    await deleteCar(userId, carId);
    console.log("Car deleted successfully");
    alert("Car deleted successfully");
    location.reload(); // Refresquem la pàgina després d'eliminar
  } catch (error) {
    console.error("Error deleting car:", error);
  }
}

//----------------- Fi eliminar cotxes -----------------------
