const express=require('express');
const app=express();

const allowedOrigins = [
    'https://campuschitchat.netlify.app',
    'http://localhost:3000',
    'http://localhost:3001', 
  ];
const cors=require('cors');
const corsOptions = {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        // Allow requests with no origin (like mobile apps or curl requests)
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // Optional: If you’re handling credentials (cookies, etc.)
  };
  
  app.use(cors(corsOptions));
require('dotenv').config();
const PORT=process.env.PORT||3000;

app.use(express.json());
const fileUpload=require('express-fileupload');
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
}))

const dbConnect=require('./config/databse.js');
dbConnect();
const cloudinaryConnect=require('./config/cloudinary.js')
cloudinaryConnect();

const appRoute=require('./routes/appRoute.js')
app.use('/api/v1',appRoute);

app.listen(PORT,()=>{
    console.log(`App listening on PORT ${PORT}`)
})
