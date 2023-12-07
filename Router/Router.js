const express = require('express');
const router = express.Router();
let bcrypt = require('bcrypt');
const ProfileSchema = require('../Model/ProfileSchema');


router.post('/register', async (req, res) => {
    try {
        const profile = await ProfileSchema.findOne({ Email: req.body.Email })
        if (!profile) {
            const { Name, Email, Gender, DOB, ProfileFor, Religon, MotherTongue, Living, Mobile } = req.body;
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.Password, salt, (err, hashedpassword) => {
                    const Password = hashedpassword;
                    const Profile = new ProfileSchema({ Name, Email, Password, Gender, DOB, ProfileFor, Religon, MotherTongue, Living, Mobile })
                    Profile.save()
                        .then(() => res.json({ Status: "200", Message: "Profile Register Sucessfully"}))
                        .catch((err) => res.json({ "Status": "Error!" + err }))
                })
            })
        }else{
            res.json({ Status: "402", Message: "You Already Register Please Login" })
        }
    }
    catch (err) {
        res.json(err)
    }
})
router.put('/editprofile/:id',async(req,res)=>{
    const {id}=req.params;
    const profile=await ProfileSchema.findByIdAndUpdate({_id:id},req.body)
    await res.json({Status:"200",Message:"Profile Update Sucessfully",profile})
})
router.post('/login', async (req, res) => {
    try {
        const profile = await ProfileSchema.findOne({ Email: req.body.Email })
        if (profile) {
            const passwordvalidate = await bcrypt.compare(req.body.Password, profile.Password)
            if (passwordvalidate) {
                res.json({Status:"200", Message: "Login Sucessfully", profile })
            }
            else {
                res.json({ Status: "401", Message: "Password  Incorrect" }) 
            } 
        }
        else {
            res.json({ Status:'402',Message:"User Note Found Please Register" })
        }
    }
    catch (error) {
        res.json(error)
    }
})

router.get('/getAllProfiles', (req, res) => {
    ProfileSchema.find()
        .then((data) => res.json(data))
        .catch((error) => res.json(error))
})
router.get('/me/:id', (req, res) => {
    const { id } = req.params;
    ProfileSchema.find({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json(error))
}) 

module.exports = router;

