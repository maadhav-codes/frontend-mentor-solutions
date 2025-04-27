const form = document.querySelector("form");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const successMessage = document.getElementById("successMessage");

const firstNameError = document.getElementById("firstNameError");
const lastNameError = document.getElementById("lastNameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

const isValidEmail = (email) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
};

const showError = (inputElement, errorElement, message) => {
  const formGroup = inputElement.parentElement;
  formGroup.classList.add("error");
  errorElement.textContent = message;

  inputElement.setAttribute("aria-invalid", "true");
  inputElement.setAttribute("aria-describedby", errorElement.id);
  errorElement.setAttribute("role", "alert");
};

const clearError = (inputElement, errorElement) => {
  const formGroup = inputElement.parentElement;
  formGroup.classList.remove("error");
  errorElement.textContent = "";

  inputElement.removeAttribute("aria-invalid");
  inputElement.removeAttribute("aria-describedby");
  errorElement.removeAttribute("role");
};

const showSuccess = (message) => {
  successMessage.textContent = message;
  successMessage.classList.add("show");

  setTimeout(() => {
    successMessage.classList.remove("show");
    successMessage.textContent = "";
  }, 3000);
};

const validateForm = (event) => {
  event.preventDefault();

  successMessage.classList.remove("show");
  successMessage.textContent = "";

  let isValid = true;

  if (firstName.value.trim() === "") {
    showError(firstName, firstNameError, "First Name cannot be empty");
    isValid = false;
  } else {
    clearError(firstName, firstNameError);
  }

  if (lastName.value.trim() === "") {
    showError(lastName, lastNameError, "Last Name cannot be empty");
    isValid = false;
  } else {
    clearError(lastName, lastNameError);
  }

  if (email.value.trim() === "") {
    showError(email, emailError, "Email cannot be empty");
    isValid = false;
  } else if (!isValidEmail(email.value.trim())) {
    showError(email, emailError, "Looks like this is not an email");
    isValid = false;
  } else {
    clearError(email, emailError);
  }

  if (password.value.trim() === "") {
    showError(password, passwordError, "Password cannot be empty");
    isValid = false;
  } else {
    clearError(password, passwordError);
  }

  if (isValid) {
    showSuccess("Thank you! Your free trial has been claimed!");
    form.reset();
  }
};

form.addEventListener("submit", validateForm);

form.addEventListener("input", (event) => {
  const inputElement = event.target;
  const errorElement = document.getElementById(`${inputElement.id}Error`);

  if (inputElement.id === "email") {
    if (
      inputElement.value.trim() !== "" &&
      isValidEmail(inputElement.value.trim())
    ) {
      clearError(inputElement, errorElement);
    }
  } else {
    if (inputElement.value.trim() !== "") {
      clearError(inputElement, errorElement);
    }
  }
});
