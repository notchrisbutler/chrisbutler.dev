'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import './styles.css';

export default function EarmarkLandingPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Use static value for initial server render
  const [currentYear, setCurrentYear] = useState('2025');
  
  // Update date value client-side only to avoid hydration mismatch
  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const validateForm = () => {
    let valid = true;
    const newErrors = { ...formErrors };
    
    if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
      valid = false;
    }
    
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      valid = false;
    }
    
    if (formData.subject.trim().length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters';
      valid = false;
    }
    
    if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
      valid = false;
    }
    
    setFormErrors(newErrors);
    return valid;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        
        // Reset submission message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      }, 1500);
    }
  };

  return (
    <div className="earmark-app dark">
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo-container">
              <Image
                src="/earmark-logo.png"
                alt="Earmark Logo"
                width={40}
                height={40}
                className="logo-image"
                priority
              />
              <span className="logo-text">Earmark</span>
            </div>
            <nav className="nav-menu">
              <Link href="/earmark" className="nav-link">
                Home
              </Link>
              <Link href="/earmark" className="nav-link">
                Support
              </Link>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="main-content">
        <div className="container">
          <div className="content-grid">
            <div>
              <div className="text-center mb-4">
                <Image 
                  src="/earmark-logo.png" 
                  alt="Earmark Logo" 
                  width={80} 
                  height={80} 
                  className="mb-3" 
                  style={{ borderRadius: '0.75rem', margin: '0 auto' }}
                />
              </div>
              <h1>Earmark: Budget Privately</h1>
              <p className="mb-3" style={{ color: 'var(--earmark-text-light)' }}>
                Simple, Private Money Plan
              </p>
              <div>
                <p>
                  Master your finances with Earmark: Budget Privately, the go-to app for simple, secure money management. 
                  Tired of clunky spreadsheets or apps that harvest your data? Earmark keeps everything on your 
                  device—zero cloud storage, total privacy. Track income, plan expenses, and build savings with a modern, 
                  intuitive tool designed for you. Budgeting just got easier, safer, and smarter.
                </p>
                
                <h2>Why Choose Earmark?</h2>
                <ul className="feature-list">
                  <li className="feature-item">
                    <strong>Total Privacy:</strong> All data stays local on your device—no cloud, no data sharing, and no 
                    security concerns. Your financial information remains completely under your control.
                  </li>
                  <li className="feature-item">
                    <strong>Budget Templates:</strong> Create customizable financial plans that can be reused and adapted 
                    across multiple months, providing consistency and saving you valuable time.
                  </li>
                  <li className="feature-item">
                    <strong>Clear Categories:</strong> Organize your finances into intuitive sections for Income, Savings, 
                    Expenses, and Debts to maintain a comprehensive view of your financial situation.
                  </li>
                  <li className="feature-item">
                    <strong>Smart Analytics:</strong> Access detailed comparisons between budget plans and actual spending, 
                    including health scores, financial ratios, and extended period analysis.
                  </li>
                  <li className="feature-item">
                    <strong>Modern Interface:</strong> Enjoy a sleek, contemporary design with built-in dark mode for 
                    comfortable viewing any time of day, reducing eye strain during night sessions.
                  </li>
                </ul>
                
                <h2>Key Features</h2>
                <ul className="feature-list">
                  <li className="feature-item">
                    <strong>Private by Design:</strong> Your financial data never leaves your device, ensuring 
                    complete confidentiality and peace of mind for sensitive information.
                  </li>
                  <li className="feature-item">
                    <strong>Flexible Planning:</strong> Create, modify, and implement budget templates with ease, 
                    allowing you to adapt your financial strategy as circumstances change.
                  </li>
                  <li className="feature-item">
                    <strong>Financial Organization:</strong> Keep track of every dollar with intuitive categorization 
                    that helps you understand exactly where your money is going.
                  </li>
                  <li className="feature-item">
                    <strong>Comprehensive Insights:</strong> Make informed financial decisions based on detailed 
                    analytics, spending patterns, and personalized recommendations.
                  </li>
                  <li className="feature-item">
                    <strong>Enhanced Visibility:</strong> Manage your finances comfortably with a thoughtfully designed 
                    dark theme that reduces eye strain during extended usage.
                  </li>
                </ul>
                
                <h2>Who's It For?</h2>
                <p>
                  Earmark is perfect for anyone seeking a private, powerful budgeting solution—whether you're a beginner 
                  starting to save or a professional fine-tuning your cash flow management. Our app replaces outdated 
                  financial tracking methods with a secure, elegant alternative that puts you firmly in control of your 
                  financial future.
                </p>
                
                <div className="mt-4" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                    <button className="btn btn-primary">
                      Download Now
                    </button>
                    <button className="btn btn-outline">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card">
              <h3 className="card-title">Contact Support</h3>
              <p className="card-description">
                Have questions about Earmark? Send us a message and we'll get back to you.
              </p>
              
              {isSubmitted ? (
                <div className="form-success">
                  <p style={{ color: 'var(--earmark-success)', marginBottom: '0.5rem' }}>
                    <strong>Message sent successfully!</strong>
                  </p>
                  <p>Thank you for contacting us. We'll get back to you soon.</p>
                </div>
              ) : (
                <div className="form-container">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label className="form-label">Name</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-input" 
                        placeholder="Your name" 
                      />
                      {formErrors.name && <div className="form-error">{formErrors.name}</div>}
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input" 
                        placeholder="your.email@example.com" 
                      />
                      {formErrors.email && <div className="form-error">{formErrors.email}</div>}
                    </div>
                    <div className="form-group">
                      <label className="form-label">Subject</label>
                      <input 
                        type="text" 
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="form-input" 
                        placeholder="How can we help you?" 
                      />
                      {formErrors.subject && <div className="form-error">{formErrors.subject}</div>}
                    </div>
                    <div className="form-group">
                      <label className="form-label">Message</label>
                      <textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="form-textarea" 
                        placeholder="Please describe your issue or question in detail..."
                      ></textarea>
                      {formErrors.message && <div className="form-error">{formErrors.message}</div>}
                    </div>
                    <button 
                      type="submit" 
                      className="btn btn-primary btn-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <p className="footer-copyright">
              © {currentYear} Earmark. All rights reserved.
            </p>
            <div className="footer-links">
              <Link href="/earmark/privacy-policy" className="footer-link">
                Privacy Policy
              </Link>
              <Link href="/earmark/terms-of-service" className="footer-link">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 