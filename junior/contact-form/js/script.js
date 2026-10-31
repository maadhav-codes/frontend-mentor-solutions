const form = document.querySelector('form');
const dialog = document.querySelector('dialog');
const closeDialogBtn = document.getElementById('close-dialog');

// Get all form elements
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const message = document.getElementById('message');
const consent = document.getElementById('consent');

function showError(inputElement, errMsg) {
  // Find error span next to input element
  const errorSpan = inputElement.parentNode.querySelector('.error-message');

  if (errorSpan) {
    errorSpan.textContent = errMsg;
  }

  inputElement.classList.add('error');

  // Set focus to the first error encountered
  if (!inputElement.hasAttribute('data-first-error')) {
    inputElement.setAttribute('data-first-error', 'true');
  }
}

function clearError() {
  const inputs = form.querySelectorAll('input, textarea');
  const errorSpans = form.querySelectorAll('.error-message');

  inputs.forEach((input) => {
    input.classList.remove('error');
    input.removeAttribute('data-first-error');
  });

  errorSpans.forEach((span) => {
    span.textContent = '';
  });
}

function focusFirstError() {
  const firstErrorInput = form.querySelector('input.error, textarea.error');
  if (firstErrorInput) {
    firstErrorInput.focus();
  }
}

function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

function closeDialog() {
  dialog.close();
  dialog.setAttribute('aria-hidden', 'true');

  const submitButton = form.querySelector('button[type="submit"]');
  if (submitButton) {
    submitButton.focus();
  }
}

closeDialogBtn.addEventListener('click', closeDialog);

// Close dialog when clicking outside of it
dialog.addEventListener('click', (e) => {
  if (e.target === dialog) {
    closeDialog();
  }
});

// Handle Escape key to close dialog
dialog.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeDialog();
  }
});

form.addEventListener('submit', function (event) {
  event.preventDefault();

  // Clear all errors first
  clearError();

  // Get values and trim whitespace
  const firstNameValue = firstName.value.trim();
  const lastNameValue = lastName.value.trim();
  const emailValue = email.value.trim();
  const messageValue = message.value.trim();

  // Validate each field and show errors
  let isValid = true;

  if (!firstNameValue) {
    showError(firstName, 'This field is required');
    isValid = false;
  }

  if (!lastNameValue) {
    showError(lastName, 'This field is required');
    isValid = false;
  }

  if (!emailValue) {
    showError(email, 'This field is required');
    isValid = false;
  } else if (!isValidEmail(emailValue)) {
    showError(email, 'Please enter a valid email address');
    isValid = false;
  }

  const queryTypeSelected = document.querySelector(
    'input[name="queryType"]:checked',
  );
  if (!queryTypeSelected) {
    const errorSpan = document.getElementById('queryType-error');
    errorSpan.textContent = 'Please select a query type';
    isValid = false;
  }

  if (!messageValue) {
    showError(message, 'This field is required');
    isValid = false;
  }

  if (!consent.checked) {
    const errorSpan = document.getElementById('consent-error');
    errorSpan.textContent = 'Please consent to being contacted';
    isValid = false;
  }

  if (isValid) {
    form.reset();
    dialog.showModal();
    dialog.setAttribute('aria-hidden', 'false');
    closeDialogBtn.focus();
  } else {
    focusFirstError();
  }
});
