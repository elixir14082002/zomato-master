import express from "express";
import { RestaurantModel } from "../../database/allModels";

const Router= express.Router();

/*
route: /
des: get all restaurant details
params: none
access: public
method: GET
*/

Router.get("/", async(req,res)=>{
    try {
        const {city}= req.query;
        const restaurants= await RestaurantModel.find({city});
        return res.json({restaurants});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});

/*
route: /
des: get particular restaurant based on id
params: _id
access: public
method: GET
*/

Router.get("/:_id", async(req,res)=>{
    try {
        const {_id}= req.params;
        const restaurant= await RestaurantModel.findOne(_id);
        return res.json({restaurant});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});

/*
route: /search
des: get particular restaurant based on keywords
params: search
access: public
method: GET
*/

Router.get("/search", async(req,res)=>{
    try {
        const {searchString}= req.body;
        const restaurant= await RestaurantModel.find({
            name: {$regex: searchString, $options: "i"}
        });
        return res.json({restaurant});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});

export default Router;