'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import '../styles.css';

export default function PrivacyPolicy() {
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
            <h1>Privacy Policy</h1>
            <p className="mb-4">Last Updated: {currentDate}</p>
            
            <div className="mb-5">
              <h2>Our Privacy Commitment</h2>
              <p>
                At Earmark, we believe your financial data belongs to you and only you. We've designed our app with privacy as the fundamental principle, not as an afterthought. This privacy policy explains our approach to data management and protection.
              </p>
            </div>
            
            <div className="mb-5">
              <h2>Your Data Stays on Your Device</h2>
              <p>
                Earmark is designed as a completely local application. This means:
              </p>
              <ul className="feature-list">
                <li className="feature-item">
                  All your financial data is stored exclusively on your device.
                </li>
                <li className="feature-item">
                  We do not have servers that store your personal or financial information.
                </li>
                <li className="feature-item">
                  Your budget information, spending habits, income details, and any other data you enter never leaves your device.
                </li>
                <li className="feature-item">
                  No backups are created on our servers - we recommend you use your device's backup functionality if you wish to secure your data.
                </li>
              </ul>
            </div>
            
            <div className="mb-5">
              <h2>No Data Collection</h2>
              <p>
                Unlike many apps, we do not collect any data from your usage of Earmark:
              </p>
              <ul className="feature-list">
                <li className="feature-item">
                  We do not track your usage patterns or interactions with the app.
                </li>
                <li className="feature-item">
                  We do not collect analytics or metrics about how you use the application.
                </li>
                <li className="feature-item">
                  We do not gather information about your device, location, or system.
                </li>
                <li className="feature-item">
                  We have no access to the content you create within the app.
                </li>
              </ul>
            </div>
            
            <div className="mb-5">
              <h2>No Third-Party Data Sharing</h2>
              <p>
                Since we don't collect your data, we have nothing to share with third parties:
              </p>
              <ul className="feature-list">
                <li className="feature-item">
                  We do not share, sell, or distribute your information to advertisers.
                </li>
                <li className="feature-item">
                  We do not integrate with third-party analytics tools that would track your behavior.
                </li>
                <li className="feature-item">
                  We do not have partnerships with data brokers or information resellers.
                </li>
                <li className="feature-item">
                  Even anonymized or aggregated data is not collected or shared, as we simply don't have access to it.
                </li>
              </ul>
            </div>
            
            <div className="mb-5">
              <h2>App Permissions</h2>
              <p>
                Earmark requires minimal permissions to function:
              </p>
              <ul className="feature-list">
                <li className="feature-item">
                  <strong>Storage Permission:</strong> Only to save your financial data locally on your device.
                </li>
                <li className="feature-item">
                  We do not request access to your contacts, location, camera, or other sensitive device features.
                </li>
              </ul>
              <p>
                Any future updates that might require additional permissions will be clearly explained, and will only be implemented if they directly enhance the local budgeting functionality of the app.
              </p>
            </div>
            
            <div className="mb-5">
              <h2>Security</h2>
              <p>
                While the security of your data is primarily dependent on your device's security measures, we've implemented the following:
              </p>
              <ul className="feature-list">
                <li className="feature-item">
                  All data is stored using industry-standard encryption on your device.
                </li>
                <li className="feature-item">
                  We recommend enabling your device's security features (PIN, fingerprint, face recognition) to protect access to the app.
                </li>
                <li className="feature-item">
                  The app can optionally require authentication each time you open it, for additional security.
                </li>
              </ul>
            </div>
            
            <div className="mb-5">
              <h2>Children's Privacy</h2>
              <p>
                Earmark is not designed for or directed at children under the age of 13. We do not knowingly collect any information from children under 13. Since the app stores all data locally, parents should monitor their children's use of devices where the app is installed.
              </p>
            </div>
            
            <div className="mb-5">
              <h2>Changes to This Policy</h2>
              <p>
                If we make changes to our Privacy Policy, we will update the "Last Updated" date at the top of this page and notify users within the app. Since our core privacy principle is to never collect or transmit user data, any policy changes would only reflect clarifications, new features that maintain these principles, or legal requirements.
              </p>
            </div>
            
            <div className="mb-5">
              <h2>Your Rights</h2>
              <p>
                Since we don't collect your data, many traditional privacy rights (access, correction, deletion, portability) are directly in your control:
              </p>
              <ul className="feature-list">
                <li className="feature-item">
                  <strong>Access & Portability:</strong> All your data is on your device, already in your possession.
                </li>
                <li className="feature-item">
                  <strong>Correction:</strong> You can edit your information directly in the app.
                </li>
                <li className="feature-item">
                  <strong>Deletion:</strong> You can delete data within the app, or uninstall the app to remove all data.
                </li>
              </ul>
            </div>
            
            <div className="mb-5">
              <h2>Contact Us</h2>
              <p>
                If you have questions about our privacy practices, you can contact us at:
              </p>
              <p>
                support@chrisbutler.dev
              </p>
              <p>
                We're committed to maintaining the highest standards of privacy and will respond to your inquiries as soon as possible.
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