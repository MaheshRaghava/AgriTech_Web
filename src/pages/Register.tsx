
import { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import RegisterForm from '@/components/auth/RegisterForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

const Register = () => {
  const [showLogin, setShowLogin] = useState(false);

  const toggleView = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <MainLayout>
        <section className="py-16">
          <div className="max-w-2xl mx-auto px-4">
            <div className="perspective">
              <div className="relative" style={{ perspective: '1000px' }}>
                <motion.div
                  initial={{ rotateY: showLogin ? 180 : 0 }}
                  animate={{ rotateY: showLogin ? 0 : 180 }}
                  transition={{ duration: 0.6 }}
                  style={{ 
                    backfaceVisibility: 'hidden', 
                    position: showLogin ? 'relative' : 'absolute',
                    width: '100%',
                    transformStyle: 'preserve-3d' 
                  }}
                >
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
                      <CardDescription className="text-center">
                        Already have an account? Login to access your account.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6 px-16">
                      <Link to="/login" className="block w-full">
                        <Button className="w-full mb-4">Continue to Login</Button>
                      </Link>
                    </CardContent>
                    <CardFooter className="flex justify-center pb-6">
                      <button 
                        onClick={toggleView} 
                        className="text-sm text-farm-600 hover:text-farm-700"
                      >
                        Switch to Register
                      </button>
                    </CardFooter>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ rotateY: showLogin ? 0 : 180 }}
                  animate={{ rotateY: showLogin ? 180 : 0 }}
                  transition={{ duration: 0.6 }}
                  style={{ 
                    backfaceVisibility: 'hidden', 
                    position: !showLogin ? 'relative' : 'absolute',
                    width: '100%',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-2xl font-bold text-center">Register</CardTitle>
                      <CardDescription className="text-center">
                        Create a new account to access all features
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6 px-16">
                      <RegisterForm />
                    </CardContent>
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

export default Register;