import { isValidEmail, showError } from './helper.js';

const MAX_FILE_SIZE = 500 * 1024; // 500KB
const ALLOWED_TYPES = ['image/jpeg', 'image/png'];

export function validateFile(file, avatarInput) {
  if (!file) {
    showError(avatarInput, 'Please upload an avatar image.');
    return false;
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    showError(avatarInput, 'Only JPEG and PNG images are allowed.');
    return false;
  }

  if (file.size > MAX_FILE_SIZE) {
    showError(
      avatarInput,
      'File too large. Please upload a photo under 500KB.',
    );
    return false;
  }

  return true;
}

export function validateForm(
  { fullName, email, githubUsername },
  nameInput,
  emailInput,
  githubInput,
) {
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
