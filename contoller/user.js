import user from "../model/user.js";
import post from "../model/post.js";
import comment from "../model/comment.js";
import bcryptjs from 'bcryptjs'
import Jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const register = async (req, res) => {

    try {

        const { firstName, lastName, email, password } = req.body;
        
        if (!(firstName && lastName && email && password)) {
            return res.status(400).json({ "message": "All input required" })
        }
        const oldUser = await user.findOne({ email: email })
        if (oldUser) {

            return res.status(401).json({ "message": "The user already exist" })
        }
        const encyptedPassword = await bcryptjs.hash(password, 10)
        const users = await user.create({
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "password": encyptedPassword

        })

        const token = Jwt.sign({ id: users._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "2h" })
        res.status(200).json({ token: token, id: users._id, firstName: firstName, lastName: lastName, email: email, createdAt: users.createdAt })

    } catch (error) {
        console.log(error.message)
    }

}

export const login = async (req, res) => {
    try {

        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).json({ "message": "All input required" })
        }
        const users = await user.findOne({ email });
        if (users && (await bcryptjs.compare(password, users.password))) {
            const token = Jwt.sign(
                { id: users._id },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: "2h",
                }
            );
            res.status(200).json({ "token": token, id: users._id, "firstName": users.firstName, "lastName": users.lastName, "email": users.email, "createdAt": users.createdAt })
        }
        else {
            res.status(400).json({ "message": "invalid credentials" })

        }
    } catch (error) {
        console.log(error.message);
    }
}

export const getUserDetails = async (req, res) => {
    const id = req.userId.id;
    try {
        const userDetail = await user.findById(id);
        if (!userDetail) {
            return res.status(401).json({ "message": "user not found" })
        }
        else {
            const userObtained = {
                "id": userDetail._id,
                "firstName": userDetail.firstName,
                "lastName": userDetail.lastName,
                "email": userDetail.email,
                "createdAt": userDetail.createdAt
            }
            return res.status(200).json(userObtained)
        }
    } catch (error) {
        console.log(error.message)
    }
}

export const updateUser = async (req, res) => {
    try {
        const id = mongoose.Types.ObjectId(req.userId);
        const updateduser = req.body
       
        const users = await user.find({ "email": updateduser.email })
      
        if (users.length  === 1 && users[0]._id.toString() != id) {
            return res.status(400).json({ "message": "The email is not unique" })
        }
      
        const encyptedPassword = await bcryptjs.hash(updateduser.password, 10)

        const response = await user.findOneAndUpdate({ '_id': id }, { "firstName": updateduser.firstName, "lastName": updateduser.lastName, "email": updateduser.email,"password": encyptedPassword })
        const response1 = await post.updateMany({"userId" : id },{"creator" : updateduser.firstName})
        const response2 = await comment.updateMany({"userId" : id}, {"creator" : updateduser.firstName})
        const response3 =[response,response1,response2]
        return res.status(200).json(response3)
    } catch (error) {
        return res.status(401).json({ "message": error.message })
    }
}





