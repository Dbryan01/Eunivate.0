import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode, faPaintBrush, faBullhorn, faCog } from '@fortawesome/free-solid-svg-icons';

const QuotationStep2 = ({ formData, setFormData, nextStep, prevStep }) => {
    const handleServiceSelect = (service) => {
        setFormData({ ...formData, service });
    };

    const handleServiceDescriptionChange = (e) => {
        setFormData({ ...formData, serviceDescription: e.target.value });
    };

    return (
        <>
            {/* Header */}
            <h2 className="text-3xl font-bold text-gray-800 text-center">Get a project quote</h2>
            <p className="text-gray-500 mt-2 text-center">
                Please select which service you are interested in.
            </p>
            
            {/* Service Selection Container */}
            <div className="w-full max-w-lg mx-auto mt-8">
                <div className="flex items-center justify-center space-x-2 mb-8">
                    <div className="flex items-center space-x-2">
                        <div className="h-1 w-16 bg-gray-300"></div>
                        <div className="w-8 h-8 flex items-center justify-center bg-red-600 text-white rounded-full">
                            2
                        </div>
                        <div className="h-1 w-16 bg-red-600"></div>
                    </div>
                    <div className="h-1 w-16 bg-gray-300"></div>
                    <div className="h-1 w-16 bg-gray-300"></div>
                </div>
                <hr className="my-4 border-t-2 border-gray-200" />
                <br />

                <h1 className="font-semibold mb-3 text-xl text-gray-800">Our services</h1>
                <p className="mb-5 text-gray-800">Please select which service you are interested in.</p>

                <div className="grid grid-cols-4 gap-3 services">
                    <div
                        className={`pt-4 pb-4 pe-1 ps-1 border-2 rounded-2xl cursor-pointer flex flex-col items-center justify-center ${formData.service === 'Development' ? 'border-red-500' : 'border-gray-200'}`}
                        onClick={() => handleServiceSelect('Development')}
                    >
                        <FontAwesomeIcon icon={faLaptopCode} size="2x" className="text-yellow-500" />
                        <p className="mt-2 font-semibold text-sm text-gray-700">Development</p>
                    </div>

                    <div
                        className={`pt-4 pb-4 pe-1 ps-1 border-2 rounded-2xl cursor-pointer flex flex-col items-center justify-center ${formData.service === 'Web Design' ? 'border-red-500' : 'border-gray-200'}`}
                        onClick={() => handleServiceSelect('Web Design')}
                    >
                        <FontAwesomeIcon icon={faPaintBrush} size="2x" className="text-yellow-500" />
                        <p className="mt-2 font-semibold text-sm text-gray-700">Web Design</p>
                    </div>

                    <div
                        className={`pt-4 pb-4 pe-1 ps-1 border-2 rounded-2xl cursor-pointer flex flex-col items-center justify-center ${formData.service === 'Marketing' ? 'border-red-500' : 'border-gray-200'}`}
                        onClick={() => handleServiceSelect('Marketing')}
                    >
                        <FontAwesomeIcon icon={faBullhorn} size="2x" className="text-yellow-500" />
                        <p className="mt-2 font-semibold text-sm text-gray-700">Marketing</p>
                    </div>
                    
                    <div
                        className={`pt-4 pb-4 pe-1 ps-1 border-2 rounded-2xl cursor-pointer flex flex-col items-center justify-center ${formData.service === 'Other' ? 'border-red-500' : 'border-gray-200'}`}
                        onClick={() => handleServiceSelect('Other')}
                    >
                        <FontAwesomeIcon icon={faCog} size="2x" className="text-yellow-500" />
                        <p className="mt-2 font-semibold text-sm text-gray-700">Other</p>
                    </div>
                </div>

                <p className="mt-2 mb-2 text-sm text-gray-700">Short description:</p>
                <textarea
                    type="text"
                    placeholder="Please provide a short description of the service you require."
                    name="serviceDescription"
                    value={formData.serviceDescription || ''}
                    onChange={handleServiceDescriptionChange}
                    className="w-full h-20 text-sm p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                            formData.service ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-300 cursor-not-allowed'
                        }`}
                        disabled={!formData.service}
                    >
                        Next step
                    </button>
                </div>
            </div>
        </>
    );
};

export default QuotationStep2;
