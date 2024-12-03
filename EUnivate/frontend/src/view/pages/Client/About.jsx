import React from 'react';
import Navbar from '../../components/Client/LandingPage/Navbar.jsx';
import About_Layout from '../../components/Client/Dropdowns/About_Layout.jsx';
import Mission from './Mission.jsx';
import Advantage from './Advantage.jsx';
import CTA from '../../components/Client/LastSection/CTA.jsx';

import styles from '../../../style';  

const About = () => {
  return (
    <div className="bg-white w-full overflow-hidden">
      {/* Navbar with consistent spacing */}
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />  
        </div>
      </div>
      
{/* About Us Content */}
<div className={`${styles.paddingX} ${styles.flexCenter} py-16 mx-auto`}>
  <div className={`${styles.boxWidth}`}>
    <About_Layout />
  </div>
</div>

      
        {/* Mission Content */}
        <div className={`${styles.paddingX} ${styles.flexCenter} py-16 mx-auto`}>
        <div className={`${styles.boxWidth}`}>
          <Mission />
        </div>
      </div>

      {/* Advantage Content */}
      <div className={`${styles.paddingX} ${styles.flexCenter} py-16 mx-auto`}>
        <div className={`${styles.boxWidth}`}>
          <Advantage />
        </div>
      </div>


      {/* CTA Content */}
      <div className={`${styles.paddingX} ${styles.flexCenter} py-16 mx-auto`}>
        <div className={`${styles.boxWidth}`}>
          <CTA />
        </div>
      </div>

    </div>
  );
};

export default About;
