import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className=" px-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
          {/* Navigation */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Navigation</h3>
            <ul>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Shop
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Connect with Us</h3>
            <ul className="flex flex-wrap gap-x-4">
              <li>
                <a href="#" className="hover:text-gray-300">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <p>Email: info@example.com</p>
            <p>Phone: +1234567890</p>
            <p>Address: 123 Main St, City, Country</p>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-8 text-center pt-5">
        <p className="italic">&copy; 2024 XSHOP Store. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
