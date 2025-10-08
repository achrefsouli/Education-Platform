const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require('dotenv').config();
const uri= process.env.MONGO_URI
mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('✅ Connected to MongoDB Atlas');});
const bcrypt = require("bcrypt");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const multer = require('multer');
const path = require('path');
const axios = require("axios");
const rateLimit =require("express-rate-limit")
const app = express();
const nodemailer = require("nodemailer");

//cors config
app.use(cors({
    origin: "https://educationplatforme.netlify.app"
}))
//body-parser config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//session config
const secretKey = process.env.secretKey
app.use(session({ secret: secretKey }));
//multer config
app.use('/myShortCut', express.static(path.join('backend/uploads')))
const storage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, "backend/uploads"); },
    filename: (req, file, cb) => { cb(null, Date.now() + path.extname(file.originalname)); }
});
//rate limit config
const limiter = rateLimit({
	windowMs: 2* 60 * 1000, // 15 minutes
	limit: 7, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    message: {
        status: 429,
        error: 'Too many login attempts. Please try again later.',
      },
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
	// store: ... , // Redis, Memcached, etc. See below.
})

//models
const user = require('./models/user');
const course = require('./models/course');
const grade = require('./models/grade');
const contact=require('./models/contact')
const { jwtDecode } = require('jwt-decode');
//users
app.post("/users/signup", multer({ storage: storage }).single("photo"), (req, res) => {
    console.log("here into BL : Signup", req.body);
    user.findOne({ tel: req.body.tel }).then(
        (doc) => {
            console.log("here is response from DB after checking tel uniqueness", doc);
            if (doc) {
                res.json({ msg: "user already exist" });
            } else {
                user.findOne({email:req.body.email}).then(
                    (foundUser)=>{
                        console.log("here is response after checking email uniqueness",foundUser);
                        if (foundUser) {
                            res.json({ msg: "email already used" });
                        }
                        else{
                            if (req.body.role == "parent") {
                                user.findOne({ role: "student", tel: req.body.telChild }).then(
                                    (child) => {
                                        console.log("here is response from DB after searching for child", child);
                                        if (child) {
                                            bcrypt.hash(req.body.password, 10).then(
                                                (cryptedPass) => {
                                                    console.log("here is crypted pass", cryptedPass);
                                                    req.body.password = cryptedPass;
                                                    const userObj = new user(req.body);
                                                    userObj.save(
                                                        (err, doc) => {
                                                            console.log("here is doc after save", doc);
                                                            console.log("here is error after save", err);
                                                            if (doc) {
                                                                res.json({ msg: "user added" })
                                                            } else {
                                                                res.json({ msg: "user not added" })
                                                            }
                                                        }
                                                    );
                                                }
                                            );
                                        } else {
                                            res.json({ msg: "student doesn't exist" });
                                        }
                                    }
                                )
                            } else {
                                bcrypt.hash(req.body.password, 10).then(
                                    (cryptedPass) => {
                                        console.log("here is crypted pass", cryptedPass);
                                        req.body.password = cryptedPass;
                                        if (req.file && req.body.role == "student") {
                                            req.body.img = "http://localhost:3000/myShortCut/" + req.file.filename;
                                        }
                                        if (req.file && req.body.role == "teacher") {
                                            req.body.cv = "http://localhost:3000/myShortCut/" + req.file.filename;
                                        }
            
            
                                        const userObj = new user(req.body);
                                        userObj.save(
                                            (err, doc) => {
                                                console.log("here is doc after save", doc);
                                                console.log("here is error after save", err);
                                                if (doc) {
                                                    res.json({ msg: "user added" })
                                                } else {
                                                    res.json({ msg: "user not added" })
                                                }
                                            }
                                        );
                                    }
                                );
                            }
                        }
                    }
                )
               
            }

        }
    );

})
app.post("/users/login",limiter, (req, res) => {
    console.log("here into BL:login", req.body);
    user.findOne({ tel: req.body.telephone }).then(
        (doc) => {
            console.log("here is response from DB after searching for tel", doc);
            if (!doc) {
                res.json({ msg: "user not found" })
            } else {
                bcrypt.compare(req.body.password, doc.password).then(
                    (result) => {
                        console.log("here is response from DB after comparing", result);
                        if (result) {
                            let userToSend = {}
                            if (doc.role == "student") {
                                userToSend = {
                                    role: doc.role,
                                    fName: doc.fName,
                                    lName: doc.lNameName,
                                    motherName: doc.motherName,
                                    fatherName: doc.fatherName,
                                    id: doc._id,
                                    adresse: doc.adresse,
                                    tel: doc.tel,
                                    password: doc.password,
                                    email: doc.email,
                                    img: doc.img
                                }
                            }
                            else if (doc.role == "parent") {
                                userToSend = {
                                    role: doc.role,
                                    fName: doc.fName,
                                    lName: doc.lNameName,
                                    email: doc.email,
                                    id: doc._id,
                                    adresse: doc.adresse,
                                    tel: doc.tel,
                                    password: doc.password,
                                    telChild: doc.telChild,
                                }
                            }
                            else if (doc.role == "teacher") {
                                userToSend = {
                                    role: doc.role,
                                    fName: doc.fName,
                                    lName: doc.lNameName,
                                    email: doc.email,
                                    id: doc._id,
                                    adresse: doc.adresse,
                                    tel: doc.tel,
                                    password: doc.password,
                                    specialite: doc.specialite,
                                    statut: doc.statut,
                                }
                            }
                            else {
                                userToSend = {
                                    role: doc.role,
                                    fName: doc.fName,
                                    lName: doc.lNameName,
                                    email: doc.email,
                                    id: doc._id,
                                    tel: doc.tel,
                                    password: doc.password,

                                }
                            }
                            let token = jwt.sign(userToSend, secretKey, { expiresIn: "1h" })
                            console.log("here is token", token);
                            res.json({ msg: "success", user: token })

                        }
                        else { 
                           res.json({ msg: "error"}); 
                        }
                    }
                )
            }
        }
    )
})
app.get("/users", (req, res) => {
    console.log("here into BL:get all users");
    user.find().then(
        (docs) => {
            console.log("here is response from DB after getting users", docs);
            res.json({ tab: docs })
        }
    )
})
app.get("/users/teachers", (req, res) => {
    console.log("here into BL:get all users");
    user.find({ role: "teacher" }).then(
        (docs) => {
            console.log("here is response from DB after getting users", docs);
            res.json({ tab: docs })
        }
    )
})
app.get("/users/students", (req, res) => {
    console.log("here into BL:get all users");
    user.find({ role: "student" }).then(
        (docs) => {
            console.log("here is response from DB after getting users", docs);
            res.json({ tab: docs })
        }
    )
})
app.get("/users/parents", (req, res) => {
    console.log("here into BL:get all users");
    user.find({ role: "parent" }).then(
        (docs) => {
            console.log("here is response from DB after getting users", docs);
            res.json({ tab: docs })
        }
    )
})
app.get("/users/:id", (req, res) => {
    console.log("here into BL:get user by id");
    user.findOne({ _id: req.params.id }).populate("courseIds").then(
        (doc) => {
            console.log("here is response from DB after getting user", doc);
            res.json({ user: doc })
        }
    )
})
app.delete("/users/:id", (req, res) => {
    console.log("here into BL: delete user by ID");
    user.deleteOne({ _id: req.params.id }).then(
        (response) => {
            console.log("here is response from BE", response);
            if (response.deletedCount == 1) {
                res.json({ msg: "success" });
            } else {
                res.json({ msg: "error" });
            }
        }

    )
})
app.put("/users", (req, res) => {
    console.log("here into BL : update statut");
    user.updateOne({ _id: req.body._id }, req.body).then(
        (response) => {
            console.log("here is response from BE after updating statut", response);
            if (response.nModified) {
                res.json({ msg: "success" });
            }
            else {
                res.json({ msg: "error" });
            }
        }
    )
})
app.put("/users/affectCourse", (req, res) => {
    console.log("here into BL : affecter course");
    course.findById(req.body.courseIds[req.body.courseIds.length - 1]).then(
        (foundCourse) => {
            console.log("here is found Course", foundCourse);
            if (!foundCourse) {
                res.json({ msg: "course not found" })
            } else {
                user.updateOne({ _id: req.body._id }, req.body).then(
                    (response) => {
                        console.log("here is response from BE after updating courseIds", response);
                        if (response.nModified) {
                            foundCourse.studentIds.push(req.body._id)
                            foundCourse.save();
                            res.json({ msg: "success" });
                        }
                        else {
                            res.json({ msg: "error" });
                        }
                    }
                )

            }
        }
    )

})
app.put("/users/update", multer({ storage: storage }).single("photo"), (req, res) => {
    console.log("here into BL : update user by id", req.body);
    user.updateOne({ _id: req.body._id }, req.body).then(
        (response) => {
            console.log("here is response from BE after updating user", response);
            if (response.nModified == 1) {
                res.json({ msg: "success" });
            }
            else {
                res.json({ msg: "error" });
            }
        }
    )




})
app.get("/users/search/:tel", (req, res) => {
    console.log("here into BL search student by number");
    user.findOne({ tel: req.params.tel }).populate("courseIds").populate("gradeIds").then(
        (doc) => {
            console.log("here is response from DB after searching user by tel", doc);
            if (doc) {
                res.json({ user: doc })
            } else {
                res.json({ msg: "error" })
            }
        }
    )
})
app.get("/users/searchTeacher/:specialite", (req, res) => {
    console.log("here into BL search teacher by specialite");
    user.find({ specialite: req.params.specialite }).then(
        (docs) => {
            console.log("here is response from DB after searching user by specialite", docs);
            if (docs) {
                res.json({ tab: docs })
            } else {
                res.json({ msg: "error" })
            }
        }
    )
})
app.get("/users/forgotPassword/:email",(req,res)=>{
    console.log("here into BL forgot password");
    user.findOne({email:req.params.email}).then(
        (doc)=>{
            if (doc) {
                const transporter = nodemailer.createTransport({
                    host: "smtp.ethereal.email",
                    port: 587,
                    secure: false, // true for 465, false for other ports
                    auth: {
                      user: "dayna.beier30@ethereal.email",
                      pass: "h1faRR5zbNyff6j9sv",
                    },
                  });
                  let userToSend ={
                    email:doc.email,
                    id:doc._id,
                  }
                  let token = jwt.sign(userToSend, secretKey, { expiresIn: "1h" })
                  console.log("here is token", token);
                  const resetUrl = `http://localhost:4200/resetPassword/${token}`;
                  transporter.sendMail({
                    to: doc.email,
                    subject: "Password Reset",
                    html: `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
                  });
                  res.json({ msg: "Password reset link sent to your email" });
                  
            }
            else{
                res.json({msg:"user not found"})
            }
        }
    )
})
app.put("/users/resetPassword",(req,res)=>{
    console.log("here into BL reset password",req.body);
    bcrypt.hash(req.body.password, 10).then(
        (cryptedPass) => {
            console.log("here is crypted pass", cryptedPass);
            req.body.password = cryptedPass;
            user.updateOne({_id:req.body.id},req.body).then(
                (response)=>{
                    console.log("here is response from BE after updating Pass",response);
                    if (response.nModified==1) {
                        res.json({msg:"success"})
                    }
                    else{
                        res.json({msg:"error"})
                    }
                }
            )
        })
   
})


//courses
app.post("/courses", (req, res) => {
    console.log("here into BL : add course", req.body);
    user.findById({ _id: req.body.teacherId }).then(
        (foundUser) => {
            console.log("here is response from DB after searching user", foundUser);
            if (!foundUser) {
                res.json({ msg: "user not found" })
            } else {
                const courseObj = new course({
                    name: req.body.name,
                    description: req.body.description,
                    duration: req.body.duration,
                    teacherId: foundUser._id,
                });
                courseObj.save(
                    (err, doc) => {
                        console.log("here is doc after save", doc);
                        console.log("here is error after save", err);
                        if (doc) {
                            foundUser.courseIds.push(doc._id);
                            foundUser.save();
                            res.json({ msg: "course added" })
                        } else {
                            res.json({ msg: "error" })
                        }
                    }
                );
            }
        }
    )


})
app.get("/courses", (req, res) => {
    console.log("here into BL : get all courses");
    course.find().populate("teacherId").then(
        (docs) => {
            console.log("here is response from DB after getting courses", docs);
            res.json({ tab: docs })
        }
    )
})
app.get("/courses/sort/croissant", (req, res) => {
    console.log("here into BL : get all courses");
    course.find().sort({duration:1}).populate("teacherId").then(
        (docs) => {
            console.log("here is response from DB after getting courses", docs);
            res.json({ tab: docs })
        }
    )
})
app.get("/courses/sort/decroissant", (req, res) => {
    console.log("here into BL : get all courses");
    course.find().sort({duration: -1}).populate("teacherId").then(
        (docs) => {
            console.log("here is response from DB after getting courses", docs);
            res.json({ tab: docs })
        }
    )
})
app.get("/courses/teacher/:id", (req, res) => {
    console.log("here into BL : get all courses", req.params.id);
    course.find({ teacherId: req.params.id }).populate("studentIds").then(
        (docs) => {
            console.log("here is response from DB after getting courses", docs);
            res.json({ tab: docs })
        }
    )
})
app.get("/courses/:id", (req, res) => {
    console.log("here into BL : get course by id");
    course.findOne({ _id: req.params.id }).populate("teacherId").then(
        (doc) => {
            console.log("here is response from DB after searching course", doc);
            if (doc) {
                res.json({ msg: "success", user: doc });
            }
            else {
                res.json({ msg: "error" });
            }
        }
    )
})
app.delete("/courses/:id", (req, res) => {
    console.log("here into BL delete user");
    course.deleteOne({ _id: req.params.id }).then(
        (response) => {
            console.log("here is response from DB", response);
            if (response.deletedCount == 1) {
                res.json({ msg: "success" });
            }
            else {
                res.json({ msg: "error" });
            }
        }
    )
})
app.put("/courses", (req, res) => {
    console.log("here into BL : update user");
    course.updateOne({ _id: req.body._id }, req.body).then(
        (result) => {
            console.log("here is response from BE after updatiing course");
            if (result.nModified == 1) {
                res.json({ msg: "success" })
            }
            else {
                res.json({ msg: "error" })
            }
        }
    )
})

//grades
app.post("/grades", (req, res) => {
    console.log("here into BL : add grade");
    user.findById(req.body.studentId).then(
        (foundUser) => {
            if (!foundUser) {
                res.json({ msg: "user not found" });
            }
            else {
                course.findById(req.body.courseId).then(
                    (foundCourse) => {
                        if (!foundCourse) {
                            res.json({ msg: "course not found" });
                        } else {
                            grade.findOne({ studentId: req.body.studentId , courseId:foundCourse._id }).then(
                                (foundGrade) => {
                                    if (foundGrade) {
                                        console.log("here is found grade", foundGrade);
                                        res.json({ msg: "student already graded" });
                                    }
                                    else {
                                        let gradeOBJ = new grade({
                                            grade: req.body.grade,
                                            evaluation: req.body.evaluation,
                                            studentId: foundUser._id,
                                            courseId: foundCourse._id,
                                        })
                                        gradeOBJ.save(
                                            (err, doc) => {
                                                console.log("here is doc after save", doc);
                                                console.log("here is error after save", err);
                                                if (doc) {
                                                    foundUser.gradeIds.push(doc._id);
                                                    foundCourse.gradeIds.push(doc._id);
                                                    foundCourse.save();
                                                    foundUser.save();
                                                    res.json({ msg: "grade saved" })
                                                } else {
                                                    res.json({ msg: "grade not saved" })
                                                }
                                            }
                                        )
                                    }
                                }
                            )
                        }
                    }
                )
            }
        }
    )
})
app.get("/grades/student/:id", (req, res) => {
    console.log("here into BL : get grade by student id");
    grade.find({ studentId: req.params.id }).populate("courseId").then(
        (docs) => {
            console.log("here is response from DB", docs);
            if (docs) {
                res.json({ tab: docs })
            } else {
                res.json({ msg: "error" });
            }


        }
    )
})
app.get("/grades/:id", (req, res) => {
    console.log("here into BL : get grade by student id");
    grade.findById({ _id: req.params.id }).populate("courseId").then(
        (doc) => {
            console.log("here is response from DB", doc);
            if (doc) {
                res.json({ grade: doc })
            } else {
                res.json({ msg: "error" });
            }


        }
    )
})
app.get("/grades",(req,res)=>{
    console.log("here into BL: get all Grades");
    grade.find().populate("studentId").populate("courseId").then(
        (docs)=>{
            console.log("here is response from DB after getting grades",docs);
            res.json({tab:docs});
        }
    )
})
app.get("/grades/sort/croissant",(req,res)=>{
    console.log("here into BL: get all Grades croissant");
    grade.find().sort({grade: 1}).populate("studentId").populate("courseId").then(
        (docs)=>{
            console.log("here is response from DB after getting grades",docs);
            res.json({tab:docs});
        }
    )
})
app.get("/grades/sort/decroissant",(req,res)=>{
    console.log("here into BL: get all Grades decroissant");
    grade.find().sort({grade:-1}).populate("studentId").populate("courseId").then(
        (docs)=>{
            console.log("here is response from DB after getting grades",docs);
            res.json({tab:docs});
        }
    )
})
app.delete("/grades/:id",(req,res)=>{
    console.log("here into BL: delete grade by id");
    grade.deleteOne({_id:req.params.id}).then(
        (result)=>{
            console.log("here is response from DB after deleting grade",result);
            if (result.deletedCount==1) {
                res.json({msg:"success"});
            } else {
                res.json({msg:"error"});
            }
        }
    )
})
app.put("/grades", (req, res) => {
    console.log("here into BL update grade",req.body);
    grade.updateOne({_id:req.body._id},req.body).then(
        (result)=>{
            if (result.nModified) {
               res.json({msg:"success"});
            }
            else{
                res.json({msg:"error"});
            }
        }
    )
})
//contact
app.post("/contact",(req,res)=>{
    console.log("here into BL: add contact");
    const contactObj=new contact(req.body);
    contactObj.save(
        (err, doc) => {
            console.log("here is doc after save", doc);
            console.log("here is error after save", err);
            if (doc) {
                res.json({ msg: "contact added" })
            } else {
                res.json({ msg: "contact not added" })
            }
        }
    )
})
app.get("/contact",(req,res)=>{
    console.log("here into BL: get all contacts");
    contact.find().then(
        (docs)=>{
            console.log("here is contacts from DB",docs);
            if (docs) {
                res.json({tab:docs})
            }
        }
    )
})
app.delete("/contact/:id",(req,res)=>{
    console.log("here into BL:delete contact");
    contact.deleteOne({_id:req.params.id}).then(
        (result)=>{
            if (result.deletedCount==1) {
                res.json({msg:"success"})
            } else {
                res.json({msg:"error"})
            }
        }
    )
})




//book search
app.post("/book", (req, res) => {
    console.log("here into BL search Book");
    let apiAddress = `https://openlibrary.org/search.json?q=${req.body.title}`
    axios.get(apiAddress).then(
        (apiResponse) => {
            console.log("here is response from api", apiResponse.data);
            res.json({ data: apiResponse.data })
        }
    )


})
//send notifcation(sms twilio)
app.post("/notifications", (req, res) => {
    console.log("here into BL: send notification sms");
    const accountSid = process.env.TWILIO_accountSid;
    const authToken =process.env.TWILIO_authToken;
    const fromNumber = process.env.TWILIO_fromNumber;
    let apiAddress = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
    // const data = qs.stringify({
    //     From: fromNumber,
    //     To: `+${req.body.tel}`,
    //     Body: "a grade has been added on your dashboard"
    // });
    const data = new URLSearchParams({
        From: fromNumber,       // must be a valid Twilio number
        To: `+216${req.body.tel}`,        // must include country code
        Body: `${req.body.fName} ${req.body.lName} a grade has been added on your dashboard`
      }).toString();
    axios.post(apiAddress, data, {
        auth: {
            username: accountSid,     
            password: authToken       
        },
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(
        (apiResponse) => {
            console.log("here is api response",apiResponse);
            res.json({data:apiResponse.statusText})
        }
    )
})
//random photo api
app.post("/photos", (req, res) => {
    console.log("here into BL get photo from unsplash",req.body.specialite);
    const ACCESS_KEY = process.env.UNSPLASH_KEY;
     let apiAddress=`https://api.unsplash.com/photos/random?query=${req.body.specialite}&w=300&h=300&&client_id=${ACCESS_KEY}`
     console.log(apiAddress);
    axios.get(apiAddress).then(
        (apiResponse) => {
            console.log("Here is response from Unsplash:", apiResponse.data.urls.regular);
            res.json({photo:apiResponse.data.urls.regular});
        }
    )

})

    
  
 
module.exports = app;