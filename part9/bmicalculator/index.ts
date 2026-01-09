import express from 'express';
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { weight, height } = req.query;

  if (isNaN(Number(weight)) || isNaN(Number(height))) {
    return res.status(400).send({
      error: 'malformatted parameters',
    });
  }

  return res.send({
    weight: weight,
    height: height,
    bmi: calculateBmi(Number(height), Number(weight)),
  });
});


app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).send({ error: 'parameters missing' });
  }

  if (
    isNaN(Number(target)) ||
    (Array.isArray(daily_exercises) &&
      daily_exercises.some((n) => isNaN(Number(n))))
  ) {
    return res.status(400).send({ error: 'malformatted parameters' });
  }
  /* eslint-disable @typescript-eslint/no-unsafe-member-access,
                    @typescript-eslint/no-unsafe-argument,
                    @typescript-eslint/no-unsafe-call */
  const result = calculateExercises(daily_exercises.map(Number), Number(target));

  return res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});