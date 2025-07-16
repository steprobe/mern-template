import mongoose from 'mongoose';

const connectToDb = async () => {
  const env = process.env.NODE_ENV;
  if (env === 'test') {
    console.log('In TEST mode - not connecting to real DB');
    return;
  }

  try {
    const uri: string | undefined = process.env.MONGO_URI;

    console.log(`Connecting to Mongo at ${uri}`);
    if (uri === undefined) {
      console.log('No uri for mongo defined');
      process.exit(1);
    }

    await mongoose.connect(uri, {
      autoIndex: true,
    });
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log('Unknown error', err);
    }
    process.exit(1);
  }
};

export default connectToDb;
