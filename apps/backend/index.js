import helmet from "helmet";
import express from "express";
import { authRouter } from "./routers/index.js";
import { ErrorHandlerMiddleware } from "./middleware/error-handler-middleware.js";

const app = express();
const PORT = process.env.PORT ?? 3100;
app.use(helmet());
app.use(express.json());

app.use("/auth", authRouter);

app.use(ErrorHandlerMiddleware.logError);
app.use(ErrorHandlerMiddleware.boomHandler);
app.use(ErrorHandlerMiddleware.globalHandler);

app.use((req, res) => {
  res.status(404).send("<h1>404 Not Found</h1>");
});
app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
