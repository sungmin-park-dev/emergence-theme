---
title: Projects
layout: custom-page
icon: fas fa-code
order: 1
permalink: /projects/
slug: projects
description: "Research implementations and development projects"
---

{% include tag-nebula.html id="projects-tag-cloud" title="tags" %}

<div class="projects-controls">
  <div class="projects-sort">
    <label for="sort-select">Sort by:</label>
    <select id="sort-select" class="sort-select">
      <option value="order">Default</option>
      <option value="title">Title (A-Z)</option>
      <option value="date-desc">Newest First</option>
      <option value="date-asc">Oldest First</option>
      <option value="status">Status</option>
    </select>
  </div>
</div>

<div class="projects-grid">
  {% assign completed_projects = site.projects | where: "status", "completed" | sort: "order" %}
  {% assign inprogress_projects = site.projects | where: "status", "in-progress" | sort: "order" %}
  {% assign planned_projects = site.projects | where: "status", "planned" | sort: "order" %}
  {% assign sorted_projects = completed_projects | concat: inprogress_projects | concat: planned_projects %}
  {% for project in sorted_projects %}
    {% include project-card.html project=project %}
  {% endfor %}
</div>

<div class="projects-empty" style="display: none;">
  <i class="fas fa-folder-open"></i>
  <p>No projects found</p>
</div>

<script src="{{ '/assets/js/tag-filter.js' | relative_url }}"></script>
<script>
// Initialize tag filter
const tagFilter = new TagFilter('.project-card', '#projects-tag-cloud');

// Project elements
const projectsGrid = document.querySelector('.projects-grid');
const projectsEmpty = document.querySelector('.projects-empty');
const sortSelect = document.getElementById('sort-select');

// Check and show/hide empty state
function updateEmptyState() {
  const visibleCards = Array.from(document.querySelectorAll('.project-card'))
    .filter(card => card.style.display !== 'none');

  if (visibleCards.length === 0) {
    projectsGrid.style.display = 'none';
    projectsEmpty.style.display = 'flex';
  } else {
    projectsGrid.style.display = 'grid';
    projectsEmpty.style.display = 'none';
  }
}

// Override tag filter to update empty state
const originalFilterByTag = tagFilter.filterByTag.bind(tagFilter);
tagFilter.filterByTag = function(selectedTag) {
  originalFilterByTag(selectedTag);
  updateEmptyState();
};

// Sort functionality
sortSelect.addEventListener('change', () => {
  const sortBy = sortSelect.value;
  const cards = Array.from(document.querySelectorAll('.project-card'));

  cards.sort((a, b) => {
    switch(sortBy) {
      case 'title':
        return a.dataset.title.localeCompare(b.dataset.title);
      case 'date-desc':
        return new Date(b.dataset.date) - new Date(a.dataset.date);
      case 'date-asc':
        return new Date(a.dataset.date) - new Date(b.dataset.date);
      case 'status':
        const statusOrder = { 'completed': 1, 'in-progress': 2, 'planned': 3 };
        return (statusOrder[a.dataset.status] || 4) - (statusOrder[b.dataset.status] || 4);
      case 'order':
      default:
        return parseInt(a.dataset.order) - parseInt(b.dataset.order);
    }
  });

  cards.forEach(card => projectsGrid.appendChild(card));
});
</script>
