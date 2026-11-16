import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config({
  path: "./.env"
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Ollama URL:", process.env.OLLAMA_BASE_URL);
  console.log(`App is running and listining on Port http://localhost:${port}`);
});
