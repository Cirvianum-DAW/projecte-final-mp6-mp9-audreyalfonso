import { getCarById, updateCar } from "../services/carsApi";

document.addEventListener("DOMContentLoaded", async function () {
  const carForm = document.getElementById("edit-car-form");
  const carIdField = document.getElementById("car-id");
  const nameField = document.getElementById("name");
  const modelField = document.getElementById("model");
  const colorField = document.getElementById("color");
  const imageField = document.getElementById("image");

  // Check if we're editing an existing car
  const urlParams = new URLSearchParams(window.location.search);
  const carId = urlParams.get("id");

  // Get the authenticated user ID from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || !user.id) {
    throw new Error("User is not authenticated or user ID is missing");
  }
  const userId = user.id;

  if (carId) {
    try {
      // Use getCarById with both userId and carId
      const car = await getCarById(carId);
      if (car) {
        carIdField.value = car.id;
        nameField.value = car.name;
        modelField.value = car.model;
        colorField.value = car.color;
        imageField.value = car.image;
      }
    } catch (error) {
      console.error("Error fetching car details:", error);
    }
  }

  // Handle form submission
  carForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = nameField.value;
    const model = modelField.value;
    const color = colorField.value;
    const image = imageField.value;

    // Validaciones
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

    const car = {
      name,
      model,
      color,
      image,
    };

    if (carIdField.value) {
      try {
        // Get the authenticated user ID from localStorage
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.id) {
          throw new Error("User is not authenticated or user ID is missing");
        }

        const userId = user.id;

        // Update existing car
        const updatedCar = await updateCar(userId, carIdField.value, car);
        console.log("Car updated successfully:", updatedCar);

        // Mostrem un missatge d'èxit
        alert("Car updated successfully");

        // Redirect back to models page
        window.location.href = "drive.html";
      } catch (error) {
        console.error("Error updating car:", error);
        alert("Error updating car: " + error.message);
      }
    }
  });
});

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
