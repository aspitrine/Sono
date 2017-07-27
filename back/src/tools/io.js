import fs from 'fs';
import path from 'path';

module.exports = (io) => {
  const files = fs.readdirSync(path.join(__dirname, '../io/'));

  files.forEach((f) => {
    require(path.join(__dirname, '../io/', f))(io);
  });
};
