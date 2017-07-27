import config from './db.config.json';
import mongoose from 'mongoose';
import path from 'path';
import sample from './sample';

const DB = mongoose.connection;

mongoose.connect(`mongodb://${config.url}:${config.port}/${config.database}`);
mongoose.Promise = Promise;


DB.once('open', () => {
  console.log('Installation');
  DB.dropDatabase().then(() => {
    console.log('Database cleared');
    console.log('Start sample');
    sample.execute(path.join(__dirname, '/../samples/')).then(() => {
      console.log('Sample Done');
      process.exit(0);
    }).catch((err) => {
      console.log(err);
    });
  });
});
