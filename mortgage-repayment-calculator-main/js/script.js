const form = document.getElementById("mortgage-form");
const amountInput = document.getElementById("amount");
const termInput = document.getElementById("term");
const rateInput = document.getElementById("rate");
const clearBtn = document.querySelector(".clear-btn");

const emptyState = document.querySelector(".empty-state");
const completedState = document.querySelector(".completed-state");

const monthlyResult = document.getElementById("monthly-result");
const totalResult = document.getElementById("total-result");

const radioGroupWrapper = document
  .querySelector(".radio-group")
  ?.closest(".form-group");

const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const clearErrors = () => {
  document.querySelectorAll(".form-group.error").forEach((field) => {
    field.classList.remove("error");
  });
};

const showError = (input) => {
  const inputField = input.closest(".form-group");
  if (inputField) {
    inputField.classList.add("error");
  }
};

const calculateRepayment = (amount, termYears, ratePercent) => {
  const monthlyRate = ratePercent / 100 / 12;
  const numberOfPayments = termYears * 12;

  let monthlyPayment;

  // Handle 0% interest case to avoid division by zero
  if (monthlyRate === 0) {
    monthlyPayment = amount / numberOfPayments;
  } else {
    // Formula: M = P[r(1+r)^n]/[(1+r)^n-1]
    monthlyPayment =
      (amount * (monthlyRate * (1 + monthlyRate) ** numberOfPayments)) /
      ((1 + monthlyRate) ** numberOfPayments - 1);
  }

  return {
    monthlyPayment,
    totalRepayment: monthlyPayment * numberOfPayments,
  };
};

const calculateInterestOnly = (amount, termYears, ratePercent) => {
  const monthlyRate = ratePercent / 100 / 12;
  const numberOfPayments = termYears * 12;

  const monthlyPayment = amount * monthlyRate;

  return {
    monthlyPayment,
    totalRepayment: monthlyPayment * numberOfPayments + amount,
  };
};

const validateValues = () => {
  let isValid = true;

  [amountInput, termInput, rateInput].forEach((input) => {
    const value = parseFloat(input.value);
    if (Number.isNaN(value) || value <= 0) {
      showError(input);
      isValid = false;
    }
  });

  const selectedRadio = form.querySelector('input[type="radio"]:checked');
  if (!selectedRadio) {
    if (radioGroupWrapper) radioGroupWrapper.classList.add("error");
    isValid = false;
  }

  return { isValid, selectedRadio: selectedRadio ? selectedRadio.value : null };
};

const handleFormSubmission = (event) => {
  event.preventDefault();
  clearErrors();

  const { isValid, selectedRadio } = validateValues();

  if (isValid) {
    const amount = parseFloat(amountInput.value);
    const term = parseFloat(termInput.value);
    const rate = parseFloat(rateInput.value);

    const result =
      selectedRadio === "repayment"
        ? calculateRepayment(amount, term, rate)
        : calculateInterestOnly(amount, term, rate);

    monthlyResult.textContent = formatCurrency(result.monthlyPayment);
    totalResult.textContent = formatCurrency(result.totalRepayment);

    emptyState.classList.add("inactive");
    completedState.classList.remove("inactive");
  }
};

const handleFormReset = () => {
  form.reset();
  clearErrors();
  emptyState.classList.remove("inactive");
  completedState.classList.add("inactive");
};

form.addEventListener("submit", handleFormSubmission);
clearBtn.addEventListener("click", handleFormReset);
