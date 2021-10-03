//main url = https://wger.de/api/v2/exercise/?language=2&limit=100&muscles=

//biceps - 1
//triceps - 5
//arms - 1, 5
//shoulders - 2
//legs - 10, 8, 15
//back - 12
//chest - 4
//abs - 14, 16

async function fetchData(...muscles) {
  const joinedMuscles = muscles.join(",");
  const data = await fetch(
    `https://wger.de/api/v2/exercise/?language=2&limit=100&muscles=${joinedMuscles}`
  );
  const parsedData = await data.json();
  const exerciseArray = parsedData.results.map((exercise) => {
    return { lift: exercise.name, description: exercise.description };
  });
  exerciseArray.forEach((exercise) => {
    exercise.description = removeHtmlTags(exercise.description);
  });
  return exerciseArray;
}

function removeHtmlTags(string) {
  const regex = /<.{1,3}>/gi;
  const withoutTags = string.replaceAll(regex, "");
  const withoutNewLine = withoutTags.replaceAll(/\\n/g, "");
  return withoutNewLine;
}

export { fetchData, removeHtmlTags };
