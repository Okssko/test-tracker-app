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
  LogOut,
  List,
  Key,
  MessageSquare,
  Shield, Home, ChevronDown, ChevronUp
} from 'lucide-react';

export default function KiwiTradingPostTestTracker() {
  // Password protection
  const PASSWORD = "75o95h68a16sF!";
  const STORAGE_KEY = "kiwi-test-auth";

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");   // ← consistent name

  useEffect(() => {
    const auth = localStorage.getItem(STORAGE_KEY);
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === PASSWORD) {
      localStorage.setItem(STORAGE_KEY, "true");
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Incorrect password");
      setPasswordInput("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setIsAuthenticated(false);
    setPasswordInput("");
    setLoginError("");
  };
  // ─────────────────────────────────────────────────────────────
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
    responsiveIssue: false
  });

  // Real modules from Kiwi Trading Post
  const modules = [
    { id: 'listings', name: 'Listing Management', icon: List, color: 'blue', 
      desc: 'Create, edit, view listings (auctions, buy now, classifieds)' },
    { id: 'auction', name: 'Auction System', icon: Gavel, color: 'purple',
      desc: 'Bidding, reserve prices, auto-extend, winner selection' },
    { id: 'buynow', name: 'Buy Now / Shopping Cart', icon: ShoppingCart, color: 'green',
      desc: 'Instant purchase, cart management, checkout' },
    { id: 'makeoffer', name: 'Make Offer', icon: MessageSquare, color: 'orange',
      desc: 'Submit, accept, reject, counter offers' },
    { id: 'search', name: 'Search & Filters', icon: Search, color: 'cyan',
      desc: 'Keyword search, category filters, location, price range' },
    { id: 'categories', name: 'Categories & Browse', icon: Grid, color: 'pink',
      desc: 'Category navigation, subcategories, featured items' },
    { id: 'userauth', name: 'User Authentication', icon: LogIn, color: 'indigo',
      desc: 'Register, login, logout, password reset, social login' },
    { id: 'profile', name: 'User Profile', icon: Users, color: 'teal',
      desc: 'Edit profile, ratings, reviews, seller info' },
    { id: 'watchlist', name: 'Watchlist & Favorites', icon: Heart, color: 'red',
      desc: 'Add/remove from watchlist, saved searches' },
    { id: 'messages', name: 'Messaging System', icon: Mail, color: 'yellow',
      desc: 'Buyer-seller communication, notifications' },
    { id: 'notifications', name: 'Notifications', icon: Bell, color: 'violet',
      desc: 'Email alerts, push notifications, in-app notifications' },
    { id: 'payment', name: 'Payment & Checkout', icon: CreditCard, color: 'emerald',
      desc: 'Payment processing, invoices, payment methods' },
    { id: 'shipping', name: 'Shipping & Delivery', icon: Package, color: 'amber',
      desc: 'Shipping options, tracking, pickup arrangements' },
    { id: 'reviews', name: 'Ratings & Reviews', icon: Star, color: 'lime',
      desc: 'Leave reviews, view ratings, dispute resolution' },
    { id: 'admin', name: 'Admin Dashboard', icon: Shield, color: 'slate',
      desc: 'User management, listing moderation, reports' },
    { id: 'seller', name: 'Seller Dashboard', icon: Layout, color: 'sky',
      desc: 'My listings, sales stats, inventory management' },
    { id: 'buyer', name: 'Buyer Dashboard', icon: Home, color: 'rose',
      desc: 'My bids, purchases, watchlist, messages' },
    { id: 'responsive', name: 'Responsive Design', icon: Smartphone, color: 'fuchsia',
      desc: 'Mobile, tablet, desktop layouts and interactions' },
    { id: 'performance', name: 'Performance & Speed', icon: TrendingUp, color: 'purple',
      desc: 'Page load times, image optimization, caching' },
    { id: 'security', name: 'Security & Privacy', icon: Key, color: 'red',
      desc: 'Data protection, secure transactions, privacy settings' }
  ];

  const userRoles = [
    { id: 'seller', name: 'Seller / Business User', color: 'blue' },
    { id: 'buyer', name: 'Buyer / Personal User', color: 'green' },
    { id: 'admin', name: 'Administrator', color: 'red' },
    { id: 'guest', name: 'Guest / Non-logged User', color: 'gray' }
  ];

  const devices = [
    { id: 'desktop', name: 'Desktop (1920x1080+)', icon: Monitor },
    { id: 'laptop', name: 'Laptop (1366x768)', icon: Monitor },
    { id: 'tablet', name: 'Tablet (768x1024)', icon: Tablet },
    { id: 'mobile', name: 'Mobile (375x667)', icon: Smartphone },
    { id: 'mobile-large', name: 'Mobile Large (414x896)', icon: Smartphone }
  ];

  const browsers = [
    'Chrome', 'Firefox', 'Safari', 'Edge', 'Mobile Safari', 'Chrome Mobile'
  ];

  // Comprehensive test scenarios for each module
  const testScenarios = {
    listings: [
      'Create new auction listing with images',
      'Create buy now listing',
      'Create classified ad',
      'Create listing with all types (auction + buy now + make offer)',
      'Edit active listing',
      'Delete draft listing',
      'Upload multiple images (5-10 photos)',
      'Set reserve price',
      'Set starting bid amount',
      'Set listing duration (3, 5, 7, 10 days)',
      'Add item description with formatting',
      'Set shipping options (courier, pickup, both)',
      'Preview listing before publishing',
      'Duplicate existing listing',
      'Feature/promote listing (paid)',
      'Bulk upload listings (CSV/Excel)'
    ],
    auction: [
      'Place first bid on auction',
      'Get outbid - receive notification',
      'Place maximum/proxy bid',
      'Bid increment working correctly',
      'Bid below minimum increment (should fail)',
      'Reserve price met notification',
      'Reserve not met - auction ends',
      'Auto-extend when bid placed in last minutes',
      'Auction countdown timer accuracy',
      'Multiple bidders competing',
      'Bid on own auction (should be blocked)',
      'Retract bid (if allowed)',
      'Winner notification at auction end',
      'Seller invoice sent to winner',
      'Non-winning bidders notified'
    ],
    buynow: [
      'Buy now - single item',
      'Buy now ends auction immediately',
      'Add multiple items to cart',
      'Update cart quantities',
      'Remove from cart',
      'Apply coupon/discount code',
      'Calculate shipping costs in cart',
      'Guest checkout',
      'Checkout as logged-in user',
      'Save cart for later',
      'Cart abandonment email',
      'Stock/quantity validation'
    ],
    makeoffer: [
      'Submit offer on listing',
      'Seller receives offer notification',
      'Accept offer',
      'Reject offer',
      'Counter offer from seller',
      'Buyer responds to counter offer',
      'Multiple offers on same item',
      'Offer expiration (24/48 hours)',
      'Offer below threshold rejected automatically',
      'Offer converts to sale'
    ],
    search: [
      'Keyword search - exact match',
      'Keyword search - partial match',
      'Search with filters (category + price)',
      'Location-based search (distance radius)',
      'Sort by: newest, price low-high, price high-low, ending soon',
      'Search with no results',
      'Save search criteria',
      'Search alerts for new items',
      'Advanced search (multiple filters)',
      'Search autocomplete/suggestions',
      'Search result pagination',
      'Filter by condition (new, used, refurbished)'
    ],
    categories: [
      'Browse main categories',
      'Navigate subcategories',
      'View featured items in category',
      'Category page pagination',
      'Category filters (price, location, condition)',
      'Breadcrumb navigation',
      'Category image/banner display',
      'View all items in category'
    ],
    userauth: [
      'Register new account with email',
      'Register with Facebook/Google',
      'Email verification process',
      'Login with email/password',
      'Login with social media',
      'Logout',
      'Forgot password',
      'Reset password via email link',
      'Change password (logged in)',
      'Login attempt with wrong password (lockout after X attempts)',
      'Remember me functionality',
      'Two-factor authentication (if enabled)'
    ],
    profile: [
      'Edit profile information',
      'Upload profile photo',
      'Update contact details',
      'Set notification preferences',
      'View public profile',
      'Seller verification badge',
      'Display seller ratings/reviews',
      'Set business/store info',
      'Privacy settings',
      'Delete account'
    ],
    watchlist: [
      'Add item to watchlist',
      'Remove from watchlist',
      'View all watched items',
      'Receive notification when watched item has new bid',
      'Receive notification when watched item ends soon',
      'Watchlist item sold notification',
      'Watchlist item price reduced notification',
      'Clear entire watchlist',
      'Watchlist count display in header'
    ],
    messages: [
      'Send message to seller',
      'Seller reply to buyer inquiry',
      'Message notification (email)',
      'Message notification (in-app)',
      'View message thread/conversation',
      'Unread message indicator',
      'Delete message',
      'Block user from messaging',
      'Report spam/inappropriate message',
      'Message includes listing link/details',
      'Image attachments in messages'
    ],
    notifications: [
      'Email: New bid on my listing',
      'Email: Outbid notification',
      'Email: Auction won',
      'Email: Auction ended - no winner',
      'Email: New message received',
      'Email: Payment received',
      'Email: Item shipped',
      'Push: Real-time bid notification',
      'Push: Auction ending in 1 hour',
      'In-app notification center',
      'Mark notifications as read',
      'Notification preferences (email/push on/off)'
    ],
    payment: [
      'Pay with credit/debit card',
      'Pay with PayPal',
      'Pay with bank transfer',
      'Payment on pickup/COD',
      'Generate invoice for buyer',
      'Payment confirmation email',
      'Refund process',
      'Partial payment/deposit',
      'Payment dispute',
      'Transaction fee calculation',
      'Sales tax/GST calculation',
      'Payment history'
    ],
    shipping: [
      'Select shipping method at checkout',
      'Calculate shipping cost by weight/size',
      'Calculate shipping by location',
      'Generate shipping label',
      'Add tracking number',
      'Buyer receives tracking notification',
      'Mark as shipped',
      'Local pickup option',
      'Free shipping promotion',
      'International shipping',
      'Shipping insurance option'
    ],
    reviews: [
      'Leave review after purchase',
      'Rate seller (1-5 stars)',
      'Add written review',
      'View seller overall rating',
      'View individual reviews',
      'Reply to review (seller)',
      'Report inappropriate review',
      'Review moderation (admin)',
      'Cannot review before transaction complete',
      'Review reminder email',
      'Display verified purchase badge'
    ],
    admin: [
      'View all users list',
      'Suspend/ban user account',
      'View all listings (active, pending, ended)',
      'Approve/reject listings',
      'Feature listings on homepage',
      'View transaction history',
      'Generate sales reports',
      'Handle user disputes',
      'Manage categories',
      'Site settings configuration',
      'Email template management',
      'View platform statistics/analytics'
    ],
    seller: [
      'View my active listings',
      'View my sold items',
      'View my draft listings',
      'Sales statistics (total revenue, items sold)',
      'Active bids on my items',
      'Pending offers',
      'Messages from buyers',
      'Relist expired items',
      'Edit pricing on active items',
      'Mark item as shipped',
      'Generate packing slip',
      'Seller performance metrics'
    ],
    buyer: [
      'View my active bids',
      'View my won auctions',
      'View my lost auctions',
      'View purchase history',
      'Reorder previous purchase',
      'Track shipment',
      'Leave seller feedback',
      'View my watchlist',
      'View saved searches',
      'Payment history',
      'Download invoices',
      'Return/refund request'
    ],
    responsive: [
      'Mobile: Header navigation menu (hamburger)',
      'Mobile: Search functionality',
      'Mobile: Image gallery swipe',
      'Mobile: Bidding interface',
      'Mobile: Touch-friendly buttons',
      'Mobile: Form inputs (keyboard types)',
      'Tablet: Two-column layout',
      'Tablet: Category grid display',
      'Desktop: Full navigation visible',
      'Desktop: Multi-column search results',
      'Breakpoint transitions (768px, 1024px, 1280px)',
      'Images responsive/optimized per device',
      'Font sizes scale appropriately',
      'No horizontal scrolling on mobile',
      'Touch vs click interactions'
    ],
    performance: [
      'Homepage load time < 3 seconds',
      'Listing page load time',
      'Image lazy loading',
      'Search results load time',
      'Infinite scroll performance',
      'Caching effectiveness',
      'CDN image delivery',
      'Lighthouse score > 80',
      'Mobile performance score',
      'Database query optimization',
      'API response times'
    ],
    security: [
      'SQL injection prevention',
      'XSS attack prevention',
      'CSRF token validation',
      'Secure password storage (hashing)',
      'HTTPS/SSL certificate',
      'Session timeout after inactivity',
      'Secure payment processing (PCI compliance)',
      'User data encryption',
      'Privacy policy compliance',
      'Cookie consent',
      'GDPR compliance (if applicable)',
      'Captcha on forms (bot prevention)'
    ]
  };

  useEffect(() => {
    const saved = localStorage.getItem('kiwiTradingPostTests');
    if (saved) {
      setTests(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('kiwiTradingPostTests', JSON.stringify(tests));
  }, [tests]);

  const addTest = () => {
    if (!newTest.feature || !newTest.scenario) return;
    
    const test = {
      id: Date.now(),
      ...newTest,
      timestamp: new Date().toISOString(),
      duration: Math.floor(Math.random() * 600) + 30
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
      responsiveIssue: false
    });
    setShowForm(false);
  };

  const deleteTest = (id) => {
    setTests(tests.filter(t => t.id !== id));
  };

  const updateTest = (id, updates) => {
    setTests(tests.map(t => t.id === id ? { ...t, ...updates } : t));
    setEditingId(null);
  };

  // Analytics
  const stats = {
    total: tests.length,
    passed: tests.filter(t => t.status === 'passed').length,
    failed: tests.filter(t => t.status === 'failed').length,
    blocked: tests.filter(t => t.status === 'blocked').length,
    passRate: tests.length ? ((tests.filter(t => t.status === 'passed').length / tests.length) * 100).toFixed(1) : 0,
    responsiveIssues: tests.filter(t => t.responsiveIssue).length
  };

  // Device-specific stats
  const deviceStats = devices.map(device => ({
    ...device,
    total: tests.filter(t => t.device === device.id).length,
    passed: tests.filter(t => t.device === device.id && t.status === 'passed').length,
    failed: tests.filter(t => t.device === device.id && t.status === 'failed').length,
    issues: tests.filter(t => t.device === device.id && t.responsiveIssue).length
  })).filter(d => d.total > 0);

  // Module-specific stats
  const moduleStats = modules.map(module => ({
    ...module,
    total: tests.filter(t => t.module === module.id).length,
    passed: tests.filter(t => t.module === module.id && t.status === 'passed').length,
    failed: tests.filter(t => t.module === module.id && t.status === 'failed').length,
    passRate: tests.filter(t => t.module === module.id).length 
      ? ((tests.filter(t => t.module === module.id && t.status === 'passed').length / tests.filter(t => t.module === module.id).length) * 100).toFixed(0)
      : 0
  })).filter(m => m.total > 0);

  // Smart insights
  const getInsights = () => {
    const insights = [];
    
    // Critical failures
    const criticalFails = tests.filter(t => t.status === 'failed' && t.priority === 'high');
    if (criticalFails.length > 0) {
      insights.push({
        type: 'error',
        message: `🚨 ${criticalFails.length} CRITICAL failures! These need immediate fixing before going live.`,
        icon: AlertCircle,
        tests: criticalFails.slice(0, 3)
      });
    }

    // Responsive issues
    const responsiveIssues = tests.filter(t => t.responsiveIssue);
    if (responsiveIssues.length >= 3) {
      insights.push({
        type: 'error',
        message: `📱 ${responsiveIssues.length} responsive design issues detected! Mobile users affected.`,
        icon: Smartphone,
        tests: responsiveIssues.slice(0, 3)
      });
    }

    // Payment/checkout issues
    const paymentFails = tests.filter(t => (t.module === 'payment' || t.module === 'buynow') && t.status === 'failed');
    if (paymentFails.length > 0) {
      insights.push({
        type: 'error',
        message: `💳 ${paymentFails.length} payment/checkout failures! Revenue at risk - fix immediately!`,
        icon: CreditCard,
        tests: paymentFails
      });
    }

    // Authentication issues
    const authFails = tests.filter(t => t.module === 'userauth' && t.status === 'failed');
    if (authFails.length > 0) {
      insights.push({
        type: 'error',
        message: `🔐 ${authFails.length} authentication issues! Users may not be able to login/register.`,
        icon: LogIn,
        tests: authFails
      });
    }

    // Search broken
    const searchFails = tests.filter(t => t.module === 'search' && t.status === 'failed');
    if (searchFails.length >= 2) {
      insights.push({
        type: 'warning',
        message: `🔍 Search has ${searchFails.length} failures. Users won't find items easily!`,
        icon: Search,
        tests: searchFails
      });
    }

    // Email notification issues
    const emailFails = tests.filter(t => t.emailNotification && t.status === 'failed');
    if (emailFails.length > 0) {
      insights.push({
        type: 'warning',
        message: `📧 ${emailFails.length} email notification failures. Users missing important updates!`,
        icon: Mail,
        tests: emailFails
      });
    }

    // Desktop-only testing warning
    const mobileTests = tests.filter(t => t.device === 'mobile' || t.device === 'mobile-large' || t.device === 'tablet');
    if (tests.length >= 10 && mobileTests.length < 5) {
      insights.push({
        type: 'warning',
        message: `⚠️ Low mobile/tablet test coverage! Only ${mobileTests.length} mobile tests out of ${tests.length} total.`,
        icon: Smartphone
      });
    }

    // Browser coverage
    const browsers = new Set(tests.map(t => t.browser));
    if (tests.length >= 10 && browsers.size < 2) {
      insights.push({
        type: 'warning',
        message: `🌐 Only testing on ${Array.from(browsers).join(', ')}. Test on multiple browsers!`,
        icon: Monitor
      });
    }

    // Untested critical modules
    const testedModules = new Set(tests.map(t => t.module));
    const criticalModules = ['auction', 'payment', 'userauth', 'buynow'];
    const untestedCritical = criticalModules.filter(m => !testedModules.has(m));
    if (untestedCritical.length > 0) {
      insights.push({
        type: 'error',
        message: `⚠️ Critical modules not tested yet: ${untestedCritical.map(m => modules.find(mod => mod.id === m)?.name).join(', ')}`,
        icon: Target
      });
    }

    // Good news
    if (stats.passRate >= 95 && tests.length >= 20) {
      insights.push({
        type: 'success',
        message: `🎉 Excellent work! ${stats.passRate}% pass rate with ${tests.length} tests. Site is looking solid!`,
        icon: Award
      });
    } else if (stats.passRate >= 85 && tests.length >= 10) {
      insights.push({
        type: 'success',
        message: `✅ Good progress! ${stats.passRate}% pass rate. Keep testing to reach 95%+`,
        icon: TrendingUp
      });
    }

    return insights;
  };

  const exportReport = () => {
    const report = {
      site: 'Kiwi Trading Post',
      url: 'https://kiwitradingpost.com/',
      generatedAt: new Date().toISOString(),
      summary: stats,
      moduleBreakdown: moduleStats,
      deviceBreakdown: deviceStats,
      insights: getInsights(),
      tests: tests,
      coverage: {
        totalModules: modules.length,
        testedModules: new Set(tests.map(t => t.module)).size,
        totalScenarios: Object.values(testScenarios).flat().length,
        testedScenarios: tests.length,
        browsers: Array.from(new Set(tests.map(t => t.browser))),
        devices: Array.from(new Set(tests.map(t => t.device)))
      }
    };
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kiwi-trading-post-test-report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const filteredTests = tests.filter(t => {
    const statusMatch = filter === 'all' || t.status === filter;
    const moduleMatch = moduleFilter === 'all' || t.module === moduleFilter;
    const deviceMatch = deviceFilter === 'all' || t.device === deviceFilter;
    return statusMatch && moduleMatch && deviceMatch;
  }).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

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

        {/* Device Testing Stats */}
        {deviceStats.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 md:p-6 mb-6 md:mb-8">
            <h2 className="text-lg md:text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-purple-500" />
              Device & Responsive Testing
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {deviceStats.map(device => {
                const Icon = device.icon;
                return (
                  <div key={device.id} className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-5 h-5 text-slate-600" />
                      <span className="font-medium text-slate-700 text-sm">{device.name}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-slate-600">{device.total} tests</span>
                      <div className="flex gap-2">
                        <span className="text-green-600">✓ {device.passed}</span>
                        <span className="text-red-600">✗ {device.failed}</span>
                      </div>
                    </div>
                    {device.issues > 0 && (
                      <div className="text-xs text-red-600 font-medium">
                        ⚠️ {device.issues} responsive issue{device.issues > 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Module Coverage - Compact Grid */}
        {moduleStats.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 md:p-6 mb-6 md:mb-8">
            <h2 className="text-lg md:text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-500" />
              Module Coverage ({moduleStats.length}/{modules.length})
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {moduleStats.map(module => {
                const Icon = module.icon;
                return (
                  <div key={module.id} className="border border-slate-200 rounded-lg p-3 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-4 h-4 text-slate-600 flex-shrink-0" />
                      <span className="font-medium text-slate-700 text-xs truncate">{module.name}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600">{module.total}</span>
                      <span className={`font-bold ${
                        module.passRate >= 80 ? 'text-green-600' : 
                        module.passRate >= 60 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {module.passRate}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Smart Insights */}
        {insights.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 md:p-6 mb-6 md:mb-8">
            <h2 className="text-lg md:text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-500" />
              Smart Insights & Alerts
            </h2>
            <div className="space-y-3">
              {insights.map((insight, idx) => {
                const Icon = insight.icon;
                const colors = {
                  success: 'bg-green-50 border-green-200 text-green-800',
                  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
                  error: 'bg-red-50 border-red-200 text-red-800'
                };
                return (
                  <div key={idx} className={`p-3 md:p-4 rounded-lg border ${colors[insight.type]} flex items-start gap-3`}>
                    <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium break-words">{insight.message}</p>
                      {insight.tests && insight.tests.length > 0 && (
                        <div className="mt-2 text-xs opacity-80">
                          Examples: {insight.tests.map(t => t.feature).join(', ')}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Actions & Filters */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 md:px-6 py-3 rounded-lg font-medium shadow-sm flex items-center justify-center gap-2 transition-colors text-sm md:text-base"
          >
            <Plus className="w-5 h-5" />
            Add Test
          </button>
          
          <button
            onClick={exportReport}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 md:px-6 py-3 rounded-lg font-medium shadow-sm flex items-center justify-center gap-2 transition-colors text-sm md:text-base"
          >
            <Download className="w-5 h-5" />
            Export Report
          </button>

          <div className="flex gap-2 md:ml-auto flex-wrap">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="flex-1 md:flex-none px-3 py-2 md:py-3 rounded-lg border border-slate-300 bg-white text-slate-700 font-medium text-xs md:text-sm"
            >
              <option value="all">All Status</option>
              <option value="passed">✓ Passed</option>
              <option value="failed">✗ Failed</option>
              <option value="blocked">⊘ Blocked</option>
            </select>
            
            <select
              value={moduleFilter}
              onChange={(e) => setModuleFilter(e.target.value)}
              className="flex-1 md:flex-none px-3 py-2 md:py-3 rounded-lg border border-slate-300 bg-white text-slate-700 font-medium text-xs md:text-sm"
            >
              <option value="all">All Modules</option>
              {modules.map(m => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>

            <select
              value={deviceFilter}
              onChange={(e) => setDeviceFilter(e.target.value)}
              className="flex-1 md:flex-none px-3 py-2 md:py-3 rounded-lg border border-slate-300 bg-white text-slate-700 font-medium text-xs md:text-sm"
            >
              <option value="all">All Devices</option>
              {devices.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Add Test Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 md:p-6 mb-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add New Test Case
            </h3>
            
            <div className="space-y-4">
              {/* Module, Device, Browser */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Module/Feature Area</label>
                  <select
                    value={newTest.module}
                    onChange={(e) => setNewTest({ ...newTest, module: e.target.value, scenario: '' })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  >
                    {modules.map(m => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                  {modules.find(m => m.id === newTest.module)?.desc && (
                    <p className="text-xs text-slate-500 mt-1">{modules.find(m => m.id === newTest.module).desc}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Device</label>
                  <select
                    value={newTest.device}
                    onChange={(e) => setNewTest({ ...newTest, device: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  >
                    {devices.map(d => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Browser</label>
                  <select
                    value={newTest.browser}
                    onChange={(e) => setNewTest({ ...newTest, browser: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  >
                    {browsers.map(b => (
                      <option key={b} value={b.toLowerCase().replace(' ', '-')}>{b}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* User Role & Priority */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Testing As (User Role)</label>
                  <select
                    value={newTest.userRole}
                    onChange={(e) => setNewTest({ ...newTest, userRole: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  >
                    {userRoles.map(r => (
                      <option key={r.id} value={r.id}>{r.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Priority Level</label>
                  <select
                    value={newTest.priority}
                    onChange={(e) => setNewTest({ ...newTest, priority: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  >
                    <option value="low">Low - Nice to have</option>
                    <option value="medium">Medium - Important</option>
                    <option value="high">🔴 HIGH - Critical</option>
                  </select>
                </div>
              </div>

              {/* Feature & Scenario */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Feature/Function Name</label>
                  <input
                    type="text"
                    placeholder="e.g., Create Auction, Place Bid, Search Items"
                    value={newTest.feature}
                    onChange={(e) => setNewTest({ ...newTest, feature: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Test Scenario {testScenarios[newTest.module] && '(select or type custom)'}
                  </label>
                  {/* Use an input with datalist so user can pick a predefined scenario or type a custom one */}
                  {testScenarios[newTest.module] ? (
                    <>
                      <input
                        list={`scenario-list-${newTest.module}`}
                        placeholder="Select or type a scenario"
                        value={newTest.scenario}
                        onChange={(e) => setNewTest({ ...newTest, scenario: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                      />
                      <datalist id={`scenario-list-${newTest.module}`}>
                        {testScenarios[newTest.module].map((scenario, idx) => (
                          <option key={idx} value={scenario} />
                        ))}
                      </datalist>
                    </>
                  ) : (
                    <input
                      type="text"
                      placeholder="Describe what you're testing"
                      value={newTest.scenario}
                      onChange={(e) => setNewTest({ ...newTest, scenario: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                    />
                  )}
                </div>
              </div>

              {/* Test Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Test Steps</label>
                  <textarea
                    placeholder="1. Go to... 2. Click... 3. Enter..."
                    value={newTest.steps}
                    onChange={(e) => setNewTest({ ...newTest, steps: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                    rows="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Expected Result</label>
                  <textarea
                    placeholder="What should happen..."
                    value={newTest.expectedResult}
                    onChange={(e) => setNewTest({ ...newTest, expectedResult: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                    rows="3"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Actual Result / What Happened</label>
                <textarea
                  placeholder="Describe what actually happened (especially if it failed)..."
                  value={newTest.actualResult}
                  onChange={(e) => setNewTest({ ...newTest, actualResult: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  rows="2"
                />
              </div>

              {/* Verification Checkboxes */}
              <div className="border border-slate-200 rounded-lg p-4">
                <label className="block text-sm font-medium text-slate-700 mb-3">What was verified in this test?</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newTest.emailNotification}
                      onChange={(e) => setNewTest({ ...newTest, emailNotification: e.target.checked })}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <Mail className="w-4 h-4 text-slate-600" />
                    <span className="text-sm text-slate-700">Email Notification Sent</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newTest.pushNotification}
                      onChange={(e) => setNewTest({ ...newTest, pushNotification: e.target.checked })}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <Bell className="w-4 h-4 text-slate-600" />
                    <span className="text-sm text-slate-700">Push Notification Sent</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newTest.dashboardUpdate}
                      onChange={(e) => setNewTest({ ...newTest, dashboardUpdate: e.target.checked })}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <Layout className="w-4 h-4 text-slate-600" />
                    <span className="text-sm text-slate-700">Dashboard Updated Correctly</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newTest.responsiveIssue}
                      onChange={(e) => setNewTest({ ...newTest, responsiveIssue: e.target.checked })}
                      className="w-4 h-4 text-red-600 rounded focus:ring-2 focus:ring-red-500"
                    />
                    <Smartphone className="w-4 h-4 text-red-600" />
                    <span className="text-sm text-red-700 font-medium">⚠️ Responsive Issue Found</span>
                  </label>
                </div>
              </div>

              {/* Status & Notes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Test Result</label>
                  <select
                    value={newTest.status}
                    onChange={(e) => setNewTest({ ...newTest, status: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  >
                    <option value="passed">✓ Passed - Works correctly</option>
                    <option value="failed">✗ Failed - Bug found</option>
                    <option value="blocked">⊘ Blocked - Cannot test yet</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Screenshot URL (optional)</label>
                  <input
                    type="text"
                    placeholder="https://... or paste image URL"
                    value={newTest.screenshot}
                    onChange={(e) => setNewTest({ ...newTest, screenshot: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Notes / Bug Details / Jira Link</label>
                <textarea
                  placeholder="Additional notes, error messages, bug tracker links..."
                  value={newTest.notes}
                  onChange={(e) => setNewTest({ ...newTest, notes: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  rows="2"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={addTest}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors text-sm"
              >
                <Save className="w-4 h-4" />
                Save Test
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors text-sm"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Test List */}
        <div className="space-y-3">
          {filteredTests.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 md:p-12 text-center">
              <FileText className="w-12 h-12 md:w-16 md:h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg md:text-xl font-semibold text-slate-600 mb-2">No test cases yet</h3>
              <p className="text-sm md:text-base text-slate-500">Start testing Kiwi Trading Post features and responsive design</p>
            </div>
          ) : (
            filteredTests.map(test => {
              const module = modules.find(m => m.id === test.module);
              const ModuleIcon = module?.icon || FileText;
              const device = devices.find(d => d.id === test.device);
              const DeviceIcon = device?.icon || Monitor;
              const isExpanded = expandedTest === test.id;
              
              return (
                <div key={test.id} className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                  <div className="p-4 md:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                          <span className={`px-2 md:px-3 py-1 rounded-full text-xs font-semibold ${
                            test.priority === 'high' ? 'bg-red-100 text-red-700' :
                            test.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {test.priority.toUpperCase()}
                          </span>
                          
                          <span className="px-2 md:px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 flex items-center gap-1">
                            <ModuleIcon className="w-3 h-3" />
                            <span className="hidden sm:inline">{module?.name}</span>
                          </span>
                          
                          <span className="px-2 md:px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 flex items-center gap-1">
                            <DeviceIcon className="w-3 h-3" />
                            <span className="hidden sm:inline">{device?.name.split(' ')[0]}</span>
                          </span>
                          
                          <span className="text-xs text-slate-400 hidden md:inline">
                            {new Date(test.timestamp).toLocaleString()}
                          </span>

                          {test.responsiveIssue && (
                            <span className="px-2 md:px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                              ⚠️ Responsive Issue
                            </span>
                          )}
                        </div>
                        
                        <h3 className="text-base md:text-lg font-bold text-slate-800 mb-1">{test.feature}</h3>
                        <p className="text-sm text-slate-600 mb-2">{test.scenario}</p>
                        
                        <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-slate-500 mb-2 flex-wrap">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {Math.floor(test.duration / 60)}m
                          </span>
                          
                          {test.emailNotification && (
                            <span className="flex items-center gap-1 text-blue-600">
                              <Mail className="w-4 h-4" />
                              Email
                            </span>
                          )}
                          
                          {test.pushNotification && (
                            <span className="flex items-center gap-1 text-purple-600">
                              <Bell className="w-4 h-4" />
                              Push
                            </span>
                          )}
                          
                          {test.dashboardUpdate && (
                            <span className="flex items-center gap-1 text-green-600">
                              <Layout className="w-4 h-4" />
                              Dashboard
                            </span>
                          )}
                        </div>

                        {/* Expandable Details */}
                        {isExpanded && (
                          <div className="mt-4 space-y-3 border-t pt-4">
                            {test.steps && (
                              <div>
                                <h4 className="font-semibold text-sm text-slate-700 mb-1">Steps:</h4>
                                <p className="text-sm text-slate-600 whitespace-pre-wrap">{test.steps}</p>
                              </div>
                            )}
                            {test.expectedResult && (
                              <div>
                                <h4 className="font-semibold text-sm text-slate-700 mb-1">Expected:</h4>
                                <p className="text-sm text-slate-600">{test.expectedResult}</p>
                              </div>
                            )}
                            {test.actualResult && (
                              <div>
                                <h4 className="font-semibold text-sm text-slate-700 mb-1">Actual:</h4>
                                <p className="text-sm text-slate-600">{test.actualResult}</p>
                              </div>
                            )}
                            {test.notes && (
                              <div>
                                <h4 className="font-semibold text-sm text-slate-700 mb-1">Notes:</h4>
                                <p className="text-sm text-slate-600">{test.notes}</p>
                              </div>
                            )}
                            {test.screenshot && (
                              <div>
                                <h4 className="font-semibold text-sm text-slate-700 mb-1">Screenshot:</h4>
                                <a href={test.screenshot} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                                  {test.screenshot}
                                </a>
                              </div>
                            )}
                            <div className="text-xs text-slate-400">
                              Browser: {test.browser} • Tested as: {userRoles.find(r => r.id === test.userRole)?.name}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col md:flex-row items-end md:items-center gap-2">
                        <select
                          value={test.status}
                          onChange={(e) => updateTest(test.id, { status: e.target.value })}
                          className={`px-3 md:px-4 py-2 rounded-lg font-semibold text-xs md:text-sm border-2 cursor-pointer transition-colors ${
                            test.status === 'passed' ? 'bg-green-50 border-green-300 text-green-700 hover:bg-green-100' :
                            test.status === 'failed' ? 'bg-red-50 border-red-300 text-red-700 hover:bg-red-100' :
                            'bg-yellow-50 border-yellow-300 text-yellow-700 hover:bg-yellow-100'
                          }`}
                        >
                          <option value="passed">✓ Pass</option>
                          <option value="failed">✗ Fail</option>
                          <option value="blocked">⊘ Block</option>
                        </select>
                        
                        <button
                          onClick={() => setExpandedTest(isExpanded ? null : test.id)}
                          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                          title="View details"
                        >
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-slate-600" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-slate-600" />
                          )}
                        </button>
                        
                        <button
                          onClick={() => deleteTest(test.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}