export function showError(inputElement, message) {
  const group = inputElement.closest('.input-group');
  if (!group) return;

  group.classList.add('error-state');

  const errorParagraph = group.querySelector('.error-info p');
  if (errorParagraph) {
    errorParagraph.textContent = message;
  }
}

export function clearAllErrors() {
  const allGroups = document.querySelectorAll('.input-group');

  allGroups.forEach((group) => {
    group.classList.remove('error-state');
    const errorParagraph = group.querySelector('.error-info p');
    if (errorParagraph) errorParagraph.textContent = '';
  });
}

export function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}
