---
sidebar_position: 2
title: "Environment Variables | Alpine Linux"
sidebar_label: "Environment Variables"
description: "Set up environment variables, configure shell environments, and manage system-wide and user-specific variables in Alpine Linux."
keywords:
  - "alpine linux environment variables"
  - "alpine shell configuration"
  - "alpine PATH configuration"
tags:
  - alpine-linux
  - environment-variables
  - shell-configuration
slug: /linux/alpine/configuration/environment-variables
hide_table_of_contents: true
---

# Environment Variables

Alpine Linux environment variable management follows Unix conventions while supporting containerized and minimal deployment scenarios. Proper environment configuration ensures applications have the resources and paths they need to function correctly.

## Available Topics

<div className="container">
  <div className="row">
    <div className="col col--6">
      <div className="card">
        <div className="card__header">
          <h3>🌍 System-wide Variables</h3>
        </div>
        <div className="card__body">
          <p>Configure global environment variables in <code>/etc/profile</code> and <code>/etc/environment</code> for all users</p>
        </div>
        <div className="card__footer">
          <a href="./system-wide-variables/" className="button button--primary">Read more</a>
        </div>
      </div>
    </div>
    
    <div className="col col--6">
      <div className="card">
        <div className="card__header">
          <h3>👤 User-specific Variables</h3>
        </div>
        <div className="card__body">
          <p>Set user environment variables in `~/.profile`, `~/.bashrc`, and shell-specific configuration files</p>
        </div>
        <div className="card__footer">
          <a href="./user-specific-variables/" className="button button--primary">Read more</a>
        </div>
      </div>
    </div>
  </div>

  <div className="row">
    <div className="col col--6">
      <div className="card">
        <div className="card__header">
          <h3>🛤️ PATH Configuration</h3>
        </div>
        <div className="card__body">
          <p>Configure <code>PATH</code> variable, manage binary locations, and ensure proper command resolution in Alpine</p>
        </div>
        <div className="card__footer">
          <a href="./path-configuration/" className="button button--primary">Read more</a>
        </div>
      </div>
    </div>
    
    <div className="col col--6">
      <div className="card">
        <div className="card__header">
          <h3>🐚 Shell Environment</h3>
        </div>
        <div className="card__body">
          <p>Configure shell-specific environments, manage shell options, and customize command-line experience</p>
        </div>
        <div className="card__footer">
          <a href="./shell-environment/" className="button button--primary">Read more</a>
        </div>
      </div>
    </div>
  </div>

  <div className="row">
    <div className="col col--6">
      <div className="card">
        <div className="card__header">
          <h3>🐳 Container Variables</h3>
        </div>
        <div className="card__body">
          <p>Manage environment variables in Alpine containers, Docker environment configuration, and container-specific settings</p>
        </div>
        <div className="card__footer">
          <a href="./container-variables/" className="button button--primary">Read more</a>
        </div>
      </div>
    </div>
    
    <div className="col col--6">
      <div className="card">
        <div className="card__header">
          <h3>🔧 Application Variables</h3>
        </div>
        <div className="card__body">
          <p>Configure application-specific environment variables, manage service environments, and application configuration</p>
        </div>
        <div className="card__footer">
          <a href="./application-variables/" className="button button--primary">Read more</a>
        </div>
      </div>
    </div>
  </div>

  <div className="row">
    <div className="col col--6">
      <div className="card">
        <div className="card__header">
          <h3>🔒 Secure Variables</h3>
        </div>
        <div className="card__body">
          <p>Manage sensitive environment variables, secure configuration, and protect credentials in environment settings</p>
        </div>
        <div className="card__footer">
          <a href="./secure-variables/" className="button button--primary">Read more</a>
        </div>
      </div>
    </div>
    
    <div className="col col--6">
      <div className="card">
        <div className="card__header">
          <h3>🛠️ Development Variables</h3>
        </div>
        <div className="card__body">
          <p>Set up development environment variables, configure build tools, and manage development-specific settings</p>
        </div>
        <div className="card__footer">
          <a href="./development-variables/" className="button button--primary">Read more</a>
        </div>
      </div>
    </div>
  </div>
</div>

---

*Alpine's clean environment variable management supports both traditional Unix workflows and modern containerized deployments.*