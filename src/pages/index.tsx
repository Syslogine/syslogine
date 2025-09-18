import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <Head>
        <meta name="google-adsense-account" content="ca-pub-8675646092369975" />
      </Head>
      <div className="container">
        <Heading as="h1" className="hero__title">
          Master System Administration
        </Heading>
        <p className="hero__subtitle">
          Professional tutorials for Linux, Windows Server, networking, security, and DevOps. 
          Trusted by thousands of IT professionals worldwide.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/welcome">
            Start Learning Now 🚀
          </Link>
          <Link
            className="button button--outline button--secondary button--lg"
            to="/docs/linux/index">
            Browse Operating Systems
          </Link>
        </div>
      </div>
    </header>
  );
}

function PopularTutorials() {
  return (
    <section style={{padding: '4rem 0'}}>
      <div className="container">
        <div className="text--center" style={{marginBottom: '3rem'}}>
          <Heading as="h2">Popular Tutorial Categories</Heading>
          <p style={{fontSize: '1.1rem', color: 'var(--ifm-color-content-secondary)'}}>
            Explore our most sought-after guides and tutorials
          </p>
        </div>
        <div className="row" style={{gap: '1.5rem 0'}}>
          <div className="col col--3" style={{marginBottom: '1.5rem'}}>
            <div className="card">
              <div className="card__header">
                <h3>🐧 Linux Administration</h3>
              </div>
              <div className="card__body">
                <p>Ubuntu, CentOS, Debian guides for system administrators</p>
              </div>
              <div className="card__footer">
                <Link to="/docs/linux" className="button button--primary button--block">
                  Explore Linux
                </Link>
              </div>
            </div>
          </div>
          <div className="col col--3" style={{marginBottom: '1.5rem'}}>
            <div className="card">
              <div className="card__header">
                <h3>☁️ Virtualization</h3>
              </div>
              <div className="card__body">
                <p>Proxmox, VMware, Docker, and Kubernetes orchestration</p>
              </div>
              <div className="card__footer">
                <Link to="/docs/virtualization" className="button button--primary button--block">
                  Learn Virtualization
                </Link>
              </div>
            </div>
          </div>
          <div className="col col--3" style={{marginBottom: '1.5rem'}}>
            <div className="card">
              <div className="card__header">
                <h3>🔒 Security & Hardening</h3>
              </div>
              <div className="card__body">
                <p>Cybersecurity best practices and system hardening guides</p>
              </div>
              <div className="card__footer">
                <Link to="/docs/security" className="button button--primary button--block">
                  Learn Security
                </Link>
              </div>
            </div>
          </div>
          <div className="col col--3" style={{marginBottom: '1.5rem'}}>
            <div className="card">
              <div className="card__header">
                <h3>📊 Monitoring</h3>
              </div>
              <div className="card__body">
                <p>Prometheus, Grafana, ELK Stack, and automation tools</p>
              </div>
              <div className="card__footer">
                <Link to="/docs/monitoring" className="button button--primary button--block">
                  Setup Monitoring
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Second row with additional categories */}
        <div className="row" style={{gap: '1.5rem 0', marginTop: '1.5rem'}}>
          <div className="col col--3" style={{marginBottom: '1.5rem'}}>
            <div className="card">
              <div className="card__header">
                <h3>🪟 Windows Server</h3>
              </div>
              <div className="card__body">
                <p>Active Directory, PowerShell, and enterprise Windows</p>
              </div>
              <div className="card__footer">
                <Link to="/docs/windows" className="button button--primary button--block">
                  Windows Guides
                </Link>
              </div>
            </div>
          </div>
          <div className="col col--3" style={{marginBottom: '1.5rem'}}>
            <div className="card">
              <div className="card__header">
                <h3>🌐 Web Development</h3>
              </div>
              <div className="card__body">
                <p>Frontend frameworks, static sites, and deployment</p>
              </div>
              <div className="card__footer">
                <Link to="/docs/web-development" className="button button--primary button--block">
                  Build Websites
                </Link>
              </div>
            </div>
          </div>
          <div className="col col--3" style={{marginBottom: '1.5rem'}}>
            <div className="card">
              <div className="card__header">
                <h3>🎮 Gaming & Modding</h3>
              </div>
              <div className="card__body">
                <p>Game modding, server hosting, and streaming setup</p>
              </div>
              <div className="card__footer">
                <Link to="/docs/gaming" className="button button--primary button--block">
                  Gaming Tech
                </Link>
              </div>
            </div>
          </div>
          <div className="col col--3" style={{marginBottom: '1.5rem'}}>
            <div className="card">
              <div className="card__header">
                <h3>📚 Getting Started</h3>
              </div>
              <div className="card__body">
                <p>New to system administration? Start with our intro</p>
              </div>
              <div className="card__footer">
                <Link to="/docs/welcome" className="button button--primary button--block">
                  Start Learning
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section style={{padding: '4rem 0', backgroundColor: 'var(--ifm-color-emphasis-100)'}}>
      <div className="container">
        <div className="row">
          <div className="col col--3 text--center" style={{marginBottom: '2rem'}}>
            <h3 style={{fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--ifm-color-primary)', marginBottom: '0.5rem'}}>
              2024
            </h3>
            <p style={{fontSize: '1.1rem', margin: 0}}>Launched</p>
          </div>
          <div className="col col--3 text--center" style={{marginBottom: '2rem'}}>
            <h3 style={{fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--ifm-color-primary)', marginBottom: '0.5rem'}}>
              Weekly
            </h3>
            <p style={{fontSize: '1.1rem', margin: 0}}>New Tutorials</p>
          </div>
          <div className="col col--3 text--center" style={{marginBottom: '2rem'}}>
            <h3 style={{fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--ifm-color-primary)', marginBottom: '0.5rem'}}>
              24/7
            </h3>
            <p style={{fontSize: '1.1rem', margin: 0}}>Community Support</p>
          </div>
          <div className="col col--3 text--center" style={{marginBottom: '2rem'}}>
            <h3 style={{fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--ifm-color-primary)', marginBottom: '0.5rem'}}>
              100%
            </h3>
            <p style={{fontSize: '1.1rem', margin: 0}}>Free & Open Source</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CommunitySection() {
  return (
    <section style={{padding: '4rem 0', background: 'linear-gradient(135deg, var(--ifm-color-emphasis-100) 0%, var(--ifm-color-emphasis-200) 100%)'}}>
      <div className="container">
        {/* Header Section */}
        <div className="text--center" style={{marginBottom: '4rem'}}>
          <Heading as="h2" style={{fontSize: '2.5rem', marginBottom: '1rem'}}>
            Join the Syslogine Community
          </Heading>
          <p style={{fontSize: '1.2rem', color: 'var(--ifm-color-emphasis-700)', maxWidth: '600px', margin: '0 auto'}}>
            Connect with thousands of system administrators worldwide and accelerate your career growth
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="row" style={{alignItems: 'stretch', marginBottom: '3rem'}}>
          {/* Community Benefits */}
          <div className="col col--6" style={{marginBottom: '2rem'}}>
            <div className="card" style={{height: '100%', border: '2px solid var(--ifm-color-primary-lighter)'}}>
              <div className="card__header">
                <h3 style={{color: 'var(--ifm-color-primary)', marginBottom: '1rem', fontSize: '1.5rem'}}>
                  🚀 Why Join Our Community?
                </h3>
              </div>
              <div className="card__body">
                <div style={{marginBottom: '2rem'}}>
                  <div style={{display: 'flex', alignItems: 'flex-start', marginBottom: '1.5rem'}}>
                    <div style={{fontSize: '2rem', marginRight: '1rem', minWidth: '60px'}}>💬</div>
                    <div>
                      <h4 style={{margin: '0 0 0.5rem 0', color: 'var(--ifm-color-primary)'}}>24/7 Expert Support</h4>
                      <p style={{margin: 0, fontSize: '1rem'}}>Get help from experienced sysadmins around the clock in our active community channels.</p>
                    </div>
                  </div>
                  
                  <div style={{display: 'flex', alignItems: 'flex-start', marginBottom: '1.5rem'}}>
                    <div style={{fontSize: '2rem', marginRight: '1rem', minWidth: '60px'}}>🎯</div>
                    <div>
                      <h4 style={{margin: '0 0 0.5rem 0', color: 'var(--ifm-color-primary)'}}>Career Networking</h4>
                      <p style={{margin: 0, fontSize: '1rem'}}>Connect with professionals from top tech companies and build valuable relationships.</p>
                    </div>
                  </div>
                  
                  <div style={{display: 'flex', alignItems: 'flex-start', marginBottom: '1.5rem'}}>
                    <div style={{fontSize: '2rem', marginRight: '1rem', minWidth: '60px'}}>🔥</div>
                    <div>
                      <h4 style={{margin: '0 0 0.5rem 0', color: 'var(--ifm-color-primary)'}}>Exclusive Content</h4>
                      <p style={{margin: 0, fontSize: '1rem'}}>Access to beta tutorials, live Q&A sessions, and member-only resources.</p>
                    </div>
                  </div>
                </div>
                
                <div className="buttons">
                  <Link
                    className="button button--primary button--lg"
                    href="https://github.com/Syslogine/syslogine/discussions"
                    style={{marginRight: '1rem'}}>
                    Join Discussion Forum
                  </Link>
                  <Link
                    className="button button--secondary button--outline button--lg"
                    href="https://discord.gg/syslogine">
                    Discord Community
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Why Choose Syslogine */}
          <div className="col col--6" style={{marginBottom: '2rem'}}>
            <div className="card" style={{height: '100%', border: '2px solid var(--ifm-color-primary-lighter)'}}>
              <div className="card__header">
                <h3 style={{color: 'var(--ifm-color-primary)', marginBottom: '1rem', fontSize: '1.5rem'}}>
                  ⭐ What Makes Us Different?
                </h3>
              </div>
              <div className="card__body">
                <div style={{display: 'grid', gap: '1.5rem'}}>
                  <div style={{
                    padding: '1.5rem',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, var(--ifm-color-primary-lightest) 0%, var(--ifm-color-primary-lighter) 100%)',
                    color: 'white',
                    transition: 'transform 0.2s ease',
                    cursor: 'pointer'
                  }} className="shadow-hover">
                    <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem'}}>
                      <span style={{fontSize: '1.5rem', marginRight: '0.75rem'}}>🏢</span>
                      <strong style={{fontSize: '1.1rem'}}>Enterprise-Grade Quality</strong>
                    </div>
                    <p style={{margin: 0, fontSize: '0.95rem', opacity: '0.95'}}>
                      Tutorials used by Fortune 500 companies and tested in production environments.
                    </p>
                  </div>
                  
                  <div style={{
                    padding: '1.5rem',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #4a90e2 0%, #357abd 100%)',
                    color: 'white',
                    transition: 'transform 0.2s ease',
                    cursor: 'pointer'
                  }} className="shadow-hover">
                    <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem'}}>
                      <span style={{fontSize: '1.5rem', marginRight: '0.75rem'}}>⚡</span>
                      <strong style={{fontSize: '1.1rem'}}>Lightning Fast Updates</strong>
                    </div>
                    <p style={{margin: 0, fontSize: '0.95rem', opacity: '0.95'}}>
                      New content weekly, security patches same-day, technology updates within hours.
                    </p>
                  </div>
                  
                  <div style={{
                    padding: '1.5rem',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                    color: 'white',
                    transition: 'transform 0.2s ease',
                    cursor: 'pointer'
                  }} className="shadow-hover">
                    <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem'}}>
                      <span style={{fontSize: '1.5rem', marginRight: '0.75rem'}}>🎯</span>
                      <strong style={{fontSize: '1.1rem'}}>Real-World Focus</strong>
                    </div>
                    <p style={{margin: 0, fontSize: '0.95rem', opacity: '0.95'}}>
                      Every tutorial solves actual problems faced by working system administrators.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>



        {/* Call to Action */}
        <div className="text--center" style={{marginTop: '3rem'}}>
          <div style={{
            background: 'linear-gradient(135deg, var(--ifm-color-primary) 0%, var(--ifm-color-primary-light) 100%)',
            borderRadius: '16px',
            padding: '2.5rem',
            color: 'white'
          }}>
            <h3 style={{color: 'white', fontSize: '1.8rem', marginBottom: '1rem'}}>
              🚀 Ready to Level Up Your Infrastructure Skills?
            </h3>
            <p style={{fontSize: '1.1rem', marginBottom: '2rem', opacity: '0.95'}}>
              Join our community today and get access to exclusive content, expert mentorship, and career opportunities.
            </p>
            <div className="buttons">
              <Link
                className="button button--secondary button--outline button--lg"
                href="/docs/welcome"
                style={{borderColor: 'white', color: 'white', marginRight: '1rem'}}>
                Start Learning Now
              </Link>
              <Link
                className="button button--secondary button--outline button--lg"
                href="https://github.com/Syslogine/syslogine/discussions"
                style={{borderColor: 'white', color: 'white'}}>
                Join Community
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Professional System Administration Tutorials"
      description="Master Linux, Windows Server, networking, security, and DevOps with our comprehensive tutorials. Trusted by thousands of IT professionals worldwide.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <PopularTutorials />
        <StatsSection />
        <CommunitySection />
      </main>
    </Layout>
  );
}