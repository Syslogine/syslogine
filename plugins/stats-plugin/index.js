const fs = require('fs');
const path = require('path');
const glob = require('glob');
const matter = require('gray-matter');

module.exports = function(context, options) {
  return {
    name: 'stats-plugin',
    async loadContent() {
      const siteDir = context.siteDir;
      
      try {
        const docsPath = path.join(siteDir, 'docs');
        let docFiles = [];
        
        // Try glob patterns first
        const patterns = [
          path.join(siteDir, 'docs', '**', '*.{md,mdx}'),
          path.join(siteDir, 'docs', '**', '*.md'),
        ];
        
        for (const pattern of patterns) {
          const files = glob.sync(pattern, { windowsPathsNoEscape: true });
          if (files.length > 0 && docFiles.length === 0) {
            docFiles = files;
            break;
          }
        }

        // Fallback to manual directory walk
        if (docFiles.length === 0) {
          function walkDir(dir) {
            const items = fs.readdirSync(dir);
            for (const item of items) {
              const fullPath = path.join(dir, item);
              const stat = fs.statSync(fullPath);
              if (stat.isDirectory()) {
                walkDir(fullPath);
              } else if (item.endsWith('.md') || item.endsWith('.mdx')) {
                docFiles.push(fullPath);
              }
            }
          }
          walkDir(docsPath);
        }

        // Enhanced data collection
        const allTags = new Set();
        const categories = new Map(); // Count per category
        const tagFrequency = new Map(); // Count per tag
        const monthlyCreation = new Map(); // Files created per month
        const wordDistribution = []; // Word count per file
        const fileTypes = new Map(); // .md vs .mdx count
        const authorStats = new Map(); // Authors mentioned
        const languageStats = new Map(); // Programming languages mentioned
        
        let totalWords = 0;
        let totalReadingTime = 0;
        let lastModified = new Date(0);
        let oldestFile = new Date();
        let longestFile = { path: '', words: 0 };
        let shortestFile = { path: '', words: Infinity };
        let totalLines = 0;
        let totalCharacters = 0;
        let totalCodeBlocks = 0;
        let totalImages = 0;
        let totalLinks = 0;
        let totalHeadings = 0;

        // Common programming languages to detect
        const programmingLanguages = ['javascript', 'python', 'bash', 'shell', 'java', 'cpp', 'c++', 'php', 'ruby', 'go', 'rust', 'typescript', 'sql', 'html', 'css', 'yaml', 'json', 'xml', 'dockerfile', 'powershell', 'vim', 'nginx', 'apache'];

        for (const file of docFiles) {
          try {
            const content = fs.readFileSync(file, 'utf8');
            const parsed = matter(content);
            const stats = fs.statSync(file);
            
            // File extension stats
            const ext = path.extname(file);
            fileTypes.set(ext, (fileTypes.get(ext) || 0) + 1);
            
            // Tags analysis
            if (parsed.data.tags) {
              if (Array.isArray(parsed.data.tags)) {
                parsed.data.tags.forEach(tag => {
                  allTags.add(tag);
                  tagFrequency.set(tag, (tagFrequency.get(tag) || 0) + 1);
                });
              } else if (typeof parsed.data.tags === 'string') {
                parsed.data.tags.split(',').forEach(tag => {
                  tag = tag.trim();
                  allTags.add(tag);
                  tagFrequency.set(tag, (tagFrequency.get(tag) || 0) + 1);
                });
              }
            }

            // Category analysis
            const relativePath = path.relative(siteDir, file);
            const pathParts = relativePath.split(path.sep);
            if (pathParts.length > 1) {
              const category = pathParts[1];
              categories.set(category, (categories.get(category) || 0) + 1);
            }

            // Author analysis
            if (parsed.data.author) {
              authorStats.set(parsed.data.author, (authorStats.get(parsed.data.author) || 0) + 1);
            }

            // Content analysis
            const contentText = parsed.content;
            const lines = contentText.split('\n');
            const words = contentText.split(/\s+/).filter(word => word.length > 0);
            const characters = contentText.length;
            
            totalWords += words.length;
            totalLines += lines.length;
            totalCharacters += characters;
            totalReadingTime += Math.ceil(words.length / 200);
            wordDistribution.push(words.length);

            // Track longest and shortest files
            if (words.length > longestFile.words) {
              longestFile = { path: path.basename(file), words: words.length };
            }
            if (words.length < shortestFile.words) {
              shortestFile = { path: path.basename(file), words: words.length };
            }

            // Count code blocks
            const codeBlocks = (contentText.match(/```/g) || []).length / 2;
            totalCodeBlocks += codeBlocks;

            // Count images
            const images = (contentText.match(/!\[.*?\]\(.*?\)/g) || []).length;
            totalImages += images;

            // Count links
            const links = (contentText.match(/\[.*?\]\(.*?\)/g) || []).length - images; // Subtract images
            totalLinks += links;

            // Count headings
            const headings = (contentText.match(/^#+\s/gm) || []).length;
            totalHeadings += headings;

            // Detect programming languages
            programmingLanguages.forEach(lang => {
              const regex = new RegExp(`\`\`\`${lang}\\b|\\b${lang}\\b`, 'gi');
              const matches = (contentText.match(regex) || []).length;
              if (matches > 0) {
                languageStats.set(lang, (languageStats.get(lang) || 0) + matches);
              }
            });

            // Monthly creation stats
            const creationDate = parsed.data.date || stats.birthtime;
            const monthKey = `${creationDate.getFullYear()}-${String(creationDate.getMonth() + 1).padStart(2, '0')}`;
            monthlyCreation.set(monthKey, (monthlyCreation.get(monthKey) || 0) + 1);

            // Track modification dates
            if (stats.mtime > lastModified) {
              lastModified = stats.mtime;
            }
            if (stats.birthtime < oldestFile) {
              oldestFile = stats.birthtime;
            }

          } catch (error) {
            // Skip problematic files
          }
        }

        // Calculate advanced metrics
        const avgWordsPerDoc = docFiles.length > 0 ? Math.round(totalWords / docFiles.length) : 0;
        const avgReadingTimePerDoc = docFiles.length > 0 ? Math.round(totalReadingTime / docFiles.length) : 0;
        const avgLinesPerDoc = docFiles.length > 0 ? Math.round(totalLines / docFiles.length) : 0;
        const avgCharactersPerDoc = docFiles.length > 0 ? Math.round(totalCharacters / docFiles.length) : 0;
        
        // Sort and get top items
        const topTags = Array.from(tagFrequency.entries())
          .sort((a, b) => b[1] - a[1])
          .slice(0, 10);
        
        const topCategories = Array.from(categories.entries())
          .sort((a, b) => b[1] - a[1]);
        
        const topLanguages = Array.from(languageStats.entries())
          .sort((a, b) => b[1] - a[1])
          .slice(0, 10);

        // Calculate content quality metrics
        const filesWithImages = docFiles.filter(file => {
          try {
            const content = fs.readFileSync(file, 'utf8');
            return (content.match(/!\[.*?\]\(.*?\)/g) || []).length > 0;
          } catch { return false; }
        }).length;

        const filesWithCode = docFiles.filter(file => {
          try {
            const content = fs.readFileSync(file, 'utf8');
            return content.includes('```');
          } catch { return false; }
        }).length;

        return {
          // Basic counts
          docCount: docFiles.length,
          blogCount: 0,
          pageCount: 0,
          totalPages: docFiles.length,
          
          // Content metrics
          totalWords,
          totalLines,
          totalCharacters,
          totalReadingTime,
          avgWordsPerDoc,
          avgLinesPerDoc,
          avgCharactersPerDoc,
          avgReadingTimePerDoc,
          
          // File analysis
          longestFile,
          shortestFile: shortestFile.words === Infinity ? { path: 'N/A', words: 0 } : shortestFile,
          oldestFile: oldestFile.toISOString(),
          
          // Tags and categories
          tagCount: allTags.size,
          categoryCount: categories.size,
          topTags: topTags.map(([tag, count]) => ({ tag, count })),
          topCategories: topCategories.map(([category, count]) => ({ category, count })),
          
          // Content features
          totalCodeBlocks,
          totalImages,
          totalLinks,
          totalHeadings,
          filesWithImages,
          filesWithCode,
          codeBlockPercentage: docFiles.length > 0 ? Math.round((filesWithCode / docFiles.length) * 100) : 0,
          imagePercentage: docFiles.length > 0 ? Math.round((filesWithImages / docFiles.length) * 100) : 0,
          
          // Programming languages
          topLanguages: topLanguages.map(([lang, count]) => ({ language: lang, mentions: count })),
          
          // File types
          fileTypes: Object.fromEntries(fileTypes),
          
          // Authors
          authorCount: authorStats.size,
          topAuthors: Array.from(authorStats.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([author, count]) => ({ author, articles: count })),
          
          // Time analysis
          monthlyCreation: Object.fromEntries(monthlyCreation),
          contentAge: Math.round((Date.now() - oldestFile.getTime()) / (1000 * 60 * 60 * 24)), // days
          
          // Quality metrics
          avgImagesPerDoc: docFiles.length > 0 ? Math.round(totalImages / docFiles.length * 10) / 10 : 0,
          avgCodeBlocksPerDoc: docFiles.length > 0 ? Math.round(totalCodeBlocks / docFiles.length * 10) / 10 : 0,
          avgLinksPerDoc: docFiles.length > 0 ? Math.round(totalLinks / docFiles.length * 10) / 10 : 0,
          
          // Dates
          lastUpdate: lastModified.toISOString(),
          buildDate: new Date().toISOString(),
          buildTime: Date.now(),
          nodeVersion: process.version,
          docusaurusVersion: 'Classic'
        };

      } catch (error) {
        return { error: error.message };
      }
    },

    async contentLoaded({content, actions}) {
      const {setGlobalData} = actions;
      setGlobalData(content);
    },
  };
};