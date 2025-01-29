import Facilitator from "../model/facilitator.js";
import User from "../model/student.js";


export const profileUpdate = async (req, res) => {
    let { updateData, address, userId, role } = req.body;
    try {
        const user =
            role === "facilitator"
                ? await Facilitator.findById(userId)
                : await Student.findById(userId);

        if (!user) {
            return res.status(404).json({ status: "failed", message: "User not found" });
        }

        if (updateData) {
            Object.keys(updateData).forEach((key) => {
                // Only update fields provided in the updateData
                if (updateData[key] !== undefined) {
                    user[key] = updateData[key];
                }
            });
        }
        // Update address if provided
        if (address) {
            if (address.lat !== undefined) {
                user.lat = address.lat;
            }
            if (address.lng !== undefined) {
                user.lng = address.lng;
            }
        }

        // Save the updated user back to the database
        await user.save();
        return res.status(200).json({
            status: "success",
            message: "Profile updated successfully",
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        return res.status(500).json({
            status: "failed",
            message: "An error occurred while updating the profile",
            error: error.message,
        });
    }
}