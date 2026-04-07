const form = document.getElementById('ticket-form');

const nameInput = document.getElementById('full-name');
const emailInput = document.getElementById('email');
const githubInput = document.getElementById('github-username');

function showError(input, message) {
  const inputGroup = input.parentElement;
  
  if (inputGroup) {
    inputGroup.classList.add('error-state');
    const errorText = inputGroup.querySelector('.error-info p');
    if (errorText) errorText.textContent = message;
  }
}

function clearAllErrors() {
  const inputGroups = document.querySelectorAll('.input-group');

  inputGroups.forEach((group) => {
    group.classList.remove('error-state');
    
    const errorText = group.querySelector('.error-info p');
    if (errorText) errorText.textContent = '';
  });
}

function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

function validateForm(fullName, email, githubUsername) {
  let isValid = true;

  if (!fullName) {
    showError(nameInput, 'Please enter your full name.');
    isValid = false;
  }

  if (!email) {
    showError(emailInput, 'Please enter your email address.');
    isValid = false;
  } else if (!isValidEmail(email)) {
    showError(emailInput, 'Please enter a valid email address.');
    isValid = false;
  }

  if (!githubUsername) {
    showError(githubInput, 'Please enter your GitHub username.');
    isValid = false;
  }

  return isValid;
}

form.addEventListener('submit', function (event) {
  event.preventDefault();
  clearAllErrors();

  const fullName = nameInput.value.trim();
  const email = emailInput.value.trim();
  const githubUsername = githubInput.value.trim();

  const isValid = validateForm(fullName, email, githubUsername);

  if (isValid) {
    console.log('Form submitted successfully!');
  }
});
