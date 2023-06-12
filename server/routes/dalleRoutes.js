import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

// load the env. var.
dotenv.config();

// create the router
const router = express.Router();

// create openai config
const configuration = new Configuration({
  apiKey: process.env.OPEN_API_KEY,
});

// create the openai api obj
const openai = new OpenAIApi(configuration);

router.route('/').get((req, res) => {
  res.send('Hello from Dall-E!');
});

router.route('/').post(async (req, res) => {

  try {
    // deconstruct request getting prompt from the body
    const { prompt } = req.body;
    
    /*  await openai.createImage({params})
     * 
     *  params: prompt = user supplied prompt from frontend,
     *          n = number of images to return,
     *          size = image size,
     *          response_format = return type
     *
     *  returns: ai generated image
     */
    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json"
    });

    // extract image from api response
    const image = aiResponse.data.data[0].b64_json;

    // send image to frontend
	res.status(200).json({ photo: image });

  } catch (error) {
    console.log(error);
	res.status(500).send(error?.response.data.error.message);
  }

});

export default router;