const form = document.getElementById("age-form");

const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");

const dayError = document.getElementById("day-error");
const monthError = document.getElementById("month-error");
const yearError = document.getElementById("year-error");

const yearsOutput = document.getElementById("years-output");
const monthsOutput = document.getElementById("months-output");
const daysOutput = document.getElementById("days-output");

const inputs = [dayInput, monthInput, yearInput];
const errors = [dayError, monthError, yearError];
const outputs = [daysOutput, monthsOutput, yearsOutput];

const showError = (inputElement, errorElement, message) => {
  inputElement.parentElement.classList.add("error");
  errorElement.textContent = message;

  inputElement.setAttribute("aria-invalid", "true");
  inputElement.setAttribute("aria-describedby", errorElement.id);
};

const clearErrors = () => {
  inputs.forEach((input) => {
    input.parentElement.classList.remove("error");
    input.setAttribute("aria-invalid", "false");
    input.removeAttribute("aria-describedby");
  });

  errors.forEach((error) => {
    error.textContent = "";
  });

  outputs.forEach((output) => {
    output.textContent = "--";
  });
};

const clearInputError = (inputElement, errorElement) => {
  inputElement.parentElement.classList.remove("error");
  inputElement.setAttribute("aria-invalid", "false");
  inputElement.removeAttribute("aria-describedby");

  errorElement.textContent = "";
};

const isValidDate = (day, month, year) => {
  // Create date object
  const date = new Date(year, month - 1, day);

  // Check if it's valid date
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
};

const validateInputs = (day, month, year) => {
  let isValid = true;
  const currentYear = new Date().getFullYear();

  const hasError = {
    day: false,
    month: false,
    year: false,
  };

  // Check if fields are empty
  if (!dayInput.value) {
    showError(dayInput, dayError, "This field is required");
    isValid = false;
    hasError.day = true;
  }

  if (!monthInput.value) {
    showError(monthInput, monthError, "This field is required");
    isValid = false;
    hasError.month = true;
  }

  if (!yearInput.value) {
    showError(yearInput, yearError, "This field is required");
    isValid = false;
    hasError.year = true;
  }

  // If any field is empty, stop further validation
  if (!isValid) return false;

  // Check if day is valid
  if (isNaN(day) || day < 1 || day > 31) {
    showError(dayInput, dayError, "Must be a valid day");
    isValid = false;
    hasError.day = true;
  }

  // Check if month is valid
  if (isNaN(month) || month < 1 || month > 12) {
    showError(monthInput, monthError, "Must be a valid month");
    isValid = false;
    hasError.month = true;
  }

  // Check if year is valid
  if (isNaN(year)) {
    showError(yearInput, yearError, "Must be numeric");
    isValid = false;
    hasError.year = true;
  } else if (year <= 0) {
    showError(yearInput, yearError, "Must be a valid year");
    isValid = false;
    hasError.year = true;
  } else if (String(year).length !== 4) {
    showError(yearInput, yearError, "Must have 4 digits");
    isValid = false;
    hasError.year = true;
  }

  // If any field has an error, stop further validation
  if (!isValid) return false;

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const inputDate = new Date(year, month - 1, day);
  inputDate.setHours(0, 0, 0, 0);

  if (inputDate > currentDate) {
    if (!hasError.year) {
      showError(yearInput, yearError, "Must be in the past");
      hasError.year = true;
    }

    isValid = false;
  }

  // Check if date is valid
  if (isValid && !isValidDate(day, month, year)) {
    showError(dayInput, dayError, "Must be a valid date");
    hasError.day = true;

    if (!hasError.month) {
      showError(monthInput, monthError, "Must be a valid date");
      hasError.month = true;
    }

    if (!hasError.year) {
      showError(yearInput, yearError, "Must be a valid date");
      hasError.year = true;
    }

    isValid = false;
  }

  return isValid;
};

const calculateAge = (day, month, year) => {
  const birthDate = new Date(year, month - 1, day);
  const currentDate = new Date();

  let years = currentDate.getFullYear() - birthDate.getFullYear();
  let months = currentDate.getMonth() - birthDate.getMonth();
  let days = currentDate.getDate() - birthDate.getDate();

  // Adjust if current day is less than birthday
  if (days < 0) {
    // Get last month's date
    const daysInLastMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    ).getDate();

    // Add last month's days to current days
    days += daysInLastMonth;
    months--;
  }

  // Adjust if current month is less than birth month
  if (months < 0) {
    months += 12;
    years--;
  }

  // Display results
  yearsOutput.textContent = years;
  monthsOutput.textContent = months;
  daysOutput.textContent = days;
};

const focusFirstError = () => {
  const firstInvalidInput = inputs.find(
    (input) => input.getAttribute("aria-invalid") === "true"
  );

  if (firstInvalidInput) {
    firstInvalidInput.focus();
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Clear previous errors
  clearErrors();

  // Get input values
  const day = parseInt(dayInput.value);
  const month = parseInt(monthInput.value);
  const year = parseInt(yearInput.value);

  // Validate inputs
  const isValid = validateInputs(day, month, year);

  if (isValid) {
    calculateAge(day, month, year);
  } else {
    // Focus on first error
    focusFirstError();
  }
});

[
  {
    input: dayInput,
    error: dayError,
  },
  {
    input: monthInput,
    error: monthError,
  },
  {
    input: yearInput,
    error: yearError,
  },
].forEach(({ input, error }) => {
  input.addEventListener("input", () => clearInputError(input, error));
});
