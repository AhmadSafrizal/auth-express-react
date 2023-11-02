import express from 'express'
import cors from 'cors'
import session from 'express-session'
import SequelizeStore from 'connect-session-sequelize'
import router from './routes/index.js'
import db from './config/Database.js'
import dotenv from 'dotenv'
dotenv.config()

const app = express()

const sessionStore = SequelizeStore(session.Store)

const store = new sessionStore({
  db: db
})

// const connectDB = async () => {
//   await db.sync()
//   return
// }

// connectDB()

const port = process.env.PORT || 3000

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: store,
  cookie: {
    secure: 'auto'
  }
}))

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(express.json())

app.use(router)

// store.sync()

app.listen(port, () => {
  console.log(`Server run on ${port}...`)
})
