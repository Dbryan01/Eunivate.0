import React from 'react';

function Footer() {
  return (
    <section className="footer py-10 px-1 lg:px-20 relative"> {/* Added bg-white */}
      <div className="absolute left-0 right-0  -mt-4"></div>
      <footer className="footer mt-4">
        <div className="container mx-auto">
          <div className="row flex flex-wrap justify-center lg:justify-between">

            {/* Social Section */}
            <div className="w-full lg:w-auto order-1 lg:order-none mb-4 lg:mb-0">
              <div className="block">
                <h3 className="footer-heading ml-2 text-red-800">EUnivate</h3>
                <h4 className="social-heading ml-2 text-gray-600">Social</h4>
                <div className="flex space-x-4 mt-2 ml-2">
                  <a href="#" className="facebook text-gray-500"><i className="fab fa-facebook-f"></i></a>
                  <a href="#" className="twitter text-gray-500"><i className="fab fa-twitter"></i></a>
                  <a href="#" className="dribbble text-gray-500"><i className="fab fa-dribbble"></i></a>
                  <a href="#" className="github text-gray-500"><i className="fab fa-github"></i></a>
                  <a href="#" className="youtube text-gray-500"><i className="fab fa-youtube"></i></a>
                </div>
              </div>
            </div>

            {/* Quick Links Section */}
            <div className="w-full lg:w-auto order-2 lg:order-none mb-4 lg:mb-0">
              <h3 className="footer-heading text-red-800">Quick Links</h3>
              <ul className="footer-list text-gray-600 space-y-2 mt-2">
                <li><a href="https://mseuf.edu.ph/">MSEUF Website</a></li>
                <li><a href="#">EU Store</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Products</a></li>
              </ul>
            </div>

            {/* Resources Section */}
            <div className="w-full lg:w-auto order-3 lg:order-none mb-4 lg:mb-0">
              <h3 className="footer-heading text-red-800">Resources</h3>
              <ul className="footer-list text-gray-600 space-y-2 mt-2">
                <li><a href="#">Webinars</a></li>
                <li><a href="#">Library</a></li>
                <li><a href="#">Affiliate Program</a></li>
              </ul>
            </div>

            {/* Contact Us Section */}
            <div className="w-full lg:w-auto order-4 lg:order-none mb-4 lg:mb-0">
              <h3 className="footer-heading text-red-800">Contact Us</h3>
              <ul className="footer-list text-gray-600 space-y-2 mt-2">
                <li><a href="https://mseuf.edu.ph/">MSEUF:</a></li>
                <li><a href="#">RPIUC:</a></li>
              </ul>
            </div>

            {/* Visit Us Section */}
            <div className="w-full lg:w-auto order-5 lg:order-none">
              <h3 className="footer-heading text-red-800">Visit Us</h3>
              <div className="map-container mt-2">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3872.15355284525!2d121.61782927586715!3d13.949461192684938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd4cae8de55193%3A0xf7df7b3e9e5679d3!2sManuel%20S.%20Enverga%20University%20Foundation!5e0!3m2!1sen!2sph!4v1723717749129!5m2!1sen!2sph"
                  width="300"
                  height="200"
                  className="w-full lg:w-auto"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Google Map"
                ></iframe>
              </div>
            </div>
          </div>

          <div className="text-center mt-4 text-gray-400">
            <p>All rights reserved. Copyright © 2024 EUnivate</p>
          </div>
        </div>
      </footer>



    </section>
  );
}

export default Footer;
