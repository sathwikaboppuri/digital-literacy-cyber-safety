const User = require('../models/User');
const Survey = require('../models/Survey');
const Contact = require('../models/Contact');
const Article = require('../models/Article');
const { getMongoStatus, getLocalDb } = require('../config/db');

// @desc    Get aggregated admin dashboard metrics from actual DB
// @route   GET /api/dashboard/stats
// @access  Private/Admin
const getDashboardStats = async (req, res, next) => {
  try {
    let users = [];
    let surveys = [];
    let contacts = [];
    let articles = [];

    if (getMongoStatus()) {
      [users, surveys, contacts, articles] = await Promise.all([
        User.find({}).select('-password'),
        Survey.find({}).sort({ submittedAt: -1 }),
        Contact.find({}).sort({ createdAt: -1 }),
        Article.find({}).sort({ createdAt: -1 })
      ]);
    } else {
      const db = getLocalDb();
      users = db.users || [];
      surveys = db.surveys || [];
      contacts = db.contacts || [];
      articles = db.articles || [];
    }

    const totalUsers = users.length;
    const totalSurveys = surveys.length;
    const totalContacts = contacts.length;
    const totalArticles = articles.length;

    // Contact status counts
    const contactStatusCounts = {
      new: contacts.filter((c) => c.status === 'New').length,
      inReview: contacts.filter((c) => c.status === 'In Review').length,
      resolved: contacts.filter((c) => c.status === 'Resolved').length
    };

    // Calculate community survey metrics
    let avgAwarenessScore = 0;
    let smartphoneOwners = 0;
    let upiUsers = 0;
    let fraudVictims = 0;
    let helplineAware = 0;

    const ageDistribution = {};
    const occupationBreakdown = {};
    const primaryBarriers = {};

    if (totalSurveys > 0) {
      let scoreSum = 0;
      surveys.forEach((s) => {
        scoreSum += s.awarenessScore || 50;
        if (s.smartphoneOwnership === 'Personal Smartphone' || s.smartphoneOwnership === 'Shared Family Phone') {
          smartphoneOwners++;
        }
        if (s.digitalPaymentUsage === 'Regular (UPI/PhonePe/GPay)') {
          upiUsers++;
        }
        if (s.encounteredFraud === 'Yes, lost money' || s.encounteredFraud === 'Yes, attempted but escaped') {
          fraudVictims++;
        }
        if (s.cyberHelplineAwareness === 'Yes (Know 1930 & Portal)') {
          helplineAware++;
        }

        ageDistribution[s.ageGroup] = (ageDistribution[s.ageGroup] || 0) + 1;
        occupationBreakdown[s.occupation] = (occupationBreakdown[s.occupation] || 0) + 1;
        primaryBarriers[s.primaryBarrier] = (primaryBarriers[s.primaryBarrier] || 0) + 1;
      });

      avgAwarenessScore = Math.round(scoreSum / totalSurveys);
    }

    const stats = {
      summary: {
        totalSurveys,
        totalUsers,
        totalContacts,
        totalArticles,
        avgAwarenessScore: totalSurveys > 0 ? avgAwarenessScore : 0,
        smartphoneRate: totalSurveys > 0 ? Math.round((smartphoneOwners / totalSurveys) * 100) : 0,
        upiAdoptionRate: totalSurveys > 0 ? Math.round((upiUsers / totalSurveys) * 100) : 0,
        fraudExposureRate: totalSurveys > 0 ? Math.round((fraudVictims / totalSurveys) * 100) : 0,
        helplineAwarenessRate: totalSurveys > 0 ? Math.round((helplineAware / totalSurveys) * 100) : 0
      },
      contactsSummary: contactStatusCounts,
      analytics: {
        ageDistribution,
        occupationBreakdown,
        primaryBarriers
      },
      recentSurveys: surveys.slice(0, 5),
      recentContacts: contacts.slice(0, 5),
      recentArticles: articles.slice(0, 5)
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats
};
