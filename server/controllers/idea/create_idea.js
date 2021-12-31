const Idea = require("../../models/Idea");
const ErrorResponse = require("../../utils/errorResponse");

exports.create_idea = async (req, res, next) => {
    try {
        const {
            title,
            description,
            tags
        } = req.body;
        console.log(req.user._id)
        try {
            const idea = await Idea.create({
                title,
                description,
                tags,
                contributors: [req.user._id],
            });
            res.status(200).json({
                success: true,
                idea
            });
        } catch (err) {
            console.log(err);
            // next(err)
            return next(new ErrorResponse("Oops Something went wrong!", 500));
        }
    } catch (err) {
        console.log(err);
        // next(err)
        return next(new ErrorResponse(err.message, 500));
    }


};