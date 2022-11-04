const horoScopeModel = require("../models/horoScopeModel")
const {isValid,isValidRequestBody}=  require("../validator/validator")

exports.createHoroscope = async(req,res)=>{
    try {
        const {date,zodiac,profession,emotion,health,travel,love,luck} = req.body;
        if(!(date||zodiac||profession||emotion||health||travel||love||luck)){
            res.status(400).sendStatus("Required fields")
        } else{
            
        let getDetails= await horoScopeModel.create({date,zodiac,profession,emotion,health,travel,love,luck})
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

exports.updatehoroscope = async(req,res)=>{
    const {date,zodiac,profession,emotion,health,travel,love,luck} = req.body;
    const id = req.params.id;
    try {
        // const date =new Date();
        const data = await horoScopeModel.findByIdAndUpdate(id ,{date,zodiac,profession,emotion,health,travel,love,luck})
    res.status(200).json({ message: 'Udpate is successfully',data:data});
        
    } catch (error) {
        console.log(error)
    res.status(400).json("Error  occurred");
    }
}

exports.getHoroscope = async function (req, res) {
    try {

        const findData = await horoScopeModel.find(req.query)
        if (findData.length === 0) {
            return res.status(404).send({ status: false, msg: "no such role found" })
        }
        return res.status(200).send({ status: true, data: findData })

    } catch (error) {
        res.status(500).send({ status: true, message: error.message })
    }
}