const mongoose = require('mongoose');

const { Schema } = mongoose;

const PageSchema = new Schema({
  pageName: String,
  menuEntry: Object,
  reactComponent: Object,
  slug: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

PageSchema.pre('updateOne', function preUpdate(next) {
  this.update({}, { $set: { updatedAt: new Date() } });
  return next();
});

const Page = mongoose.model('page', PageSchema);

module.exports = Page;
