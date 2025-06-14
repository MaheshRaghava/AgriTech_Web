import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import LoginForm from '@/components/auth/LoginForm';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
  const [showAdmin, setShowAdmin] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const toggleView = () => {
    setShowAdmin(!showAdmin);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <MainLayout>
        <section className="py-16">
          <div className="max-w-2xl mx-auto px-4">
            <div className="perspective">
              <div className="relative" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
                <motion.div
                  initial={{ rotateY: showAdmin ? 180 : 0 }}
                  animate={{ rotateY: showAdmin ? 0 : 180 }}
                  transition={{ duration: 0.6 }}
                  style={{ 
                    backfaceVisibility: 'hidden', 
                    position: showAdmin ? 'relative' : 'absolute',
                    width: '100%',
                    transformStyle: 'preserve-3d' 
                  }}
                >
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
                      <CardDescription className="text-center">
                        Access the admin dashboard to manage orders and inventory
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6 px-16">
                      <Link to="/admin-login" className="block w-full">
                        <Button className="w-full mb-4">Continue to Admin Login</Button>
                      </Link>
                    </CardContent>
                    <CardFooter className="flex justify-center pb-6">
                      <button 
                        onClick={toggleView} 
                        className="text-sm text-farm-600 hover:text-farm-700"
                      >
                        Switch to Farmer Login
                      </button>
                    </CardFooter>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ rotateY: showAdmin ? 0 : 180 }}
                  animate={{ rotateY: showAdmin ? 180 : 0 }}
                  transition={{ duration: 0.6 }}
                  style={{ 
                    backfaceVisibility: 'hidden', 
                    position: !showAdmin ? 'relative' : 'absolute',
                    width: '100%',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-2xl font-bold text-center">Farmer Login</CardTitle>
                      <CardDescription className="text-center">
                        Welcome back! Login to access your account
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6 px-16">
                      <LoginForm />
                      <div className="mt-4 flex justify-between items-center">
                        <Link
                          to="/forgot-password"
                          className="text-sm text-farm-600 hover:text-farm-700"
                        >
                          Forgot Password?
                        </Link>
                        <button 
                          onClick={toggleView} 
                          className="text-sm text-farm-600 hover:text-farm-700"
                        >
                          Admin Login
                        </button>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                      <div className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-farm-600 hover:text-farm-700 font-medium">
                          Register
                        </Link>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </MainLayout>
    </div>
  );
};

export default Login;
