import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import { connectDb } from "./src/utils/connectDb.js";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import querySchema from "./src/schema.js";
import resolvers from "./src/resolvers.js";

dotenv.config();

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
  typeDefs: querySchema,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

app.use(bodyParser.json());
app.use(cors());

await server.start();

app.use(
  "/graphql",
  expressMiddleware(server, {
    context: ({ req, res }) => ({ req, res }),
  })
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server started successfully on port ${PORT}`);
  try {
    await connectDb();
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database connection failed", err);
  }
});
