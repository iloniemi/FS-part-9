const calculateBmi = (height: number, weight: number): string => {
  const heightM = height / 100;
  const bmi = weight / (heightM * heightM);
  
  const categories = [
    "Underweight",
    "Underweight (Moderate thinness)",
    "Underweight (Mild thinness)",
    "Normal range",
    "Overweight (Pre-obese)",
    "Obese (Class I)",
    "Obese (Class II)",
    "Obese (Class III)"
  ];
  const upperLimits = [
    16, 17, 18.5, 25, 30, 35, 40
  ];

  for (let i = 0; i < upperLimits.length; i++) {
    if (bmi < upperLimits[i]) return categories[i];
  };

  return categories[categories.length - 1];
};

interface BmiArguments {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): BmiArguments => {
  if (args.length < 2) throw new Error('Not enough arguments');
  if (args.length > 2) throw new Error('Too many arguments');

  const height = Number(args[0]);
  const weight = Number(args[1]);
  if (isNaN(height) || isNaN(weight)) throw new Error('Both arguments need to be numbers');

  return { height, weight };
};

if (require.main === module) {  
  try {
    const {height, weight} = parseArguments(process.argv.slice(2));
    const result = calculateBmi(height, weight);
    console.log(result);
    
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}
export { calculateBmi, parseArguments };
