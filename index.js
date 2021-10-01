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

let maxWeight = 0;
let maxReps = 0;

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

let maxSquat = 0;
const squatInput = document.querySelector("#squat");
squatInput.addEventListener("input", () => {
  maxSquat = squatInput.value;
});

let maxBench = 0;
const benchInput = document.querySelector("#bench");
benchInput.addEventListener("input", () => {
  maxBench = benchInput.value;
});

let maxDeadlift = 0;
const deadliftInput = document.querySelector("#deadlift");
deadliftInput.addEventListener("input", () => {
  maxDeadlift = deadliftInput.value;
});

let maxOHP = 0;
const ohpInput = document.querySelector("#ohp");
ohpInput.addEventListener("input", () => {
  maxOHP = ohpInput.value;
});

const currentWeek = 0;

const selectSquat = document.querySelector("#s");
selectSquat.addEventListener("click", () => {
  const liftNumbers = calculateLifts(maxSquat);
  const setOne = document.querySelector("#set-one").querySelector(".weight");
  setOne.textContent = `${liftNumbers[currentWeek][0]}KG`;
  const setTwo = document.querySelector("#set-two").querySelector(".weight");
  setTwo.textContent = `${liftNumbers[currentWeek][1]}KG`;
  const setThree = document
    .querySelector("#set-three")
    .querySelector(".weight");
  setThree.textContent = `${liftNumbers[currentWeek][2]}KG`;
});
