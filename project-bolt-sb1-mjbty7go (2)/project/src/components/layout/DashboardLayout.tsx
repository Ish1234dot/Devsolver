import React, { useState } from 'react';
import { Menu as MenuIcon, X, Home, History, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const menuItems = [
    { icon: <Home className="w-5 h-5" />, label: 'Back to Home', onClick: () => navigate('/'), primary: true },
    { icon: <History className="w-5 h-5" />, label: 'History', onClick: () => navigate('/history') },
    { icon: <LogOut className="w-5 h-5" />, label: 'Sign Out', onClick: handleSignOut },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <div className="font-bold text-xl text-gray-900">DevSolver</div>
        <div className="text-sm text-gray-600 mt-1">{user?.email}</div>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                onClick={item.onClick}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors
                  ${item.primary 
                    ? 'text-blue-600 hover:bg-blue-50 font-medium' 
                    : 'text-gray-700 hover:bg-gray-100'}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="lg:hidden bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 h-16">
          <span className="font-bold text-xl">DevSolver</span>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 text-gray-600 hover:text-gray-900"
          >
            {isSidebarOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-transform transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="absolute inset-0 bg-black/30" onClick={() => setIsSidebarOpen(false)} />
        <div className="absolute inset-y-0 left-0 w-64 bg-white shadow-lg">
          <SidebarContent />
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200">
        <SidebarContent />
      </div>

      {/* Main Content */}
      <main className="lg:ml-64">
        <div className="container mx-auto px-4 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}