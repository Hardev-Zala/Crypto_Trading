// src/App.js
import React, { useState } from "react";
import Step1MobileNumber from "./validation/Step1MobileNumber";
import Step2MobileOTP from "./validation/Step2MobileOTP";
import Step3Email from "./validation/Step3Email";
import Step4EmailOTP from "./validation/Step4EmailOTP";
import Step5PersonalInfo from "./validation/Step5PersonalInfo";
import Step6Declarations from "./validation/Step6Declarations";
import Step7IdentityVerification from "./validation/Step7IdentityVerification";
import Step8BankDetails from "./validation/Step8BankDetails";
import Step9IncomeProof from "./validation/Step9IncomeProof";
import Step10NomineeDetails from "./validation/Step10NomineeDetails";
import ProgressBar from "./validation/ProgressBar";
import Step11PINConfirm from "./validation/Step11PINConfirm";
import { useUserAuthStore } from "../store/UserAuth";
import NotFoundPage from "../pages/NotFoundPage";

const DematOpening = () => {
  // const { user } = useUserAuthStore();

  // if (user != null) {
  //   return <NotFoundPage />;
  // }

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const totalSteps = 11;

  const handleNextStep = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep((prevStep) => prevStep + 1);
  };

  // const handlePreviousStep = () => {
  //   setCurrentStep((prevStep) => prevStep - 1);
  // };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1MobileNumber onNext={handleNextStep} />;
      case 2:
        return <Step2MobileOTP onNext={handleNextStep} />;
      case 3:
        return <Step3Email onNext={handleNextStep} />;
      case 4:
        return <Step4EmailOTP onNext={handleNextStep} />;
      case 5:
        return <Step5PersonalInfo onNext={handleNextStep} />;
      case 6:
        return <Step6Declarations onNext={handleNextStep} />;
      case 7:
        return <Step7IdentityVerification onNext={handleNextStep} />;
      case 8:
        return <Step8BankDetails onNext={handleNextStep} />;
      case 9:
        return <Step9IncomeProof onNext={handleNextStep} />;
      case 10:
        return <Step10NomineeDetails onNext={handleNextStep} />;
      case 11:
        return <Step11PINConfirm onNext={handleNextStep} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        {renderStep()}
      </div>
    </div>
  );
};

export default DematOpening;
