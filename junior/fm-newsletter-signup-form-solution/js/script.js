const form = document.querySelector(".signup-form");
const formGroup = document.querySelector(".form-group");

const inputElement = document.getElementById("email");
const errorElement = document.getElementById("email-error");

const signupSection = document.querySelector(".newsletter-signup");
const successSection = document.querySelector(".newsletter-success");

const userEmailSpan = document.getElementById("user-email");
const dismissButton = document.querySelector(".newsletter-success button");

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

const clearError = () => {
  formGroup.classList.remove("error");
  errorElement.textContent = "";

  inputElement.removeAttribute("aria-invalid");
  inputElement.removeAttribute("aria-describedby");
  errorElement.removeAttribute("role");
};

const showSuccessView = (email) => {
  userEmailSpan.textContent = email;

  signupSection.classList.add("hidden");

  setTimeout(() => {
    signupSection.style.display = "none";
    successSection.style.display = "block";

    successSection.offsetHeight;
    successSection.classList.add("visible");
  }, 300);

  dismissButton.focus();
};

const showSignupView = () => {
  successSection.classList.remove("visible");

  setTimeout(() => {
    successSection.style.display = "none";
    signupSection.style.display = "";

    signupSection.offsetHeight;
    signupSection.classList.remove("hidden");
  }, 300);

  form.reset();
  clearError();

  inputElement.focus();
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = inputElement.value.trim();

  if (formGroup.classList.contains("error")) {
    clearError();
  }

  if (!email) {
    showError("Email is required");
    inputElement.focus();
    return;
  }

  if (!isValidEmail(email)) {
    showError("Valid email required");
    inputElement.focus();
    return;
  }

  showSuccessView(email);
});

inputElement.addEventListener("input", clearError);

dismissButton.addEventListener("click", () => {
  showSignupView();
});
