import { Metadata } from 'next'
import './styles.css'
import CookieNotice from './components/CookieNotice'

export const metadata: Metadata = {
  title: 'Central Bank of Atlantis - Financial Markets Data',
  description: 'Financial Markets Data Portal of the Central Bank of Atlantis',
}

// This makes the page static at build time
export const dynamic = 'force-static'

export default function FinancialMarketsPage() {
  return (
    <div className="financial-markets-page">
      <div className="header">
        <div className="header-content">
          <div className="header-top">
            <div className="logo">Central Bank of Atlantis</div>
            <input type="text" className="search-bar" placeholder="Search..." />
            <div className="auth-links">
              <a href="#">Login</a> |
              <a href="#">Register</a> |
              <a href="#">Language: EN</a>
            </div>
          </div>
        </div>
      </div>

      <div className="nav-menu">
        <div className="nav-content">
          <a href="#">Home</a>
          <a href="#">Monetary Policy</a>
          <a href="#">Statistics</a>
          <a href="#">Market Operations</a>
          <a href="#">Research</a>
          <a href="#">Publications</a>
          <a href="#">About Us</a>
        </div>
      </div>

      <div className="news-ticker">
        <div className="ticker-content">
          BREAKING NEWS: <a href="#">Quarterly Monetary Policy Meeting scheduled for February 15, 2025</a> | <a href="#">Annual Economic Forum registration now open</a> | <a href="#">Latest Economic Indicators Report available for download</a>
        </div>
      </div>

      <main className="main-container">
        <div className="content">
          <div className="announcement-banner">
            📢 Important Notice: System maintenance scheduled for January 30, 2025, from 02:00 to 04:00 GMT. Some services may be unavailable.
          </div>

          <aside className="side-panel">
            <h3>Quick Links</h3>
            <ul>
              <li>Economic Calendar</li>
              <li>Press Releases</li>
              <li>Statistical Database</li>
              <li>Regulatory Framework</li>
            </ul>
            <h3>Market Hours</h3>
            <p>Trading Hours: 09:00 - 17:30 GMT</p>
            <p>Settlement: T+2</p>
            <h3>Contact</h3>
            <p>Emergency Helpline: +1-555-0123</p>
          </aside>

          <div className="main-content">
            <h1>Financial Markets Data</h1>
            <p>Welcome to the Central Bank of Atlantis's Financial Markets Data Portal. This page provides real-time market data for key financial instruments. Data is provided for informational purposes only.</p>

            <div className="market-data">
              <h2>Equity Markets</h2>
              <div className="timestamp">Last Updated: 2025-02-24 14:30:00 GMT</div>
              <p>Primary market indicators for major listed companies.</p>
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Symbol</th>
                      <th>Company</th>
                      <th>Last Price</th>
                      <th>Change</th>
                      <th>Change %</th>
                      <th>Volume</th>
                      <th>Bid</th>
                      <th>Ask</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="ticker">AAPL.O</td>
                      <td>Apple Inc</td>
                      <td>198.45</td>
                      <td className="price-up">+2.35</td>
                      <td className="price-up">+1.20%</td>
                      <td>5,234,892</td>
                      <td>198.43</td>
                      <td>198.47</td>
                    </tr>
                    <tr>
                      <td className="ticker">MSFT.O</td>
                      <td>Microsoft Corp</td>
                      <td>402.25</td>
                      <td className="price-down">-1.75</td>
                      <td className="price-down">-0.43%</td>
                      <td>3,892,451</td>
                      <td>402.23</td>
                      <td>402.27</td>
                    </tr>
                    <tr>
                      <td className="ticker">GOOGL.O</td>
                      <td>Alphabet Inc</td>
                      <td>152.78</td>
                      <td className="price-up">+0.88</td>
                      <td className="price-up">+0.58%</td>
                      <td>2,781,345</td>
                      <td>152.76</td>
                      <td>152.80</td>
                    </tr>
                    <tr>
                      <td className="ticker">TSLA.O</td>
                      <td>Tesla Inc</td>
                      <td>397.15</td>
                      <td className="price-down">-0.21</td>
                      <td className="price-down">-0.053%</td>
                      <td>4,284,174</td>
                      <td>397.12</td>
                      <td>397.48</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="market-data">
              <h2>Foreign Exchange</h2>
              <div className="timestamp">Last Updated: 2025-02-24 14:30:00 GMT</div>
              <p>Track live foreign exchange rates for major currency pairs.</p>
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Symbol</th>
                      <th>Currency Pair</th>
                      <th>Last Price</th>
                      <th>Change</th>
                      <th>Change %</th>
                      <th>Bid</th>
                      <th>Ask</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="ticker">EUR</td>
                      <td>EUR/USD</td>
                      <td>1.0845</td>
                      <td className="price-down">-0.0023</td>
                      <td className="price-down">-0.21%</td>
                      <td>1.0844</td>
                      <td>1.0846</td>
                    </tr>
                    <tr>
                      <td className="ticker">GBP</td>
                      <td>GBP/USD</td>
                      <td>1.2698</td>
                      <td className="price-up">+0.0045</td>
                      <td className="price-up">+0.35%</td>
                      <td>1.2697</td>
                      <td>1.2699</td>
                    </tr>
                    <tr>
                      <td className="ticker">NOK</td>
                      <td>NOK/USD</td>
                      <td>0.0885</td>
                      <td className="price-down">-0.00011</td>
                      <td className="price-down">-0.12%</td>
                      <td>0.0884</td>
                      <td>0.0886</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div>
            <h4>About Us</h4>
            <p>The Central Bank of Atlantis serves as the nation's monetary authority and financial regulator. <a href="#">Learn more</a></p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>
              <a href="#">1 Currency Plaza<br />Atlantis City, AT 12345</a><br />
              <a href="#">Phone: +1-555-0123</a><br />
              <a href="#">Email: info@cba.gov.at</a>
            </p>
          </div>
          <div>
            <h4>Legal</h4>
            <p>
              <a href="#">Terms of Use</a><br />
              <a href="#">Privacy Policy</a><br />
              <a href="#">Disclaimer</a><br />
              <a href="#">Copyright Notice</a>
            </p>
          </div>
          <div>
            <h4>Follow Us</h4>
            <p>
              <a href="#">Twitter</a><br />
              <a href="#">LinkedIn</a><br />
              <a href="#">Facebook</a><br />
              <a href="#">YouTube</a>
            </p>
          </div>
        </div>
      </footer>

      <CookieNotice />
    </div>
  )
} 