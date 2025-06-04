import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard, UserCog, PenTool, Languages, BookText, FileText,
  Calendar, BookOpen, BookMarked, BookCopy, BookUser, HelpCircle,
  Download, Sliders, Info, Tag, MessageCircle
} from 'lucide-react';
import { auth } from "../pages/firebase/firebase"; // adjust the path if needed


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
    <div className="flex h-screen w-screen bg-gradient-to-tr from-gray-100 to-white text-gray-900">
      {/* Sidebar */}
      <aside className={`w-64 shadow-lg bg-[#1e293b] text-white flex flex-col transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 fixed md:relative z-20 h-full`}>
        <div className="p-6 border-b border-gray-700 flex justify-center">
          <img src="https://minaramasjid.com/assets/image/logo/minara-masjid.png" alt="Admin Panel" className="object-contain w-40 h-12" />
        </div>
        <nav className="flex flex-col gap-1 mt-4 px-4 overflow-y-auto">
          {sidebarLinks.map(({ label, icon: Icon, path }, idx) => (
            <a
              key={idx}
              href={path}
              className="flex items-center gap-3 px-4 py-2 text-sm rounded-md hover:bg-blue-500 hover:text-white transition-all duration-200"
            >
              <Icon className="w-5 h-5" />
              {label}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between bg-white border-b px-6 py-4 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-700">Admin Panel</h3>
          <div className="relative">
            <button
              className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-all"
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            >
              <img src="#" alt="Profile" className="w-8 h-8 rounded-full bg-gray-400" />
              <span className="text-sm font-medium">Admin</span>
            </button>
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto bg-gray-50 rounded-tl-3xl shadow-inner">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
