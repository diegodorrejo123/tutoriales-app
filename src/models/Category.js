const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]
}, {
    timestamps: true
})
/* categorySchema.pre('save', function(next){
    // remove tutorials from tags
    this.model('Tag').updateMany({ _id: { $nin: this.tags } }, { $pull: { tutorials: this._id} } ).exec()
    // add tutorials to tags:
    this.model('Tag').updateMany({ _id: { $in: this.tags } }, { $addToSet: { tutorials: this._id } } ).exec()
    next();
}) */
const Category = mongoose.model('Category', categorySchema)
module.exports = Category