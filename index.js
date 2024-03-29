const express = require("express");
const app =express();
const mysql= require("mysql2");
const port= 8080;
const path = require("path");
const methodOverride = require("method-override");


app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));

const connection =mysql.createConnection({
    host:"localhost",
    user: "root",
    database:"minor_data",
    password:"Kunal@124421",
 });

 app.get("/",(req,res) =>{
    res.render("login.ejs");
 });

 app.get("/signup",(req,res) =>{
    res.render("signup.ejs");
 });

 app.post("/signup",(req,res) =>{
    let name = req.body.name;
    let enrollNo= req.body.enrollNo;
    let password=req.body.password;
    let q = `insert into info(name, enrollNo, password) values (?,?,?)`;
    try{
        connection.query(q,[name, enrollNo, password],(err, result) =>{
           if(err) throw err;
           
           res.redirect("/");
        
        });
     }catch(err){
        console.log(err);
        res.send(`Some err in DB`);
     }

 });

 app.post("/login/profile", (req,res) =>{
   let enrollNo= req.body.enteredenrollNo;
   let enteredpassword=req.body.enteredpassword;
    console.log(req.body);
    // let {enrollNo: enteredenrollNo, password: enteredpassword}=req.body;
    let q2 =`select * from info where enrollNo='${enrollNo}'`;

    try{
       connection.query(q2, (err, result) =>{
          if(err) throw err;
          console.log(result);
          let user = result[0];
          if(enteredpassword != user.password){
          res.send("WRONG PASSWORD");
         }
      else{
            let user = result[0];
             res.render("profile.ejs",{user});
          
         }
       
       });
    }
    catch(err){
       console.log(err);
       res.send(`Some err in DB`);
    }
    
 });

 app.get("/login/profile/adddetails",(req,res)=>{
   res.render("detail.ejs");
 });

 app.post("/login/profile/adddetails",(req,res)=>{
   let name = req.body.name;
   let enrollNo= req.body.enrollNo;
   let email = req.body.email;
   let branch = req.body.branch;
   let section = req.body.section;
   let year = req.body.year ; 
   let sem = req.body.sem ; 
   let mobileNo = req.body.mobileNo ; 
   let gender = req.body.gender ; 
   let tenthschool = req.body.tenthschool ; 
   let tenthmarks = req.body.tenthmarks ; 
   let tenthyear = req.body.tenthyear ; 
      let twelthschool = req.body.twelthschool ; 
      let twelthmarks = req.body.twelthmarks ; 
      let twelthyear = req.body.twelthyear ; 
      let cgpa  = req.body.cgpa ;
       let cultural = req.body.cultural ;
      let technical = req.body.technical ;
       let sports = req.body.sports ;
       let title1 = req.body.title1 ;
      let description1 = req.body.description1 ;
      let title2 = req.body.title2 ;
      let description2 = req.body.description2 ;

     let designation1 = req.body.designation1 ;
    let   companyname1 = req.body.companyname1 ;
     let  startdate = req.body.startdate ;
     let  designation2 = req.body.designation2;
     let  companyname2 = req.body.companyname2 ;
     let  startdate2 = req.body.startdate2 ;
     let  certificate1 = req.body.certificate1 ;
     let  certificate2 = req.body.certificate2 ;
     let  github = req.body.github ;
     let  linkedin = req.body.linkedin ;
 
   let q1 = `insert into details(name, enrollNo, email, branch, section, year, sem, mobileNo, gender, tenthschool, tenthmarks, tenthyear, 
      twelthschool, twelthmarks, twelthyear, cgpa , cultural, technical, sports, title1, description1, title2, description2, 
      designation1, companyname1, startdate, designation2, companyname2, startdate2, certificate1, certificate2, github, linkedin) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
   try{
       connection.query(q1,[name, enrollNo, email, branch, section, year, sem, mobileNo, gender, tenthschool, tenthmarks, tenthyear, 
         twelthschool, twelthmarks, twelthyear, cgpa , cultural, technical, sports, title1, description1, title2, description2, 
         designation1, companyname1, startdate, designation2, companyname2, startdate2, certificate1, certificate2, github, linkedin],(err, result1) =>{
          if(err) throw err;
         
      let user= [name, enrollNo, email, branch, section, year, sem, mobileNo, gender, tenthschool, tenthmarks, tenthyear, 
         twelthschool, twelthmarks, twelthyear, cgpa , cultural, technical, sports, title1, description1, title2, description2, 
         designation1, companyname1, startdate, designation2, companyname2, startdate2, certificate1, certificate2, github, linkedin];
         console.log(user);
        res.render("resume.ejs",{user});
       
       });
    }catch(err){
       console.log(err);
       res.send(`Some err in DB`);
    }
 });

 app.listen( port , () => {
    console.log(`listening to post ${port}`);
    });