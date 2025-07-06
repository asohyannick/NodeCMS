import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";

interface CustomJWTPayload extends JwtPayload {
    id: string;
    userId: string;
    isAdmin: boolean;
}

declare global {
    namespace Express {
        interface Request {
            userId?: string;
            user?: {
                id: string;
                isAdmin: boolean;
            };
        }
    }
}

const authToken = (req: Request, res: Response, next: NextFunction) => {
    // check if the token exist
    const token = req.cookies['auth'];
    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Acces Denied" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as CustomJWTPayload;
        req.userId = decoded.userId; // verify the id of the user
        req.user = { id: req.userId, isAdmin: decoded.isAdmin } // verify both the id and admin status 
        next(); // proceed to the next set of middleware
    } catch (error) {
        console.error("Verification token failed", error);
        return res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: "Something went wrong!",
            error: error instanceof Error ? error.message : "Unknown Error",
        });
    }

}

export default authToken;