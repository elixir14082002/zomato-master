import express from "express";
import bcrypt from "bcryptjs";

import {UserModel} from "../../database/user/index";

const Router= express.Router();

/* 
route:   /signup
des:    check if user already exits
params: none
access: public
method: POST
*/

Router.post("/signup", async(req,res)=>{
    try {
        const {email, password, fullname, phoneNumber}= req.body.credentials;

        const checkUserByEmail= await UserModel.findOne({email});
        const checkUserByPhone= await UserModel.findOne({phoneNumber});

        if(checkUserByEmail || checkUserByPhone)
        return res.json({error: "User already exits!!!"});

        //hashing the password
        const bcryptSalt= await bcrypt.genSalt(8);
        const hashedPassword= await bcrypt.hash(password, bcryptSalt);

        //save to DB
        await UserModel.create({
            ...req.body.credentials,
            password: hashedPassword
        });

        //jwt token
        const token = jwt.sign({user: {fullname, email}}, "ZomatoApp");

        return res.status(200).json({token, status: "success"});

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});

