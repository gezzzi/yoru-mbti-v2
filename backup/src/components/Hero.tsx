import React from 'react';

interface HeroProps {
  onStartTest: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartTest }) => {
  return (
    <div className="relative bg-gradient-to-br from-teal-400 via-teal-500 to-blue-600 min-h-screen pt-16 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-4 h-4 bg-white/20 rounded-full"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-white/15 rounded-full"></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-white/25 rounded-full"></div>
        <div className="absolute bottom-60 right-40 w-5 h-5 bg-white/20 rounded-full"></div>
      </div>
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Main content */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            「やっと自分のことを理解してもらえました」
          </h1>
          
          <p className="text-xl text-white/90 mb-4 leading-relaxed max-w-3xl mx-auto">
            たった10分で、自分がどんな人間か、自らの願望や行動の理由について
          </p>
          <p className="text-xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto">
            で、不思議なくらい正確な説明を手に入れられます。
          </p>
          
          <button
            onClick={onStartTest}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl text-lg"
          >
            テストを受ける
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Illustration area - simplified geometric shapes */}
        <div className="relative h-64 mb-16">
          {/* Mountains background */}
          <div className="absolute bottom-0 left-0 right-0 h-32">
            <svg viewBox="0 0 800 200" className="w-full h-full">
              <polygon points="0,200 150,50 300,120 450,30 600,90 800,60 800,200" fill="rgba(255,255,255,0.1)" />
              <polygon points="0,200 100,80 250,140 400,60 550,110 700,80 800,100 800,200" fill="rgba(255,255,255,0.05)" />
            </svg>
          </div>
          
          {/* Trees */}
          <div className="absolute bottom-16 left-1/4 w-4 h-8 bg-green-400/60 transform rotate-12"></div>
          <div className="absolute bottom-16 left-1/3 w-4 h-10 bg-green-500/60"></div>
          <div className="absolute bottom-16 right-1/3 w-4 h-8 bg-green-400/60 transform -rotate-12"></div>
          <div className="absolute bottom-16 right-1/4 w-4 h-9 bg-green-500/60"></div>
          
          {/* Character representations - simple geometric figures */}
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-8">
              {/* Character 1 */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-orange-300 rounded-full mb-1"></div>
                <div className="w-6 h-12 bg-green-400 rounded-sm"></div>
                <div className="w-2 h-4 bg-brown-400 mt-1"></div>
              </div>
              
              {/* Character 2 */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-pink-300 rounded-full mb-1"></div>
                <div className="w-6 h-12 bg-purple-400 rounded-sm"></div>
                <div className="w-2 h-4 bg-brown-400 mt-1"></div>
              </div>
              
              {/* Character 3 */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-yellow-300 rounded-full mb-1"></div>
                <div className="w-6 h-12 bg-blue-400 rounded-sm"></div>
                <div className="w-2 h-4 bg-brown-400 mt-1"></div>
              </div>
            </div>
          </div>
          
          {/* Scattered objects */}
          <div className="absolute bottom-12 left-1/4 w-3 h-3 bg-gray-400/60 rounded-sm transform rotate-45"></div>
          <div className="absolute bottom-14 right-1/4 w-4 h-2 bg-yellow-400/60 rounded-sm"></div>
          <div className="absolute bottom-10 left-2/3 w-2 h-2 bg-red-400/60 rounded-full"></div>
        </div>
      </div>
      
      {/* Footer section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Products</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-teal-600">Premium Profile</a></li>
                <li><a href="#" className="hover:text-teal-600">Team Assessments</a></li>
                <li><a href="#" className="hover:text-teal-600">Reports for Professionals</a></li>
                <li><a href="#" className="hover:text-teal-600">Testimonials</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-teal-600">Personality Test</a></li>
                <li><a href="#" className="hover:text-teal-600">Personality Types</a></li>
                <li><a href="#" className="hover:text-teal-600">Articles</a></li>
                <li><a href="#" className="hover:text-teal-600">Our Framework</a></li>
                <li><a href="#" className="hover:text-teal-600">Country Profiles</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Help</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-teal-600">Contact Us</a></li>
                <li><a href="#" className="hover:text-teal-600">FAQ</a></li>
                <li><a href="#" className="hover:text-teal-600">Your Orders</a></li>
                <li><a href="#" className="hover:text-teal-600">Change Language</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Our Other Creations</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-teal-600">NPQE®</a></li>
                <li><a href="#" className="hover:text-teal-600">MindTrackers®</a></li>
                <li><a href="#" className="hover:text-teal-600">Leadership by 16Personalities</a></li>
                <li><a href="#" className="hover:text-teal-600">INFJ by 16Personalities</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-gray-500 mb-4 md:mb-0">
                © 2011-2025 NERIS Analytics Limited
              </div>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <span className="sr-only">Discord</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <span className="sr-only">Facebook</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.928-.875 2.026-1.365 3.323-1.365s2.448.49 3.323 1.365c.875.875 1.365 2.026 1.365 3.323s-.49 2.448-1.365 3.323c-.875.875-2.026 1.365-3.323 1.365zm7.718-9.469c-.316 0-.632-.158-.79-.474-.158-.316-.105-.711.132-.948.237-.237.632-.29.948-.132.316.158.474.474.474.79 0 .553-.448 1.001-1.001 1.001-.184 0-.369-.079-.553-.237z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;