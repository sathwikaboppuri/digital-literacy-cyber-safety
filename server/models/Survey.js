const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
  respondentName: {
    type: String,
    required: [true, 'Please enter respondent name'],
    trim: true
  },
  village: {
    type: String,
    required: [true, 'Please enter village name'],
    trim: true
  },
  district: {
    type: String,
    trim: true,
    default: 'Local District'
  },
  ageGroup: {
    type: String,
    required: [true, 'Please select age group'],
    enum: ['18-25', '26-40', '41-60', '60+']
  },
  gender: {
    type: String,
    required: [true, 'Please select gender'],
    enum: ['Male', 'Female', 'Other', 'Prefer not to say']
  },
  occupation: {
    type: String,
    required: [true, 'Please select occupation'],
    enum: [
      'Farmer/Agriculture',
      'Small Business/Shopkeeper',
      'Student',
      'Daily Wage Worker',
      'Homemaker',
      'Healthcare/Teacher',
      'Other'
    ]
  },
  educationLevel: {
    type: String,
    required: [true, 'Please select education level'],
    enum: [
      'No Formal Education',
      'Primary School',
      'High School',
      'Intermediate/Diploma',
      'Graduate/Post-Graduate'
    ]
  },
  smartphoneOwnership: {
    type: String,
    required: [true, 'Please select smartphone ownership status'],
    enum: ['Personal Smartphone', 'Shared Family Phone', 'Basic Keypad Phone', 'No Phone']
  },
  internetUsageFrequency: {
    type: String,
    required: [true, 'Please specify internet usage frequency'],
    enum: ['Daily', 'Few times a week', 'Rarely', 'Never']
  },
  digitalPaymentUsage: {
    type: String,
    required: [true, 'Please select digital payment usage'],
    enum: ['Regular (UPI/PhonePe/GPay)', 'Occasional with family help', 'Heard of it but afraid', 'Never used']
  },
  onlineGovtServices: {
    type: String,
    required: [true, 'Please specify awareness of online government services'],
    enum: ['Yes, regularly', 'Used once or twice', 'Know about them but cannot use', 'Not aware']
  },
  encounteredFraud: {
    type: String,
    required: [true, 'Please indicate if you encountered fraud or scam attempts'],
    enum: ['Yes, lost money', 'Yes, attempted but escaped', 'Received suspicious calls/links', 'Never']
  },
  cyberHelplineAwareness: {
    type: String,
    required: [true, 'Please indicate if you know the 1930 Cyber Helpline'],
    enum: ['Yes (Know 1930 & Portal)', 'Heard about it vaguely', 'No idea']
  },
  primaryBarrier: {
    type: String,
    required: [true, 'Please select primary challenge or barrier'],
    enum: [
      'Fear of financial loss/fraud',
      'Language barrier (English only)',
      'Poor network/connectivity',
      'Lack of training/guidance',
      'None'
    ]
  },
  desiredTopics: {
    type: [String],
    default: []
  },
  feedback: {
    type: String,
    trim: true,
    default: ''
  },
  awarenessScore: {
    type: Number,
    default: 50,
    min: 0,
    max: 100
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Survey', surveySchema);
