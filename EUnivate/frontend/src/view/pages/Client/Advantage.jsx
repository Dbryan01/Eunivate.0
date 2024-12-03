import React from 'react';
import { Pie1, Pie2, Pie3, Pie4 } from '../../../constants/assets';

const Advantage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-8">The EUnivate Advantage</h2>
      <p className="text-center text-gray-600 mb-12">
        Install our top-rated dropshipping app to your e-commerce site  
        <span className="relative z-10 ml-1">and</span>
        <br />
        get access to US Suppliers, AliExpress vendors, and the best.
      </p>

      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div className="bg-red-50 rounded-lg border border-gray-300 p-6 w-full max-w-md h-60">
            <div className="mb-4 flex items-center">
              <div className="relative w-10 h-10">
                <img 
                  src={Pie1} 
                  alt="Background" 
                  className="w-full h-full object-cover rounded-full" 
                />
                <div className="absolute inset-0 flex items-center justify-center text-red-700 font-bold text-3xl">
                  01
                </div>
              </div>
              <h3 className="ml-4 text-xl font-bold">Extensive Network</h3>
            </div>
            <p className="text-black">
              Connect with a vast pool of talented students and professors across diverse academic disciplines.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-lg border border-gray-300 p-6 w-full max-w-md h-60">
            <div className="mb-4 flex items-center">
              <div className="relative w-10 h-10">
                <img 
                  src={Pie2} 
                  alt="Background" 
                  className="w-full h-full object-cover rounded-full" 
                />
                <div className="absolute inset-0 flex items-center justify-center text-red-700 font-bold text-3xl">
                  02
                </div>
              </div>
              <h3 className="ml-4 text-xl font-bold">Streamlined Collaboration</h3>
            </div>
            <p className="text-black">
              Utilize our built-in project management tools for efficient communication and task coordination.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-lg border border-gray-300 p-6 w-full max-w-md h-60">
            <div className="mb-4 flex items-center">
              <div className="relative w-10 h-10">
                <img 
                  src={Pie3} 
                  alt="Background" 
                  className="w-full h-full object-cover rounded-full" 
                />
                <div className="absolute inset-0 flex items-center justify-center text-red-700 font-bold text-3xl">
                  03
                </div>
              </div>
              <h3 className="ml-4 text-xl font-bold">Focus on Innovation</h3>
            </div>
            <p className="text-black">
              Gain access to fresh perspectives and cutting-edge ideas from the next generation of thinkers.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-red-50 rounded-lg border border-gray-300 p-6 w-full max-w-md h-60">
            <div className="mb-4 flex items-center">
              <div className="relative w-10 h-10">
                <img 
                  src={Pie4} 
                  alt="Background" 
                  className="w-full h-full object-cover rounded-full" 
                />
                <div className="absolute inset-0 flex items-center justify-center text-red-700 font-bold text-3xl">
                  04
                </div>
              </div>
              <h3 className="ml-4 text-xl font-bold">Mutual Benefit</h3>
            </div>
            <p className="text-black">
              Businesses gain innovative solutions, while students and professors acquire real-world experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advantage;
