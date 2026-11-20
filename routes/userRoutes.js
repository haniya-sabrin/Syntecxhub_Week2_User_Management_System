import express from "express";
import mongoose from "mongoose";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// GET LOGGED-IN USER PROFILE
router.get("/me", async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch profile"
        });
    }
});

// GET SINGLE USER
router.get("/:id", async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid user ID"
            });
        }

        if (req.user.id !== req.params.id) {
            return res.status(403).json({
                message: "You cannot access another user's account"
            });
        }

        const user = await User.findById(req.params.id).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch user"
        });
    }
});

// UPDATE USER
router.put("/:id", async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid user ID"
            });
        }

        if (req.user.id !== req.params.id) {
            return res.status(403).json({
                message: "You cannot update another user's account"
            });
        }

        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                message: "Name and email are required"
            });
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                name,
                email: email.trim().toLowerCase()
            },
            {
                new: true,
                runValidators: true
            }
        ).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User updated successfully",
            user
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "Email already registered"
            });
        }

        res.status(400).json({
            message: "Failed to update user",
            error: error.message
        });
    }
});

// DELETE USER
router.delete("/:id", async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid user ID"
            });
        }

        if (req.user.id !== req.params.id) {
            return res.status(403).json({
                message: "You cannot delete another user's account"
            });
        }

        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete user"
        });
    }
});

export default router;