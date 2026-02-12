import React, { useState, useEffect } from 'react';
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Target,
  Clock,
  Award,
  BarChart3,
  Plus,
  Trash2,
  Save,
  X,
  FileText,
  Download,
  Gavel,
  Mail,
  Bell,
  Users,
  ShoppingCart,
  Layout,
  Package,
  Search,
  Grid,
  LogIn,
  Heart,
  CreditCard,
  Star,
  Smartphone,
  Monitor,
  Tablet,
  ExternalLink,
  LogOut,           // ← added for logout button
} from 'lucide-react';

export default function KiwiTradingPostTestTracker() {
  // ── Password protection ───────────────────────────────────────────────
  const PASSWORD = 'testkiwi2026';           // ← Change this to your desired password
  const STORAGE_KEY = 'kiwi-test-auth';

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    const auth = localStorage.getItem(STORAGE_KEY);
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === PASSWORD) {
      localStorage.setItem(STORAGE_KEY, 'true');
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Incorrect password');
      setPasswordInput('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setIsAuthenticated(false);
    setPasswordInput('');
    setLoginError('');
  };
  // ──────────────────────────────────────────────────────────────────────

  // ── Your original state ───────────────────────────────────────────────
  const [tests, setTests] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [moduleFilter, setModuleFilter] = useState('all');
  const [deviceFilter, setDeviceFilter] = useState('all');
  const [expandedTest, setExpandedTest] = useState(null);

  const [newTest, setNewTest] = useState({
    module: 'listings',
    feature: '',
    userRole: 'seller',
    scenario: '',
    device: 'desktop',
    browser: 'chrome',
    steps: '',
    expectedResult: '',
    actualResult: '',
    status: 'passed',
    priority: 'medium',
    screenshot: '',
    notes: '',
    emailNotification: false,
    pushNotification: false,
    dashboardUpdate: false,
    responsiveIssue: false,
  });

  // ── Your modules, roles, devices, browsers, testScenarios ─────────────
  const modules = [
    { id: 'listings', name: 'Listing Management', icon: List, color: 'blue', desc: 'Create, edit, view listings (auctions, buy now, classifieds)' },
    { id: 'auction', name: 'Auction System', icon: Gavel, color: 'purple', desc: 'Bidding, reserve prices, auto-extend, winner selection' },
    { id: 'buynow', name: 'Buy Now / Shopping Cart', icon: ShoppingCart, color: 'green', desc: 'Instant purchase, cart management, checkout' },
    // ... (all other modules remain unchanged)
    { id: 'security', name: 'Security & Privacy', icon: Key, color: 'red', desc: 'Data protection, secure transactions, privacy settings' },
  ];

  const userRoles = [
    { id: 'seller', name: 'Seller / Business User', color: 'blue' },
    { id: 'buyer', name: 'Buyer / Personal User', color: 'green' },
    { id: 'admin', name: 'Administrator', color: 'red' },
    { id: 'guest', name: 'Guest / Non-logged User', color: 'gray' },
  ];

  const devices = [
    { id: 'desktop', name: 'Desktop (1920x1080+)', icon: Monitor },
    { id: 'laptop', name: 'Laptop (1366x768)', icon: Monitor },
    { id: 'tablet', name: 'Tablet (768x1024)', icon: Tablet },
    { id: 'mobile', name: 'Mobile (375x667)', icon: Smartphone },
    { id: 'mobile-large', name: 'Mobile Large (414x896)', icon: Smartphone },
  ];

  const browsers = ['Chrome', 'Firefox', 'Safari', 'Edge', 'Mobile Safari', 'Chrome Mobile'];

  const testScenarios = {
    listings: [
      'Create new auction listing with images',
      // ... (all your scenarios remain unchanged)
    ],
    // ... (rest of testScenarios unchanged)
  };

  // ── Your original localStorage logic ──────────────────────────────────
  useEffect(() => {
    const saved = localStorage.getItem('kiwiTradingPostTests');
    if (saved) {
      setTests(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('kiwiTradingPostTests', JSON.stringify(tests));
  }, [tests]);

  // ── Your functions: addTest, deleteTest, updateTest, stats, etc. ──────
  const addTest = () => {
    if (!newTest.feature || !newTest.scenario) return;

    const test = {
      id: Date.now(),
      ...newTest,
      timestamp: new Date().toISOString(),
      duration: Math.floor(Math.random() * 600) + 30,
    };

    setTests([test, ...tests]);
    setNewTest({
      module: 'listings',
      feature: '',
      userRole: 'seller',
      scenario: '',
      device: 'desktop',
      browser: 'chrome',
      steps: '',
      expectedResult: '',
      actualResult: '',
      status: 'passed',
      priority: 'medium',
      screenshot: '',
      notes: '',
      emailNotification: false,
      pushNotification: false,
      dashboardUpdate: false,
      responsiveIssue: false,
    });
    setShowForm(false);
  };

  const deleteTest = (id) => {
    setTests(tests.filter((t) => t.id !== id));
  };

  const updateTest = (id, updates) => {
    setTests(tests.map((t) => (t.id === id ? { ...t, ...updates } : t)));
    setEditingId(null);
  };

    // Analytics
  const stats = {
    total: tests.length,
    passed: tests.filter((t) => t.status === 'passed').length,
    failed: tests.filter((t) => t.status === 'failed').length,
    blocked: tests.filter((t) => t.status === 'blocked').length,
    passRate: tests.length ? ((tests.filter((t) => t.status === 'passed').length / tests.length) * 100).toFixed(1) : 0,
    responsiveIssues: tests.filter((t) => t.responsiveIssue).length,
  };

  // Device-specific stats
  const deviceStats = devices
    .map((device) => ({
      ...device,
      total: tests.filter((t) => t.device === device.id).length,
      passed: tests.filter((t) => t.device === device.id && t.status === 'passed').length,
      failed: tests.filter((t) => t.device === device.id && t.status === 'failed').length,
      issues: tests.filter((t) => t.device === device.id && t.responsiveIssue).length,
    }))
    .filter((d) => d.total > 0);

    // Module-specific stats
  const moduleStats = modules
    .map((module) => ({
      ...module,
      total: tests.filter((t) => t.module === module.id).length,
      passed: tests.filter((t) => t.module === module.id && t.status === 'passed').length,
      failed: tests.filter((t) => t.module === module.id && t.status === 'failed').length,
      passRate: tests.filter((t) => t.module === module.id).length
        ? ((tests.filter((t) => t.module === module.id && t.status === 'passed').length /
            tests.filter((t) => t.module === module.id).length) *
            100).toFixed(0)
        : 0,
    }))
    .filter((m) => m.total > 0);

  // ── getInsights, exportReport, filteredTests, insights ───────────────
  const getInsights = () => {
    const insights = [];
    // ... (your original getInsights logic remains unchanged)
    return insights;
  };

  const exportReport = () => {
    // ... (your original exportReport logic remains unchanged)
  };

  const filteredTests = tests
    .filter((t) => {
      const statusMatch = filter === 'all' || t.status === filter;
      const moduleMatch = moduleFilter === 'all' || t.module === moduleFilter;
      const deviceMatch = deviceFilter === 'all' || t.device === deviceFilter;
      return statusMatch && moduleMatch && deviceMatch;
    })
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  const insights = getInsights();

  // ── Render ────────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md border border-slate-200">
          <div className="text-center mb-8">
            <Gavel className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Test Tracker</h1>
            <p className="text-slate-600">Private testing tool</p>
            <p className="text-sm text-slate-500 mt-1">Enter password to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Password"
              autoFocus
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />

            {loginError && <p className="text-red-600 text-center text-sm font-medium">{loginError}</p>}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <LogIn size={18} />
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── Authenticated ── main application ─────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Logout */}
        <div className="mb-6 md:mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Gavel className="w-8 h-8 md:w-10 md:h-10 text-blue-600" />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
                Kiwi Trading Post - Test Tracker
              </h1>
              <p className="text-slate-600 text-sm md:text-base">Full platform testing: Features + Responsive Design</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://kiwitradingpost.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg font-medium transition-colors text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              Open Site
            </a>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg font-medium transition-colors text-sm border border-red-200"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-6 md:mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600 text-xs md:text-sm font-medium">Total</span>
              <BarChart3 className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-slate-800">{stats.total}</div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600 text-xs md:text-sm font-medium">Passed</span>
              <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-green-600">{stats.passed}</div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600 text-xs md:text-sm font-medium">Failed</span>
              <XCircle className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-red-600">{stats.failed}</div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600 text-xs md:text-sm font-medium">Blocked</span>
              <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-yellow-600">{stats.blocked}</div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600 text-xs md:text-sm font-medium">Responsive</span>
              <Smartphone className="w-4 h-4 md:w-5 md:h-5 text-purple-500" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-purple-600">{stats.responsiveIssues}</div>
            <div className="text-xs text-slate-500 mt-1">issues</div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg p-4 md:p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white text-xs md:text-sm font-medium">Pass Rate</span>
              <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-white">{stats.passRate}%</div>
          </div>
        </div>

        {/* The rest of your UI (device stats, module coverage, insights, filters, form, test list) */}
        {/* ... remains exactly the same as in your original code ... */}

        {/* For brevity, I'm not repeating the entire 1000+ line JSX here */}
        {/* Just keep everything from your original code starting from: */}

        {/* Device Testing Stats */}
        {deviceStats.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 md:p-6 mb-6 md:mb-8">
            {/* ... your original device stats content ... */}
          </div>
        )}

        {/* Module Coverage */}
        {moduleStats.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 md:p-6 mb-6 md:mb-8">
            {/* ... your original module coverage content ... */}
          </div>
        )}

        {/* Smart Insights */}
        {insights.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 md:p-6 mb-6 md:mb-8">
            {/* ... your original insights content ... */}
          </div>
        )}

        {/* Actions & Filters */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
          {/* ... your original buttons and filters ... */}
        </div>

        {/* Add Test Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 md:p-6 mb-6">
            {/* ... your original form content ... */}
          </div>
        )}

        {/* Test List */}
        <div className="space-y-3">
          {/* ... your original test list rendering ... */}
        </div>
      </div>
    </div>
  );
}