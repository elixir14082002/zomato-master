// including all packages
import express from "express";
import cors from "cors";
import helmet from "helmet";

const zomato = express();

//import other packages
zomato.use(express.json());
zomato.use(express.urlencoded({extended: false}));
zomato.use(cors());
zomato.use(helmet());

//get request for setup success
zomato.get("/", (req,res) => {
    res.json({message: "setup success yay!"});
});

//server port-->4000
zomato.listen(4000, ()=> console.log("Server is up and running"));