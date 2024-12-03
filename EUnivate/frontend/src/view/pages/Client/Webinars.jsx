import React from 'react'
import Webinar from '../../components/Client/Dropdowns/Webinar_LAyout.jsx';
import Navbar from '../../components/Client/LandingPage/Navbar.jsx';

import styles from '../../../style';  

const Webinars = () => {
  return (
    <div className="bg-white w-full overflow-hidden">

      {/* Navbar with consistent spacing */}
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />  
        </div>
      </div>

      {/* Webinar with consistent spacing */}
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Webinar />  
        </div>
      </div>
        {/* Webinar with consistent spacing */}
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Webinar />  
        </div>
      </div>


      </div>
  )
}

export default Webinars