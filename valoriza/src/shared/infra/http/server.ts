import { app } from "./app";

app.listen(process.env.PORT, () =>
  console.log(`[${new Date().toISOString()}] 🚀 Server is running!`)
);
