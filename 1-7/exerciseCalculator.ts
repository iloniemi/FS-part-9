interface Result {
  periodLenght: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface exerciseValues {
  hoursArray: number[];
  target: number;
}



const parseArguments = (args: string[]): exerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const hoursArray = args.slice(3).map(argumentString => {
    const asNumber = Number(argumentString);
    if (isNaN(asNumber)) throw new Error(`${argumentString} is not a number`);
      return asNumber;
  });
  const target = Number(args[2]);
  if (isNaN(target)) {
    throw new Error('First argument (target) was not a number');
  }
  return { hoursArray, target };
};



export const calculateExercises = (hoursArray: number[], target:number): Result => {
  const periodLenght = hoursArray.length;
  const trainingDays = hoursArray.filter(hours => hours > 0).length;
  const average = hoursArray.reduce((sum, hours) => sum + hours , 0) / hoursArray.length;
  const success = average > target;
  let rating = 1;
  if (average > target * 1) {
    rating = 3;
  } else if (average > target * 0.8) {
    rating = 2;
  }
  const descriptions = [
    'not even close',
    'not too bad but could be better',
    'target amount of exercise achieved'
  ];
  const ratingDescription = descriptions[rating-1];

  return {
    periodLenght,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

if (require.main === module) {
  try {
    const { hoursArray, target } = parseArguments(process.argv);
    const result = calculateExercises(hoursArray, target);
    console.log(result);
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}
