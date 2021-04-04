const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongod = new MongoMemoryServer();

/**
 * Connect to the in-memory database.
 * @returns {Promise<void>}
 */
const openDBConnection = async () => {
  const uri = await mongod.getUri();
  const mongooseOpts = {
    useNewUrlParser: true,
    // autoReconnect: true,
    // reconnectTries: Number.MAX_VALUE,
    // reconnectInterval: 1000,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  };

  await mongoose.connect(uri, mongooseOpts);
};

/**
 * Drop database, close the connection and stop mongod.
 * @returns {Promise<void>}
 */
const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

/**
 * Remove all the data for all db collections.
 * @returns {Promise<void>}
 */
const clearDatabase = async () => {
  const { collections } = mongoose.connection;
  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const key in collections) {
    const collection = collections[key];
    // eslint-disable-next-line no-await-in-loop
    await collection.deleteMany({});
  }
};

jest.setTimeout(30000);

beforeAll(async () => {
  await openDBConnection();
});
afterAll(async () => {
  await closeDatabase();
});
beforeEach(async () => {
  await clearDatabase();
});
