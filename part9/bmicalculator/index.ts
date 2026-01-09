import express from 'express';
import { calculateBmi } from "./bmiCalculator";

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { weight, height } = req.query

  if (isNaN(Number(weight)) || isNaN(Number(height))) {
    res.send({
      error: 'malformatted parameters',
    })
    return
  }

  res.send({
    weight: weight,
    height: height,
    bmi: calculateBmi(Number(height), Number(weight)),
  })
})


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});