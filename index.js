import  express  from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import router from './src/routes/routes.js'
import connect from "./src/config/config.js";
import dotenv from 'dotenv'

dotenv.config()
const app = express();
const PORT = process.env.PORT

app.use(bodyParser.json({
    limit:"30mb", 
    extended:true
}))

app.use(bodyParser.urlencoded({
    limit:"30mb", 
    extended:true
}))

app.listen(PORT , () => {
    connect()
    console.log(`running on port ${PORT}`)
})
app.use(cors());
app.use("/", router)
