import fetchFromApi from "./fetchAPI";

// Get all cars
async function getAllCars() {
  return fetchFromApi(`cars`);
}

// Get a simgle car by ID
async function getCarById(userId, carId) {
  return fetchFromApi(`users/${userId}/cars/${carId}`);
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
async function deleteCar(carId) {
  try {
    await fetchFromApi(`cars/${carId}`, {
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
