import expressServer from './express';
import { config } from '../config/config';
import { connect } from 'mongoose';

expressServer().then(async app => {
  await connect(config.mongoUri);
  app.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}`);
  });
});
