import app from "./controllers/app";
import { router } from './routes'

app.use('/api', router)