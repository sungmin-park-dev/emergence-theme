---
title: Readings
layout: custom-page
icon: fas fa-book-open
order: 3
permalink: /readings/
slug: readings
description: "Paper reviews, tech explorations, and perspectives"
---

<div class="readings-container">
  {% include tag-nebula.html id="readings-tag-cloud" title="tags" %}

  <!-- 카테고리 필터 + 정렬 -->
  <div class="readings-controls">
    <div class="category-filter">
      <button class="filter-btn active" data-category="all">All</button>
      <button class="filter-btn" data-category="papers"><i class="fas fa-file-alt"></i> Papers</button>
      <button class="filter-btn" data-category="tech"><i class="fas fa-wrench"></i> Tech</button>
      <button class="filter-btn" data-category="perspectives"><i class="fas fa-lightbulb"></i> Perspectives</button>
    </div>
    <div class="readings-sort">
      <label for="readings-sort-select">Sort by:</label>
      <select id="readings-sort-select" class="sort-select">
        <option value="date-desc">Newest First</option>
        <option value="date-asc">Oldest First</option>
        <option value="title">Title (A-Z)</option>
      </select>
    </div>
  </div>

  <!-- 카드 그리드 -->
  <div class="readings-grid">
    {% assign all_readings = site.readings %}
    {% if all_readings.size > 0 %}
      {% for item in all_readings %}
        {% include reading-card.html reading=item %}
      {% endfor %}
    {% else %}
      <div class="empty-state">
        <div class="empty-icon">
          <i class="fas fa-book-open"></i>
        </div>
        <h3>No readings yet</h3>
        <p>Paper reviews, tech explorations, and perspectives will appear here.</p>
      </div>
    {% endif %}
  </div>
</div>

<script src="{{ '/assets/js/tag-filter.js' | relative_url }}"></script>
<script>
const tagFilter = new TagFilter('.reading-card', '#readings-tag-cloud');

const readingsGrid = document.querySelector('.readings-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const sortSelect = document.getElementById('readings-sort-select');

// Sort
function getReadingCards() {
  return Array.from(document.querySelectorAll('.reading-card'));
}

function applySort(sortBy) {
  const cards = getReadingCards();
  cards.sort((a, b) => {
    switch (sortBy) {
      case 'date-asc': return a.dataset.date.localeCompare(b.dataset.date);
      case 'title':    return a.dataset.title.localeCompare(b.dataset.title);
      case 'date-desc':
      default:         return b.dataset.date.localeCompare(a.dataset.date);
    }
  });
  cards.forEach(card => readingsGrid.appendChild(card));
}

sortSelect.addEventListener('change', () => applySort(sortSelect.value));

// Category filter
filterBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    const category = this.getAttribute('data-category');
    filterBtns.forEach(b => b.classList.remove('active'));
    this.classList.add('active');

    getReadingCards().forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      card.style.display = (category === 'all' || cardCategory === category) ? 'flex' : 'none';
    });
  });
});

// Default sort
applySort('date-desc');
</script>
