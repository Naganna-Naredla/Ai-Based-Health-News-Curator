// src/screens/HealthReference.jsx (Create this new file)

import { useContext } from 'react';
import { motion } from 'framer-motion';
import { LanguageContext } from '../App';

function HealthReference() {
  const { language } = useContext(LanguageContext);

  const translations = {
    english: {
      title: 'Health Reference Values',
      intro: 'Normal ranges for key health metrics in healthy adults. Consult a doctor for personalized advice.',
      metric: 'Metric',
      normalRange: 'Normal Range',
      notes: 'Notes',
      bloodSugar: 'Blood Sugar (Fasting)',
      bloodSugarRange: '70-99 mg/dL',
      bloodSugarNotes: 'Prediabetes: 100-125 mg/dL; Diabetes: 126+ mg/dL',
      bloodPressure: 'Blood Pressure',
      bloodPressureRange: '<120/80 mmHg',
      bloodPressureNotes: 'Elevated: 120-129/<80; Hypertension: 130+/80+',
      hemoglobin: 'Hemoglobin',
      hemoglobinRange: 'Men: 13.8-17.2 g/dL; Women: 12.1-15.1 g/dL',
      hemoglobinNotes: 'Varies by age and gender; low levels indicate anemia',
      cholesterol: 'Total Cholesterol',
      cholesterolRange: '<200 mg/dL',
      cholesterolNotes: 'LDL <100 mg/dL; HDL >60 mg/dL',
      bmi: 'Body Mass Index (BMI)',
      bmiRange: '18.5-24.9',
      bmiNotes: 'Underweight <18.5; Overweight 25+; Obesity 30+',
      a1c: 'Hemoglobin A1C',
      a1cRange: '<5.7%',
      a1cNotes: 'Prediabetes: 5.7-6.4%; Diabetes: 6.5%+'
    },
    hindi: {
      title: 'स्वास्थ्य संदर्भ मूल्य',
      intro: 'स्वस्थ वयस्कों के लिए प्रमुख स्वास्थ्य मेट्रिक्स की सामान्य सीमाएं। व्यक्तिगत सलाह के लिए डॉक्टर से परामर्श करें।',
      metric: 'मेट्रिक',
      normalRange: 'सामान्य सीमा',
      notes: 'नोट्स',
      bloodSugar: 'रक्त शर्करा (उपवास)',
      bloodSugarRange: '70-99 mg/dL',
      bloodSugarNotes: 'प्री-डायबिटीज: 100-125 mg/dL; डायबिटीज: 126+ mg/dL',
      bloodPressure: 'रक्तचाप',
      bloodPressureRange: '<120/80 mmHg',
      bloodPressureNotes: 'उन्नत: 120-129/<80; उच्च रक्तचाप: 130+/80+',
      hemoglobin: 'हीमोग्लोबिन',
      hemoglobinRange: 'पुरुष: 13.8-17.2 g/dL; महिला: 12.1-15.1 g/dL',
      hemoglobinNotes: 'उम्र और लिंग के अनुसार भिन्न; कम स्तर एनीमिया का संकेत',
      cholesterol: 'कुल कोलेस्ट्रॉल',
      cholesterolRange: '<200 mg/dL',
      cholesterolNotes: 'LDL <100 mg/dL; HDL >60 mg/dL',
      bmi: 'बॉडी मास इंडेक्स (BMI)',
      bmiRange: '18.5-24.9',
      bmiNotes: 'कम वजन <18.5; अधिक वजन 25+; मोटापा 30+',
      a1c: 'हीमोग्लोबिन A1C',
      a1cRange: '<5.7%',
      a1cNotes: 'प्री-डायबिटीज: 5.7-6.4%; डायबिटीज: 6.5%+'
    },
    telugu: {
      title: 'ఆరోగ్య సూచనలు',
      intro: 'ఆరోగ్యవంతమైన పెద్దలకు ముఖ్యమైన ఆరోగ్య మెట్రిక్స్ సాధారణ శ్రేణులు. వ్యక్తిగత సలహా కోసం డాక్టర్‌ను సంప్రదించండి.',
      metric: 'మెట్రిక్',
      normalRange: 'సాధారణ శ్రేణి',
      notes: 'గమనికలు',
      bloodSugar: 'రక్త షుగర్ (అనబ్రోకెన్)',
      bloodSugarRange: '70-99 mg/dL',
      bloodSugarNotes: 'ప్రీ-డయాబెటిస్: 100-125 mg/dL; డయాబెటిస్: 126+ mg/dL',
      bloodPressure: 'రక్తపోటు',
      bloodPressureRange: '<120/80 mmHg',
      bloodPressureNotes: 'ఎదుగుదల: 120-129/<80; ఉన్నత రక్తపోటు: 130+/80+',
      hemoglobin: 'హీమోగ్లోబిన్',
      hemoglobinRange: 'పురుషులు: 13.8-17.2 g/dL; మహిళలు: 12.1-15.1 g/dL',
      hemoglobinNotes: 'వయస్సు మరియు లింగం ప్రకారం మారుతుంది; తక్కువ స్థాయిలు ఎనీమియాను సూచిస్తాయి',
      cholesterol: 'మొత్తం కొలెస్ట్రాల్',
      cholesterolRange: '<200 mg/dL',
      cholesterolNotes: 'LDL <100 mg/dL; HDL >60 mg/dL',
      bmi: 'బాడీ మాస్ ఇండెక్స్ (BMI)',
      bmiRange: '18.5-24.9',
      bmiNotes: 'తక్కువ బరువు <18.5; అధిక బరువు 25+; ఊబకాయం 30+',
      a1c: 'హీమోగ్లోబిన్ A1C',
      a1cRange: '<5.7%',
      a1cNotes: 'ప్రీ-డయాబెటిస్: 5.7-6.4%; డయాబెటిస్: 6.5%+'
    }
  };

  const t = translations[language] || translations.english;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container"
    >
      <h1>{t.title}</h1>
      <p className="reference-intro">{t.intro}</p>
      <table className="health-reference-table">
        <thead>
          <tr>
            <th>{t.metric}</th>
            <th>{t.normalRange}</th>
            <th>{t.notes}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{t.bloodSugar}</td>
            <td>{t.bloodSugarRange}</td>
            <td>{t.bloodSugarNotes}</td>
          </tr>
          <tr>
            <td>{t.bloodPressure}</td>
            <td>{t.bloodPressureRange}</td>
            <td>{t.bloodPressureNotes}</td>
          </tr>
          <tr>
            <td>{t.hemoglobin}</td>
            <td>{t.hemoglobinRange}</td>
            <td>{t.hemoglobinNotes}</td>
          </tr>
          <tr>
            <td>{t.cholesterol}</td>
            <td>{t.cholesterolRange}</td>
            <td>{t.cholesterolNotes}</td>
          </tr>
          <tr>
            <td>{t.bmi}</td>
            <td>{t.bmiRange}</td>
            <td>{t.bmiNotes}</td>
          </tr>
          <tr>
            <td>{t.a1c}</td>
            <td>{t.a1cRange}</td>
            <td>{t.a1cNotes}</td>
          </tr>
        </tbody>
      </table>
    </motion.div>
  );
}

export default HealthReference;