
interface Exercise {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number
}

interface CalculatorValues {
  target: number
  exerciseDays: number[]
}

const parseExerciseArguments = (args: string[]): CalculatorValues => {
  if (args.length < 4) throw new Error('Not enough arguments')
  if (args.length > 12) throw new Error('Too many arguments')

  let days = args.splice(3, args.length)

  if (!isNaN(Number(args[2])) && days.every((n) => !isNaN(Number(n)))) {
    return {
      target: Number(args[2]),
      exerciseDays: days.map((d) => Number(d)),
    }
  } else {
    throw new Error('Provided values were not numbers!')
  }
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

  //doing less hours than half of the target time per day
  if (average < target/2) {
    rating = 1
    ratingDescription = 'no pain, no gain'
  } else if (average >= target/2 && average < target) {
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


try {
  const { target, exerciseDays } = parseExerciseArguments(process.argv)
  console.log(calculateExercises(exerciseDays, target))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage)
}

//console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
