const Idea = require("../../models/Idea");
const User = require("../../models/User");
const ErrorResponse = require("../../utils/errorResponse");
const Comment = require("../../models/Comment");

exports.search_by_tags = async (req, res, next) => {
  try {
    var query = req.query.query;
    if (query) {
      var search_by_tags = await Idea.find({
        tags: {
          $in: [query],
        },
      });

      var final_search_by_tags = [];
      for await (var idea of search_by_tags) {
        console.log(idea);
        var comment_count = await Comment.find({
          idea_id: idea._id.toString(),
          feature_id: null,
        }).count();
        if (idea.starred_by.includes(req.user._id.toString())) {
          obj = { comment_count: comment_count, starred: true };
        } else {
          obj = { comment_count: comment_count, starred: false };
        }
        if (idea.liked_users.includes(req.user._id.toString())) {
          obj = { ...obj, liked: true };
        } else {
          obj = { ...obj, liked: false };
        }
        // obj = { comment_count: comment_count };
        idea = { ...idea._doc, ...obj };
        final_search_by_tags.push(idea);
      }

      res.send({
        success: true,
        search_by_tags: final_search_by_tags,
      });
    } else {
      return next(new ErrorResponse("Please provide a Query!", 404));
    }
  } catch (err) {
    console.log(err);
    return next(new ErrorResponse("Oops Something went wrong!", 500));
  }
};
