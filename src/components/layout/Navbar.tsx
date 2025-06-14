import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, Sun, Moon, User, LogOut, LogIn, Globe, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from '@/components/ui/badge';

const Navbar = () => {
  const { isAuthenticated, userType, logout } = useAuth();
  const { translate, language, setLanguage } = useLanguage();
  const { items } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  // Toggle dark mode
  const toggleDarkMode = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
      localStorage.setItem('theme', 'dark');
    }
  };

  // Check for saved theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const cartItemCount = items.reduce((count, item) => count + (item.quantity || 1), 0);

  const navigationItems = [
    { path: '/', label: translate('nav.home') },
    { path: '/equipment', label: translate('nav.equipment') },
    { path: '/seeds', label: translate('nav.seeds') },
    { path: '/pesticides', label: translate('nav.pesticides') },
    { path: '/smart-tools', label: translate('nav.smartTools') },
    { path: '/weather', label: translate('nav.weather') }
  ];

  return (
    <header className="border-b border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo positioned at top-left */}
          <Link to="/" className="flex items-center">
            <div className="h-9 w-9 rounded-full bg-fern flex items-center justify-center mr-2">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl text-fern">AgriTech</span>
          </Link>

          {/* Desktop Navigation with increased spacing from logo */}
          <nav className="hidden md:flex items-center space-x-10 ml-20">
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `site-nav-link ${
                    isActive
                      ? 'text-fern font-medium'
                      : 'text-gray-700 hover:text-fern dark:text-gray-200'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `site-nav-link ${
                  isActive
                    ? 'text-fern font-medium'
                    : 'text-gray-700 hover:text-fern dark:text-gray-200'
                }`
              }
            >
              {translate('nav.contact')}
            </NavLink>

            {/* My Orders for authenticated farmers */}
            {isAuthenticated && userType === 'farmer' && (
              <NavLink
                to="/my-orders"
                className={({ isActive }) =>
                  `site-nav-link ${
                    isActive
                      ? 'text-fern font-medium'
                      : 'text-gray-700 hover:text-fern dark:text-gray-200'
                  }`
                }
              >
                {translate('nav.myOrders')}
              </NavLink>
            )}

            {/* My Bookings for authenticated farmers */}
            {isAuthenticated && userType === 'farmer' && (
              <NavLink
                to="/mybookings"
                className={({ isActive }) =>
                  `site-nav-link ${
                    isActive
                      ? 'text-fern font-medium'
                      : 'text-gray-700 hover:text-fern dark:text-gray-200'
                  }`
                }
              >
                {translate('nav.myBookings') || "My Bookings"}
              </NavLink>
            )}
          </nav>

          {/* Right side menus: Cart, User, Theme with decreased gap */}
          <div className="flex items-center space-x-1 md:space-x-2">
            {/* Cart Link */}
            <Link to="/cart" className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              <ShoppingCart className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">
                  {cartItemCount}
                </Badge>
              )}
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              )}
            </button>

            {/* Language Toggle with Globe Icon */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                  <Globe className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={() => setLanguage('en')} className={language === 'en' ? 'bg-muted' : ''}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('hi')} className={language === 'hi' ? 'bg-muted' : ''}>
                  हिंदी
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('te')} className={language === 'te' ? 'bg-muted' : ''}>
                  తెలుగు
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                    <User className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                  <DropdownMenuLabel className="text-fern">
                    {translate('nav.myAccount')}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  {userType === 'farmer' && (
                    <>
                      <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                        <Link to="/my-orders" className="flex items-center w-full">
                          {translate('nav.myOrders')}
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                        <Link to="/mybookings" className="flex items-center w-full">
                          {translate('nav.myBookings') || "My Bookings"}
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}

                  {userType === 'admin' && (
                    <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                      <Link to="/admin-dashboard" className="flex items-center w-full">
                        {translate('nav.dashboard')}
                      </Link>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuItem 
                    className="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-red-500"
                    onClick={logout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    {translate('nav.logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm" className="flex items-center">
                  <LogIn className="mr-2 h-4 w-4" />
                  {translate('auth.login')}
                </Button>
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-3 px-2">
            <nav className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md ${
                    isActive(item.path)
                      ? 'bg-fern/10 text-fern font-medium'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800'
                  }`}
                >
                  {item.label}
                </NavLink>
              ))}

              <NavLink
                to="/contact"
                className={`px-3 py-2 rounded-md ${
                  isActive('/contact')
                    ? 'bg-fern/10 text-fern font-medium'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800'
                }`}
              >
                {translate('nav.contact')}
              </NavLink>

              {isAuthenticated && userType === 'farmer' && (
                <>
                  <NavLink
                    to="/my-orders"
                    className={`px-3 py-2 rounded-md ${
                      isActive('/my-orders')
                        ? 'bg-fern/10 text-fern font-medium'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800'
                    }`}
                  >
                    {translate('nav.myOrders')}
                  </NavLink>
                  <NavLink
                    to="/mybookings"
                    className={`px-3 py-2 rounded-md ${
                      isActive('/mybookings')
                        ? 'bg-fern/10 text-fern font-medium'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800'
                    }`}
                  >
                    {translate('nav.myBookings') || "My Bookings"}
                  </NavLink>
                </>
              )}

              {isAuthenticated && userType === 'admin' && (
                <NavLink
                  to="/admin-dashboard"
                  className={`px-3 py-2 rounded-md ${
                    isActive('/admin-dashboard')
                      ? 'bg-fern/10 text-fern font-medium'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800'
                  }`}
                >
                  {translate('nav.dashboard')}
                </NavLink>
              )}

              {isAuthenticated ? (
                <button
                  onClick={logout}
                  className="px-3 py-2 rounded-md text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800 text-left"
                >
                  <LogOut className="mr-2 h-4 w-4 inline" />
                  {translate('nav.logout')}
                </button>
              ) : (
                <Link to="/login">
                  <Button variant="outline" size="sm" className="flex items-center w-full">
                    <LogIn className="mr-2 h-4 w-4" />
                    {translate('auth.login')}
                  </Button>
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;