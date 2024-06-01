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

    const car = {
      name: nameField.value,
      model: modelField.value,
      color: colorField.value,
      image: imageField.value,
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
        console.log("Updating car with data:", userId, carIdField.value, car);
        const updatedCar = await updateCar(userId, carIdField.value, car);
        console.log("Car updated successfully:", updatedCar);

        // Redirect back to models page
        window.location.href = "drive.html";
      } catch (error) {
        console.error("Error updating car:", error);
        alert("Error updating car: " + error.message);
      }
    }
  });
});
