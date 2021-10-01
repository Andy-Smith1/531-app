function calculateOneRepMax(weight, reps) {
  if (!weight) return;
  if (!reps) return;
  const oneRepMax = weight / (1.0278 - 0.0278 * reps);
  const roundedORM = 2.5 * Math.ceil(oneRepMax / 2.5);
  return roundedORM;
}

function calculateTrainingMax(orm) {
  const trainingMax = orm * 0.9;
  const roundedTM = 2.5 * Math.round(trainingMax / 2.5);
  return roundedTM;
}

function calculateLifts(orm) {
  const trainingMax = calculateTrainingMax(orm);
  const round = (num) => {
    return 2.5 * Math.round(num / 2.5);
  };

  const lifts = [
    [
      round(trainingMax * 0.65),
      round(trainingMax * 0.75),
      round(trainingMax * 0.85),
    ],
    [
      round(trainingMax * 0.7),
      round(trainingMax * 0.8),
      round(trainingMax * 0.9),
    ],
    [
      round(trainingMax * 0.75),
      round(trainingMax * 0.85),
      round(trainingMax * 0.95),
    ],
  ];

  return lifts;
}

export { calculateOneRepMax, calculateTrainingMax, calculateLifts };
