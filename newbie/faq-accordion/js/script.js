const ICONS = {
  expand: "./assets/images/icon-plus.svg",
  collapse: "./assets/images/icon-minus.svg",
};

const handleFAQ = () => {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const toggleBtn = item.querySelector("button");
    const toggleIcon = toggleBtn.querySelector("img");

    toggleBtn.addEventListener("click", () => {
      const isExpanded = item.classList.contains("active");
      toggleBtn.setAttribute("aria-expanded", !isExpanded);

      if (isExpanded) {
        toggleIcon.src = ICONS.expand;
        toggleIcon.alt = "Expand";
        item.classList.remove("active");
      } else {
        toggleIcon.src = ICONS.collapse;
        toggleIcon.alt = "Collapse";
        item.classList.add("active");
      }
    });

    toggleBtn.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === "Space") {
        event.preventDefault();
        toggleBtn.click();
      }
    });
  });
};

document.addEventListener("DOMContentLoaded", handleFAQ);
