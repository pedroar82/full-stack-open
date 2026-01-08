const calculateBmi = (height: number, weight: number) => {
  const bmi = weight / Math.pow(height / 100, 2)

  if (18.5 <= bmi && bmi <= 25.9) {
    return 'Normal range'
  } else if (bmi < 18.5) {
    return 'Underweight'
  } else {
    return 'Overweight'
  }
}

console.log(calculateBmi(180, 74))
