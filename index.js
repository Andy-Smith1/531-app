import {
  calculateOneRepMax,
  calculateTrainingMax,
  calculateLifts,
} from "./calculator-funcs.js";

const closeIntro = document.querySelector("#intro-close");
const intro = document.querySelector(".intro");

closeIntro.addEventListener("click", () => {
  intro.remove();
});

const weightInput = document.querySelector("#weight");
const repsInput = document.querySelector("#reps");

let maxWeight;
let maxReps;

weightInput.addEventListener("input", () => {
  maxWeight = weightInput.value;
  const orm = document.querySelector("h4");
  if (maxWeight > 500) {
    orm.textContent = `You wish!`;
  } else {
    const max = calculateOneRepMax(maxWeight, maxReps);
    if (max === undefined) return;
    orm.textContent = `Your estimated 1RM is ${max}KG`;
  }
});

repsInput.addEventListener("input", () => {
  maxReps = repsInput.value;
  const orm = document.querySelector("h4");
  if (maxReps > 15) {
    orm.textContent = `For accuracy, reps should be below 15`;
  } else {
    const max = calculateOneRepMax(maxWeight, maxReps);
    if (max === undefined) return;
    orm.textContent = `Your estimated 1RM is ${max}KG`;
  }
});
