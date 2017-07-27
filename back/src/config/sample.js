import fs from 'fs';
import path from 'path';

export default class Sample {
  static execute(PATH) {
    return new Promise((resolve, reject) => {
      const files = fs.readdirSync(PATH);
      const samples = [];

      files.forEach((file) => {
        if(fs.statSync(path.join(PATH, file)).isFile()) {
          samples.push(path.join(PATH, file));
        }
      });

      const sampleExec = samples.map((f) => require(f)());

      Promise.all(sampleExec)
        .then(() => resolve())
        .catch(() => reject());
    });
  }
}
