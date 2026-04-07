const form = document.getElementById('ticket-form');

const nameInput = document.getElementById('full-name');
const emailInput = document.getElementById('email');
const githubInput = document.getElementById('github-username');
const avatarInput = document.getElementById('avatar-upload');
const previewAvatar = document.getElementById('uploaded-avatar');

const removeBtn = document.querySelector('.remove-btn');
const changeBtn = document.querySelector('.change-btn');

const MAX_FILE_SIZE = 500 * 1024; // 500KB
const ALLOWED_TYPES = ['image/jpeg', 'image/png'];

function showError(input, message) {
  const inputGroup = input.closest('.input-group');

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

function validateFile(file) {
  if (!file) {
    showError(avatarInput, 'Please upload an avatar image.');
    return false;
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    showError(avatarInput, 'Only JPEG and PNG images are allowed.');
    return false;
  }

  if (file.size > MAX_FILE_SIZE) {
    showError(avatarInput, 'File too large. Please upload a photo under 500KB.');
    return false;
  }
  return true;
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

avatarInput.addEventListener('change', function (event) {
  const file = event.target.files[0];
  const inputGroup = event.target.closest('.input-group');

  if (inputGroup) inputGroup.classList.remove('avatar-uploaded');

  if (!file) return;

  const isFileValid = validateFile(file);

  const reader = new FileReader();
  reader.onload = () => {
    previewAvatar.src = reader.result;
    if (isFileValid && inputGroup) {
      inputGroup.classList.add('avatar-uploaded');
    }
  };

  reader.readAsDataURL(file);
});

removeBtn.addEventListener('click', () => {
  const inputGroup = removeBtn.closest('.input-group');

  avatarInput.value = '';
  previewAvatar.src = '';

  if (inputGroup) inputGroup.classList.remove('avatar-uploaded');
});

changeBtn.addEventListener('click', () => {
  avatarInput.click();
});

form.addEventListener('submit', function (event) {
  event.preventDefault();
  clearAllErrors();

  const avatarFile = avatarInput.files[0];
  const fullName = nameInput.value.trim();
  const email = emailInput.value.trim();
  const githubUsername = githubInput.value.trim();

  const formValid = validateForm(fullName, email, githubUsername);
  const fileValid = validateFile(avatarFile);

  const isValid = formValid && fileValid;

  if (isValid) {
    console.log('Form submitted successfully!');
  }
});
