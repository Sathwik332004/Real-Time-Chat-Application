import express from "express";
import {
  login,
  logout,
  signup,
  forgot,
  reset
} from "../controllers/auth.controller.js";
import protectRoute from "../middleware/protectRoute.js";
import User from "../models/user.model.js";


const router = express.Router();

//Call Controllers to handle the requests

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post("/forgot", forgot);

router.post("/reset/:token", reset);

// GET current user's profile (requires auth)
router.get("/profile", protectRoute, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user))
    .catch(err => res.status(500).json({ error: "Server error" }));
});

// GET any user's profile by ID
router.get("/profile/:userId", (req, res) => {
  User.findById(req.params.userId)
    .select("-password")
    .then(user => res.json(user))
    .catch(err => res.status(404).json({ error: "User not found" }));
});


//export the router

export default router;
