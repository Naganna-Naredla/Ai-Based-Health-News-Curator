
import { useContext } from 'react';
import { motion } from 'framer-motion';
import { LanguageContext } from '../App';

function HealthMetrics() {
  const { language } = useContext(LanguageContext);

  const metrics = {
    english: {
      title: 'Normal Health Metrics for Adults',
      sugar: 'Blood Sugar (Glucose): Fasting 70-99 mg/dL; Random <140 mg/dL',
      bp: 'Blood Pressure: <120/80 mmHg',
      hemoglobin: 'Hemoglobin: Males 13.8-17.2 g/dL; Females 12.1-15.1 g/dL',
      cholesterol: 'Total Cholesterol: <200 mg/dL; LDL <100 mg/dL; HDL >60 mg/dL',
      bmi: 'BMI: 18.5-24.9',
      heartRate: 'Resting Heart Rate: 60-100 bpm',
      note: '*Consult a doctor for personalized advice. Values may vary by age, sex, and health conditions.'
    },
    hindi: {
      title: 'वयस्कों के लिए सामान्य स्वास्थ्य मापदंड',
      sugar: 'रक्त शर्करा (ग्लूकोज): उपवास 70-99 mg/dL; यादृच्छिक <140 mg/dL',
      bp: 'रक्तचाप: <120/80 mmHg',
      hemoglobin: 'हीमोग्लोबिन: पुरुष 13.8-17.2 g/dL; महिला 12.1-15.1 g/dL',
      cholesterol: 'कुल कोलेस्ट्रॉल: <200 mg/dL; LDL <100 mg/dL; HDL >60 mg/dL',
      bmi: 'बीएमआई: 18.5-24.9',
      heartRate: 'विश्राम हृदय गति: 60-100 bpm',
      note: '*व्यक्तिगत सलाह के लिए डॉक्टर से परामर्श करें। मूल्य उम्र, लिंग और स्वास्थ्य स्थितियों के अनुसार भिन्न हो सकते हैं।'
    },
    telugu: {
      title: 'పెద్దలకు సాధారణ ఆరోగ్య మెట్రిక్స్',
      sugar: 'రక్త షుగర్ (గ్లూకోజ్): ఫాస్టింగ్ 70-99 mg/dL; రాండమ్ <140 mg/dL',
      bp: 'బ్లడ్ ప్రెషర్: <120/80 mmHg',
      hemoglobin: 'హెమోగ్లోబిన్: పురుషులు 13.8-17.2 g/dL; స్త్రీలు 12.1-15.1 g/dL',
      cholesterol: 'మొత్తం కొలెస్ట్రాల్: <200 mg/dL; LDL <100 mg/dL; HDL >60 mg/dL',
      bmi: 'బీఎమ్‌ఐ: 18.5-24.9',
      heartRate: 'రెస్టింగ్ హార్ట్ రేట్: 60-100 bpm',
      note: '*వ్యక్తిగత సలహా కోసం డాక్టర్‌ను సంప్రదించండి. విలువలు వయస్సు, లింగం మరియు ఆరోగ్య పరిస్థితుల ప్రకారం మారవచ్చు.'
    }
  };

  const data = metrics[language];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container"
    >
      <h1>{data.title}</h1>
      <div className="metrics-grid">
        <div className="metric-card">
          <h2>Blood Sugar</h2>
          <p>{data.sugar}</p>
        </div>
        <div className="metric-card">
          <h2>Blood Pressure</h2>
          <p>{data.bp}</p>
        </div>
        <div className="metric-card">
          <h2>Hemoglobin</h2>
          <p>{data.hemoglobin}</p>
        </div>
        <div className="metric-card">
          <h2>Cholesterol</h2>
          <p>{data.cholesterol}</p>
        </div>
        <div className="metric-card">
          <h2>BMI</h2>
          <p>{data.bmi}</p>
        </div>
        <div className="metric-card">
          <h2>Heart Rate</h2>
          <p>{data.heartRate}</p>
        </div>
      </div>
      <p className="metrics-note">{data.note}</p>
    </motion.div>
  );
}

export default HealthMetrics;