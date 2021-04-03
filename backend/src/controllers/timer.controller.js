const status = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { Fast } = require('../models');

const startTimer = catchAsync(async (req, res) => {
  const {
    body: { type, startTime, userId },
  } = req;
  console.log(type, startTime, userId);
  const savedDoc = await Fast.create({
    user: userId,
    type,
    startTime,
  });
  console.log(savedDoc);
  res.status(status.OK).json({ savedDoc, avg: '1' });
});

const endTimer = catchAsync(async (req, res) => {
  const {
    body: { startTime, endTime, userId },
  } = req;

  const totalFastHours = (new Date(endTime) - new Date(startTime)) / 3600000;
  console.log(totalFastHours);
  const updatedDoc = await Fast.findOneAndUpdate(
    { user: userId, ended: false },
    {
      $set: {
        endTime,
        fastingHours: totalFastHours,
        ended: true,
      },
    }
  );
  res.status(status.OK).json({ updatedDoc, avg: '1' });
});

module.exports = {
  startTimer,
  endTimer,
};
