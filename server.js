const express=require('express');
const app=express();

const cors=require('cors');
app.use(cors({ origin: 'https://campuschitchat.netlify.app' }));

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
