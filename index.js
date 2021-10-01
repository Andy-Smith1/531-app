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

let currentWeek = 0;
let currentLift;

function renderWeightPerSet(exercise) {
  currentLift = exercise;
  const liftNumbers = calculateLifts(exercise);
  const setOne = document.querySelector("#set-one").querySelector(".weight");
  setOne.textContent = `${liftNumbers[currentWeek][0]}KG`;
  const setTwo = document.querySelector("#set-two").querySelector(".weight");
  setTwo.textContent = `${liftNumbers[currentWeek][1]}KG`;
  const setThree = document
    .querySelector("#set-three")
    .querySelector(".weight");
  setThree.textContent = `${liftNumbers[currentWeek][2]}KG`;
}

const selectSquat = document.querySelector("#s");
selectSquat.addEventListener("click", () => {
  renderWeightPerSet(maxSquat);
});

const selectBench = document.querySelector("#b");
selectBench.addEventListener("click", () => {
  renderWeightPerSet(maxBench);
});

const selectDeadlift = document.querySelector("#d");
selectDeadlift.addEventListener("click", () => {
  renderWeightPerSet(maxDeadlift);
});

const selectOHP = document.querySelector("#o");
selectOHP.addEventListener("click", () => {
  renderWeightPerSet(maxOHP);
});

const weekButtons = document.querySelectorAll(".week-button");

weekButtons[0].addEventListener("click", () => {
  currentWeek = 0;
  renderWeightPerSet(currentLift);
  renderPercentages(65, 75, 85);
});

weekButtons[1].addEventListener("click", () => {
  currentWeek = 1;
  renderWeightPerSet(currentLift);
  renderPercentages(70, 80, 90);
});

weekButtons[2].addEventListener("click", () => {
  currentWeek = 2;
  renderWeightPerSet(currentLift);
  renderPercentages(75, 85, 95);
});

function renderPercentages(set1, set2, set3) {
  const setOne = document
    .querySelector("#set-one")
    .querySelector(".percentage");
  setOne.textContent = `Set 1 - ${set1}% x 5`;
  const setTwo = document
    .querySelector("#set-two")
    .querySelector(".percentage");
  setTwo.textContent = `Set 2 - ${set2}% x 5`;
  const setThree = document
    .querySelector("#set-three")
    .querySelector(".percentage");
  setThree.textContent = `Set 3 - ${set3}% x 5+`;
}
