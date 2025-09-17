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
            to="/docs/intro">
            Start Learning Now 🚀
          </Link>
          <Link
            className="button button--outline button--secondary button--lg"
            to="/docs/os">
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
                <Link to="/docs/os" className="button button--primary button--block">
                  Explore Linux
                </Link>
              </div>
            </div>
          </div>
          <div className="col col--3" style={{marginBottom: '1.5rem'}}>
            <div className="card">
              <div className="card__header">
                <h3>🛡️ Security & Hardening</h3>
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
                <h3>🌐 Networking</h3>
              </div>
              <div className="card__body">
                <p>Network configuration, troubleshooting, and optimization</p>
              </div>
              <div className="card__footer">
                <Link to="/docs/networking" className="button button--primary button--block">
                  Master Networking
                </Link>
              </div>
            </div>
          </div>
          <div className="col col--3" style={{marginBottom: '1.5rem'}}>
            <div className="card">
              <div className="card__header">
                <h3>⚙️ DevOps & Services</h3>
              </div>
              <div className="card__body">
                <p>Service management, automation, and DevOps practices</p>
              </div>
              <div className="card__footer">
                <Link to="/docs/services" className="button button--primary button--block">
                  Explore DevOps
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
              12K+
            </h3>
            <p style={{fontSize: '1.1rem', margin: 0}}>Monthly Readers</p>
          </div>
          <div className="col col--3 text--center" style={{marginBottom: '2rem'}}>
            <h3 style={{fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--ifm-color-primary)', marginBottom: '0.5rem'}}>
              100+
            </h3>
            <p style={{fontSize: '1.1rem', margin: 0}}>Tutorials</p>
          </div>
          <div className="col col--3 text--center" style={{marginBottom: '2rem'}}>
            <h3 style={{fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--ifm-color-primary)', marginBottom: '0.5rem'}}>
              15+
            </h3>
            <p style={{fontSize: '1.1rem', margin: 0}}>Operating Systems</p>
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
    <section style={{padding: '4rem 0'}}>
      <div className="container">
        <div className="row" style={{alignItems: 'center'}}>
          <div className="col col--6" style={{marginBottom: '2rem'}}>
            <Heading as="h2" style={{marginBottom: '1.5rem'}}>Join Our Community</Heading>
            <p style={{fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1.5rem'}}>
              Connect with like-minded system administrators and tech enthusiasts. 
              Share your journey, exchange insights, and grow together in our supportive community.
            </p>
            <ul style={{fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem'}}>
              <li>📚 Professional quality tutorials</li>
              <li>🔧 Hands-on projects and exercises</li>
              <li>💬 Active community discussions</li>
              <li>🆓 Completely free and open-source</li>
            </ul>
            <Link
              className="button button--primary button--lg"
              href="https://github.com/Syslogine/syslogine/discussions">
              Join Discussions
            </Link>
          </div>
          <div className="col col--6" style={{marginBottom: '2rem'}}>
            <Heading as="h2" style={{marginBottom: '1.5rem'}}>Why Choose Syslogine?</Heading>
            <div style={{fontSize: '1.1rem', lineHeight: '1.7'}}>
              <div style={{marginBottom: '1.5rem', padding: '1rem', borderLeft: '4px solid var(--ifm-color-primary)', backgroundColor: 'var(--ifm-color-emphasis-100)'}}>
                <strong>Professional Quality:</strong> Industry-tested tutorials written by experienced system administrators.
              </div>
              <div style={{marginBottom: '1.5rem', padding: '1rem', borderLeft: '4px solid var(--ifm-color-primary)', backgroundColor: 'var(--ifm-color-emphasis-100)'}}>
                <strong>Beginner Friendly:</strong> Complex concepts broken down into easy-to-follow steps.
              </div>
              <div style={{marginBottom: '1.5rem', padding: '1rem', borderLeft: '4px solid var(--ifm-color-primary)', backgroundColor: 'var(--ifm-color-emphasis-100)'}}>
                <strong>Always Current:</strong> Regular updates to reflect the latest technologies and best practices.
              </div>
              <div style={{padding: '1rem', borderLeft: '4px solid var(--ifm-color-primary)', backgroundColor: 'var(--ifm-color-emphasis-100)'}}>
                <strong>Real-World Focused:</strong> Practical solutions for actual IT challenges you'll face.
              </div>
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