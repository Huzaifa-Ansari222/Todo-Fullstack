//this will repeat so we add this feature in utils
import jwt from "jsonwebtoken"

export const sendCookie = (user, res, message, statusCode=200) => {
        //user login after register
        const token = jwt.sign({_id:user._id},process.env.JWT_SECRECT)

        res
            .status(statusCode)
            .cookie("token",token,{
            httpOnly: true,
            maxAge: 15* 60 * 1000,
            // sameSite:"none",
            // secure:true,
            sameSite: process.env.NODE_ENV ==="Development"? "lax" :"none",//because or frontend and backend domain arenot same
            secure: process.env.NODE_ENV ==="Development"? false :true,//for local make it false make NODE_ENV


        })
        .json({
            success: true,
            message,
        })
}