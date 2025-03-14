import { calculateBmi, parseArguments as parseBmiArguments } from './bmiCalculator';
import { calculateExercises} from './exerciseCalculator';
import express from 'express';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  
  try {
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    const bmiArguments = [String(req.query.height), String(req.query.weight)];
    const { height, weight } = parseBmiArguments(bmiArguments);
    const bmi = calculateBmi(height, weight);
    res.send({height, weight, bmi});
  } catch (error: unknown) {

    if (error instanceof Error) {
      res.send({ error: 'malformatted parameters' });
    }
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if(daily_exercises === undefined || target === undefined) {
    res.status(400).send({ error: 'parameters missing'});
    return;
  }
  if ( !Array.isArray(daily_exercises)
    || daily_exercises.some(value => typeof value !== 'number'
    || typeof target !== 'number'
  )) {
  res.status(400).send({ error: 'malformatted parameters'});
  return;
  }
  
  const hoursArray = daily_exercises.map(value => Number(value));

  const result = calculateExercises(hoursArray, Number(target));
  res.status(200).send({result});
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});