import Promise from "bluebird";
import mongoose from "mongoose";
import config from "./index";

const initDB = (): void => {
  Promise.promisifyAll(mongoose);
  mongoose.connect(config.db);

  mongoose.connection.on("error", () => {
    throw new Error(`Unable to connect to database ${config.db}`);
  });
};

export default initDB;
