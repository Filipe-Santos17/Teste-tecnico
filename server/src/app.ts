import express from "express"
import rotas from "@/routes"
import cors from "cors"
import swaggerUi from "swagger-ui-express"
import swaggerDocs from "@/docs/swagger.json"
import helmet from "helmet";

const app = express()
const corsSettings = { origin: "http://localhost:3000", methods: ["GET", "POST", "DELETE", "PUT", "PATCH"] }

app.use(helmet());
app.use(cors(corsSettings));
app.use(express.json());
app.use("/api/", rotas)
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

export default app;