import fetchFromApi from "./fetchAPI";

// Get all cars
async function getAllCars() {
  return fetchFromApi(`cars`);
}

// Get a single car by ID
async function getCarById(carId) {
  return fetchFromApi(`/cars/${carId}`);
}

// Get a single user by ID
async function getUserById(id) {
  return fetchFromApi(`users/${id}`);
}

// Create a new car
async function createCar(userId, car) {
  return fetchFromApi(`users/${userId}/cars`, {
    method: "POST",
    body: JSON.stringify(car),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// Update a car
async function updateCar(userId, carId, car) {
  return fetchFromApi(`users/${userId}/cars/${carId}`, {
    method: "PUT",
    body: JSON.stringify(car),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// Delete a car
async function deleteCar(userId, carId) {
  try {
    await fetchFromApi(`users/${userId}/cars/${carId}`, {
      method: "DELETE",
    });
  } catch (error) {
    if (error.status === 404) {
      console.error(`Car with ID ${carId} not found.`);
    } else {
      throw error;
    }
  }
}

export { getAllCars, getCarById, getUserById, createCar, updateCar, deleteCar };
