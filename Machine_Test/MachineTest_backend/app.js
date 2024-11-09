const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const fs=require('fs');
const HttpError = require('./model/http-error');
const mongoose = require('mongoose');

const membershipPlanRoutes = require('./routes/plan-routes');
const genreRoutes = require('./routes/genre-routes')
const authorRoutes = require('./routes/author-routes')
const publicationRoutes = require('./routes/publication-routes')
const userRoutes = require('./routes/user-routes')
const fineRoutes = require('./routes/fine-routes')
const bookRoutes = require('./routes/book-routes')
const rentalRoutes = require('./routes/rental-routes')

app.use(bodyParser.json())


// to handle cors policy errors
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-type, Accept, Authorization');
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
        );
        next();
        
})

app.use('/api/membership-plans', membershipPlanRoutes);
app.use('/api/genre', genreRoutes);
app.use('/api/author',authorRoutes);
app.use('/api/publication',publicationRoutes);
app.use('/api/user',userRoutes);
app.use('/api/fine',fineRoutes);
app.use('/api/book',bookRoutes);
app.use('/api/rental',rentalRoutes);


app.use((req,res,next)=>{
    const error = new HttpError('could not find this routes',404);
    throw error;
});

app.use((err, req, res, next) => {

    // this condition will delete the image when error occurs
    if(req.file){
        fs.unlink(req.file.path,(err)=>{   //deletes the file
            console.log(err);
        })
    }
    if(res.headerSent){
        return next(err)
    }
    res.status(err.code || 500);
    res.json({message: err.message} || 'An unknown error occured!');
})

mongoose.connect('mongodb+srv://devubabu12:Faith@faith.o90w3.mongodb.net/library?retryWrites=true&w=majority&appName=faith').then(()=>{
    //to start the server
    app.listen(5000);
    }).catch(err=>{
        console.log(err);
    })
