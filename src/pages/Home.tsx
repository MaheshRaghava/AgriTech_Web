
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ThumbsUp, Leaf, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import MainLayout from '@/components/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';

const Home = () => {
  const { translate } = useLanguage();
  const { isAuthenticated } = useAuth();

  return (
    <MainLayout>
      {/* Hero Section with text aligned to the left */}
      <section className="relative min-h-[80vh] flex items-center text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: 'url("https://assets.entrepreneur.com/content/3x2/2000/1717070107-Untitleddesign5.jpg")',
            backgroundPosition: 'center 30%'
          }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-40 z-1"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
          <div className="max-w-3xl animate-fade-in text-left">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 text-left">
              {translate('home.hero.title')}
            </h1>
            <p className="text-xl mb-8 text-white max-w-2xl text-left">
              {translate('home.hero.subtitle')}
            </p>
            <div className="flex flex-wrap gap-4 justify-start">
              <Link to="/equipment">
                <Button size="lg" className="bg-fern hover:bg-farm-600 text-white">
                  {translate('home.hero.cta')}
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="default" size="lg" className="bg-black/70 hover:bg-black/90 text-white border-white">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section with lighter green and gold colors */}
      <section className="py-20 bg-[#FEF7CD]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6 text-fern text-center">
            Our Mission
          </h2>
          <p className="max-w-4xl mx-auto text-gray-600 text-lg text-center mb-12">
            At AgriTech, we aim to transform traditional agriculture by providing modern technological solutions to farmers, ensuring sustainable farming practices and increased productivity.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-xl shadow-lg transform transition-transform hover:-translate-y-2 hover:shadow-xl animate-fade-in">
              <div className="w-16 h-16 bg-fern rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-white">
                  <path d="M6 3v12"></path>
                  <path d="M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
                  <path d="M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
                  <path d="M15 12a3 3 0 1 0 0 6 3 3 0 0 0 0 6z"></path>
                  <path d="M6 15a9 9 0 0 1 9-9"></path>
                  <path d="M18 9a9 9 0 0 1-3 6.3"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-fern text-center">
                {translate('home.mission.sustainable.title')}
              </h3>
              <p className="text-gray-600 text-center">
                {translate('home.mission.sustainable.desc')}
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg transform transition-transform hover:-translate-y-2 hover:shadow-xl animate-fade-in" style={{animationDelay: '0.2s'}}>
              <div className="w-16 h-16 bg-fern rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-white">
                  <path d="M5 12v1M1 10V9a4 4 0 0 1 4-4h11.7M21 8l-2 3-2-3" />
                  <path d="M19 11.5V10c0-.8-.7-1.5-1.5-1.5h-7c-.8 0-1.5-.7-1.5-1.5v0c0-.8.7-1.5 1.5-1.5H17" />
                  <path d="M18 11v6c0 1.1-.9 2-2 2H8.5c-.8 0-1.5-.7-1.5-1.5v0c0-.8.7-1.5 1.5-1.5H10" />
                  <path d="M9 17H4a2 2 0 0 1-2-2v-5" />
                  <circle cx="9" cy="19" r="2" />
                  <circle cx="19" cy="19" r="2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-fern text-center">
                {translate('home.mission.technology.title')}
              </h3>
              <p className="text-gray-600 text-center">
                {translate('home.mission.technology.desc')}
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg transform transition-transform hover:-translate-y-2 hover:shadow-xl animate-fade-in" style={{animationDelay: '0.4s'}}>
              <div className="w-16 h-16 bg-fern rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-white">
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="M4.93 4.93l1.41 1.41" />
                  <path d="M17.66 17.66l1.41 1.41" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="M6.34 17.66l-1.41 1.41" />
                  <path d="M19.07 4.93l-1.41 1.41" />
                  <path d="M10 15h2a2 2 0 1 0 0-4h-2v7" />
                  <path d="M14 15h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-fern text-center">
                {translate('home.mission.data.title')}
              </h3>
              <p className="text-gray-600 text-center">
                {translate('home.mission.data.desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-farm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-4xl font-bold mb-6 text-fern flex items-center">
                Benefits of Smart Farming
                <Heart className="ml-2 text-vista-blue h-10 w-16" />
              </h2>
              <p className="text-gray-600 mb-6">
                Implementing smart farming techniques brings numerous advantages to both small-scale and commercial farmers.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mr-4 text-vista-blue flex-shrink-0">
                    <ThumbsUp className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-fern">Increased Productivity</h4>
                    <p className="text-gray-600">
                      Smart farming technologies can increase crop yields by up to 70% through optimized resource management.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 text-vista-blue flex-shrink-0">
                    <ThumbsUp className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-fern">Resource Optimization</h4>
                    <p className="text-gray-600">
                      Reduce water usage by 30% and fertilizer application by 20% through precision agriculture techniques.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 text-vista-blue flex-shrink-0">
                    <ThumbsUp className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-fern">Cost Reduction</h4>
                    <p className="text-gray-600">
                      Lower operational costs by implementing equipment sharing and smart resource management.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 text-vista-blue flex-shrink-0">
                    <ThumbsUp className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-fern">Environmental Protection</h4>
                    <p className="text-gray-600">
                      Minimize environmental impact through sustainable farming practices and reduced chemical usage.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button className="bg-fern hover:bg-farm-600 text-white">
                  Discover Our Smart Tools
                </Button>
              </div>
            </div>
            
            <div className="order-1 md:order-2">
              <img 
                src="https://img.freepik.com/free-photo/smart-digital-agriculture-technology-by-futuristic-sensor-data-collection_90220-1059.jpg?w=996&t=st=1747371722~exp=1747372322~hmac=7e0dd8a064e99c231af3b3c9c7520197e3f88e4ab761b75e3b33214082a1685f" 
                alt="Smart farming technology in action" 
                className="rounded-lg shadow-lg w-full h-auto object-cover"
                style={{height: "500px"}}
                onError={(e) => {
                  e.currentTarget.src = "https://img.freepik.com/free-photo/agricultural-industry-drone-spraying-fertilizer-field_23-2149454883.jpg?w=996&t=st=1747371746~exp=1747372346~hmac=87f4f3757044708d4487292a734aeea19355cf59f647c19722cd1a603141f485";
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#f5d67a]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Farming?
          </h2>
          <p className="text-xl mb-8 text-farm-900 max-w-2xl mx-auto">
            Join thousands of farmers who have already taken their agricultural practices to the next level with our smart farming solutions.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/equipment">
              <Button size="lg" className="bg-white text-fern border border-fern hover:bg-farm-50">
                Browse Equipment
              </Button>
            </Link>
            <Link to="/seeds">
              <Button size="lg" className="bg-farm-600 hover:bg-farm-700 border border-farm-200 text-white">
                Explore Seeds
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Login Options - Only show when not authenticated */}
      {!isAuthenticated && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-12 text-fern text-center">
              Login Options
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Farmer Login */}
              <div className="bg-white p-8 rounded-xl shadow-lg transition-transform hover:-translate-y-2 hover:shadow-xl">
                <h3 className="text-2xl font-bold mb-4 text-center text-fern">Farmer Login</h3>
                <p className="text-gray-600 text-center mb-6">
                  Access your account to purchase quality seeds, book equipment, and utilize smart farming tools.
                </p>
                <Link to="/login" className="block">
                  <Button className="w-full bg-fern hover:bg-farm-600 text-white">
                    Login as Farmer
                  </Button>
                </Link>
              </div>
              
              {/* Admin Login */}
              <div className="bg-white p-8 rounded-xl shadow-lg transition-transform hover:-translate-y-2 hover:shadow-xl">
                <h3 className="text-2xl font-bold mb-4 text-center text-fern">Admin Login</h3>
                <p className="text-gray-600 text-center mb-6">
                  Manage products, view bookings, and update inventory in the admin dashboard.
                </p>
                <Link to="/admin-login" className="block">
                  <Button className="w-full bg-fern hover:bg-farm-600 text-white">
                    Login as Admin
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </MainLayout>
  );
};

export default Home;