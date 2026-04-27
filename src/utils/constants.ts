import { StateNode, StateNodeID } from '../types';

export const CHAT_FLOW: Record<string, StateNodeID> = {
  START: 'start',
  AGE_CHECK: 'age_check',
  UNDERAGE: 'underage',
  STATE_CHECK: 'state_check',
  REGISTERED_CHECK: 'registered_check',
  VOTER_ID_ISSUES: 'voter_id_issues',
  REGISTRATION_GUIDE: 'registration_guide',
  POLLING_BOOTH: 'polling_booth',
  ELECTION_TIMELINE: 'election_timeline',
  END: 'end',
};

export const translations: Record<string, Record<string, StateNode>> = {
  en: {
    [CHAT_FLOW.START]: {
      text: "Welcome to VoteGuide AI! I'm here to help you navigate the Indian election process easily. To begin, are you a citizen of India?",
      options: [
        { label: "Yes, I am", nextState: CHAT_FLOW.AGE_CHECK },
        { label: "No", nextState: 'non_citizen' }
      ]
    },
    'non_citizen': {
      text: "Currently, only Indian citizens can participate in the Indian election process. Thank you for using VoteGuide AI!",
    },
    [CHAT_FLOW.AGE_CHECK]: {
      text: "Great! How old are you?",
      options: [
        { label: "18 or older", nextState: CHAT_FLOW.STATE_CHECK, value: "18+" },
        { label: "Under 18", nextState: CHAT_FLOW.UNDERAGE, value: "<18" }
      ]
    },
    [CHAT_FLOW.UNDERAGE]: {
      text: "In India, you must be at least 18 years old to vote. You can register once you turn 18! Keep learning about the democratic process until then.",
    },
    [CHAT_FLOW.STATE_CHECK]: {
      text: "Excellent. Which state or union territory are you currently residing in?",
      inputPlaceholder: "Type your state (e.g. Maharashtra)",
      inputType: "text",
      nextState: CHAT_FLOW.REGISTERED_CHECK
    },
    [CHAT_FLOW.REGISTERED_CHECK]: {
      text: "Are you already registered to vote and have your name on the electoral roll?",
      options: [
        { label: "Yes, I am registered", nextState: CHAT_FLOW.VOTER_ID_ISSUES },
        { label: "No / I'm not sure", nextState: CHAT_FLOW.REGISTRATION_GUIDE }
      ]
    },
    [CHAT_FLOW.REGISTRATION_GUIDE]: {
      text: "No problem! You can easily register to vote via the Voter Portal (voters.eci.gov.in) using Form 6. You'll need a passport photo, address proof, and age proof. Want to know about the next steps?",
      options: [
        { label: "Yes, what's next?", nextState: CHAT_FLOW.POLLING_BOOTH }
      ]
    },
    [CHAT_FLOW.VOTER_ID_ISSUES]: {
      text: "Good to know. Do you have your physical Voter ID card, or are there any issues (like a lost card or incorrect name)?",
      options: [
        { label: "I have it, all good!", nextState: CHAT_FLOW.POLLING_BOOTH },
        { label: "I lost my card", action: "lost_card" },
        { label: "Need corrections", action: "corrections" }
      ]
    },
    'lost_card_info': {
       text: "If you've lost your Voter ID card, you can apply for a duplicate one using Form 8 on the Voter Portal. An FIR/police report is usually required for a lost card.",
       options: [
           { label: "Got it. What's next?", nextState: CHAT_FLOW.POLLING_BOOTH }
       ]
    },
    'corrections_info': {
        text: "For any corrections (name, address, photo), you need to fill Form 8 online via the Voter Portal.",
        options: [
            { label: "Understood. Next?", nextState: CHAT_FLOW.POLLING_BOOTH }
        ]
     },
    [CHAT_FLOW.POLLING_BOOTH]: {
      text: "Next up is knowing where to vote! You can find your exact polling booth details on the Voter Helpline App or the ECI website using your EPIC number. Let me show you an interactive simulation of finding a polling booth.",
      showMapMockup: true,
      options: [
        { label: "Show Election Timeline", nextState: CHAT_FLOW.ELECTION_TIMELINE }
      ]
    },
    [CHAT_FLOW.ELECTION_TIMELINE]: {
      text: "Elections are announced by the Election Commission. The key steps are: \n1. Election Notification\n2. Filing Nominations\n3. Campaigning\n4. Polling Day\n5. Counting Day. \nStay tuned to local news for exact dates in your state!",
      options: [
        { label: "Finish", nextState: CHAT_FLOW.END }
      ]
    },
    [CHAT_FLOW.END]: {
      text: "Thank you for using VoteGuide AI! Remember, voting is a fundamental right and duty. Make your voice heard!",
    }
  },
  hi: {
    [CHAT_FLOW.START]: {
      text: "VoteGuide AI में आपका स्वागत है! मैं भारतीय चुनाव प्रक्रिया को आसानी से समझने में आपकी मदद करने के लिए यहाँ हूँ। शुरू करने के लिए, क्या आप भारत के नागरिक हैं?",
      options: [
        { label: "हाँ, मैं हूँ", nextState: CHAT_FLOW.AGE_CHECK },
        { label: "नहीं", nextState: 'non_citizen' }
      ]
    },
    'non_citizen': {
      text: "वर्तमान में, केवल भारतीय नागरिक ही भारतीय चुनाव प्रक्रिया में भाग ले सकते हैं। VoteGuide AI का उपयोग करने के लिए धन्यवाद!",
    },
    [CHAT_FLOW.AGE_CHECK]: {
      text: "बहुत बढ़िया! आपकी आयु कितनी है?",
      options: [
        { label: "18 या उससे अधिक", nextState: CHAT_FLOW.STATE_CHECK, value: "18+" },
        { label: "18 से कम", nextState: CHAT_FLOW.UNDERAGE, value: "<18" }
      ]
    },
    [CHAT_FLOW.UNDERAGE]: {
      text: "भारत में मतदान करने के लिए आपकी आयु कम से कम 18 वर्ष होनी चाहिए। 18 वर्ष का होने पर आप पंजीकरण कर सकते हैं! तब तक लोकतांत्रिक प्रक्रिया के बारे में सीखते रहें।",
    },
    [CHAT_FLOW.STATE_CHECK]: {
      text: "उत्कृष्ट। आप वर्तमान में किस राज्य या केंद्र शासित प्रदेश में रह रहे हैं?",
      inputPlaceholder: "अपना राज्य टाइप करें (उदा. महाराष्ट्र)",
      inputType: "text",
      nextState: CHAT_FLOW.REGISTERED_CHECK
    },
    [CHAT_FLOW.REGISTERED_CHECK]: {
      text: "क्या आप मतदान के लिए पंजीकृत हैं और आपका नाम मतदाता सूची में है?",
      options: [
        { label: "हाँ, मैं पंजीकृत हूँ", nextState: CHAT_FLOW.VOTER_ID_ISSUES },
        { label: "नहीं / मुझे यकीन नहीं है", nextState: CHAT_FLOW.REGISTRATION_GUIDE }
      ]
    },
    [CHAT_FLOW.REGISTRATION_GUIDE]: {
      text: "कोई बात नहीं! आप फॉर्म 6 का उपयोग करके वोटर पोर्टल (voters.eci.gov.in) के माध्यम से मतदान के लिए आसानी से पंजीकरण कर सकते हैं। आपको एक पासपोर्ट फोटो, पते का प्रमाण और आयु प्रमाण की आवश्यकता होगी। क्या आप अगले चरणों के बारे में जानना चाहते हैं?",
      options: [
        { label: "हाँ, आगे क्या?", nextState: CHAT_FLOW.POLLING_BOOTH }
      ]
    },
    [CHAT_FLOW.VOTER_ID_ISSUES]: {
      text: "यह जानकर अच्छा लगा। क्या आपके पास अपना भौतिक वोटर आईडी कार्ड है, या कोई समस्या है (जैसे कार्ड खो जाना या गलत नाम)?",
      options: [
        { label: "मेरे पास है, सब ठीक है!", nextState: CHAT_FLOW.POLLING_BOOTH },
        { label: "मेरा कार्ड खो गया है", action: "lost_card" },
        { label: "सुधार की आवश्यकता है", action: "corrections" }
      ]
    },
    'lost_card_info': {
        text: "यदि आपका वोटर आईडी कार्ड खो गया है, तो आप वोटर पोर्टल पर फॉर्म 8 का उपयोग करके डुप्लिकेट के लिए आवेदन कर सकते हैं। खोए हुए कार्ड के लिए आमतौर पर एक प्राथमिकी/पुलिस रिपोर्ट आवश्यक होती है।",
        options: [
            { label: "समझ गया। आगे क्या?", nextState: CHAT_FLOW.POLLING_BOOTH }
        ]
     },
     'corrections_info': {
         text: "किसी भी सुधार (नाम, पता, फोटो) के लिए, आपको वोटर पोर्टल के माध्यम से ऑनलाइन फॉर्म 8 भरना होगा।",
         options: [
             { label: "समझ गया। आगे क्या?", nextState: CHAT_FLOW.POLLING_BOOTH }
         ]
      },
    [CHAT_FLOW.POLLING_BOOTH]: {
      text: "अगला कदम यह जानना है कि वोट कहाँ देना है! आप अपने ईपीआईसी नंबर का उपयोग करके वोटर हेल्पलाइन ऐप या ईसीआई वेबसाइट पर अपने मतदान केंद्र का सटीक विवरण पा सकते हैं। मुझे आपको एक इंटरेक्टिव सिमुलेशन दिखाने दें।",
      showMapMockup: true,
      options: [
        { label: "चुनाव समयरेखा दिखाएँ", nextState: CHAT_FLOW.ELECTION_TIMELINE }
      ]
    },
    [CHAT_FLOW.ELECTION_TIMELINE]: {
      text: "चुनावों की घोषणा चुनाव आयोग द्वारा की जाती है। मुख्य चरण हैं: \n1. चुनाव अधिसूचना\n2. नामांकन दाखिल करना\n3. प्रचार\n4. मतदान का दिन\n5. मतगणना का दिन। \nअपने राज्य में सटीक तारीखों के लिए स्थानीय समाचारों से जुड़े रहें!",
      options: [
        { label: "समाप्त", nextState: CHAT_FLOW.END }
      ]
    },
    [CHAT_FLOW.END]: {
      text: "VoteGuide AI का उपयोग करने के लिए धन्यवाद! याद रखें, मतदान एक मौलिक अधिकार और कर्तव्य है। अपनी आवाज़ सुनाएँ!",
    }
  }
};
