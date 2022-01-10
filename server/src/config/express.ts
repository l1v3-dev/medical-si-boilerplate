import { ApolloServer } from "apollo-server-express";
import express from "express";
import * as http from "http";
// import cors from "cors";

// import config from "./index";
import schema from "../graphql/schemas";

class Express {
  public express: express.Application;
  public httpServer: http.Server;
  public server: ApolloServer = new ApolloServer(schema);

  public init = async () => {
    const expressPlayground =
      require("graphql-playground-middleware-express").default;
    this.express = express();
    // this.express.use(
    //   cors({
    //     origin(origin, callback) {
    //       if (!origin) {
    //         return callback(null, true);
    //       }
    //       if (config.allowedOrigins.indexOf(origin) === -1) {
    //         const msg = `The CORS policy for this site does not
    //       allow access from the specified Origin.`;
    //         return callback(new Error(msg), false);
    //       }
    //       return callback(null, true);
    //     },
    //   })
    // );

    // this.express.use(auth);
    this.express.get(
      "/playground",
      [],
      expressPlayground({ endpoint: "/graphql" })
    );
    await this.server.start();
    this.server.applyMiddleware({ app: this.express });
    this.httpServer = http.createServer(this.express);
  };
}

export default Express;
