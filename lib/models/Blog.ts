import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  excerpt: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Technology', 'Lifestyle', 'Business', 'Health', 'Travel', 'Food', 'Fashion', 'Sports'],
  },
  authorId: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  published: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

BlogSchema.index({ title: 'text', content: 'text' });
BlogSchema.index({ category: 1 });
BlogSchema.index({ authorId: 1 });

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);