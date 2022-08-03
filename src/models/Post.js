const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        }
    ]
}, {
    timestamps: true
})

postSchema.pre('save', function(next){
    // remove tags from tutorial:
    this.model('Category').updateMany({ _id: { $nin: this.categories } }, { $pull: { posts: this._id} } ).exec()
    // add tags to tutorial:
    this.model('Category').updateMany({ _id: { $in: this.categories } }, { $addToSet: { posts: this._id } } ).exec()
    next();
  });

const Post = mongoose.model('Post', postSchema)
module.exports = Post