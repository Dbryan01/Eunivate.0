import React, { useState } from 'react';
import tutImage1 from '../../../assets/Tutorial/tut1.png'; // Import tutorial images
import tutImage2 from '../../../assets/Tutorial/tut2.png';
import tutImage3 from '../../../assets/Tutorial/tut3.png'; // Example additional image
import tutImage4 from '../../../assets/Tutorial/tut4.png'; // Example additional image
import tutImage5 from '../../../assets/Tutorial/tut5.png'; // Example additional image
import tutImage6 from '../../../assets/Tutorial/tut6.png'; // Example additional image
import tutImage7 from '../../../assets/Tutorial/tut7.png'; // Example additional image
import tutImage8 from '../../../assets/Tutorial/tut8.png'; // Example additional image
import tutImage9 from '../../../assets/Tutorial/tut9.png'; // Example additional image
import tutImage10 from '../../../assets/Tutorial/tut10.png'; // Example additional image
import tutImage11 from '../../../assets/Tutorial/tut11.png'; // Example additional image
import tutImage12 from '../../../assets/Tutorial/tut12.png'; // Example additional image
import tutImage13 from '../../../assets/Tutorial/tut13.png'; // Example additional image
import tutImage14 from '../../../assets/Tutorial/tut14.png'; // Example additional image
import tutImage15 from '../../../assets/Tutorial/tut15.png'; // Example additional image

const tutorialSteps = [
  {
    text: "Step 1: Click the plus button in the workspace area.",
    images: [tutImage1], // Single image for the first step
  },
  {
    text: [
      "Step 2: Enter the name of your workspace in the box to create it.",
      "Step 3: Select the name of the workspace you just created.  "
    ],
    images: [tutImage2, tutImage3], // Two images for the second step
  },
  {
    text: "Step 4: Now you have a project workspace where you can start creating your project. ",
    images: [tutImage4], // Single image for the third step
  },
  {
    text: [
      "Step 5: Click on the project, and after you click it, you will see a button labeled 'New Project.' Click on that button. ",
      "Step 6: After that, a 'New Project' box will appear. Fill it out   "
    ],
    images: [tutImage5, tutImage6], // Images for the fourth step
  },
  {
    text: [
      "Step 7: After creating the project, click on 'People' in the side navigation.",
      "Step 8: Now you can see the 'Add Member' button. Click it to invite a member ",
    ],
    images: [tutImage7, tutImage8], // Images for the fifth step
  },
  {
    text: [ "Step 9: After inviting members, you will see your invited members listed here. You can then go back to the project page. ",
            "Step 10: You can then go back to the project page. ",
    ],
    images: [tutImage9,tutImage5], // Images for the fourth step
  },
  {
    text: [ "Step 11: Click on the project you created earlier on this project page. ",
            "Step 12: After clicking the project, you will see a user icon here. Click on that icon. ", ],
    images: [tutImage10,tutImage11], // Single image for the third step
  },
  {
    text: [ "Step 13: A white box will appear here to add members. Search for the names of the members and select them. ",
      "Step 14:  You will see the members you selected under 'Assignee.' Select the members who will be responsible for this task. ", ],
    images: [tutImage12,tutImage13], // Single image for the third step
  },
  {
    text: "Step 15: Now you will see the members you assigned to the task and invited to the project listed in the task you created.",
    images: [tutImage14,tutImage15], // Single image for the third step
  },
];

const TutorialModal = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const currentTutorial = tutorialSteps[currentStep];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-black opacity-50 absolute inset-0" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-lg p-4 z-10 relative">
        <h2 className="text-lg font-semibold mb-4">Tutorial</h2>
        
        {/* Adjusted text rendering */}
{Array.isArray(currentTutorial.text) ? (
  currentTutorial.text.map((line, index) => (
    <div key={index} className={`mb-2 ${index === 1 && currentStep === 5 ? 'overflow-hidden max-h-16' : ''} transition-all duration-300`}>
      <p className={`${index === 1 && currentStep === 5 ? 'overflow-hidden' : ''} whitespace-pre-line`}>
        {line}
      </p>
    </div>
  ))
) : (
  <p>{currentTutorial.text}</p>
)}


        {/* Images below the paragraph */}
        <div className="flex justify-center mt-4">
          {currentTutorial.images.map((image, index) => (
            <div className="flex items-center justify-center mx-2 rounded bg-black p-2" key={index}>
              <img 
                src={image}
                alt={`Tutorial step ${currentStep + 1} image ${index + 1}`} 
                className={`rounded ${image === tutImage14 || image === tutImage15 ? 'w-40' : 'w-60'} h-auto`} 
              />
            </div>
          ))}
        </div>

        {/* Close Button (X) */}
        <button
          className="absolute top-0 right-2 text-gray-600 hover:text-gray-900 text-2xl p-2"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Previous and Next buttons */}
        <div className="flex justify-between mt-4">
          <button 
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded" 
            onClick={() => setCurrentStep(currentStep > 0 ? currentStep - 1 : 0)}
            disabled={currentStep === 0}
          >
            Previous
          </button>

          {/* Page indicator below the images */}
          <div className="flex justify-center mt-0">
            <div className="bg-gray-300 text-gray-800 px-4 py-2 rounded text-sm">
              Step {currentStep + 1} of {tutorialSteps.length}
            </div>
          </div>

          <button className="bg-red-700 text-white px-4 py-2 rounded" onClick={handleNext}>
            {currentStep < tutorialSteps.length - 1 ? 'Next' : 'Finish'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TutorialModal;
