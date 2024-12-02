import * as fs from 'fs';

fs.readFile('input.txt', (err, data) => {
  if (err) throw err;

  const fileData = data.toString();

  const rows = fileData.split('\n').filter(Boolean).map((row) => row.split(' ').map((val) => parseInt(val, 10)));

  let goodReports = 0;

  rows.forEach((row) => {
    let mod: 'increasing' | 'decreasing' = 'increasing';

    for(let i = 0; i < row.length; i++) {
      if (i === row.length - 1) {
        goodReports++;
        break;
      }

      if (i === 0) {
        if (row[i] < row[i + 1]) {
          mod = 'increasing';
        } else {
          mod = 'decreasing';
        }
      }

      const diff = Math.abs(row[i] - row[i + 1]);

      if (diff < 1 || diff > 3) {
        break;
      }
      if (row[i] > row[i + 1] && mod === 'increasing') {
        break;
      }

      if (row[i] < row[i + 1] && mod === 'decreasing') {
        break;
      }
    }
  });

  console.log(goodReports);
});
