import jwt from "jsonwebtoken"; 
import User from "../models/user.model.js"; 
//middleware to check if user is logged in or not 
const protectRoute = async (req, res, next) => { 
try { 
const token = req.cookies.jwt; 
if (!token) { 
return res.status(401).json({ error: "Unauthorized Access" }); 
} 
const decoded = jwt.verify(token, process.env.JWT_SECRET); 
if (!decoded) { 
return res.status(401).json({ error: "Unauthorized-Invalid Token" }); 
} 
const user = await User.findById(decoded.userId).select("-password"); 
if (!user) { 
return req.status(404).json({ error: "User not found" }); 
} 
req.user = user; 
next(); 
} catch (error) { 
console.log("Error in protectRoute middleware", error.message); 
res.status(500).json({ error: "Internal Server Error" }); 
} 
}; 
export default protectRoute; 