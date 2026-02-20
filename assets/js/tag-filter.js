// ============================================
// Tag Filter - Reusable tag cloud component
// ============================================
// Usage: new TagFilter('.card-selector', '.tag-selector')

class TagFilter {
  constructor(cardSelector, tagContainerSelector) {
    this.cards = document.querySelectorAll(cardSelector);
    this.tagContainer = document.querySelector(tagContainerSelector);
    this.activeTag = 'all';

    if (this.tagContainer) {
      this.setupToggle();
      this.init();
    }
  }

  // Setup toggle button functionality
  setupToggle() {
    const box = document.querySelector(`#${this.tagContainer.id}-toggle`);
    this.toggleBox = box;

    if (box) {
      box.addEventListener('click', (e) => {
        // Only toggle if clicking the box itself, not tag buttons inside
        if (e.target.closest('.tag-btn')) return;

        const isExpanded = box.classList.toggle('expanded');
        this.tagContainer.classList.toggle('expanded', isExpanded);
      });
    }
  }

  // Close the tag cloud
  closeTagCloud() {
    if (this.toggleBox) {
      this.toggleBox.classList.remove('expanded');
      this.tagContainer.classList.remove('expanded');
    }
  }

  // Extract and count tags from cards
  extractTags() {
    const tagCounts = {};

    this.cards.forEach(card => {
      const tags = card.querySelectorAll('.project-tag, .note-tag, .reading-tag');
      tags.forEach(tag => {
        const tagText = tag.textContent.trim();
        tagCounts[tagText] = (tagCounts[tagText] || 0) + 1;
      });
    });

    // Sort by frequency (descending)
    return Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1]);
  }

  // Generate tag cloud HTML
  generateTagCloud() {
    const sortedTags = this.extractTags();

    if (sortedTags.length === 0) return;

    // Cache current tags for comparison
    this.cachedTags = sortedTags;

    // Get max frequency for color intensity
    const maxCount = sortedTags[0][1];

    // Clear existing content
    this.tagContainer.innerHTML = '';

    // Add "All" button (always first)
    const allBtn = this.createTagButton('all', this.cards.length, 1, this.activeTag === 'all');
    this.tagContainer.appendChild(allBtn);

    // Add tag buttons (sorted by frequency, color intensity reflects usage)
    sortedTags.forEach(([tag, count]) => {
      const intensity = count / maxCount; // 0-1 scale
      const btn = this.createTagButton(tag, count, intensity, this.activeTag === tag);
      this.tagContainer.appendChild(btn);
    });
  }

  // Create individual tag button
  createTagButton(tag, count, intensity, isActive) {
    const btn = document.createElement('button');
    btn.className = `tag-btn${isActive ? ' active' : ''}`;
    btn.dataset.tag = tag;
    btn.innerHTML = `${tag} <span class="tag-count">(${count})</span>`;
    btn.style.setProperty('--tag-intensity', intensity.toFixed(2));

    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent box toggle when clicking tag
      this.filterByTag(tag);
    });

    return btn;
  }

  // Filter cards by selected tag
  filterByTag(selectedTag) {
    this.activeTag = selectedTag;

    // Update active button state
    this.tagContainer.querySelectorAll('.tag-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tag === selectedTag);
    });

    // Filter cards
    this.cards.forEach(card => {
      if (selectedTag === 'all') {
        card.style.display = '';
      } else {
        const tags = Array.from(card.querySelectorAll('.project-tag, .note-tag, .reading-tag'))
          .map(t => t.textContent.trim());
        card.style.display = tags.includes(selectedTag) ? '' : 'none';
      }
    });
  }

  // Initialize tag cloud
  init() {
    this.generateTagCloud();
  }

  // Public method to refresh (when cards change)
  refresh() {
    const newTags = this.extractTags();

    // Check if tags have changed
    const tagsChanged = !this.cachedTags ||
      this.cachedTags.length !== newTags.length ||
      !this.cachedTags.every((cached, i) =>
        cached[0] === newTags[i][0] && cached[1] === newTags[i][1]
      );

    // Only regenerate if tags actually changed
    if (tagsChanged) {
      this.generateTagCloud();
    } else {
      // Just update counts without regenerating DOM
      this.updateTagCounts(newTags);
    }
  }

  // Update tag counts without DOM regeneration
  updateTagCounts(sortedTags) {
    if (sortedTags.length === 0) return;

    const maxCount = sortedTags[0][1];

    sortedTags.forEach(([tag, count]) => {
      const btn = this.tagContainer.querySelector(`[data-tag="${tag}"]`);
      if (btn) {
        const countSpan = btn.querySelector('.tag-count');
        if (countSpan) {
          countSpan.textContent = `(${count})`;
        }
      }
    });
  }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TagFilter;
}
