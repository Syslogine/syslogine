---
title: Platform Statistics
---

import StatsDisplay from '@site/src/components/StatsDisplay';

<div className="progress-page">
  <div className="about-hero">
    <h1>📊 Platform Statistics</h1>
    <div>Syslogine by the numbers - automatically updated with each build</div>
  </div>

  <StatsDisplay />

  <div className="about-hero" style={{marginTop: '3rem'}}>
    <h2>🚀 Real-Time Data</h2>
    <div>
      These statistics are automatically calculated during each build by analyzing 
      all documentation files, extracting metadata, and computing metrics like word counts, 
      reading times, and content organization.
    </div>
    <div style={{marginTop: '1rem'}}>
      <strong>Next build:</strong> Stats will refresh automatically when new content is added!
    </div>
  </div>
</div>