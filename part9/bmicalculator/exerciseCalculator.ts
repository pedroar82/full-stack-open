
interface Exercise {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number
}

const calculateExercises = (
  exerciseHours: Array<number>,
  target: number
): Exercise => {
  const totalHours = exerciseHours.reduce((total, val) => total + val, 0)
  const totalDays = exerciseHours.length
  const average = totalHours / totalDays
  let ratingDescription = 'Ronaldo, is that you?'
  let rating = 3

  if (average < 1) {
    rating = 1
    ratingDescription = 'i know you can do better'
  } else if (average >= 1 && average <= 3) {
    rating = 2
    ratingDescription = 'not too bad but could be better'
  }

  let result: Exercise = {
    periodLength: totalDays,
    trainingDays: exerciseHours.filter((e) => e !== 0).length,
    success: average >= target,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average,
  }

  return result
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
