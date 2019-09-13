let mongoose = require('mongoose');
let express = require('express');
let bodyparser = require('body-parser');
let app = express();

let Task = require('./models/tasks')
let Developer = require('./models/developers')

// let url = "mongodb://localhost:27017/wk7";
const url = "mongodb://" + process.argv[2] + ":27017/" + process.argv[3];
let viewsPath = __dirname + "/views/";
app.engine('html', require("ejs").renderFile);
app.use(express.static('images'));
app.use(express.static('css'));
app.use(bodyparser.urlencoded({
    extended: false
}));
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(err){
    
    if(err) console.log(err);
    else {
        console.log('Connected to database server');  
    }
});


app.get('/', (req,res) => {
    res.sendFile(viewsPath + "index.html");
})

app.get('/newdev.html', (req,res)=> {
    res.sendFile(viewsPath + "newdev.html");
})
app.post('/newdev.html', (req,res)=> {
    developer = new Developer({
        name: { 
            firstName: req.body.firstName,
            lastName: req.body.lastName
            },
        level: req.body.level,
        address: {
            state: req.body.state,
            suburb: req.body.suburb,
            street: req.body.street,
            unit: req.body.unit
        }
    });
    developer.save((err)=>{
        if(err) console.log(err);
        else console.log('Developer Saved!!!');
    });
    res.redirect('/getdev.html');
});

app.get('/getdev.html', (req,res)=>{
    Developer.find().exec(function(err,docs){
        res.render('getdev.html', {
            taskDb: docs
            });
    })
})

app.get('/newtask.html', (req,res)=> {
    res.sendFile(viewsPath + "newtask.html");
})
app.post('/newtask.html', (req,res)=> {    
    task = new Task({
        taskName: req.body.taskName,
        assignTo: req.body.devid,
        dueDate: req.body.dueDate,
        taskStatus: req.body.taskStatus,
        taskDesc: req.body.taskDesc
    })
    task.save((err)=>{
        if(err) console.log(err);
        else console.log('Task Saved!!!');
    });
    res.redirect('/gettask.html');
})

app.get('/gettask.html', (req,res)=>{
    Task.find().populate('developer').exec((err,docs)=>{
        res.render('gettask.html',{taskDb:docs})
    });
})


app.get('/deletetask.html', (req,res)=>{
    res.sendFile(viewsPath + "deletetask.html");
})
app.post('/deletetask.html', (req,res)=>{
    Task.deleteOne({_id: req.body.id}).exec((err, docs)=>{
        console.log(docs);
    })
    res.redirect('/gettask.html')
})


app.get('/deleteall.html', (req,res)=> {
    res.sendFile(viewsPath + "deleteall.html");
})
app.post('/deleteall.html', (req,res)=> {
    let query = {taskStatus: "Complete"};
    Task.deleteMany(query).exec((err,docs)=>{
        console.log(docs); 
    })
    res.redirect('/gettask.html');
})




app.get('/updatetask.html', (req,res) =>{
    res.sendFile(viewsPath + "updatetask.html");
})

app.post('/updatetask.html', (req,res)=>{
    let id = req.body.id;
    let newStatus = req.body.newStatus;
    Task.updateOne( {_id: id}, {$set: {taskStatus: newStatus}}, {upsert: true},(err,result)=>{})
    res.redirect('/gettask.html');
});



app.listen(8080, ()=> {
    console.log('server running!!!');
});