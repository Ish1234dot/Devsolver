import React from 'react';
import { Code2 } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center gap-2">
            <Code2 className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">
              Programming Assistant
            </span>
          </div>
          
          <nav>
            <ul className="flex items-center gap-6 text-sm sm:text-base">
              <li>
                <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#search" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Try Now
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}