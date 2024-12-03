import * as fs from "fs";

fs.readFile('input.txt', (err, data) => {
  if (err) throw err;

  const fileData = data.toString();

  const rows = fileData.split('\n').filter(Boolean).join('');

  const rowResult = getResultForRow(rows);

  console.log(rowResult);
});

const getResultForRow = (row: string): number => {
  const regex = /(mul\(\d+,\d+\))|(do\(\))|don't\(\)/g;

  const matches = [...row.matchAll(regex)].map(match => match[0]);

  const matchedMultiplications: number[][] = [];

  let shouldCount = true;
  for(let i = 0; i < matches.length; i++) {
    if (matches[i] === 'don\'t()') {
      shouldCount = false;
      continue;
    }

    if (matches[i] === 'do()') {
      shouldCount = true;
      continue;
    }

    if (shouldCount) {
      const matchNumbers = matches[i].match(/\d+/g)!;
      matchedMultiplications.push(matchNumbers.map(Number));
    }
  }

  return matchedMultiplications.reduce((acc, match) => {
    const multiplyResult = match[0] * match[1];

    return acc + multiplyResult;
  }, 0);
}
