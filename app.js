const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());

main().catch(err => console.log(err));

// Connecting with DB 

async function main() {
    await mongoose.connect('mongodb://localhost:27017/secondTask',{useNewUrlParser:true});
};

// Creating model 

const imageSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    } ,
    image: {
        type: String,
        required: true

    }
});

const Image = mongoose.model('Image', imageSchema);

// Main route 

app.get("/",(req, res)=>{
    res.send("Hello world!");
});

// To see all data

app.get("/api/images",(req, res)=>{
    Image.find({ },(err, data) => {
        if(!err){
            res.send(data);
        } else {
            console.log(err);
        }
    });
});

// To create a data

app.post("/api/images/create", (req, res) => {
    const img = new Image({
        title : req.body.title,
        image : req.body.image
    });
    img.save((err, data) =>{
        res.status(200).json({code:200, message: "Image added successfully!", createdImage : data});
    });
});

// To Read data by id

app.get("/api/images/:id",(req, res) => {
    Image.findById(req.params.id,(err, data)=>{
        if(!err){
            res.send(data);
        } else {
            console.log(err);
        }
    });
});

// To Update a data 

app.put("/api/images/update/:id", (req, res) => {
    const img = {
        title : req.body.title,
        image : req.body.image
    };
    Image.findByIdAndUpdate(req.params.id, {$set:img}, {new:true}, (err, data) =>{
        if(!err){
            res.status(200).json({code:200, message:"Image updated succesfully!", updatedImage: data});
        } else {
            console.log(err);
        }
    });
});

// To delete a data

app.delete("/api/images/:id", (req, res)=>{
    Image.findByIdAndDelete(req.params.id, (err, data)=>{
        if(!err){
            res.status(200).json({code:200, message:"Image deleted successfully!", deteledImage:data})
        } else {
            console.log(err);
        }
    })
})

app.listen(3000,()=>{
    console.log("server running in port 3000!");
})
