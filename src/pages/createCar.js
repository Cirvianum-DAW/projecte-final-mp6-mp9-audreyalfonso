import { isAuthenticated } from "../services/auth.js";
import fetchFromApi from "../services/fetchAPI.js";

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
