const isValidEmail = (email) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
};

function handleForm() {
  const formElement = document.querySelector("form");
  const inputElement = document.querySelector("form input");
  const formGroup = document.querySelector(".form-group");

  function showError(message) {
    const existingError = formGroup.querySelector(".error-text");

    if (existingError) {
      existingError.remove();
    }

    formGroup.classList.add("error");
    formGroup.classList.remove("success");

    const errorElement = document.createElement("p");
    errorElement.classList.add("error-text");
    errorElement.textContent = message;
    formGroup.appendChild(errorElement);
  }

  function clearError() {
    if (formGroup.classList.contains("error")) {
      formGroup.classList.remove("error");

      const errorElement = formGroup.querySelector(".error-text");
      if (errorElement) {
        errorElement.remove();
      }
    }
  }

  function showSuccess() {
    const existingSuccess = formGroup.querySelector(".success-text");
    if (existingSuccess) {
      existingSuccess.remove();
    }

    formGroup.classList.add("success");
    formGroup.classList.remove("error");

    const successElement = document.createElement("p");
    successElement.classList.add("success-text");
    successElement.textContent = "Thank you for subscribing!";
    formGroup.appendChild(successElement);
  }

  formElement.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = event.target.email.value.trim();

    if (!email) {
      showError("Email cannot be empty");
      return;
    }

    if (!isValidEmail(email)) {
      showError("Please provide a valid email");
      return;
    }

    clearError();

    showSuccess();

    formElement.reset();
  });

  inputElement.addEventListener("input", clearError);

  inputElement.addEventListener("blur", () => {
    const email = inputElement.value.trim();
    if (email && !isValidEmail(email)) {
      showError("Please provide a valid email");
    }
  });
}

document.addEventListener("DOMContentLoaded", handleForm);
