import helmet from "helmet";
import express from "express";
import { authRouter } from "./routers/index.js";

const app = express();
const PORT = process.env.PORT ?? 3100;
app.use(helmet());

app.use("/auth", authRouter);

app.use((req, res) => {
  res.status(404).send("<h1>404 Not Found</h1>");
});
app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
