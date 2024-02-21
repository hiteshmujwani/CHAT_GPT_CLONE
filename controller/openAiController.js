import { OpenAI } from "openai";
import dotenv from "dotenv";
dotenv.config();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

//for chatting with bot
export const chatBot = async (req, res) => {
  try {
    const { message } = req.body;
    if (message == undefined) {
      res.status(401).send({
        success: false,
        message: "please enter something",
      });
      return;
    }
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
      model: "gpt-3.5-turbo-1106",
    });
    res.status(200).send({
      success: true,
      assistantMsg: completion.choices[0].message.content,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "internal server error",
    });
  }
};

// const image = async () => {
//   const response = await openai.({
//     model: "dall-e-3",
//     prompt: "a white siamese cat",
//     n: 1,
//     size: "1024x1024",
//   });
//   // image_url = response.data.data[0].url;
//   console.log(response.created);
// };

// image();
