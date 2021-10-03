//main url = https://wger.de/api/v2/exercise/?language=2&limit=100&muscles=

//biceps - 1
//triceps - 5
//arms - 1, 5
//shoulders - 2
//legs - 10, 8, 15
//back - 12
//chest - 4
//abs

async function fetchData(...muscles) {
  const joinedMuscles = muscles.join(",");
  const data = await fetch(
    `https://wger.de/api/v2/exercise/?language=2&limit=100&muscles=${joinedMuscles}`
  );
  const parsedData = await data.json();
  const exerciseArray = parsedData.results.map((exercise) => exercise.name);
  const shuffledArray = exerciseArray.sort(() => 0.5 - Math.random());
  console.log(shuffledArray.slice(0, 5));
  return shuffledArray.slice(0, 5);
}

export { fetchData };
