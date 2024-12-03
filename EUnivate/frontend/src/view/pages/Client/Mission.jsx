import React from 'react';
import { road } from '../../../constants/assets';

const Mission = () => {
  return (
    <div className="flex flex-col md:flex-row items-center">
      <div className="w-full md:w-1/2">
        <img 
          src={road} 
          alt="Road" 
          className="w-full md:w-96 h-auto ml-0 md:ml-10 hidden md:block" 
        />
      </div>
      <div className="w-full md:w-1/2 p-6 text-left md:mr-36">
        <h2 className="text-2xl font-bold mb-4 text-red-700">Our Mission</h2>
        <ul className="list-disc space-y-4 ml-6">
          <li>
            To bridge the gap between cutting-edge academic research and practical industry needs.
          </li>
          <li>
            To foster innovation by connecting businesses with the brightest minds from universities.
          </li>
          <li>
            To provide students and professors with real-world project experience and industry exposure.
          </li>
          <li>
            To create a collaborative ecosystem that drives progress and solves real-world problems.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Mission;
