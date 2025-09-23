import React from 'react';
import useGlobalData from '@docusaurus/useGlobalData';

export default function StatsDisplay() {
  const globalData = useGlobalData();
  const stats = globalData['stats-plugin']?.default || {};

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num?.toString() || '0';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  const formatTime = (minutes) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours}h ${remainingMinutes}m`;
    }
    return `${minutes}m`;
  };

  if (stats.error) {
    return <div className="support-stats"><div className="support-stat"><span className="support-stat-number">⚠️</span><span className="support-stat-label">Error loading stats</span></div></div>;
  }

  return (
    <>
      {/* Basic Content Stats */}
      <h3>📚 Content Overview</h3>
      <div className="support-stats">
        <div className="support-stat">
          <span className="support-stat-number">{stats.docCount || 0}</span>
          <span className="support-stat-label">Documentation Pages</span>
        </div>
        <div className="support-stat">
          <span className="support-stat-number">{stats.tagCount || 0}</span>
          <span className="support-stat-label">Unique Topics</span>
        </div>
        <div className="support-stat">
          <span className="support-stat-number">{stats.categoryCount || 0}</span>
          <span className="support-stat-label">Categories</span>
        </div>
        <div className="support-stat">
          <span className="support-stat-number">{formatNumber(stats.totalWords)}</span>
          <span className="support-stat-label">Total Words</span>
        </div>
      </div>

      {/* Reading & Content Metrics */}
      <h3>📖 Reading Metrics</h3>
      <div className="support-stats">
        <div className="support-stat">
          <span className="support-stat-number">{formatTime(stats.totalReadingTime || 0)}</span>
          <span className="support-stat-label">Total Reading Time</span>
        </div>
        <div className="support-stat">
          <span className="support-stat-number">{stats.avgWordsPerDoc || 0}</span>
          <span className="support-stat-label">Avg Words/Page</span>
        </div>
        <div className="support-stat">
          <span className="support-stat-number">{formatNumber(stats.totalLines || 0)}</span>
          <span className="support-stat-label">Total Lines</span>
        </div>
        <div className="support-stat">
          <span className="support-stat-number">{formatNumber(stats.totalCharacters || 0)}</span>
          <span className="support-stat-label">Total Characters</span>
        </div>
      </div>

      {/* Content Features */}
      <h3>🛠️ Content Features</h3>
      <div className="support-stats">
        <div className="support-stat">
          <span className="support-stat-number">{stats.totalCodeBlocks || 0}</span>
          <span className="support-stat-label">Code Blocks</span>
        </div>
        <div className="support-stat">
          <span className="support-stat-number">{stats.totalImages || 0}</span>
          <span className="support-stat-label">Images</span>
        </div>
        <div className="support-stat">
          <span className="support-stat-number">{stats.totalLinks || 0}</span>
          <span className="support-stat-label">Links</span>
        </div>
        <div className="support-stat">
          <span className="support-stat-number">{stats.codeBlockPercentage || 0}%</span>
          <span className="support-stat-label">Pages with Code</span>
        </div>
      </div>

      {/* File Analysis */}
      <h3>📁 File Analysis</h3>
      <div className="support-stats">
        <div className="support-stat">
          <span className="support-stat-number">{stats.longestFile?.words || 0}</span>
          <span className="support-stat-label">Longest Article (words)</span>
        </div>
        <div className="support-stat">
          <span className="support-stat-number">{stats.contentAge || 0}</span>
          <span className="support-stat-label">Content Age (days)</span>
        </div>
        <div className="support-stat">
          <span className="support-stat-number">{stats.avgImagesPerDoc || 0}</span>
          <span className="support-stat-label">Avg Images/Page</span>
        </div>
        <div className="support-stat">
          <span className="support-stat-number">{stats.avgCodeBlocksPerDoc || 0}</span>
          <span className="support-stat-label">Avg Code Blocks/Page</span>
        </div>
      </div>

      {/* Top Categories */}
      {stats.topCategories && stats.topCategories.length > 0 && (
        <>
          <h3>📂 Top Categories</h3>
          <div className="support-stats">
            {stats.topCategories.slice(0, 4).map((cat, index) => (
              <div key={index} className="support-stat">
                <span className="support-stat-number">{cat.count}</span>
                <span className="support-stat-label">{cat.category}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Top Programming Languages */}
      {stats.topLanguages && stats.topLanguages.length > 0 && (
        <>
          <h3>💻 Top Technologies</h3>
          <div className="support-stats">
            {stats.topLanguages.slice(0, 6).map((lang, index) => (
              <div key={index} className="support-stat">
                <span className="support-stat-number">{lang.mentions}</span>
                <span className="support-stat-label">{lang.language}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Build Info */}
      <h3>🔧 Build Information</h3>
      <div className="support-stats">
        <div className="support-stat">
          <span className="support-stat-number">{formatDate(stats.lastUpdate)}</span>
          <span className="support-stat-label">Last Updated</span>
        </div>
        <div className="support-stat">
          <span className="support-stat-number">{formatDate(stats.buildDate)}</span>
          <span className="support-stat-label">Build Date</span>
        </div>
        <div className="support-stat">
          <span className="support-stat-number">{stats.nodeVersion}</span>
          <span className="support-stat-label">Node Version</span>
        </div>
        <div className="support-stat">
          <span className="support-stat-number">{stats.docusaurusVersion}</span>
          <span className="support-stat-label">Docusaurus</span>
        </div>
      </div>
    </>
  );
}