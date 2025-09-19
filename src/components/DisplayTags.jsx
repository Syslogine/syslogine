import React from 'react';

const DisplayTags = ({ tags }) => {
  if (!tags || tags.length === 0) return null;
  
  const getTagClass = (tag) => {
    const lowerTag = tag.toLowerCase();
    
    if (lowerTag.match(/^v[\d.]+$/)) return 'version-tag';
    if (lowerTag.match(/^\d{4}$/)) return 'year-tag';
    if (['desktop', 'server', 'cloud', 'iot'].includes(lowerTag)) return 'environment-tag';
    if (['almalinux', 'ubuntu', 'debian', 'kali'].includes(lowerTag)) return 'os-tag';
    if (['administration', 'installation', 'security'].includes(lowerTag)) return 'type-tag';
    return 'generic-tag';
  };
  
  const handleTagClick = (tag) => {
    // Optie 1: Open zoekpagina met tag filter
    const searchUrl = `/search?q=${encodeURIComponent(tag)}`;
    window.open(searchUrl, '_blank');
    
    // Optie 2: Als je een custom filter wilt
    // window.location.href = `/docs/tags/${tag}`;
    
    // Optie 3: Console log voor debugging
    console.log(`Clicked tag: ${tag}`);
  };
  
  return (
    <div className="display-tags-container">
      {tags.map((tag, index) => (
        <span 
          key={index} 
          className={`display-tag clickable-display-tag ${getTagClass(tag)}`}
          onClick={() => handleTagClick(tag)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleTagClick(tag);
            }
          }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export default DisplayTags;