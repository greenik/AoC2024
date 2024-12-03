import * as fs from "fs";

fs.readFile('input.txt', (err, data) => {
  if (err) throw err;

  const fileData = data.toString();

  const rows = fileData.split('\n').filter(Boolean);

  const result = rows.reduce((acc, row) => {
    const rowResult = getResultForRow(row);
    return acc + rowResult;
  }, 0);

  console.log(result);
});

const getResultForRow = (row: string): number => {
  const regex = new RegExp(/mul\(\d+,\d+\)/g);

  const matches = [...row.matchAll(regex)]
    .map((match) => {
      const matchedString = match[0];
      const matchNumbers = matchedString.match(/\d+/g);
      return matchNumbers ? matchNumbers.map(Number) : [];
    });

  return matches.reduce((acc, match) => {
    const multiplyResult = match[0] * match[1];

    return acc + multiplyResult;
  }, 0);
}
