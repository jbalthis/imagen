import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from './mongodb/connect.js';

// get ENV variables
dotenv.config();


// define server
const app = express();

// define middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));


// define routes
app.get('/', async (req, res) => {
  res.send('Hello from ImaGen!');
});

// start express server
const startServer = async () => {
  
  try {
    // connect to db
    connectDB(process.env.MONGODB_URL);

	app.listen(8080, () => console.log(
      'Server has started on http://localhost:8080'
    ))

  } catch (error) {
    console.log(error);
  }
};
startServer();