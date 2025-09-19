// src/components/FileLinkedVariantContent.jsx
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './MultiVariantContent.css';

const FileLinkedVariantContent = ({ 
  variants,
  defaultSelection = {}
}) => {
  const [selection, setSelection] = useState({
    os: defaultSelection.os || Object.keys(variants)[0],
    version: defaultSelection.version || '',
    environment: defaultSelection.environment || 'desktop',
    level: defaultSelection.level || 'beginner'
  });
  
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get available options
  const getAvailableVersions = () => {
    return variants[selection.os] ? Object.keys(variants[selection.os]) : [];
  };

  const getAvailableEnvironments = () => {
    const osVersions = variants[selection.os];
    if (!osVersions || !osVersions[selection.version]) return [];
    return Object.keys(osVersions[selection.version]);
  };

  const getAvailableLevels = () => {
    const path = variants[selection.os]?.[selection.version]?.[selection.environment];
    return path ? Object.keys(path) : [];
  };

  // Auto-select when parent changes
  useEffect(() => {
    const availableVersions = getAvailableVersions();
    if (availableVersions.length > 0 && !availableVersions.includes(selection.version)) {
      setSelection(prev => ({ ...prev, version: availableVersions[0] }));
    }
  }, [selection.os]);

  useEffect(() => {
    const availableEnvs = getAvailableEnvironments();
    if (availableEnvs.length > 0 && !availableEnvs.includes(selection.environment)) {
      setSelection(prev => ({ ...prev, environment: availableEnvs[0] }));
    }
  }, [selection.os, selection.version]);

  useEffect(() => {
    const availableLevels = getAvailableLevels();
    if (availableLevels.length > 0 && !availableLevels.includes(selection.level)) {
      setSelection(prev => ({ ...prev, level: availableLevels[0] }));
    }
  }, [selection.os, selection.version, selection.environment]);

  // Load content from file
  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      setError(null);
      
      const filePath = variants[selection.os]?.[selection.version]?.[selection.environment]?.[selection.level];
      
      if (!filePath) {
        setContent('# Content not available\n\nThis combination is not yet documented.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/${filePath}`);
        if (response.ok) {
          const markdownContent = await response.text();
          setContent(markdownContent);
          setError(null);
        } else {
          setError(`File not found: ${filePath}`);
          setContent('');
        }
      } catch (error) {
        setError(`Failed to load: ${filePath} - ${error.message}`);
        setContent('');
      }
      
      setLoading(false);
    };

    loadContent();
  }, [selection, variants]);

  const updateSelection = (key, value) => {
    setSelection(prev => ({ ...prev, [key]: value }));
    
    // Update URL for SEO
    const url = new URL(window.location);
    url.searchParams.set(key, value);
    window.history.replaceState({}, '', url);
  };

  // Custom components for ReactMarkdown
  const markdownComponents = {
    code({node, inline, className, children, ...props}) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={tomorrow}
          language={match[1]}
          PreTag="div"
          customStyle={{
            margin: '1rem 0',
            borderRadius: '6px',
            fontSize: '0.9em'
          }}
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
    h1: ({children}) => <h1 className="variant-h1">{children}</h1>,
    h2: ({children}) => <h2 className="variant-h2">{children}</h2>,
    h3: ({children}) => <h3 className="variant-h3">{children}</h3>,
    pre: ({children}) => <pre className="variant-pre">{children}</pre>
  };

  return (
    <div className="multi-variant-container">
      {/* Variant Selectors */}
      <div className="variant-selectors">
        
        {/* OS Selector */}
        <div className="selector-group">
          <label className="selector-label">Operating System</label>
          <div className="selector-buttons">
            {Object.keys(variants).map(os => (
              <button
                key={os}
                className={`selector-btn os-btn ${selection.os === os ? 'active' : ''}`}
                onClick={() => updateSelection('os', os)}
              >
                {os}
              </button>
            ))}
          </div>
        </div>

        {/* Version Selector */}
        <div className="selector-group">
          <label className="selector-label">Version</label>
          <div className="selector-buttons">
            {getAvailableVersions().map(version => (
              <button
                key={version}
                className={`selector-btn version-btn ${selection.version === version ? 'active' : ''}`}
                onClick={() => updateSelection('version', version)}
              >
                {version}
              </button>
            ))}
          </div>
        </div>

        {/* Environment Selector */}
        <div className="selector-group">
          <label className="selector-label">Environment</label>
          <div className="selector-buttons">
            {getAvailableEnvironments().map(env => (
              <button
                key={env}
                className={`selector-btn env-btn ${selection.environment === env ? 'active' : ''}`}
                onClick={() => updateSelection('environment', env)}
              >
                {env}
              </button>
            ))}
          </div>
        </div>

        {/* Level Selector */}
        <div className="selector-group">
          <label className="selector-label">Guide Level</label>
          <div className="selector-buttons">
            {getAvailableLevels().map(level => (
              <button
                key={level}
                className={`selector-btn level-btn ${selection.level === level ? 'active' : ''}`}
                onClick={() => updateSelection('level', level)}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Current Selection Display */}
      <div className="current-selection">
        <span className="selection-path">
          {selection.os} → {selection.version} → {selection.environment} → {selection.level}
        </span>
      </div>

      {/* Content Display */}
      <div className="variant-content">
        {loading ? (
          <div className="loading">
            <div className="loading-spinner"></div>
            Loading content...
          </div>
        ) : error ? (
          <div className="error-message">
            <h3>Error Loading Content</h3>
            <p>{error}</p>
            <p>Please check if the file exists and try again.</p>
          </div>
        ) : (
          <ReactMarkdown components={markdownComponents}>
            {content}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
};

export default FileLinkedVariantContent;