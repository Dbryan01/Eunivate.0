import React, { useState } from "react";
import QuotationStep1 from '../../components/Client/Dropdowns/QuotationStep1.jsx';  
import QuotationStep2 from '../../components/Client/Dropdowns/QuotationStep2.jsx'; 
import QuotationStep3 from '../../components/Client/Dropdowns/QuotationStep3.jsx';  
import QuotationStep4 from '../../components/Client/Dropdowns/QuotationStep4.jsx'; 

const Quotation = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: ''
  });

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  const submitForm = () => {
    // Submit the form data to your backend or handle the submission here
    console.log('Form Submitted', formData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <QuotationStep1 formData={formData} setFormData={setFormData} nextStep={nextStep} />;
      case 2:
        return <QuotationStep2 formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <QuotationStep3 formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <QuotationStep4 formData={formData} submitForm={submitForm} prevStep={prevStep} />;
      default:
        return <QuotationStep1 formData={formData} setFormData={setFormData} nextStep={nextStep} />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-8">
        {/* Render the current step */}
        {renderStep()}
      </div>
    </div>
  );
};

export default Quotation;
