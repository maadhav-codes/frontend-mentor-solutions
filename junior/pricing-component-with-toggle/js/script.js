const toggle = document.querySelector('.billing-toggle input[type="checkbox"]');
const cards = document.querySelectorAll('.card');
const toggleContainer = document.querySelector('.billing-toggle');

function updatePrices() {
  cards.forEach((card) => {
    const monthlyPrice = parseFloat(card.dataset.monthly);
    const annuallyPrice = parseFloat(card.dataset.annually);

    const priceValue = toggle.checked ? monthlyPrice : annuallyPrice;

    card.querySelector('.price strong').textContent = priceValue.toFixed(2);
  });
}

function updateToggleAria() {
  toggleContainer.setAttribute(
    'aria-label',
    toggle.checked ? 'Monthly billing selected' : 'Annual billing selected',
  );
}

// Initialize with annual pricing
updatePrices();
updateToggleAria();

toggle.addEventListener('change', () => {
  updatePrices();
  updateToggleAria();
});
