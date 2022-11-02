const horoscope = require("../models/horoScopeModel")
const {isValid,isValidRequestBody}=  require("../validator/validator")

module.exports.addhoroscope = async(req,res)=>{
    try {
        const {date,horoScope,profession,emotion,health,travel,love,luck} = req.body;
        if(!(date||horoScope||profession||emotion||health||travel||love||luck)){
            res.status(400).sendStatus("Required filleds")
        } else{
            
        let getDetails= await HoroSchema.create({date,horoScope,profession,emotion,health,travel,love,luck})
        res.status(200).json({
            message: "horoscope is Created successfully",
            getDetails,
          });
        }
    } catch (e) {
        res.status(400).json("Error is occured");
        console.log(e);
    }
}

module.exports.updatehoroscope = async(req,res)=>{
    const {date,horoScope,profession,emotion,health,travel,love,luck} = req.body;
    const id = req.params.id;
    try {
        // const date =new Date();
        const data = await HoroSchema.findByIdAndUpdate(id ,{date,horoScope,profession,emotion,health,travel,love,luck})
    res.status(200).json({ message: 'Udpate is successfully',data});
        
    } catch (error) {
        console.log(error)
    res.status(400).json("Error is occurred");
    }
}


module.exports.getDetails=async(req,res)=>{
    try {
        const data =await HoroSchema.find();
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$")
    res.status(200).json({ data: data });
    } catch (error) {
        console.log(error)
    res.status(400).json("Error is occurred");
    }
}