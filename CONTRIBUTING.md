# Contributing to Syslogine

Thank you for your interest in contributing to Syslogine! This guide will help you get started with contributing to our system administration documentation platform.

## Table of Contents

- [Getting Started](#getting-started)
- [Ways to Contribute](#ways-to-contribute)
- [Documentation Standards](#documentation-standards)
- [Development Setup](#development-setup)
- [Submission Process](#submission-process)
- [Style Guidelines](#style-guidelines)
- [Community Guidelines](#community-guidelines)

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Git
- Basic understanding of Markdown
- Familiarity with system administration topics

### First Steps

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/syslogine.git`
3. Install dependencies: `npm install`
4. Start development server: `npm start`

## Ways to Contribute

### 1. Documentation Content

**High Priority Areas:**
- Complete missing guides in Linux distributions (Ubuntu, Fedora, RHEL, etc.)
- Windows Server administration guides
- Virtualization platform tutorials
- Security hardening procedures
- Troubleshooting guides

**Content Types:**
- Step-by-step tutorials
- Configuration examples
- Best practices guides
- Troubleshooting procedures
- Command reference sheets

### 2. Technical Improvements

- Fix broken links or outdated information
- Improve site performance
- Enhance search functionality
- Mobile responsiveness improvements
- Accessibility enhancements

### 3. Community Contributions

- Report bugs and issues
- Suggest new features
- Review and test documentation
- Translate content (future feature)
- Community moderation

## Documentation Standards

### File Structure

```
docs/
├── linux/
│   ├── debian/
│   │   ├── administration/
│   │   │   ├── user-management/
│   │   │   │   ├── index.md
│   │   │   │   ├── create-users/
│   │   │   │   │   └── index.md
```

### File Naming Convention

- Use lowercase with hyphens: `user-management.md`
- Each category should have an `index.md`
- Descriptive, specific names: `configure-static-ip.md` not `network.md`

### Content Requirements

**Every guide must include:**
- Clear title and description
- Prerequisites section
- Step-by-step instructions
- Code examples with syntax highlighting
- Expected outcomes
- Troubleshooting section
- Related links

### Front Matter Template

```yaml
---
sidebar_position: 1
title: "Your Guide Title"
sidebar_label: "Short Label"
description: "Brief description of what this guide covers"
keywords:
  - "relevant keyword 1"
  - "relevant keyword 2"
  - "relevant keyword 3"
tags:
  - primary-tag
  - secondary-tag
  - category-tag
difficulty: "beginner|intermediate|advanced"
last_updated: "2025-01-15"
author: "Contributor Name"
slug: /path/to/your/guide
---
```

## Development Setup

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

### Environment Configuration

Create `.env.local` for local development:
```env
# Local development settings
ALGOLIA_API_KEY=your_key_here
GOOGLE_ANALYTICS_ID=your_id_here
```

## Submission Process

### For New Contributors

1. **Start Small**: Begin with minor fixes or additions
2. **Check Existing Issues**: Look for "good first issue" labels
3. **Discuss Major Changes**: Open an issue before large contributions

### Pull Request Process

1. **Create Feature Branch**: `git checkout -b feature/add-ubuntu-guides`
2. **Follow Naming**: Use descriptive branch names
3. **Write Clear Commits**: Use conventional commit format
4. **Test Locally**: Ensure your changes build correctly
5. **Submit PR**: Use the PR template provided

### PR Requirements

- [ ] Follows documentation standards
- [ ] Includes proper front matter
- [ ] Links work correctly
- [ ] Mobile-friendly formatting
- [ ] Spelling and grammar checked
- [ ] Screenshots included (if applicable)

### Review Process

1. Automated checks (build, links, spelling)
2. Technical review by maintainers
3. Content accuracy verification
4. Community feedback period
5. Final approval and merge

## Style Guidelines

### Writing Style

- **Clear and Concise**: Use simple, direct language
- **Active Voice**: "Configure the firewall" not "The firewall should be configured"
- **Consistent Terminology**: Use the same terms throughout
- **Step-by-Step**: Number sequential actions
- **User-Focused**: Address the reader directly

### Code Examples

```bash
# Always include comments for complex commands
sudo systemctl enable apache2

# Show expected output when helpful
$ systemctl status apache2
● apache2.service - The Apache HTTP Server
   Loaded: loaded (/lib/systemd/system/apache2.service; enabled)
   Active: active (running) since Mon 2025-01-15 10:30:45 UTC
```

### Images and Screenshots

- Use PNG format for screenshots
- Include alt text for accessibility
- Keep file sizes reasonable (<500KB)
- Store in `static/img/` with descriptive names
- Include captions when necessary

### Markdown Guidelines

- Use ATX-style headers (`#` not underlines)
- Include blank lines around headers
- Use fenced code blocks with language specification
- Link to related documentation
- Use tables for structured data

## Community Guidelines

### Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help newcomers learn
- Assume good intentions
- Report inappropriate behavior

### Communication

- **GitHub Issues**: Bug reports, feature requests
- **GitHub Discussions**: General questions, ideas
- **Pull Requests**: Code/content contributions
- **Email**: Security issues, private matters

### Recognition

Contributors are recognized through:
- Author attribution in documentation
- Contributor list in repository
- Community acknowledgments
- Future contributor badges

## Quality Assurance

### Before Submitting

- [ ] Test all commands on target systems
- [ ] Verify links are working
- [ ] Check for typos and grammar
- [ ] Ensure formatting is consistent
- [ ] Validate against style guide

### Review Checklist

- Technical accuracy
- Completeness of information
- Clarity of instructions
- Proper categorization
- SEO optimization
- Accessibility compliance

## Getting Help

### Resources

- [Docusaurus Documentation](https://docusaurus.io/docs)
- [Markdown Guide](https://www.markdownguide.org/)
- [Project Roadmap](/roadmap)

### Support Channels

- GitHub Issues for bugs/features
- GitHub Discussions for questions

## License

By contributing to Syslogine, you agree that your contributions will be licensed under the MIT License.

---

**Ready to contribute?** Check out our [good first issues](https://github.com/yarpii/syslogine/labels/good%20first%20issue) or join our [discussions](https://github.com/yarpii/syslogine/discussions) to get started!