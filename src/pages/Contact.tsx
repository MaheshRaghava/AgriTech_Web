import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { MapPin, Phone, Mail } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success('Message sent successfully!', {
        description: 'We will get back to you as soon as possible.'
      });
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  const faqItems = [
    {
      question: "What agricultural services do you offer?",
      answer: "We provide a comprehensive range of smart farming solutions, including equipment rental, quality seeds, weather forecasting, soil monitoring, and precision agriculture tools. Our goal is to help farmers increase productivity while optimizing resource usage."
    },
    {
      question: "How can I schedule a consultation?",
      answer: "You can schedule a consultation by filling out our contact form, calling our office directly, or sending us an email. Our agricultural technology experts will respond within 24 hours to arrange a meeting at your convenience."
    },
    {
      question: "Do you offer installation services for smart farming tools?",
      answer: "Yes, we provide professional installation services for all our smart farming tools. Our technicians are trained to properly set up, calibrate, and integrate the equipment with your existing systems, ensuring optimal performance."
    },
    {
      question: "What areas do you serve?",
      answer: "We currently serve farmers across India with a focus on the Andhra Pradesh region. However, for larger projects or consultations, we may be able to accommodate clients outside this area. Please contact us to discuss your specific needs."
    }
  ];

  return (
    <MainLayout>
      <section className="py-12 bg-farm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FEF7CD]/40 rounded-lg shadow-md p-8 mb-10">
            <h1 className="text-4xl font-bold mb-4 text-fern text-left">Contact Us</h1>
            <p className="max-w-3xl text-lg text-gray-600 text-left">
              Have questions about our smart farming solutions? Get in touch with our team of agricultural technology experts.
            </p>
          </div>
          
          {/* Contact Form and Info - Equal width */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6 text-fern">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">Your Name *</label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Your Email *</label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-700">Subject</label>
                  <Input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700">Message *</label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Please describe how we can assist you..."
                    className="resize-y"
                  />
                </div>
                
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-fern hover:bg-farm-600 text-white"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
            
            {/* Contact Information */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6 text-fern">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-farm-400 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-600">
                    Vishnu Institute of Technology,<br />
                    Bhimavaram, Andhra Pradesh, India
                  </p>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-farm-400 mr-2 flex-shrink-0" />
                  <p className="text-gray-600">+91 6281394194</p>
                </div>
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-farm-400 mr-2 mt-0.5 flex-shrink-0" />
                  <div className="text-gray-600">
                    <p>23pa1a05d4@vishnu.edu.in</p>
                    <p>23pa1a05d7@vishnu.edu.in</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-farm-700">Business Hours</h3>
                  <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-600">Saturday: 9:00 AM - 1:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Our Location - Full width */}
          <div className="bg-white p-8 rounded-lg shadow-md mb-12">
            <h2 className="text-2xl font-bold mb-4 text-fern">Our Location</h2>
            <div className="aspect-[4/3] w-full">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3824.2506036097055!2d81.5214027!3d16.567187599999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a37cd4e8d1d1d8d%3A0xab52da15615ac690!2sVishnu%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1653068834172!5m2!1sen!2sin" 
                width="100%" 
                height="400" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                className="rounded-md"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section with light gold background */}
      <section className="py-16 bg-[#f5d67a]/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-fern mb-10">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm max-w-3xl mx-auto">
                <h3 className="text-xl font-semibold text-fern mb-2">{item.question}</h3>
                <p className="text-gray-700">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Contact;
