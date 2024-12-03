import React from "react";
import { useNavigate } from 'react-router-dom';


const ProjectHoursSupport = () => {

    const navigate = useNavigate();

    const handleButtonClick  = () => {
        const isAuthenticated = !!localStorage.getItem('user');
        if (!isAuthenticated) {
          navigate('/login');
        } else {
          navigate('/quotation');
        }
      };    

    return (
        <div>
            <div className="flex justify-center mb-24">
                <div className="grid lg:grid-cols-3 sm:grid-cols-3 xs:grid-cols-1" style={{ justifyContent: "center" }}>
                    <div className="grids">
                        <div className="grids-title">5,234</div>
                        <div className="grids-subtitle">Projects</div>
                        <div className="grids-content">
                            Of “high-performing” level are led by a certified project manager.
                        </div>
                    </div>

                    <div className="grids">
                        <div className="grids-title">3,400+</div>
                        <div className="grids-subtitle">Hours</div>
                        <div className="grids-content">
                            That meets quality standards required by our users.
                        </div>
                    </div>

                    <div className="grids">
                        <div className="grids-title">24/7</div>
                        <div className="grids-subtitle">Support</div>
                        <div className="grids-content">
                            Actively engage team members that finishes on time.
                        </div>
                    </div>
                </div>
            </div>

                        <div className="get-free-quotation">
            <p className="quotation-text font-bold">Get Free Quotation</p>
            <button
                className="free-quotation-btn font-semibold"
                onClick={handleButtonClick}
            >
                Free Quotation
            </button>
            </div>

            </div>
        
    )
}

export default ProjectHoursSupport;