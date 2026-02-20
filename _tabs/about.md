---
title: About
layout: custom-page
icon: fas fa-info-circle
order: 4
permalink: /about/
slug: about
description: "Background, research interests, and contact"
---

{% assign p = site.data.profile %}

<div class="about-content">
  <!-- Profile Card -->
  <div class="profile-card">
    <div class="profile-image-container">
      <img src="{{ p.avatar }}" alt="{{ p.name }}" class="profile-image">
    </div>
    <div class="profile-info">
      <h2 class="profile-name">{{ p.name }}</h2>
      <div class="profile-name-korean">{{ p.name_ko }}</div>
      <div class="profile-affiliation">
        {{ p.program }}<br>
        {{ p.institution }}
      </div>
      {% if p.status %}
      <div class="profile-status">{{ p.status }}</div>
      {% endif %}
    </div>
  </div>

  <!-- Research Interests -->
  <div class="about-section">
    <h3 class="section-title">Research Interests</h3>
    <div class="section-content">
      <p>My research interests lie at the fascinating intersection of <strong>physics</strong> and <strong>machine learning</strong>, where I explore how computational methods can unlock new insights into complex quantum systems.</p>

      <p><strong>Physics</strong></p>
      <ul>
        {% for item in p.research.physics %}
        <li>{{ item }}</li>
        {% endfor %}
      </ul>

      <p><strong>Machine Learning</strong></p>
      <ul>
        {% for item in p.research.ml %}
        <li>{{ item }}</li>
        {% endfor %}
      </ul>
    </div>
  </div>

  <!-- Personal Interests -->
  <div class="about-section">
    <h3 class="section-title">Personal Interests</h3>
    <div class="section-content">
      <p>Beyond research, I enjoy <strong>coding</strong> and <strong>traveling</strong>. There's something particularly satisfying about implementing complex physical phenomena in code and creating visualizations that make abstract concepts tangible.</p>

      <p>I find great joy in:</p>
      <ul>
        <li>Building computational tools for physics research</li>
        <li>Exploring new places and cultures</li>
        <li>Learning about emerging technologies at the intersection of science and engineering</li>
      </ul>
    </div>
  </div>

  <!-- Philosophy -->
  <div class="about-section">
    <h3 class="section-title">Philosophy</h3>
    <div class="section-content">
      <p>I believe that the most exciting discoveries happen at the boundaries between disciplines. By combining the rigor of physics with the power of modern computational tools, we can tackle problems that were previously intractable and gain new perspectives on fundamental questions about nature.</p>
    </div>
  </div>

  <!-- Contact / CV -->
  <div class="about-section text-center">
    <h3 class="section-title">Contact</h3>
    <div class="section-content">
      <p>Feel free to reach out if you have questions, collaboration ideas, or just want to chat about physics, machine learning, or anything in between!</p>

      <!-- Social Links -->
      <div class="social-links">
        {% if p.social.github %}
        <a href="{{ p.social.github }}" target="_blank" rel="noopener" class="social-icon" title="GitHub">
          <i class="fab fa-github"></i>
        </a>
        {% endif %}
        {% if p.social.linkedin %}
        <a href="{{ p.social.linkedin }}" target="_blank" rel="noopener" class="social-icon" title="LinkedIn">
          <i class="fab fa-linkedin"></i>
        </a>
        {% endif %}
        {% if p.email %}
        <a href="mailto:{{ p.email }}" class="social-icon" title="Email">
          <i class="fas fa-envelope"></i>
        </a>
        {% endif %}
        {% if p.social.instagram %}
        <a href="{{ p.social.instagram }}" target="_blank" rel="noopener" class="social-icon" title="Instagram">
          <i class="fab fa-instagram"></i>
        </a>
        {% endif %}
      </div>

      {% if p.cv_url != "" %}
      <a href="{{ p.cv_url }}" class="cv-button" target="_blank">
        <i class="fas fa-download"></i>Download CV (PDF)
      </a>
      {% else %}
      <span class="cv-button">
        <i class="fas fa-download"></i>Download CV (PDF)
      </span>
      {% endif %}
    </div>
  </div>
</div>
