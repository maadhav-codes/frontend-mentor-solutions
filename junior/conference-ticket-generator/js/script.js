import { validateFile, validateForm } from './validator.js';
import { clearAllErrors } from './helper.js';
import { showGeneratedTicket } from './generate-ticket.js';

const form = document.getElementById('ticket-form');

const nameInput = document.getElementById('full-name');
const emailInput = document.getElementById('email');
const githubInput = document.getElementById('github-username');
const avatarInput = document.getElementById('avatar-upload');
const previewAvatar = document.getElementById('uploaded-avatar');

const removeBtn = document.querySelector('.remove-btn');
const changeBtn = document.querySelector('.change-btn');
const uploadBox = document.querySelector('.upload-box');

function handleAvatarUpload(file) {
  if (!file) return;

  const inputGroup = uploadBox.closest('.input-group');
  if (inputGroup) inputGroup.classList.remove('avatar-uploaded');

  const isValid = validateFile(file, avatarInput);

  const reader = new FileReader();
  reader.onload = () => {
    if (isValid && inputGroup) {
      previewAvatar.src = reader.result;
      previewAvatar.alt = "Uploaded avatar preview";
      inputGroup.classList.add('avatar-uploaded');

      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      avatarInput.files = dataTransfer.files;
    }
  };

  reader.readAsDataURL(file);
}

avatarInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  handleAvatarUpload(file);
});

uploadBox.addEventListener('dragover', (e) => {
  e.preventDefault();
  uploadBox.classList.add('dragover');
});

uploadBox.addEventListener('dragleave', () => {
  uploadBox.classList.remove('dragover');
});

uploadBox.addEventListener('drop', (e) => {
  e.preventDefault();

  const file = e.dataTransfer.files[0];
  handleAvatarUpload(file);
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

  const formData = {
    fullName: nameInput.value.trim(),
    email: emailInput.value.trim(),
    githubUsername: githubInput.value.trim(),
    avatarFile: avatarInput.files[0],
    previewAvatar: previewAvatar.src,
  };

  const formIsValid = validateForm(
    formData,
    nameInput,
    emailInput,
    githubInput,
  );
  const fileIsValid = validateFile(formData.avatarFile, avatarInput);

  if (formIsValid && fileIsValid) {
    showGeneratedTicket(formData);
  }
});
