'use client';

import React from 'react';

const EnFooter: React.FC = () => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center pt-16 border-t border-gray-100">
          <div className="text-center">
            <h3 className="font-semibold text-gray-100 mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-200">
              <li><a href="/en/test" className="hover:text-teal-300">Personality Test</a></li>
              <li><a href="/en/types" className="hover:text-teal-300">Personality Types</a></li>
              <li><a href="/en/compatibility" className="hover:text-teal-300">Compatibility Test</a></li>
              <li><a href="/en/stats" className="hover:text-teal-300">Statistics</a></li>
              <li><a href="/en/blog" className="hover:text-teal-300">Blog</a></li>
            </ul>
          </div>

          <div className="text-center">
            <h3 className="font-semibold text-gray-100 mb-4">Help</h3>
            <ul className="space-y-2 text-sm text-gray-200">
              <li><a href="/en/help" className="hover:text-teal-300">FAQ</a></li>
              <li><a href="/en/about" className="hover:text-teal-300">About Us</a></li>
              <li><a href="/en/contact" className="hover:text-teal-300">Contact</a></li>
              <li><a href="/en/privacy" className="hover:text-teal-300">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-12 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between text-center md:text-left">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              &copy; 2025 Night Personality Test - All rights reserved
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnFooter;
