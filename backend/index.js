import express  from "express";
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from "cookie-parser";
import userRoute from './routes/users.js'
import authRoute from './routes/auth.js'
import notesRoute from './routes/notes.js'
import todosRoute from './routes/todo.js'
import eventRoute from './routes/event.js'
import contactRoute from './routes/contact.js'
import newsRoute from './routes/news.js'; // Import the news route
// import swaggerJsDoc from "swagger-jsdoc";
// import swaggerUi from "swagger-ui-express";



dotenv.config()
const app = express()
const port = process.env.PORT || 4000
const corsOptions = {
   origin: true,
   credentials: true
}
// const swaggerOptions = {
// definition: {
//      openapi: '3.0.0',
//      info: {
//        title: 'LifeSync',
//        version: '1.0.0',
//        description: 'LifeSync API Documentation',
//        servers: ['http://localhost:4000'] 
//      },
//    },
//    apis: ["./routes/*.js","./models/*.js"],
//  };
// const swaggerSpecs = swaggerJsDoc(swaggerOptions);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

mongoose.set("strictQuery", false)
const connect = async() => {
   try {
      await mongoose.connect(process.env.MONGO_URI, {
         useNewUrlParser: true,
         useUnifiedTopology: true
      })

      console.log('MongoDB connected')
   } catch (error) {
      console.log('MongoDB connected failed')
   }
}

app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())
app.use("/api/v1/auth", authRoute)
app.use("/api/v1/users", userRoute)
app.use("/api/v1/notes", notesRoute)
app.use("/api/v1/todos", todosRoute)
app.use("/api/v1/events", eventRoute)
app.use("/api/v1/contacts", contactRoute)
app.use("/api/v1/news", newsRoute);


app.listen(port, () => {
   connect()
   console.log('server listening on port', port)
})