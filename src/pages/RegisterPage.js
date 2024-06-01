import fetchFromApi from "../services/fetchAPI.js";

const registerForm = document.getElementById("register-form");
const errorMessage = document.getElementById("error-message");

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const name = document.getElementById("name").value;
  const birthday = document.getElementById("date_birthday").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    // Fem alguna validació simple
    if (!username || !name || !birthday || !email || !password) {
      throw new Error("All fields are required");
    }

    // Creem l'objecte del nou usuari
    const newUser = {
      username,
      name,
      birthday,
      email,
      password,
    };

    // Realitzem una solicitud POST per registrar el nou usuari
    const registeredUser = await fetchFromApi("users", {
      method: "POST",
      body: newUser,
    });

    console.log("User registered successfully:", registeredUser);

    alert("User registered successfully!");

    // Redirigim l'usuari al login
    window.location.href = "login.html";
  } catch (error) {
    console.error("Error registering user:", error.message);
    errorMessage.textContent = error.message;
    errorMessage.classList.remove("hidden");
  }
});
