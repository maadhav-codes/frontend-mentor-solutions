const adviceIdElement = document.getElementById("advice-id");
const adviceTextElement = document.querySelector("#advice span");

const adviceButton = document.querySelector(".card button");

const API_URL = "https://api.adviceslip.com/advice";

const defaultAdvice = {
  id: 8,
  advice: "Happiness is a journey, not a destination.",
};

async function getRandomAdvice() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch advice");
    }

    const data = await response.json();
    return data.slip;
  } catch (error) {
    console.error("Error fetching advice: ", error);
    return defaultAdvice;
  }
}

async function updateAdvice() {
  adviceButton.setAttribute("disabled", true);
  adviceButton.style.opacity = "0.7";

  const { id, advice } = await getRandomAdvice();

  if (advice) {
    adviceIdElement.textContent = id;
    adviceTextElement.textContent = advice;
  } else {
    adviceIdElement.textContent = defaultAdvice.id;
    adviceTextElement.textContent = defaultAdvice.advice;
  }

  adviceButton.removeAttribute("disabled");
  adviceButton.style.opacity = "1";
}

adviceButton.addEventListener("click", updateAdvice);

document.addEventListener("DOMContentLoaded", updateAdvice);
