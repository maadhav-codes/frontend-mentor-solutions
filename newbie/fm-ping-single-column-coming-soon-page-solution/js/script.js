const form = document.querySelector("form");
const formGroup = document.querySelector(".form-group");
const inputElement = document.querySelector("form input");
const errorElement = document.querySelector("output.error-message");
const successElement = document.querySelector("output.success-message");

const isValidEmail = (email) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
};

const showError = (message) => {
  formGroup.classList.add("error");
  errorElement.textContent = message;

  inputElement.setAttribute("aria-invalid", "true");
  inputElement.setAttribute("aria-describedby", errorElement.id);
  errorElement.setAttribute("role", "alert");
};

const showSuccess = (message) => {
  successElement.textContent = message;
  successElement.classList.add("show");

  setTimeout(() => {
    successElement.classList.remove("show");
    successElement.textContent = "";
  }, 3000);
};

const clearError = () => {
  formGroup.classList.remove("error");
  errorElement.textContent = "";

  inputElement.removeAttribute("aria-invalid");
  inputElement.removeAttribute("aria-describedby");
  errorElement.removeAttribute("role");
};

const validateForm = (event) => {
  event.preventDefault();

  successElement.classList.remove("show");
  successElement.textContent = "";

  const email = event.target.email.value.trim();

  if (email === "") {
    showError("Whoops! It looks like you forgot to add your email");
    return;
  }

  if (!isValidEmail(email)) {
    showError("Please provide a valid email address");
    return;
  }

  clearError();
  showSuccess("Thanks for subscribing!");
  form.reset();
};

form.addEventListener("submit", validateForm);

inputElement.addEventListener("input", () => {
  if (formGroup.classList.contains("error")) {
    clearError();
  }
});
