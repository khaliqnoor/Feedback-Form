import express from "express"
import dotenv from 'dotenv'
import cors from "cors"
import connectDb from "./config/db.js"
import router from "./routes/feedbackRoute.js"


const app = express()

dotenv.config()
app.use(express.json())
app.use(cors())
await connectDb()

app.use('/api', router)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(5000, () => {
  console.log(`Example app listening on port 5000`)
})