const cardElement = document.querySelector(".card");
const adviceLabelElement = document.getElementById("advice-label");
const adviceNumberPrefixElement = document.getElementById("advice-number-prefix");
const adviceIdElement = document.getElementById("advice-id");
const adviceTextElement = document.getElementById("advice-text");
const adviceContainer = document.getElementById("advice");
const adviceButton = document.querySelector(".card button");

const API_URL = "https://api.adviceslip.com/advice";

let isLoading = false;

function setLoadingState() {
  cardElement.classList.add("is-loading");
  cardElement.classList.remove("has-error");
  cardElement.setAttribute("aria-busy", "true");

  adviceButton.disabled = true;
  adviceButton.setAttribute("aria-busy", "true");

  adviceContainer.removeAttribute("role");
  adviceLabelElement.textContent = "Advice";
  adviceNumberPrefixElement.textContent = "#";
  adviceIdElement.textContent = "...";
  adviceTextElement.textContent = "Loading advice...";
}

function setSuccessState(id, advice) {
  cardElement.classList.remove("is-loading", "has-error");
  cardElement.setAttribute("aria-busy", "false");

  adviceContainer.removeAttribute("role");
  adviceLabelElement.textContent = "Advice";
  adviceNumberPrefixElement.textContent = "#";
  adviceIdElement.textContent = id;
  adviceTextElement.textContent = advice;
}

function setErrorState(errorMessage) {
  cardElement.classList.remove("is-loading");
  cardElement.classList.add("has-error");
  cardElement.setAttribute("aria-busy", "false");

  adviceContainer.setAttribute("role", "alert");
  adviceLabelElement.textContent = "Notice";
  adviceNumberPrefixElement.textContent = "";
  adviceIdElement.textContent = "";
  adviceTextElement.textContent = errorMessage;
}

async function getRandomAdvice() {
  const response = await fetch(`${API_URL}?t=${Date.now()}`, {
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error(`Server returned HTTP ${response.status}`);
  }

  const data = await response.json();
  if (!data || !data.slip || !data.slip.advice) {
    throw new Error("Invalid advice payload received");
  }

  return data.slip;
}

async function updateAdvice() {
  if (isLoading) return;
  isLoading = true;

  setLoadingState();

  try {
    const { id, advice } = await getRandomAdvice();
    setSuccessState(id, advice);
  } catch (error) {
    console.error("Error fetching advice: ", error);
    setErrorState("Failed to load advice. Please click the dice to try again.");
  } finally {
    isLoading = false;
    adviceButton.disabled = false;
    adviceButton.removeAttribute("aria-busy");
  }
}

adviceButton.addEventListener("click", updateAdvice);

document.addEventListener("DOMContentLoaded", updateAdvice);
