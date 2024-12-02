import * as fs from 'fs';

fs.readFile('input.txt', (err, data) => {
  if (err) throw err;

  const fileData = data.toString();

  const rows = fileData.split('\n');

  const leftValues: number[] = [];
  const rightValues: number[] = [];

  rows.forEach(row => {
    if (row === '') return;
    const [left, right] = row.split('   ');

    leftValues.push(parseInt(left));
    rightValues.push(parseInt(right));
  });

  let similarity = 0;

  leftValues.forEach((leftValue) => {
    const appearings = rightValues.filter((rightValue) => rightValue === leftValue).length;

    similarity += appearings * leftValue;
  });

  console.log(similarity);
});
