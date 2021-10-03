import {
  calculateOneRepMax,
  calculateLifts,
} from "./functions/calculator-funcs.js";

const closeIntro = document.querySelector("#intro-close");
const intro = document.querySelector(".intro");

//removes introduction element
closeIntro.addEventListener("click", () => {
  intro.remove();
});

const weightInput = document.querySelector("#weight");
const repsInput = document.querySelector("#reps");

let maxWeight = 0;
let maxReps = 0;

//calculates one rep max from user inputs
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

//next 4 event listeners set max:Lift variable from user inputs
let maxSquat = 0;
const squatInput = document.querySelector("#squat");
squatInput.addEventListener("input", () => {
  maxSquat = squatInput.value;
  localStorage.setItem("storedSquat", maxSquat);
});

let maxBench = 0;
const benchInput = document.querySelector("#bench");
benchInput.addEventListener("input", () => {
  maxBench = benchInput.value;
  localStorage.setItem("storedBench", maxBench);
});

let maxDeadlift = 0;
const deadliftInput = document.querySelector("#deadlift");
deadliftInput.addEventListener("input", () => {
  maxDeadlift = deadliftInput.value;
  localStorage.setItem("storedDeadlift", maxDeadlift);
});

let maxOHP = 0;
const ohpInput = document.querySelector("#ohp");
ohpInput.addEventListener("input", () => {
  maxOHP = ohpInput.value;
  localStorage.setItem("storedOHP", maxOHP);
});

let currentWeek = 0;
let currentLift = 0;

function renderWeightPerSet(exercise) {
  currentLift = exercise;
  localStorage.setItem("storedCurrentLift", currentLift);
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
  setActiveLiftClass(selectSquat);
  localStorage.setItem("storedActiveLift", "#s");
});

const selectBench = document.querySelector("#b");
selectBench.addEventListener("click", () => {
  renderWeightPerSet(maxBench);
  setActiveLiftClass(selectBench);
  localStorage.setItem("storedActiveLift", "#b");
});

const selectDeadlift = document.querySelector("#d");
selectDeadlift.addEventListener("click", () => {
  renderWeightPerSet(maxDeadlift);
  setActiveLiftClass(selectDeadlift);
  localStorage.setItem("storedActiveLift", "#d");
});

const selectOHP = document.querySelector("#o");
selectOHP.addEventListener("click", () => {
  renderWeightPerSet(maxOHP);
  setActiveLiftClass(selectOHP);
  localStorage.setItem("storedActiveLift", "#o");
});

function renderPercentages(reps, set1, set2, set3) {
  const setOne = document
    .querySelector("#set-one")
    .querySelector(".percentage");
  setOne.textContent = `Set 1 - ${set1}% x ${reps[0]}`;
  const setTwo = document
    .querySelector("#set-two")
    .querySelector(".percentage");
  setTwo.textContent = `Set 2 - ${set2}% x ${reps[1]}`;
  const setThree = document
    .querySelector("#set-three")
    .querySelector(".percentage");
  setThree.textContent = `Set 3 - ${set3}% x ${reps[2]}+`;
}

const weekButtons = document.querySelectorAll(".week-button");

weekButtons[0].addEventListener("click", () => {
  currentWeek = 0;
  localStorage.setItem("storedWeek", currentWeek);
  setActiveWeekClass(weekButtons[0]);
  if (currentLift) renderWeightPerSet(currentLift);
  renderPercentages([5, 5, 5], 65, 75, 85);
});

weekButtons[1].addEventListener("click", () => {
  currentWeek = 1;
  localStorage.setItem("storedWeek", currentWeek);
  setActiveWeekClass(weekButtons[1]);
  if (currentLift) renderWeightPerSet(currentLift);
  renderPercentages([3, 3, 3], 70, 80, 90);
});

weekButtons[2].addEventListener("click", () => {
  currentWeek = 2;
  localStorage.setItem("storedWeek", currentWeek);
  setActiveWeekClass(weekButtons[2]);
  if (currentLift) renderWeightPerSet(currentLift);
  renderPercentages([5, 3, 1], 75, 85, 95);
});

function setActiveWeekClass(week) {
  const currentlyActive = document.querySelectorAll(".active-week");
  currentlyActive.forEach((ele) => ele.classList.remove("active-week"));
  week.classList.add("active-week");
}

function setActiveLiftClass(lift) {
  const currentlyActive = document.querySelectorAll(".active-lift");
  currentlyActive.forEach((ele) => ele.classList.remove("active-lift"));
  const liftDiv = lift.parentNode;
  liftDiv.classList.add("active-lift");
}

const {
  storedBench,
  storedDeadlift,
  storedOHP,
  storedSquat,
  storedWeek,
  storedCurrentLift,
  storedActiveLift,
} = localStorage;

function loadLocalStorage() {
  if (storedBench) {
    benchInput.value = storedBench;
    maxBench = storedBench;
  }
  if (storedDeadlift) {
    deadliftInput.value = storedDeadlift;
    maxDeadlift = storedDeadlift;
  }
  if (storedOHP) {
    ohpInput.value = storedOHP;
    maxOHP = storedOHP;
  }
  if (storedSquat) {
    squatInput.value = storedSquat;
    maxSquat = storedSquat;
  }

  if (storedWeek === "0") {
    currentWeek = 0;
    renderPercentages([5, 5, 5], 65, 75, 85);
  } else if (storedWeek === "1") {
    currentWeek = 1;
    renderPercentages([3, 3, 3], 70, 80, 90);
  } else if (storedWeek === "2") {
    currentWeek = 2;
    renderPercentages([5, 3, 1], 75, 85, 95);
  }

  if (storedCurrentLift) {
    renderWeightPerSet(storedCurrentLift);
  }
  setActiveWeekClass(weekButtons[currentWeek]);
  if (storedActiveLift) {
    const activeLift = document.querySelector(storedActiveLift);
    setActiveLiftClass(activeLift);
  }
}

loadLocalStorage();
