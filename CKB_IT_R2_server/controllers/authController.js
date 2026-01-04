const Team = require("../models/Team")
const Admin= require("../models/Admin")
const jwt = require("jsonwebtoken")


exports.login = async(req,res)=>{

    const {username,password} = req.body;

    if(!username || !password===null){
       return res.status(400).json({
            message:"username and password required"
        })
    }

     const admin = await Admin.findOne({userName:username})

     if(!admin){
        return res.status(404).json({
            message:"Could't found any account"
        })
     }



    const isPsswordCorrect = admin.isPasswordCorrect(password);

    if(!isPsswordCorrect){
         return res.status(401).json({
            message:"Bad Credentials"
        })
    }

    const accessToken = jwt.sign({id:admin.id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"1d"})
     const options = {
        httpOnly: true,
        secure: true
    }

     return res.status(200)
     .cookie("accessToken",accessToken,options)
     .json({
            message:"Loged in successfull",
            accessToken
        })

}

exports.logout = (req, res) => {
  return res
    .cookie("accessToken", "", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      expires: new Date(0)
    })
    .status(200)
    .json({ message: "Logged out successfully" });
};