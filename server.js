const express=require('express');
const session=require('express-session');
const nodemailer=require('nodemailer');
const User=require("./User");
const connectDB=require('./connectDB');
const path=require('path');
const app=express();
connectDB();
console.log("EMAIL:", process.env.EMAIL);
console.log("PASSWORD EXISTS:", !!process.env.EMAIL_PASSWORD);
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "poornacharangopal@gmail.com",
        pass: "fjua anks papo jmmb"
    }
});
transporter.verify((err, success) => {
    if (err) {
        console.error("SMTP VERIFY ERROR:", err);
    } else {
        console.log("SMTP READY");
    }
});
app.set("view engine","ejs"); 
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
    secret: "poorna126",
    resave: false,
    saveUninitialized: false,

    cookie: {
        maxAge: 43800 * 60 * 1000
    }
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const otpstore={};
//send otp
app.post("/sendotp",async(req,res)=>{
    try{
    const email=req.body.email;
    const otp = Math.floor(100000 + Math.random() * 900000);
    otpstore[email]={
        otp:otp,
        expiry:Date.now()+5*60*1000
    }
    await transporter.sendMail({
        from:"poornacharangopal@gmail.com",
        to:email,
        subject:"One Time password to login in NIT Bazaar",
        text:`Hello,

Your OTP is: ${otp}

This OTP is valid for 5 minutes.
Do not share this OTP with anyone.

Regards,
The Team NIT Bazaar`
    });
    res.render("EnterOTP",{
        email:email
    });
    }catch(err) {
        console.error("SEND OTP ERROR:", err);
        res.status(500).send(err.message);
    }
})
//verify otp
app.post("/verify",(req,res)=>{
    const email=req.body.email;
    const enteredotp=req.body.otp;
    const otp=otpstore[email].otp;
    const expiry=otpstore[email].expiry;
    if(expiry<Date.now()){
        res.render("ResendOtp",{
            email:email
        });
    }
    else{
    if(enteredotp==otp){
        res.status(302);
        res.redirect(`/loginpage?email=${email}`);
    }
    else{
        res.status(302);
        res.redirect("/otp");
    }
}
})
//login page
app.post('/login',async(req,res)=>{
    const userid=req.body.name;
    const username=req.body.name;
    const email=req.body.email;
    const college=req.body.college;
    const password=req.body.password;
    const user=new User({
        UserEmail:email,
        UserId:userid,
        UserName:username,
        College:college,
        Password:password
    });
    await user.save();
    req.session.email=email;
    req.session.userid=userid;
    res.render("loggedin",{
        name:username
    });
})
//Dashboard
app.get('/dashboard',(req,res)=>{
    const username=req.session.user;
    if(!username){
        res.status(302);
        return res.redirect("/loginpage");
    }
    res.render("Dashboard",{
        name:username
    });
})
//Home
app.get('/',(req,res)=>{
    res.render("Home");
})
//loginpage
app.get('/loginpage',(req,res)=>{
    const email=req.query.email;
    res.render("login1",{
        email:email
    });
})
//signuppage
app.get('/signuppage',(req,res)=>{
    const username=req.session.user;
    const email=req.session.email;
    if(username){
        return res.render("Dashboard",{
            name:username
        });
    }
    else {
        res.status(302);
        res.redirect("/otp");
    }
})
//otp
app.get("/otp",(req,res)=>{
    res.set("content-type","text/html")
    res.render("otp");
})
app.get("/signup",(req,res)=>{
    if(req.session.user){
        res.render("signup",{
            id:req.session.userid,
            email:req.session.email,
        })
    }
    else{
        res.redirect("/loginpage");
    }
})
app.post("/signin",async(req,res)=>{

    const enteredPassword=req.body.password;
    const email=req.body.email;
    const user=await User.findOne({UserEmail:email});
    const password=user.Password;
    
    if(enteredPassword===password){

        res.redirect("/dashboard");

    }

    else{

        res.send("Incorrect Password");

    }

});
app.get("/profile",(req,res)=>{
    res.render("profile", {
        name: req.session.user,
        email: req.session.email,
        college: req.session.college
    });
});
app.get("/addproduct"(req,res)=>{
    res.render("addproduct");
});
app.post("/addproducttodb",async(req,res)=>{
    const Name=req.body.Name;
    const ImageUrl=req.body.image;
    const Cost=req.body.cost;
    const UserEmail=req.session.email;
    const product=new Products({
        Name,
        ImageUrl,
        Cost,
        UserEmail,
    });
    await product.save();
    res.render("productadded",product);
});         
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

