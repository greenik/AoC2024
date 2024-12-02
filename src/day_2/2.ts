import * as fs from 'fs';

fs.readFile('input.txt', (err, data) => {
  if (err) throw err;

  const fileData = data.toString();

  const rows = fileData.split('\n').filter(Boolean).map((row) => row.split(' ').map((val) => parseInt(val, 10)));

  let goodReports = 0;

  rows.forEach((row) => {
    const [isGood, errorIndex] = checkRowForErrors(row);

    if (isGood) {
      goodReports++;
    } else {
      const newRowWithoutMiddle = row.slice(0, errorIndex).concat(row.slice(errorIndex + 1));
      const newRowWithoutRight = row.slice(0, errorIndex + 1).concat(row.slice(errorIndex + 2));
      const newRowWithoutLeft = row.slice(0, errorIndex - 1).concat(row.slice(errorIndex));
      const [isGoodMiddle, _] = checkRowForErrors(newRowWithoutMiddle);
      const [isGoodRight, __] = checkRowForErrors(newRowWithoutRight);
      const [isGoodLeft, ___] = checkRowForErrors(newRowWithoutLeft);
      if (isGoodMiddle || isGoodRight || isGoodLeft) {
        goodReports++;
      }
    }
  });

  console.log(goodReports);
});

const checkRowForErrors = (row: number[]): [boolean, number | null] => {
  const mod = calculateMod(row);

  for(let i = 0; i < row.length; i++) {
    if (i === row.length - 1) {
      return [true, null];
    }

    const diff = Math.abs(row[i] - row[i + 1]);

    if (diff < 1 || diff > 3) {
      return [false, i];
    }

    if (row[i] > row[i + 1] && mod === 'increasing') {
      return [false, i];
    }

    if (row[i] < row[i + 1] && mod === 'decreasing') {
      return [false, i];
    }
  }
}

const calculateMod = (row: number[]): 'increasing' | 'decreasing' => {
  if (row[0] < row[1]) {
    return 'increasing';
  } else {
    return 'decreasing';
  }
}
