import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import routes from "./routes";
import ErrorObj from "./types/Error";

const app = express();

app.use(express.json());

// app.get("/", (req, res) => res.send("Ok"));
app.use(routes);

mongoose
  .connect(`mongodb://localhost/typebank`)
  .then(() => {
    console.log("connected in mongodb!");

    app.listen(8888, () => console.log("server initilized"));
  })
  .catch((error) => {
    const errorObj = error as ErrorObj;
    console.log(errorObj.message);
  });
