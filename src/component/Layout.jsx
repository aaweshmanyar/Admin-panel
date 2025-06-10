import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard, UserCog, PenTool, Languages, BookText, FileText,
  Calendar, BookOpen, BookMarked, BookCopy, BookUser, HelpCircle,
  Download, Sliders, Info, Tag, MessageCircle, Menu, Bell, ChevronDown
} from 'lucide-react';
import "bootstrap-icons/font/bootstrap-icons.css";
import { auth } from "../pages/firebase/firebase";

const sidebarLinks = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { label: 'Admin', icon: UserCog, path: '/admin' },
  { label: 'Writers', icon: PenTool, path: '/createwriter' },
  { label: 'View Writers', icon: PenTool, path: '/writers' },
  { label: 'Translators', icon: PenTool, path: '/translators' },
  { label: 'Languages', icon: Languages, path: '/languages' },
  { label: 'Topics', icon: BookText, path: '/topic' },
  { label: 'Articles', icon: FileText, path: '/article' },
  { label: 'View Articles', icon: FileText, path: '/viewarticle' },
  { label: 'Events', icon: Calendar, path: '/event' },
  { label: 'Books', icon: BookOpen, path: '/book' },
  { label: 'Books List', icon: BookOpen, path: '/booklist' },
  { label: 'Unicode Books', icon: BookMarked, path: '/orderlist' },
  { label: 'Unicode Book Contents', icon: BookCopy, path: '/orderlist' },
  { label: 'Printed Books', icon: BookUser, path: '/orderlist' },
  { label: 'Create Questions', icon: HelpCircle, path: '/createquestion' },
  { label: 'Questions List', icon: HelpCircle, path: '/questionlist' },
  { label: 'Book Downloads', icon: Download, path: '/booklist' },
  { label: 'Home Books Slider', icon: Sliders, path: '/orderlist' },
  { label: 'About Content', icon: Info, path: '/orderlist' },
  { label: 'Tags', icon: Tag, path: '/orderlist' },
  { label: 'Feedback', icon: MessageCircle, path: '/feedback' },
];

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("authUser");
    if (user) {
      setIsAuthenticated(true);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    auth.signOut().then(() => {
      localStorage.removeItem("authUser");
      setIsAuthenticated(false);
      navigate("/login");
    }).catch((error) => {
      console.error("Logout error: ", error);
    });
  };

  if (!isAuthenticated) return null;

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 font-sans">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed z-50 inset-y-0 left-0 w-64 transform bg-white shadow-xl overflow-y-auto transition-transform duration-300 ease-in-out 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 md:static md:inset-0`}>
        <div className="p-6 border-b border-gray-200 flex items-center justify-center">
          <img src="https://minaramasjid.com/assets/image/logo/minara-masjid.png" alt="Logo" className="object-contain h-12" />
        </div>

        <nav className="mt-4 px-2 space-y-1">
          {sidebarLinks.map(({ label, icon: Icon, path }, idx) => {
            const isActive = location.pathname === path;
            return (
              <a
                key={idx}
                href={path}
                className={`flex items-center py-3 px-6 rounded-lg text-sm font-medium transition-all
                  ${isActive
                    ? "bg-[#e8eac430] border-r-4 border-[#4e5909] text-[#4e5909] font-semibold"
                    : "text-gray-700 hover:bg-gray-50 hover:text-[#3a4207]"}`}
              >
                <Icon className="w-5 h-5 mr-3 text-[#4e5909]"  />
                <span className="text-[15px]">{label}</span>
              </a>
            );
          })}
        </nav>

        <div className="p-6 mt-auto border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 py-2 px-4 rounded-lg bg-[#4e5909] hover:bg-[#3b4606] text-white text-sm font-semibold transition"
          >
            <i className="bi bi-box-arrow-right"></i>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center flex-shrink-0 z-20">
          <div className="flex items-center">
            <button
              className="md:hidden mr-4 text-gray-600 hover:text-[#4e5909]"
              onClick={() => setSidebarOpen(prev => !prev)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl md:text-2xl font-semibold text-gray-800">Dashboard</h1>
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative text-gray-500 hover:text-[#4e5909]">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">3</span>
            </button>

            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 focus:outline-none"
              >
                <img
                  src="https://placehold.co/36x36/E2E8F0/4A5568?text=U"
                  alt="User Avatar"
                  className="w-9 h-9 rounded-full border-2 border-gray-200 hover:border-[#4e5909] transition"
                />
                <span className="hidden md:inline text-gray-700 font-medium">Umar Mukhtar</span>
                <ChevronDown className="w-4 h-4 text-gray-500 hidden md:inline" />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-30 border border-gray-100">
                  <button className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#4e5909]">
                    Profile
                  </button>
                  <button className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#4e5909]">
                    Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#4e5909] border-t border-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
