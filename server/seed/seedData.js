const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Article = require('../models/Article');
const Survey = require('../models/Survey');
const Contact = require('../models/Contact');
const { getMongoStatus, getLocalDb, saveLocalDb } = require('../config/db');

const initialArticles = [
  {
    title: 'The Golden Rule of UPI: You NEVER Enter PIN or Scan QR to RECEIVE Money',
    category: 'Digital Payments',
    summary: 'A critical awareness guide for rural citizens explaining how UPI payment requests work and the most common QR code traps used by fraudsters.',
    content: `Many villagers receive fraudulent calls claiming they have won a government cash prize, subsidy bonus, or PM-Kisan grant. The caller asks them to 'Scan this QR code and enter your UPI PIN to claim ₹25,000 into your account'.

CRITICAL TRUTH:
UPI PIN is your digital safe key. It is ONLY entered when MONEY IS LEAVING YOUR ACCOUNT. 
You NEVER enter your UPI PIN to receive money. When someone sends you money, it lands directly in your bank account without requiring any action or PIN.

STEPS TO PROTECT YOURSELF:
1. If anyone sends you a QR code and asks you to scan it to 'receive' payment, STOP IMMEDIATELY. Scanning and entering your PIN will instantly deduct money from your account.
2. Never share the 4-digit or 6-digit UPI PIN with anyone, including bank representatives or shopkeepers.
3. Turn on SMS notifications with your bank so you receive instant alerts for every debit and credit transaction.
4. If money is deducted fraudulently, call the National Cyber Crime Helpline at 1930 within 2 hours to freeze the transaction.`,
    readTime: '4 min read',
    author: 'Cyber Safety Cell',
    dangerLevel: 'Critical',
    keyTakeaways: [
      'UPI PIN is ONLY required to SEND money, NEVER to receive.',
      'Scanning a QR code always sends money out of your bank account.',
      'Never disclose UPI PIN or OTP over phone calls or WhatsApp.',
      'Report payment fraud immediately to helpline 1930.'
    ]
  },
  {
    title: 'Direct Benefit Transfer (DBT) & PM-Kisan: How to Safely Check Status Online',
    category: 'Government Schemes',
    summary: 'A step-by-step guide for farmers to check DBT installment status on official government portals without falling for fake middleman websites.',
    content: `Government schemes like PM-Kisan Samman Nidhi provide ₹6,000 annually directly into farmers' Aadhaar-seeded bank accounts. However, cyber scammers create fake lookalike portals and send WhatsApp links claiming to 'unblock' pending installments.

HOW TO CHECK SAFELY:
1. Only use official government websites ending with '.gov.in' or '.nic.in' (e.g., pmkisan.gov.in).
2. Never pay any fee to view your installment status; the official government portal is completely FREE.
3. Check your Aadhaar-Bank Account linkage status through your bank branch or the official UIDAI portal.
4. Do not download any APK file sent over WhatsApp or Telegram pretending to be the 'PM Kisan App'. Always download verified apps strictly from Google Play Store.

WARNING ON OTP SCAMS:
Government officials will NEVER call you asking for your Aadhaar OTP to release your subsidy. Any person asking for an OTP over the phone is a criminal.`,
    readTime: '5 min read',
    author: 'Rural Development Desk',
    dangerLevel: 'Medium',
    keyTakeaways: [
      'Only access portals ending in .gov.in (like pmkisan.gov.in).',
      'Checking status is 100% free; beware of middlemen asking for service fees.',
      'Never share Aadhaar OTP with callers claiming to be government officers.',
      'Download government apps only from Google Play Store.'
    ]
  },
  {
    title: 'Spotting Fake Electricity Bill & Bank Account Freeze SMS Scams',
    category: 'Cyber Fraud Prevention',
    summary: 'Learn to recognize urgency-based scam messages claiming your power will be disconnected or your bank KYC is suspended.',
    content: `A rampant scam in rural and semi-urban areas is the 'Electricity Bill Disconnection' message. Citizens receive an SMS stating:
'Dear Consumer, Your electricity power will be disconnected tonight at 9:30 PM because your previous month bill was not updated. Please immediately contact our electricity officer at 98765XXXXX.'

WHY THIS IS A SCAM:
Power distribution companies never send SMS from personal 10-digit mobile numbers. Official communications always carry a sender ID like 'EB-POWER' or 'DHBVN'.
When citizens call the number, the scammer instructs them to download a remote-access app (like AnyDesk, TeamViewer QuickSupport, or RustDesk) or pay ₹10 through a malicious link. Once the remote app is installed, the scammer views your screen and drains your bank balance.

ACTION CHECKLIST:
1. Look at the sender phone number: Real utility companies do not use personal mobile numbers.
2. Never install apps recommended by unknown callers.
3. Always pay electricity bills directly at the official electricity board office, CSC (Common Service Center), or verified payment apps.`,
    readTime: '4 min read',
    author: 'Cyber Fraud Prevention Unit',
    dangerLevel: 'High',
    keyTakeaways: [
      'Official utility providers never send disconnection notices from personal mobile numbers.',
      'Never install screen-sharing apps like AnyDesk or TeamViewer for stranger assistance.',
      'Verify utility bills directly with your local electricity sub-station or CSC.',
      'Block and report the scammer phone number on Chakshu portal.'
    ]
  },
  {
    title: 'Smartphone Basics: Safe App Downloads & Protecting Personal Permissions',
    category: 'Smartphone Basics',
    summary: 'A beginner-friendly handbook on setting up your first smartphone, understanding app permissions, and avoiding malicious malware apps.',
    content: `Transitioning from a basic keypad phone to an Android smartphone opens immense opportunities, but also requires digital awareness.

1. UNDERSTANDING APP PERMISSIONS:
When you install an app (like a torch or calculator), check why it asks for your 'Contacts', 'Location', or 'SMS'. A flashlight app does not need access to your photos or SMS messages. If an app requests unnecessary access, deny the permission!

2. ONLY USE GOOGLE PLAY STORE:
Never install files ending in '.apk' downloaded from WhatsApp groups, Facebook links, or unknown websites. These often contain Trojans that spy on your bank SMS and steal your OTPs silently.

3. LOCK YOUR PHONE SCREEN:
Always set a 6-digit PIN, strong password, or fingerprint lock on your phone. If your phone is lost or stolen, screen lock prevents anyone from accessing your bank apps and personal family photos.

4. KEEP SYSTEM SOFTWARE UPDATED:
Regular system updates install critical security patches that protect your phone from hackers and bugs.`,
    readTime: '6 min read',
    author: 'Digital Literacy Team',
    dangerLevel: 'Low',
    keyTakeaways: [
      'Deny permissions (SMS, Camera, Contacts) if the app does not genuinely need them.',
      'Never install unknown APK files sent through WhatsApp or messaging apps.',
      'Always secure your smartphone with a screen lock (PIN or Biometric).',
      'Regularly update your phone software to protect against security flaws.'
    ]
  },
  {
    title: 'How to Use DigiLocker: Storing Aadhaar, Ration Card & Land Records Safely',
    category: 'Government Schemes',
    summary: 'Learn how DigiLocker legally replaces physical documents, helps avoid loss of certificates, and protects personal records.',
    content: `DigiLocker is a flagship initiative of the Ministry of Electronics and IT under Digital India. It provides a secure cloud storage account linked to your Aadhaar number.

KEY BENEFITS FOR RURAL CITIZENS:
- Under the Information Technology Act 2000, documents stored in DigiLocker are legally treated on par with original physical certificates.
- Never lose important documents during rains, floods, or travel.
- Direct access to: Aadhaar Card, Driving Licence, Vehicle RC, Ration Card, Land Records, School Certificates, and Pension payment orders.

HOW TO SET UP DIGILOCKER:
1. Download 'DigiLocker' exclusively from Google Play Store or visit digilocker.gov.in.
2. Sign up using your mobile number linked with Aadhaar.
3. Enter your 12-digit Aadhaar number and verify with the OTP received.
4. Set a 6-digit security PIN that you will remember.
5. Search for your state government services and fetch your digital ration card or land patta document.`,
    readTime: '5 min read',
    author: 'Digital India Literacy Wing',
    dangerLevel: 'Low',
    keyTakeaways: [
      'DigiLocker is legally valid across India for government and police verification.',
      'Safeguards land records, ration cards, and school certificates from physical damage.',
      'Registration requires Aadhaar-linked mobile phone for one-time verification.',
      'Completely free and managed directly by the Government of India.'
    ]
  },
  {
    title: 'Instant Action Guide: What to Do If You Fall Victim to Cyber Fraud (Dial 1930)',
    category: 'Safety Tips',
    summary: 'The critical first two hours following financial fraud: how to freeze stolen funds, dial 1930, and file a report on cybercrime.gov.in.',
    content: `If you or someone in your village has accidentally shared an OTP or scanned a fraudulent QR code and lost money, DO NOT PANIC. Time is critical.

THE GOLDEN 2-HOUR WINDOW:
Financial fraudsters transfer money through a chain of digital wallets and accounts. If reported quickly, the police cyber cell can freeze the money before it is withdrawn at an ATM.

STEP-BY-STEP ACTION:
1. IMMEDIATELY DIAL 1930:
1930 is the National Cyber Crime Reporting Helpline (available 24/7). Keep your bank account number, debit card number, transaction ID, and mobile number ready.
2. CALL YOUR BANK HELPLINE:
Ask your bank to immediately block your ATM card, net banking, and UPI access to prevent further deductions.
3. REGISTER FORMAL COMPLAINT:
Visit cybercrime.gov.in and register the complaint. Save the acknowledgement number for follow-up with your local police station.
4. DO NOT DELETE EVIDENCE:
Do not delete the scammer's phone number, SMS, WhatsApp chat, or call logs. These are vital legal evidence for recovering your money.`,
    readTime: '5 min read',
    author: 'National Cyber Security Response',
    dangerLevel: 'Critical',
    keyTakeaways: [
      'Act within the 2-hour Golden Window to freeze stolen bank transfers.',
      'Dial 1930 immediately — it is toll-free and operates 24x7.',
      'Instruct your bank to block UPI and debit cards immediately.',
      'Preserve screenshots, transaction IDs, and scammer phone numbers as legal evidence.'
    ]
  }
];

const initialSurveys = [
  {
    respondentName: 'Rameshwar Patel',
    village: 'Rampur Kalan',
    district: 'Varanasi',
    ageGroup: '41-60',
    gender: 'Male',
    occupation: 'Farmer/Agriculture',
    educationLevel: 'High School',
    smartphoneOwnership: 'Personal Smartphone',
    internetUsageFrequency: 'Daily',
    digitalPaymentUsage: 'Regular (UPI/PhonePe/GPay)',
    onlineGovtServices: 'Yes, regularly',
    encounteredFraud: 'Received suspicious calls/links',
    cyberHelplineAwareness: 'Heard about it vaguely',
    primaryBarrier: 'Fear of financial loss/fraud',
    desiredTopics: ['UPI Safety', 'Crop Price/Mandi Apps', 'Cyber Fraud Prevention'],
    feedback: 'Need local village workshop in local language so elderly people can learn safely.',
    awarenessScore: 75,
    submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
  },
  {
    respondentName: 'Sunita Devi',
    village: 'Chandrapur',
    district: 'Patna',
    ageGroup: '26-40',
    gender: 'Female',
    occupation: 'Homemaker',
    educationLevel: 'Intermediate/Diploma',
    smartphoneOwnership: 'Shared Family Phone',
    internetUsageFrequency: 'Few times a week',
    digitalPaymentUsage: 'Occasional with family help',
    onlineGovtServices: 'Used once or twice',
    encounteredFraud: 'Yes, attempted but escaped',
    cyberHelplineAwareness: 'Yes (Know 1930 & Portal)',
    primaryBarrier: 'Fear of financial loss/fraud',
    desiredTopics: ['UPI Safety', 'DigiLocker', 'Cyber Fraud Prevention'],
    feedback: 'Someone called pretending to be a bank manager, but I did not share the OTP.',
    awarenessScore: 80,
    submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  },
  {
    respondentName: 'Anil Kumar Sharma',
    village: 'Govindpur',
    district: 'Lucknow',
    ageGroup: '18-25',
    gender: 'Male',
    occupation: 'Student',
    educationLevel: 'Graduate/Post-Graduate',
    smartphoneOwnership: 'Personal Smartphone',
    internetUsageFrequency: 'Daily',
    digitalPaymentUsage: 'Regular (UPI/PhonePe/GPay)',
    onlineGovtServices: 'Yes, regularly',
    encounteredFraud: 'Received suspicious calls/links',
    cyberHelplineAwareness: 'Yes (Know 1930 & Portal)',
    primaryBarrier: 'Poor network/connectivity',
    desiredTopics: ['Job/Education Portals', 'Cyber Fraud Prevention'],
    feedback: 'Great initiative! We can train our parents and elders using these materials.',
    awarenessScore: 95,
    submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  },
  {
    respondentName: 'Baldev Singh',
    village: 'Kishanpur',
    district: 'Amritsar',
    ageGroup: '60+',
    gender: 'Male',
    occupation: 'Farmer/Agriculture',
    educationLevel: 'Primary School',
    smartphoneOwnership: 'Basic Keypad Phone',
    internetUsageFrequency: 'Never',
    digitalPaymentUsage: 'Never used',
    onlineGovtServices: 'Not aware',
    encounteredFraud: 'Never',
    cyberHelplineAwareness: 'No idea',
    primaryBarrier: 'Lack of training/guidance',
    desiredTopics: ['Smartphone Basics', 'PM-Kisan Portals'],
    feedback: 'I want my grandson to teach me how to check pension on the phone.',
    awarenessScore: 25,
    submittedAt: new Date(Date.now() - 12 * 60 * 60 * 1000)
  }
];

const initialContacts = [
  {
    name: 'Mahesh Verma',
    email: 'mahesh.v@example.com',
    phone: '9876543210',
    village: 'Bhimpur',
    subject: 'Request for Cyber Awareness Camp in our Panchayat',
    message: 'Respected Team, We have 500+ households in our village. Recently 2 people lost money to fake loan apps. Can you conduct an awareness camp in our school hall?',
    status: 'New',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  },
  {
    name: 'Pooja Kumari',
    email: 'pooja.k@example.com',
    phone: '9123456780',
    village: 'Kalyanpur',
    subject: 'Inquiry regarding DigiLocker certificate verification',
    message: 'Hello, I want to fetch my 10th marksheet and caste certificate on DigiLocker. Can you provide a simple video tutorial or guide in Hindi?',
    status: 'In Review',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
  }
];

const seedDatabase = async () => {
  const adminEmail = 'admin@community.org';
  const adminPassword = 'admin123';
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(adminPassword, salt);

  if (getMongoStatus()) {
    try {
      // Check admin
      const existingAdmin = await User.findOne({ email: adminEmail });
      if (!existingAdmin) {
        await User.create({
          name: 'CSP Project Administrator',
          email: adminEmail,
          password: adminPassword, // pre-save will hash
          role: 'admin',
          village: 'Awareness Coordination Cell',
          phone: '+91 99999 88888'
        });
        console.log('[Seed] Admin user created in MongoDB (admin@community.org / admin123)');
      }

      // Check articles
      const articleCount = await Article.countDocuments();
      if (articleCount === 0) {
        await Article.insertMany(initialArticles);
        console.log(`[Seed] Inserted ${initialArticles.length} educational articles into MongoDB`);
      }

      // Check surveys
      const surveyCount = await Survey.countDocuments();
      if (surveyCount === 0) {
        await Survey.insertMany(initialSurveys);
        console.log(`[Seed] Inserted ${initialSurveys.length} initial rural surveys into MongoDB`);
      }

      // Check contacts
      const contactCount = await Contact.countDocuments();
      if (contactCount === 0) {
        await Contact.insertMany(initialContacts);
        console.log(`[Seed] Inserted ${initialContacts.length} initial contact inquiries into MongoDB`);
      }
    } catch (err) {
      console.error('[Seed Error MongoDB]:', err.message);
    }
  } else {
    // Local DB fallback seed
    const db = getLocalDb();

    // Check admin
    const adminExists = (db.users || []).some((u) => u.email === adminEmail);
    if (!adminExists) {
      db.users = db.users || [];
      db.users.push({
        _id: 'usr_admin_001',
        name: 'CSP Project Administrator',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
        village: 'Awareness Coordination Cell',
        phone: '+91 99999 88888',
        createdAt: new Date().toISOString()
      });
      console.log('[Local Seed] Admin user created (admin@community.org / admin123)');
    }

    // Check articles
    if (!db.articles || db.articles.length === 0) {
      db.articles = initialArticles.map((art, idx) => ({
        _id: 'art_seed_00' + (idx + 1),
        ...art,
        createdAt: new Date(Date.now() - idx * 3600000).toISOString(),
        updatedAt: new Date(Date.now() - idx * 3600000).toISOString()
      }));
      console.log(`[Local Seed] Created ${initialArticles.length} educational articles.`);
    }

    // Check surveys
    if (!db.surveys || db.surveys.length === 0) {
      db.surveys = initialSurveys.map((surv, idx) => ({
        _id: 'surv_seed_00' + (idx + 1),
        ...surv,
        submittedAt: surv.submittedAt.toISOString()
      }));
      console.log(`[Local Seed] Created ${initialSurveys.length} initial rural surveys.`);
    }

    // Check contacts
    if (!db.contacts || db.contacts.length === 0) {
      db.contacts = initialContacts.map((cnt, idx) => ({
        _id: 'cnt_seed_00' + (idx + 1),
        ...cnt,
        createdAt: cnt.createdAt.toISOString()
      }));
      console.log(`[Local Seed] Created ${initialContacts.length} initial contact submissions.`);
    }

    saveLocalDb(db);
  }
};

module.exports = { seedDatabase };
