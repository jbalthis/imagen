import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

// get db connection
import connectDB from './mongodb/connect.js';

// get routes
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

// get ENV variables
dotenv.config();

// define server
const app = express();

// define middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));

// define api routes
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async (req, res) => {
  res.send('Hello from ImaGen!');
});

// start express server
const startServer = async () => {
  
  try {
    // connect to db
    connectDB(process.env.MONGODB_URL);

	app.listen(8081, () => console.log(
      'Server has started on http://localhost:8081'
    ))

  } catch (error) {
    console.log(error);
  }
};
startServer();