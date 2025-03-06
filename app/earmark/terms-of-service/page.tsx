'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import '../styles.css';

export default function TermsOfService() {
  // Use static values for initial server render
  const [currentDate, setCurrentDate] = useState('March 6, 2025');
  const [currentYear, setCurrentYear] = useState('2025');
  
  // Update date values client-side only to avoid hydration mismatch
  useEffect(() => {
    const today = new Date();
    setCurrentDate(today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
    setCurrentYear(today.getFullYear().toString());
  }, []);
  
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
              <Link href="/earmark" className="logo-text">Earmark</Link>
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
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1>Terms of Service</h1>
            <p className="mb-4">Last Updated: {currentDate}</p>
            
            <div className="mb-5">
              <p>
                Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the Earmark: Budget Privately application ("the App") operated by Earmark ("us", "we", or "our").
              </p>
              <p>
                Your access to and use of the App is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the App.
              </p>
              <p>
                By accessing or using the App, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the App.
              </p>
            </div>
            
            <div className="mb-5">
              <h2>Use of the Application</h2>
              <h3 className="mb-2 mt-4">License</h3>
              <p>
                Subject to these Terms, Earmark grants you a limited, non-exclusive, non-transferable, non-sublicensable, revocable license to download, install, and use the App for your personal, non-commercial purposes on a single device that you own or control.
              </p>
              
              <h3 className="mb-2 mt-4">Financial Information</h3>
              <p>
                The App is designed to help you manage and track your personal finances. While we strive to provide a useful and accurate tool:
              </p>
              <ul className="feature-list">
                <li className="feature-item">
                  The App is intended to be used as a budgeting and financial tracking tool only. It is not a substitute for professional financial advice.
                </li>
                <li className="feature-item">
                  You are solely responsible for verifying the accuracy of any data entered into or produced by the App.
                </li>
                <li className="feature-item">
                  We make no guarantees that the use of the App will improve your financial situation or lead to any particular financial outcome.
                </li>
                <li className="feature-item">
                  You should consult with qualified professionals regarding specific financial, legal, or tax matters before making significant financial decisions.
                </li>
              </ul>
              
              <h3 className="mb-2 mt-4">User Responsibilities</h3>
              <p>
                As a user of the App, you agree to:
              </p>
              <ul className="feature-list">
                <li className="feature-item">
                  Provide accurate and complete information when using the App.
                </li>
                <li className="feature-item">
                  Maintain the security of your device to protect your financial data.
                </li>
                <li className="feature-item">
                  Not use the App for any illegal or unauthorized purpose.
                </li>
                <li className="feature-item">
                  Not attempt to modify, reverse-engineer, decompile, or disassemble the App or any part of it.
                </li>
                <li className="feature-item">
                  Not attempt to circumvent, disable, or interfere with any security-related features of the App.
                </li>
              </ul>
            </div>
            
            <div className="mb-5">
              <h2>Data Security and Privacy</h2>
              <p>
                Your privacy and the security of your financial data are important to us:
              </p>
              <ul className="feature-list">
                <li className="feature-item">
                  All data entered into the App is stored locally on your device and is not transmitted to our servers or any third parties.
                </li>
                <li className="feature-item">
                  You are responsible for maintaining the security of your device to protect your financial data.
                </li>
                <li className="feature-item">
                  We strongly recommend that you regularly back up your data using your device's native backup functionality.
                </li>
                <li className="feature-item">
                  For more details on our data practices, please review our <Link href="/earmark/privacy-policy">Privacy Policy</Link>.
                </li>
              </ul>
            </div>
            
            <div className="mb-5">
              <h2>Intellectual Property</h2>
              <p>
                The App and its original content, features, and functionality are and will remain the exclusive property of Earmark and its licensors. The App is protected by copyright, trademark, and other laws.
              </p>
              <p>
                Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Earmark.
              </p>
            </div>
            
            <div className="mb-5">
              <h2>In-App Purchases and Subscriptions</h2>
              <p>
                The App may offer the opportunity to purchase additional features or functionality through in-app purchases or subscriptions:
              </p>
              <ul className="feature-list">
                <li className="feature-item">
                  All purchases are final and non-refundable, except as required by applicable law.
                </li>
                <li className="feature-item">
                  You agree to pay all charges at the prices in effect when you incur the charges.
                </li>
                <li className="feature-item">
                  Subscriptions will automatically renew for the same subscription period unless canceled at least 24 hours before the end of the current period.
                </li>
                <li className="feature-item">
                  You can manage and cancel your subscriptions by going to your account settings on the App Store or Play Store.
                </li>
              </ul>
            </div>
            
            <div className="mb-5">
              <h2>Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, in no event shall Earmark, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, use, goodwill, or other intangible losses, resulting from:
              </p>
              <ul className="feature-list">
                <li className="feature-item">
                  Your access to or use of, or inability to access or use, the App.
                </li>
                <li className="feature-item">
                  Any conduct or content of any third party on the App.
                </li>
                <li className="feature-item">
                  Any content obtained from the App.
                </li>
                <li className="feature-item">
                  Unauthorized access, use, or alteration of your transmissions or content.
                </li>
                <li className="feature-item">
                  Financial decisions made based on information provided by or calculations performed by the App.
                </li>
              </ul>
            </div>
            
            <div className="mb-5">
              <h2>Disclaimer</h2>
              <p>
                The App is provided on an "AS IS" and "AS AVAILABLE" basis. Earmark disclaims all warranties of any kind, whether express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.
              </p>
              <p>
                Earmark does not warrant that: (a) the App will function uninterrupted, secure, or available at any particular time or location; (b) any errors or defects will be corrected; (c) the App is free of viruses or other harmful components; or (d) the results of using the App will meet your requirements.
              </p>
              <p>
                The information provided by the App is not intended to replace professional financial advice. You should consult with a qualified financial advisor before making important financial decisions.
              </p>
            </div>
            
            <div className="mb-5">
              <h2>Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
              </p>
              <p>
                Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
              </p>
            </div>
            
            <div className="mb-5">
              <h2>Changes to Terms</h2>
              <p>
                We reserve the right to modify or replace these Terms at any time. By continuing to access or use our App after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the App.
              </p>
              <p>
                We will provide notification of any significant changes to these Terms through an update notice in the App or by other reasonable means.
              </p>
            </div>
            
            <div className="mb-5">
              <h2>Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <p>
                support@chrisbutler.dev
              </p>
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