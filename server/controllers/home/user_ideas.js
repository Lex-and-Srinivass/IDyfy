const Idea = require("../../models/Idea");
const ErrorResponse = require("../../utils/errorResponse");
const {
    protect
} = require("../../middleware/auth")

exports.get_contributed_ideas = async (req, res, next) => {
    try {
        console.log(req.user._id);
        const result = await Idea.find({
            contributors: {
                $in: [req.user._id]
            }
        })
        res.status(200).json({
            success: true,
            ideas: result
        });

    } catch (err) {
        console.log(err);
        return next(new ErrorResponse(err.message, 500));
    }
}