import dotenv from "dotenv";
import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
dotenv.config();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.get("/shayari", async (req, res) => {
  try {
    const keyword = req.query.keyword;
    const payload = {
      model: "gpt-3.5-turbo",
      max_tokens: 100,
      messages: [
        { role: "user", content: `Generate a shayari about ${keyword}` },
      ],
    };
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      payload,
      {
        headers: {
          Authorization: `Bearer ${process.env.api_key}`,
        },
      }
    );

    const shayari = response.data.choices[0].message.content;
    res.json({ shayari });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(process.env.port || 3001, () => {
  console.log("Server is running on port :", process.env.port);
});
