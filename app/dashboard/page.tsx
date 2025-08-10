"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, X, Eye, Edit, Trash2, Download, ExternalLink, LogOut } from "lucide-react";
import { 
  getContacts, 
  getDemoForms, 
  getPartnershipApplications, 
  deleteDocument,
  signInAdmin,
  signOutAdmin,
  getCurrentUser,
  onAuthChange
} from "@/lib/firebase-db";

const SECTIONS = [
  { key: "contacts", label: "Contact" },
  { key: "demo_forms", label: "Demo" },
  { key: "partnership_applications", label: "Partnership Application" },
];

export default function DashboardPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [activeSection, setActiveSection] = useState(SECTIONS[0].key);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Check authentication state on component mount
  useEffect(() => {
    const unsubscribe = onAuthChange((user) => {
      if (user) {
        console.log('User authenticated:', user.email);
        setLoggedIn(true);
        setCurrentUser(user);
        setError("");
        // Fetch data for the current section
        fetchSectionData(activeSection);
      } else {
        console.log('User not authenticated');
        setLoggedIn(false);
        setCurrentUser(null);
        setData([]);
        setError("");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const result = await signInAdmin(loginData.email, loginData.password);
      if (result.success) {
        console.log('Login successful');
        setLoggedIn(true);
        setCurrentUser(result.user);
        setError("");
        // Data will be fetched automatically by the useEffect
      }
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOutAdmin();
      setLoggedIn(false);
      setCurrentUser(null);
      setData([]);
      setError("");
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const fetchSectionData = async (section: string) => {
    setLoading(true);
    setError("");
    setData([]);
    
    try {
      console.log(`Fetching data for section: ${section}`);
      let result: any[] = [];
      switch (section) {
        case "contacts":
          result = await getContacts();
          break;
        case "demo_forms":
          result = await getDemoForms();
          break;
        case "partnership_applications":
          result = await getPartnershipApplications();
          break;
        default:
          result = [];
      }
      console.log(`Data received for ${section}:`, result);
      setData(result || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch data';
      setError(`Error fetching ${section} data: ${errorMessage}`);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSectionClick = (section: string) => {
    setActiveSection(section);
    setSidebarOpen(false);
    fetchSectionData(section);
  };

  const handleDelete = async (itemId: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteDocument(activeSection, itemId);
        await fetchSectionData(activeSection);
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  const handleViewDetails = (item: any) => {
    setSelectedItem(item);
    setShowDetails(true);
  };

  const formatValue = (key: string, value: any) => {
    if (key === 'createdAt' || key === 'updatedAt') {
      return new Date(value).toLocaleString();
    }
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value, null, 2);
    }
    return String(value);
  };

  const renderFileLinks = (files: string[]) => {
    if (!files || files.length === 0) return 'No files uploaded';
    
    return (
      <div className="space-y-1">
        {files.map((file, index) => (
          <div key={index} className="flex items-center gap-2">
            <ExternalLink className="h-4 w-4" />
            <a 
              href={file} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              File {index + 1}
            </a>
          </div>
        ))}
      </div>
    );
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-blue-900">
        <form onSubmit={handleLogin} className="bg-white/10 p-8 rounded-xl shadow-lg w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-white">Admin Login</h2>
          <div className="mb-4">
            <Input
              placeholder="Email"
              type="email"
              value={loginData.email}
              onChange={e => setLoginData(prev => ({ ...prev, email: e.target.value }))}
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
          <Button 
            type="submit" 
            className="w-full bg-blue-600 text-white"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
          <div className="mt-4 text-center text-sm text-gray-300">
            <p>Use your Firebase admin account credentials</p>
            <p className="mt-2 text-xs">Make sure you have admin access to the project</p>
          </div>
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
      
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
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
        
        {/* User Info */}
        {currentUser && (
          <div className="bg-white/10 rounded-lg p-3 mb-4">
            <div className="text-sm text-gray-300 mb-1">Logged in as:</div>
            <div className="text-white font-medium text-sm truncate">{currentUser.email}</div>
          </div>
        )}
        
        {SECTIONS.map(section => (
          <Button
            key={section.key}
            onClick={() => handleSectionClick(section.key)}
            className={`w-full text-left ${activeSection === section.key ? "bg-blue-600 text-white" : "bg-white/10 text-white"}`}
          >
            {section.label}
          </Button>
        ))}
        
        {/* Logout Button */}
        {currentUser && (
          <Button
            onClick={handleLogout}
            className="w-full text-left bg-red-600 text-white hover:bg-red-700 mt-auto"
          >
            <LogOut className="h-4 w-4 mr-2" /> Log Out
          </Button>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-2 sm:p-4 md:p-8 overflow-x-auto w-full">
        <div className="flex items-center justify-between mb-6 mt-4 md:mt-0">
          <h2 className="text-2xl font-bold text-white">
            {SECTIONS.find(s => s.key === activeSection)?.label} Data
          </h2>
        </div>
        
        {loading && <div className="text-white">Loading...</div>}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-4">
            <div className="text-red-400 font-semibold mb-2">⚠️ Error</div>
            <div className="text-red-300">{error}</div>
            {error.includes('Firebase connection failed') && (
              <div className="mt-3 text-sm text-red-200">
                💡 <strong>Quick Fix:</strong> Check your <code className="bg-red-900/50 px-2 py-1 rounded">.env.local</code> file and ensure all Firebase variables are set correctly. See <code className="bg-red-900/50 px-2 py-1 rounded">ENVIRONMENT_SETUP.md</code> for detailed instructions.
              </div>
            )}
            {error.includes('permission') || error.includes('permissions') && (
              <div className="mt-3 text-sm text-red-200">
                🔐 <strong>Authentication Issue:</strong> You need to create an admin user in Firebase Authentication. See <code className="bg-red-900/50 px-2 py-1 rounded">ADMIN_USER_SETUP.md</code> for step-by-step instructions.
              </div>
            )}
            {error.includes('Authentication failed') && (
              <div className="mt-3 text-sm text-red-200">
                🔑 <strong>Login Failed:</strong> Check your email/password or create an admin user in Firebase Console → Authentication → Users. See <code className="bg-red-900/50 px-2 py-1 rounded">ADMIN_USER_SETUP.md</code> for help.
              </div>
            )}
          </div>
        )}
        
        {!loading && !error && (
          <div className="overflow-x-auto">
            {data.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-300 text-lg mb-4">
                  <p className="text-sm">No {SECTIONS.find(s => s.key === activeSection)?.label.toLowerCase()} data found in the database.</p>
                  <p className="text-sm text-gray-400 mt-2">This could mean:</p>
                  <ul className="text-sm text-gray-400 mt-1 text-left max-w-md mx-auto">
                    <li>• No forms have been submitted yet</li>
                    <li>• Forms are being saved to a different collection</li>
                    <li>• There's an issue with the form submission</li>
                  </ul>
                </div>
              </div>
            ) : (
              <table className="min-w-full bg-white/10 text-white rounded-xl text-xs sm:text-sm md:text-base">
                <thead>
                  <tr>
                    <th className="p-2 sm:p-3 text-left border-b border-white/20">Actions</th>
                    <th className="p-2 sm:p-3 text-left border-b border-white/20">Created</th>
                    {Object.keys(data[0])
                      .filter(key => !['id', 'status', 'createdAt', 'updatedAt', 'type'].includes(key))
                      .slice(0, 5) // Show only first 5 fields to avoid table overflow
                      .map(key => (
                        <th key={key} className="p-2 sm:p-3 text-left border-b border-white/20 whitespace-nowrap">
                          {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, i) => (
                    <tr key={i} className="border-b border-white/10 hover:bg-white/5">
                      <td className="p-2 sm:p-3">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewDetails(row)}
                            className="h-8 w-8 p-0"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(row.id)}
                            className="h-8 w-8 p-0 text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                      <td className="p-2 sm:p-3">
                        {formatValue('createdAt', row.createdAt)}
                      </td>
                      {Object.keys(row)
                        .filter(key => !['id', 'status', 'createdAt', 'updatedAt', 'type'].includes(key))
                        .slice(0, 5)
                        .map(key => (
                          <td key={key} className="p-2 sm:p-3 whitespace-nowrap">
                            {key === 'files' ? renderFileLinks(row[key]) : formatValue(key, row[key])}
                          </td>
                        ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </main>

      {/* Details Modal */}
      {showDetails && selectedItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Details</h3>
              <Button
                variant="outline"
                onClick={() => setShowDetails(false)}
                className="text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(selectedItem).map(([key, value]) => (
                <div key={key} className="bg-slate-700 p-3 rounded">
                  <div className="font-semibold text-blue-300 mb-1">
                    {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </div>
                  <div className="text-white">
                    {key === 'files' ? renderFileLinks(value as string[]) : formatValue(key, value)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 