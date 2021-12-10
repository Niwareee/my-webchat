
import * as dotenv from "dotenv";
import { launch } from "./server";

dotenv.config();
const port = parseInt(process.env.PORT);
launch(port);
