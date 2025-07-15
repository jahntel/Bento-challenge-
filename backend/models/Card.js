const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxLength: 100
  },
  content: {
    type: String,
    required: true,
    trim: true,
    maxLength: 1000
  },
  type: {
    type: String,
    enum: ['text', 'image', 'mixed', 'interactive', 'large-featured'],
    required: true
  },
  imageUrl: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\/.+/.test(v);
      },
      message: 'Invalid image URL'
    }
  },
  buttonText: {
    type: String,
    maxLength: 50
  },
  buttonAction: {
    type: String,
    maxLength: 200
  },
  backgroundColor: {
    type: String,
    default: '#ffffff'
  },
  textColor: {
    type: String,
    default: '#000000'
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Index for efficient querying
cardSchema.index({ createdBy: 1, order: 1 });
cardSchema.index({ type: 1, isActive: 1 });

module.exports = mongoose.model('Card', cardSchema);