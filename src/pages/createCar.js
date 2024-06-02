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

  // Validacions
  if (!name || !model || !color || !image) {
    alert("All fields are required");
    return;
  }

  if (name.length < 3) {
    alert("Name must be at least 3 characters long");
    return;
  }

  if (model.length < 2) {
    alert("Model must be at least 2 characters long");
    return;
  }

  if (color.length < 3) {
    alert("Color must be at least 3 characters long");
    return;
  }

  if (!isValidUrl(image)) {
    alert("Invalid image URL");
    return;
  }

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

// Funció per validar URLs
function isValidUrl(url) {
  const urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR validate ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // validate fragment locator
  return !!urlPattern.test(url);
}
