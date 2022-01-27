require('module-alias/register')
import Express from "./config/express";
import connectDB from "./config/db";
import config from "./config";

const serverStart = async () => {
  const ExpressServer = new Express();
  await ExpressServer.init();

  ExpressServer.httpServer.listen(process.env.PORT || config.port, () => {
    console.log(
      `Server ready on http://localhost:${config.port}${ExpressServer.server.graphqlPath}`
    );
  });
};

connectDB();

serverStart();
