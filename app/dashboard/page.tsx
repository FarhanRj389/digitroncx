"use client"

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, X } from "lucide-react";

const ADMIN_USERNAME = "admin@digitroncx.com";
const ADMIN_PASSWORD = "digitroncx123!";

const SECTIONS = [
  { key: "contacts", label: "Contact" },
  { key: "demo_forms", label: "Demo" },
  { key: "partnership_applications", label: "Partnership Application" },
];

export default function DashboardPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [activeSection, setActiveSection] = useState(SECTIONS[0].key);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      loginData.username === ADMIN_USERNAME &&
      loginData.password === ADMIN_PASSWORD
    ) {
      setLoggedIn(true);
      setError("");
      fetchSectionData(activeSection);
    } else {
      setError("Invalid username or password");
    }
  };

  const fetchSectionData = async (section: string) => {
    setLoading(true);
    setError("");
    setData([]);
    const { data, error } = await supabase.from(section).select("*");
    if (error) {
      setError(error.message);
      setData([]);
    } else {
      setData(data || []);
    }
    setLoading(false);
  };

  const handleSectionClick = (section: string) => {
    setActiveSection(section);
    setSidebarOpen(false); // close sidebar on mobile after click
    fetchSectionData(section);
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-blue-900">
        <form onSubmit={handleLogin} className="bg-white/10 p-8 rounded-xl shadow-lg w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-white">Admin Login</h2>
          <div className="mb-4">
            <Input
              placeholder="Username"
              value={loginData.username}
              onChange={e => setLoginData(prev => ({ ...prev, username: e.target.value }))}
              className="mb-2"
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={e => setLoginData(prev => ({ ...prev, password: e.target.value }))}
              required
            />
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <Button type="submit" className="w-full bg-blue-600 text-white">Login</Button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-900 to-blue-900 relative">
      {/* Hamburger menu for mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-40 bg-slate-800/90 p-2 rounded-lg text-white shadow-lg"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open sidebar"
      >
        <Menu className="h-6 w-6" />
      </button>
      {/* Sidebar */}
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        className={`
          fixed z-40 top-0 left-0 h-full w-64 bg-slate-800/95 p-6 flex flex-col gap-4 border-r border-white/10
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:static md:translate-x-0 md:flex md:w-64 md:h-auto md:z-auto
        `}
        style={{ minHeight: "100vh" }}
      >
        {/* Close button for mobile */}
        <div className="flex items-center justify-between mb-4 md:hidden">
          <h3 className="text-xl font-bold text-white">Dashboard</h3>
          <button
            className="text-white p-2 rounded hover:bg-slate-700"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        {/* Title for desktop */}
        <h3 className="text-xl font-bold text-white mb-4 hidden md:block">Dashboard</h3>
        {SECTIONS.map(section => (
          <Button
            key={section.key}
            onClick={() => handleSectionClick(section.key)}
            className={`w-full text-left ${activeSection === section.key ? "bg-blue-600 text-white" : "bg-white/10 text-white"}`}
          >
            {section.label}
          </Button>
        ))}
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-2 sm:p-4 md:p-8 overflow-x-auto md:ml-64 w-full">
        <h2 className="text-2xl font-bold text-white mb-6 mt-4 md:mt-0">{SECTIONS.find(s => s.key === activeSection)?.label} Data</h2>
        {loading && <div className="text-white">Loading...</div>}
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {!loading && !error && (
          <div className="overflow-x-auto">
            {data.length === 0 ? (
              <div className="text-gray-300">No data found.</div>
            ) : (
              <table className="min-w-full bg-white/10 text-white rounded-xl text-xs sm:text-sm md:text-base">
                <thead>
                  <tr>
                    {Object.keys(data[0]).map(key => (
                      <th key={key} className="p-2 sm:p-3 text-left border-b border-white/20 whitespace-nowrap">{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, i) => (
                    <tr key={i} className="border-b border-white/10 hover:bg-white/5">
                      {Object.keys(data[0]).map(key => (
                        <td key={key} className="p-2 sm:p-3 whitespace-nowrap">{String(row[key])}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </main>
    </div>
  );
} 