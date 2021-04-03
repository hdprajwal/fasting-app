const mongoose = require('mongoose');

const fastsSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      required: false,
      default: '16:8',
    },
    startTime: {
      type: String,
      require: true,
    },
    endTime: {
      type: String,
      require: true,
      default: '',
    },
    fastingHours: {
      type: Number,
      require: true,
      default: 0,
    },
    ended: {
      type: Boolean,
      require: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Fasts = mongoose.model('Fast', fastsSchema);

module.exports = Fasts;
