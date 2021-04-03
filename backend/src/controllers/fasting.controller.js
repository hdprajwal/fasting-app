const status = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { Fast } = require('../models');

const getStats = catchAsync(async (req, res) => {
  const {
    body: { userId },
  } = req;
  const allFastRecords = await Fast.find({ user: userId });

  const lastSevenRecords = allFastRecords.slice(
    allFastRecords.length - 7,
    allFastRecords.length
  );
  const stats = {
    totalFasts: allFastRecords.length,
    sevenFastAvg:
      lastSevenRecords.reduce((a, b) =>
        Math.floor(a.fastingHours + b.fastingHours)
      ) / lastSevenRecords.length,
    logestFast: allFastRecords.reduce((a, b) =>
      Math.max(a.fastingHours, b.fastingHours)
    ),
    longestStreak: allFastRecords.length,
    currentStreak: allFastRecords.length,
  };
  res.status(status.OK).json({ stats });
});

const getAverage = catchAsync(async (req, res) => {
  const {
    body: { userId },
  } = req;
  const allFastRecords = await Fast.find({ user: userId });

  const recentRecords =
    allFastRecords.length > 14
      ? allFastRecords.slice(allFastRecords.length - 14, allFastRecords.length)
      : allFastRecords;

  const average = {
    chart: {
      name: 'Average',
      data: recentRecords.map(
        (each) => Math.round((each.fastingHours + Number.EPSILON) * 100) / 100
      ),
      category: recentRecords.map(
        (each) => `${new Date(each.startTime).toLocaleDateString('en-US')} GMT`
      ),
    },
    averageFasting:
      recentRecords.reduce((a, b) =>
        Math.floor(a.fastingHours + b.fastingHours)
      ) / recentRecords.length,
  };
  res.status(status.OK).json({ average });
});

const getHistory = catchAsync(async (req, res) => {
  const {
    body: { userId },
  } = req;
  const allFastRecords = await Fast.find({ user: userId });

  const recentRecords =
    allFastRecords.length > 30
      ? allFastRecords.slice(allFastRecords.length - 30, allFastRecords.length)
      : allFastRecords;

  const history = {
    chart: {
      name: 'Fasting Hours',
      data: recentRecords.map((each) => each.fastingHours),
      category: recentRecords.map((each) =>
        new Date(each.startTime).toLocaleDateString('en-US')
      ),
    },
    totalFasting: recentRecords.reduce((a, b) =>
      Math.floor(a.fastingHours + b.fastingHours)
    ),
  };
  res.status(status.OK).json({ history });
});

module.exports = {
  getStats,
  getAverage,
  getHistory,
};
