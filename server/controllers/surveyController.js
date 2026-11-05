const Survey = require('../models/Survey');
const { getMongoStatus, getLocalDb, saveLocalDb } = require('../config/db');

// Calculate digital safety & literacy awareness score (0-100)
const computeAwarenessScore = (body) => {
  let score = 20; // baseline

  if (body.smartphoneOwnership === 'Personal Smartphone') score += 15;
  else if (body.smartphoneOwnership === 'Shared Family Phone') score += 10;

  if (body.internetUsageFrequency === 'Daily') score += 10;
  else if (body.internetUsageFrequency === 'Few times a week') score += 5;

  if (body.digitalPaymentUsage === 'Regular (UPI/PhonePe/GPay)') score += 15;
  else if (body.digitalPaymentUsage === 'Occasional with family help') score += 10;

  if (body.onlineGovtServices === 'Yes, regularly') score += 15;
  else if (body.onlineGovtServices === 'Used once or twice') score += 10;

  if (body.cyberHelplineAwareness === 'Yes (Know 1930 & Portal)') score += 20;
  else if (body.cyberHelplineAwareness === 'Heard about it vaguely') score += 10;

  if (body.encounteredFraud === 'Yes, attempted but escaped') score += 10;
  else if (body.encounteredFraud === 'Never') score += 5;

  return Math.min(100, Math.max(10, score));
};

// @desc    Submit a new community survey
// @route   POST /api/surveys
// @access  Public
const createSurvey = async (req, res, next) => {
  try {
    const {
      respondentName,
      village,
      district,
      ageGroup,
      gender,
      occupation,
      educationLevel,
      smartphoneOwnership,
      internetUsageFrequency,
      digitalPaymentUsage,
      onlineGovtServices,
      encounteredFraud,
      cyberHelplineAwareness,
      primaryBarrier,
      desiredTopics,
      feedback
    } = req.body;

    if (
      !respondentName ||
      !village ||
      !ageGroup ||
      !gender ||
      !occupation ||
      !educationLevel ||
      !smartphoneOwnership ||
      !internetUsageFrequency ||
      !digitalPaymentUsage ||
      !onlineGovtServices ||
      !encounteredFraud ||
      !cyberHelplineAwareness ||
      !primaryBarrier
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please complete all required survey questions before submitting.'
      });
    }

    const calculatedScore = computeAwarenessScore(req.body);

    const surveyData = {
      respondentName,
      village,
      district: district || 'Rural District',
      ageGroup,
      gender,
      occupation,
      educationLevel,
      smartphoneOwnership,
      internetUsageFrequency,
      digitalPaymentUsage,
      onlineGovtServices,
      encounteredFraud,
      cyberHelplineAwareness,
      primaryBarrier,
      desiredTopics: Array.isArray(desiredTopics) ? desiredTopics : [],
      feedback: feedback || '',
      awarenessScore: calculatedScore,
      submittedAt: new Date()
    };

    if (getMongoStatus()) {
      const newSurvey = await Survey.create(surveyData);
      return res.status(201).json({
        success: true,
        message: 'Survey submitted successfully! Thank you for participating in rural awareness.',
        data: newSurvey
      });
    } else {
      const db = getLocalDb();
      const localSurvey = {
        _id: 'surv_' + Date.now() + Math.random().toString(36).substring(2, 6),
        ...surveyData,
        submittedAt: new Date().toISOString()
      };
      db.surveys = db.surveys || [];
      db.surveys.unshift(localSurvey);
      saveLocalDb(db);

      return res.status(201).json({
        success: true,
        message: 'Survey submitted successfully! Thank you for participating in rural awareness.',
        data: localSurvey
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get all survey responses
// @route   GET /api/surveys
// @access  Private/Admin
const getAllSurveys = async (req, res, next) => {
  try {
    const { village, ageGroup, search } = req.query;

    if (getMongoStatus()) {
      let query = {};
      if (village) query.village = { $regex: village, $options: 'i' };
      if (ageGroup) query.ageGroup = ageGroup;
      if (search) {
        query.$or = [
          { respondentName: { $regex: search, $options: 'i' } },
          { village: { $regex: search, $options: 'i' } },
          { occupation: { $regex: search, $options: 'i' } }
        ];
      }

      const surveys = await Survey.find(query).sort({ submittedAt: -1 });
      return res.json({
        success: true,
        count: surveys.length,
        data: surveys
      });
    } else {
      const db = getLocalDb();
      let list = db.surveys || [];

      if (village) {
        list = list.filter((s) => s.village.toLowerCase().includes(village.toLowerCase()));
      }
      if (ageGroup) {
        list = list.filter((s) => s.ageGroup === ageGroup);
      }
      if (search) {
        const q = search.toLowerCase();
        list = list.filter(
          (s) =>
            s.respondentName.toLowerCase().includes(q) ||
            s.village.toLowerCase().includes(q) ||
            s.occupation.toLowerCase().includes(q)
        );
      }

      return res.json({
        success: true,
        count: list.length,
        data: list
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get single survey by ID
// @route   GET /api/surveys/:id
// @access  Private/Admin
const getSurveyById = async (req, res, next) => {
  try {
    if (getMongoStatus()) {
      const survey = await Survey.findById(req.params.id);
      if (!survey) {
        return res.status(404).json({ success: false, message: 'Survey response not found' });
      }
      return res.json({ success: true, data: survey });
    } else {
      const db = getLocalDb();
      const survey = (db.surveys || []).find((s) => s._id === req.params.id);
      if (!survey) {
        return res.status(404).json({ success: false, message: 'Survey response not found' });
      }
      return res.json({ success: true, data: survey });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get aggregated survey statistics
// @route   GET /api/surveys/stats/overview
// @access  Public
const getSurveyStats = async (req, res, next) => {
  try {
    let list = [];
    if (getMongoStatus()) {
      list = await Survey.find({});
    } else {
      const db = getLocalDb();
      list = db.surveys || [];
    }

    const total = list.length;
    if (total === 0) {
      return res.json({
        success: true,
        data: {
          totalSurveys: 0,
          avgAwarenessScore: 0,
          smartphoneOwnershipRate: 0,
          digitalPaymentAdoptionRate: 0,
          fraudExposureRate: 0,
          helpline1930AwarenessRate: 0,
          demographics: {
            ageGroups: {},
            occupations: {},
            barriers: {}
          }
        }
      });
    }

    let scoreSum = 0;
    let smartphoneOwners = 0;
    let digitalPaymentUsers = 0;
    let fraudVictims = 0;
    let helplineAware = 0;

    const ageGroups = {};
    const occupations = {};
    const barriers = {};

    list.forEach((s) => {
      scoreSum += s.awarenessScore || 50;
      if (s.smartphoneOwnership === 'Personal Smartphone' || s.smartphoneOwnership === 'Shared Family Phone') {
        smartphoneOwners++;
      }
      if (s.digitalPaymentUsage === 'Regular (UPI/PhonePe/GPay)') {
        digitalPaymentUsers++;
      }
      if (s.encounteredFraud === 'Yes, lost money' || s.encounteredFraud === 'Yes, attempted but escaped') {
        fraudVictims++;
      }
      if (s.cyberHelplineAwareness === 'Yes (Know 1930 & Portal)') {
        helplineAware++;
      }

      ageGroups[s.ageGroup] = (ageGroups[s.ageGroup] || 0) + 1;
      occupations[s.occupation] = (occupations[s.occupation] || 0) + 1;
      barriers[s.primaryBarrier] = (barriers[s.primaryBarrier] || 0) + 1;
    });

    const stats = {
      totalSurveys: total,
      avgAwarenessScore: Math.round(scoreSum / total),
      smartphoneOwnershipRate: Math.round((smartphoneOwners / total) * 100),
      digitalPaymentAdoptionRate: Math.round((digitalPaymentUsers / total) * 100),
      fraudExposureRate: Math.round((fraudVictims / total) * 100),
      helpline1930AwarenessRate: Math.round((helplineAware / total) * 100),
      demographics: {
        ageGroups,
        occupations,
        barriers
      }
    };

    return res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSurvey,
  getAllSurveys,
  getSurveyById,
  getSurveyStats
};
