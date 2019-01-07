var express = require("express");
var app = express();
app.listen(3000, 'localhost');
app.use(express.static(__dirname));




var mongoose = require("mongoose");
var UsersSchema = new mongoose.Schema({ email: String, personname: String, password: String, mobile: String, dateofbirth: Number,
monthofbirth: Number, yearofbirth: Number,receivenewsletters: Boolean, gender: String, county: String, amount: Number}, { versionKey: false});
var Users = mongoose.model('users', UsersSchema, 'users');

var QuestionsSchema = new mongoose.Schema({ questionsname: String, questionendtime: String, userid: String, categoryid: String,
viewscount: Number }, { versionKey: false });
var Questions = mongoose.model('questions', QuestionsSchema, 'questions');

var CategorySchema = new mongoose.Schema( { _id: Number, categoryname: String } , { versionKey: false } );
var Categories = mongoose.model('categories', CategorySchema,'categories')

var bodyparser = require("body-parser");
//  app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

// mongoose.Promise = global.Promise;

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
});



app.post("/insertuser", function(req,res){
    mongoose.connect("mongodb://localhost:27017/stackoverflow", { useNewUrlParser: true } )
    var newUser = new Users({ email: req.body.email, personname: req.body.personname, password: req.body.password, mobile: req.body.mobile,
    dateofbirth: req.body.dateofbirth, monthofbirth: req.body.monthofbirth, yearofbirth: req.body.yearofbirth, receivenewsletters:req.body.recivenewsletters,
gender:req.body.gender, county: req.body.county, amount: req.body.amount});
newUser.save(function(err){
    if(err){
        console.log(err);
        res.send("Failed");
    }
    else{
        res.send("successfully Inserted");
    }
    mongoose.connection.close();
});
});



app.post("/checkemailandpassword", function(req,res){
    mongoose.connect("mongodb://localhost:27017/stackoverflow", { useNewUrlParser: true } )
    Users.find({ email: req.body.email, password: req.body.password },function(err,data){
        if(err){
            console.log(err);
            res.send("failed");
        }
        else{
            res.send(data);
        }
        mongoose.connection.close();
    });
});






app.get("/getlatestquestions", function(req,res){
    mongoose.connect("mongodb://localhost:27017/questions", { useNewUrlParser: true } )
       Questions.find(function(err,data){
        if(err)
        {
            console.log(err);
            res.send("failed");
        }
        else{
            res.send(data);
        }
        mongoose.connection.close();
    });
});



app.get('/getcategories' , function(req,res){
    mongoose.connect("mongodb://localhost:27017/stackoverflow", { useNewUrlParser: true });
    Categories.find(function(err,data){
        if(err){
            console.log(err);
            res.send("failed");
        }
        else{
            console.log(data);
            res.send(data);
        }
        mongoose.connection.close();
    });
});

app.post('/insertcategory', function(req,res){
    mongoose.connect("mongodb://localhost:27017/stackoverflow", { useNewUrlParser: true });
    console.log(req.body);
    var newCategory = new Categories( { _id: req.body._id, categoryname: req.body.categoryname } );
    newCategory.save(function(err)
    {
        if(err){
        console.log(err);
        res.send("failed");
            }
            else {
                res.send("successfully inserted");
            }
mongoose.connection.close.close();
        });
});

app.post('updatecategory' , function (req,res){
    mongoose.connect("mongodb://localhost:27017/stackoverflow", { useNewUrlParser: true });
    console.log(req.body);
    Categories.findOne( { _id: req.body._id } , function(err ,data) {
if(err){
    res.send(err);
    console.log("failed");
}
else {
    console.log(data);
    data.categoryname = req.body.categoryname;
    data.save(function(err){
        if(err){
            console.log(err);
            res.send("Failed");
        }
        else {
            res.send("updated successfully");
        }
        mongoose.connection.close();
    });
}
    });
});


app.delete('/deletecategory', function(req,res){
    mongoose.connect("mongodb://localhost:27017/stackoverflow", { useNewUrlParser: true });
    console.log(req.query);
    Categories.deleteOne( { _id:req.query._id}, function(err,data)
    {
        if(err)
        {
            console.log("failed");
            res.send(err);
        }
        else
        {
            console.log(data);
            res.send("successfully deleted");
        }
        mongoose.connection.close();
    });
});



























