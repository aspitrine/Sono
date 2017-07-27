import fs from 'fs';
import path from 'path';

module.exports = (router) => {
  const files = fs.readdirSync(path.join(__dirname, '../routes/'));

  files.forEach((f) => {
    require(path.join(__dirname, '../routes/', f))(router);
  });
};
