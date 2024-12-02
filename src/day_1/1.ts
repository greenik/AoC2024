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

  leftValues.sort();
  rightValues.sort();

  let distance = 0;

  leftValues.forEach((left, i) => {
    distance += Math.abs(left - rightValues[i]);
  });

  console.log(distance);
});
