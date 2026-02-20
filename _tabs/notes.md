---
title: Notes
layout: custom-page
icon: fas fa-book
order: 2
permalink: /notes/
slug: notes
description: "Study notes across physics, AI, and computational methods"
---

<div class="notes-container">
  {% include tag-nebula.html id="notes-tag-cloud" title="tags" %}
  <!-- 카테고리 필터 + 정렬 -->
  <div class="notes-controls">
    <div class="category-filter">
      <button class="filter-btn active" data-category="all">All</button>
      <button class="filter-btn" data-category="physics"><i class="fas fa-atom"></i> Physics</button>
      <button class="filter-btn" data-category="ai-physics"><i class="fas fa-brain"></i> AI × Physics</button>
      <button class="filter-btn" data-category="machine-learning"><i class="fas fa-network-wired"></i> Machine Learning</button>
      <button class="filter-btn" data-category="computation"><i class="fas fa-microchip"></i> Computation</button>
    </div>
    <div class="notes-sort">
      <label for="notes-sort-select">Sort by:</label>
      <select id="notes-sort-select" class="sort-select">
        <option value="default">Default</option>
        <option value="date-desc">Newest First</option>
        <option value="date-asc">Oldest First</option>
        <option value="title">Title (A-Z)</option>
      </select>
    </div>
  </div>

  <!-- 노트 리스트 -->
  <div class="notes-list">
    {% assign all_notes = site.notes %}

    {% if all_notes.size > 0 %}
      {% for post in all_notes %}
        {% include note-card.html note=post %}
      {% endfor %}
    {% else %}
      <div class="empty-state">
        <div class="empty-icon">
          <i class="fas fa-pen-fancy"></i>
        </div>
        <h3>No notes yet</h3>
        <p>Physics, AI × Physics, Machine Learning, and Computation notes will appear here.</p>
      </div>
    {% endif %}
  </div>
</div>

<script src="{{ '/assets/js/tag-filter.js' | relative_url }}"></script>
<script>
// Initialize tag filter
const tagFilter = new TagFilter('.note-card', '#notes-tag-cloud');

const notesList = document.querySelector('.notes-list');
const filterBtns = document.querySelectorAll('.filter-btn');
const sortSelect = document.getElementById('notes-sort-select');

// Category order for default sort
const categoryOrder = { 'physics': 1, 'ai-physics': 2, 'machine-learning': 3, 'computation': 4 };

// Get all note cards
function getNoteCards() {
  return Array.from(document.querySelectorAll('.note-card'));
}

// Apply current sort to visible cards
function applySort(sortBy) {
  const cards = getNoteCards();

  cards.sort((a, b) => {
    switch (sortBy) {
      case 'date-desc':
        return b.dataset.date.localeCompare(a.dataset.date);
      case 'date-asc':
        return a.dataset.date.localeCompare(b.dataset.date);
      case 'title':
        return a.dataset.title.localeCompare(b.dataset.title);
      case 'default':
      default: {
        const catA = categoryOrder[a.dataset.category] || 99;
        const catB = categoryOrder[b.dataset.category] || 99;
        if (catA !== catB) return catA - catB;
        const dateDiff = b.dataset.date.localeCompare(a.dataset.date);
        if (dateDiff !== 0) return dateDiff;
        return a.dataset.title.localeCompare(b.dataset.title);
      }
    }
  });

  cards.forEach(card => notesList.appendChild(card));
}

// Category filter
filterBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    const category = this.getAttribute('data-category');

    filterBtns.forEach(b => b.classList.remove('active'));
    this.classList.add('active');

    getNoteCards().forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      card.style.display = (category === 'all' || cardCategory === category) ? 'block' : 'none';
    });
  });
});

// Sort
sortSelect.addEventListener('change', () => {
  applySort(sortSelect.value);
});

// Apply default sort on load
applySort('default');
</script>
