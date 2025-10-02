---
sidebar_position: 5
title: "apk dot"
sidebar_label: "apk dot"
description: "Generate dependency graphs in Alpine Linux - visualize package dependencies with apk dot command and GraphViz DOT format."
keywords:
  - "apk dot"
  - "dependency graph"
  - "package dependencies"
  - "graphviz"
  - "visualize dependencies"
tags:
  - alpine
  - apk-dot
  - dependencies
  - graphs
  - visualization
slug: /linux/alpine/software/package-management/use-package-tools/apk-dot
---

# apk dot

Generate dependency graphs in DOT format.

## Syntax

```bash
apk dot [OPTIONS] [PACKAGE...]
```

## Description

Generates dependency graphs in GraphViz DOT format for visualization of package relationships.

## Examples

**Generate dependency graph:**
```bash
apk dot nginx > nginx.dot
```

**Create PNG image:**
```bash
apk dot nginx | dot -Tpng > nginx-deps.png
```

**Create SVG:**
```bash
apk dot nginx | dot -Tsvg > nginx-deps.svg
```

**Create PDF:**
```bash
apk dot nginx | dot -Tpdf > nginx-deps.pdf
```

**Multiple packages:**
```bash
apk dot nginx mysql | dot -Tpng > deps.png
```

**All installed packages:**
```bash
apk dot > all-deps.dot
```

## Required Tools

Install GraphViz for rendering:

```bash
apk add graphviz
```

## Output Formats

GraphViz supports multiple formats:

- **PNG** - Raster image
- **SVG** - Scalable vector
- **PDF** - Portable document
- **DOT** - Plain text format

## Return Values

| Code | Meaning |
|------|---------|
| 0 | Success |

## Notes

- Useful for understanding dependencies
- Requires graphviz for rendering
- Large graphs can be complex
- Good for documentation

## Common Usage

**Visualize dependencies:**
```bash
apk add graphviz
apk dot nginx | dot -Tpng > deps.png
```

**Save DOT file:**
```bash
apk dot nginx > nginx.dot
```

**Multiple formats:**
```bash
apk dot nginx | dot -Tpng > deps.png
apk dot nginx | dot -Tsvg > deps.svg
```

## Related Commands

- [apk info](../search-packages/apk-info) - Show dependencies
- [Package Tools](./)

## See Also

- [GraphViz Documentation](https://graphviz.org/)
- `man apk-dot`
- `man dot`