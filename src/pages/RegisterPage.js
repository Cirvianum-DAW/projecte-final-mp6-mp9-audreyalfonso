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
  const confirmPassword = document.getElementById("confirm-password").value;

  try {
    // Validacions
    if (
      !username ||
      !name ||
      !birthday ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      throw new Error("All fields are required");
    }

    // Validem que el nom d'usuari només pot tindre entre 3 i 10 caràcters
    if (username.length < 3 || username.length > 10) {
      throw new Error("Username must be between 3 and 10 characters");
    }

    // El nom d'usuari només pot contenir lletres i números
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
      throw new Error("Username can only contain letters and numbers");
    }

    // El nom només pot contenir lletres i espais (espais sí, ja que un es pot dir "Maria Jose")
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      throw new Error("Name can only contain letters and spaces");
    }

    // Has de ser major d'edat por poder registrar-te
    const age = new Date().getFullYear() - new Date(birthday).getFullYear();
    if (age < 18) {
      throw new Error("You must be at least 18 years old");
    }

    // El correu electrònic ha de ser vàlid
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      throw new Error("Invalid email format");
    }

    // La contrasenya ha de tenir més de 8 caràcters
    if (password.length < 8) {
      throw new Error("Password must be at least 8 characters long");
    }

    // La contrasenya ha de tenir una majúscula, una minúscula, un número i un caràcter especial
    if (
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[0-9]/.test(password) ||
      !/[\W_]/.test(password)
    ) {
      throw new Error(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      );
    }

    // Les contrasenyes han de coincidir
    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    // El correu electrònic no es pot registrar més d'una vegada
    const users = await fetchFromApi("users");
    const emailExists = users.some(user => user.email === email);

    if (emailExists) {
      throw new Error("Email is already registered");
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
