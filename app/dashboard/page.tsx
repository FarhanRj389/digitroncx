"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, X, Eye, Edit, Trash2, Download, ExternalLink } from "lucide-react";
import { getContacts, getDemoForms, getPartnershipApplications, updateDocumentStatus, deleteDocument } from "@/lib/firebase-db";

const ADMIN_USERNAME = "admin@digitroncx.com";
const ADMIN_PASSWORD = "digitroncx123!";

const SECTIONS = [
  { key: "contacts", label: "Contact" },
  { key: "demo_forms", label: "Demo" },
  { key: "partnership_applications", label: "Partnership Application" },
];

const STATUS_OPTIONS = {
  contacts: ['new', 'in_progress', 'completed', 'archived'],
  demo_forms: ['pending', 'in_review', 'approved', 'rejected', 'completed'],
  partnership_applications: ['pending_review', 'under_review', 'approved', 'rejected', 'partnership_formed']
};

export default function DashboardPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [activeSection, setActiveSection] = useState(SECTIONS[0].key);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

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
    
    try {
      let result;
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
      setData(result || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch data');
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

  const handleStatusUpdate = async (itemId: string, newStatus: string) => {
    setUpdatingStatus(itemId);
    try {
      await updateDocumentStatus(activeSection, itemId, newStatus);
      // Refresh data
      await fetchSectionData(activeSection);
      setUpdatingStatus(null);
    } catch (error) {
      console.error('Error updating status:', error);
      setUpdatingStatus(null);
    }
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
        <div className="flex items-center justify-between mb-6 mt-4 md:mt-0">
          <h2 className="text-2xl font-bold text-white">
            {SECTIONS.find(s => s.key === activeSection)?.label} Data
          </h2>
          <Button 
            onClick={() => fetchSectionData(activeSection)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Refresh
          </Button>
        </div>
        
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
                    <th className="p-2 sm:p-3 text-left border-b border-white/20">Actions</th>
                    <th className="p-2 sm:p-3 text-left border-b border-white/20">Status</th>
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
                          <select
                            value={row.status || 'pending'}
                            onChange={(e) => handleStatusUpdate(row.id, e.target.value)}
                            className="bg-slate-700 text-white text-xs px-2 py-1 rounded border border-white/20"
                            disabled={updatingStatus === row.id}
                          >
                            {STATUS_OPTIONS[activeSection as keyof typeof STATUS_OPTIONS]?.map(status => (
                              <option key={status} value={status}>
                                {status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                              </option>
                            ))}
                          </select>
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
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          row.status === 'completed' || row.status === 'approved' ? 'bg-green-600' :
                          row.status === 'rejected' ? 'bg-red-600' :
                          row.status === 'in_progress' || row.status === 'in_review' ? 'bg-yellow-600' :
                          'bg-gray-600'
                        }`}>
                          {row.status || 'pending'}
                        </span>
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