const express = require('express')
const app = express();
const {PORT, FRONTEND_URL} = require('./config/serviceConfig');
const connectDB = require('./config/dbConfig');
const infoRouter = require('./routes/information');
const newsRouter = require('./routes/news');
const cors = require("cors");
const userRouter = require('./routes/user');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth');

app.use((req, res, next) => { 
    res.header('Access-Control-Allow-Origin', FRONTEND_URL); // allow specific origin
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});



app.use(cors({
    origin: FRONTEND_URL,  // allow to users to accept request from different origin
    credentials: true, //allow session cookie from browser to pass through
}));

app.use(cookieParser())

//deserealise the url data
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended : true}))

//Routing middleware
app.use('/infos',infoRouter);
app.use('/news', newsRouter) ;
app.use('/users', userRouter);
app.use('/auth', authRouter);

app.listen(PORT,async(req, res)=>{
    console.log(`Server started at server ${PORT}` )
    await connectDB();
    
});