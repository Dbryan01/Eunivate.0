import React from 'react';

const QuotationStep3 = ({ formData, setFormData, nextStep, prevStep }) => {
    return (
        <>
            {/* Header */}
            <h2 className="text-3xl font-bold text-gray-800 text-center">Get a project quote</h2>
            <p className="text-gray-500 mt-2 text-center">
                Please select the project budget range you have in mind.
            </p>
            
            {/* Budget Selection Container */}
            <div className="w-full max-w-lg mx-auto mt-8">
                <div className="flex items-center justify-center space-x-2 mb-8">
                    <div className="flex items-center space-x-2">
                        <div className="h-1 w-16 bg-gray-300"></div>
                        <div className="h-1 w-16 bg-gray-300"></div>
                        <div className="w-8 h-8 flex items-center justify-center bg-red-600 text-white rounded-full">
                            3
                        </div>
                        <div className="h-1 w-16 bg-red-600"></div>
                    </div>
                    <div className="h-1 w-16 bg-gray-300"></div>
                </div>
                <hr className="my-4 border-t-2 border-gray-200" />
                <br />
               
                <h1 className="font-semibold mb-3 text-xl text-gray-800">What's Your Project Budget?</h1>
                <p className="mb-5 text-gray-800">Please enter the budget you have allocated for this project.</p>
                
                <input
                    type="text"
                    placeholder="(e.g., P10,000)"
                    name="budget"
                    value={formData.budget || ''}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full text-xl p-3 focus:outline-none"
                    style={{ borderBottom: '1px solid #C7C8CC' }} // Adjust the color as needed
                />
                
                <div className="mt-8 flex justify-between">
                    <button
                        onClick={prevStep}
                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition duration-300"
                    >
                        Previous step
                    </button>
                    <button
                        onClick={nextStep}
                        className={`px-6 py-3 text-white rounded-lg shadow transition duration-300 ${
                            formData.budget ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-300 cursor-not-allowed'
                        }`}
                        disabled={!formData.budget}
                    >
                        Next step
                    </button>
                </div>
            </div>
        </>
    );
};

export default QuotationStep3;
