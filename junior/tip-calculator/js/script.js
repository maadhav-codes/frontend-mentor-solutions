const main = () => {
  const billInput = document.getElementById("bill");
  const tipButtons = document.querySelectorAll("button[data-tip-percentage]");
  const customTipInput = document.getElementById("custom-tip");
  const peopleInput = document.getElementById("people");
  const tipAmountOutput = document.getElementById("tip-amount");
  const totalPerPersonOutput = document.getElementById("total-per-person");
  const resetButton = document.querySelector("button[type='reset']");
  const form = document.getElementById("tip-form");

  const billErrorMsg = document.getElementById("bill-error");
  const peopleErrorMsg = document.getElementById("people-error");
  const billGroup = billInput.closest(".form-group");
  const peopleGroup = peopleInput.closest(".form-group");

  // Store the current values used for calculation
  let billAmount = 0.0;
  let tipPercentage = 0;
  let numberOfPeople = 0;
  let activeTipButton = null;

  // Formats a number into a currency string
  function formatCurrency(amount) {
    if (!isFinite(amount) || isNaN(amount)) {
      amount = 0;
    }

    return `$${amount.toFixed(2)}`;
  }

  // Validates inputs and perform tip calculation
  // Updates the UI with results
  function calculateAndDisplayResults() {
    let isBillValid = billAmount >= 0;
    let isPeopleValid = numberOfPeople > 0 && Number.isInteger(numberOfPeople);

    if (!isBillValid) {
      billGroup.classList.add("error");
    } else {
      billGroup.classList.remove("error");
    }

    if (!isPeopleValid) {
      peopleErrorMsg.textContent = "Can't be zero";
      peopleGroup.classList.add("error");
    } else {
      peopleErrorMsg.textContent = "";
      peopleGroup.classList.remove("error");
    }

    // Calculation
    if (isBillValid && isPeopleValid) {
      const tipDecimal = tipPercentage / 100;
      const totalTip = billAmount * tipDecimal;
      const totalBill = billAmount + totalTip;
      const tipPerPerson = totalTip / numberOfPeople;
      const totalPerPerson = totalBill / numberOfPeople;

      tipAmountOutput.textContent = formatCurrency(tipPerPerson);
      totalPerPersonOutput.textContent = formatCurrency(totalPerPerson);

      resetButton.disabled = false;
    } else {
      tipAmountOutput.textContent = formatCurrency(0);
      totalPerPersonOutput.textContent = formatCurrency(0);
    }

    if (billAmount > 0 || tipPercentage > 0 || numberOfPeople > 0) {
      resetButton.disabled = false;
    }
  }

  billInput.addEventListener("input", () => {
    billAmount = parseFloat(billInput.value) || 0.0;
    calculateAndDisplayResults();
  });

  customTipInput.addEventListener("input", () => {
    tipPercentage = parseInt(customTipInput.value, 10) || 0;

    // If custom value os entered, remove the active state from present buttons
    if (activeTipButton) {
      activeTipButton.classList.remove("active");
      activeTipButton = null;
    }

    // Add validation for custom tip range (0-100) if needed
    if (tipPercentage < 0) tipPercentage = 0;
    if (tipPercentage > 100) tipPercentage = 100;
    customTipInput.value = tipPercentage;

    calculateAndDisplayResults();
  });

  peopleInput.addEventListener("input", () => {
    numberOfPeople = parseInt(peopleInput.value, 10) || 0;
    calculateAndDisplayResults();
  });

  tipButtons.forEach((button) =>
    button.addEventListener("click", (event) => {
      const clickedButton = event.target;

      // Remove any active button previously selected
      if (activeTipButton) {
        activeTipButton.classList.remove("active");
      }

      // Add active class to clicked button
      clickedButton.classList.add("active");
      activeTipButton = clickedButton;

      // Get top percentage from button data attribute
      tipPercentage = parseInt(clickedButton.dataset.tipPercentage, 10) || 0;

      // Clear custom tip input when button is clicked
      customTipInput.value = "";

      calculateAndDisplayResults();
    })
  );

  form.addEventListener("reset", () => {
    // Clear input fields
    billInput.value = "";
    customTipInput.value = "";
    peopleInput.value = "";

    // Reset state variables
    billAmount = 0.0;
    tipPercentage = 0;
    numberOfPeople = 0;

    // Reset displayed results
    tipAmountOutput.textContent = formatCurrency(0);
    totalPerPersonOutput.textContent = formatCurrency(0);

    // Clear active button
    if (activeTipButton) {
      activeTipButton.classList.remove("active");
      activeTipButton = null;
    }

    // Clear error messages and states
    billErrorMsg.textContent = "";
    peopleErrorMsg.textContent = "";
    billGroup.classList.remove("error");
    peopleGroup.classList.remove("error");

    // Disable the reset button
    resetButton.disabled = true;

    billInput.focus();
  });

  // Initial State
  resetButton.disabled = true;

  tipAmountOutput.textContent = formatCurrency(0);
  totalPerPersonOutput.textContent = formatCurrency(0);
};

document.addEventListener("DOMContentLoaded", main);
