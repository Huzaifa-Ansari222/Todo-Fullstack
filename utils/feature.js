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
        })
        .json({
            success: true,
            message,
        })
}