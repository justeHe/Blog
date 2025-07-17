document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('doc-search');
  const searchBtn = document.getElementById('doc-search-btn');
  const webSearchCheckbox = document.getElementById('web-search-checkbox');
  const docLinks = Array.from(document.querySelectorAll('.doc-card'));

  function performSearch() {
    const searchTerm = searchInput.value.trim();
    if (!searchTerm) {
      clearSearch();
      return;
    }

    if (webSearchCheckbox.checked) {
      // Perform a web search
      const query = encodeURIComponent(`${searchTerm} official documentation`);
      window.open(`https://www.google.com/search?q=${query}`, '_blank');
    } else {
      // Perform a local search
      filterLocalDocs(searchTerm.toLowerCase());
    }
  }

  function filterLocalDocs(searchTerm) {
    let found = false;
    
    // Remove previous highlights
    docLinks.forEach(link => {
      link.classList.remove('doc-card-highlight', 'doc-card-hidden');
    });

    const results = docLinks.filter(link => {
      const title = link.querySelector('.doc-card-title').textContent.toLowerCase();
      const desc = link.querySelector('.doc-card-desc').textContent.toLowerCase();
      return title.includes(searchTerm) || desc.includes(searchTerm);
    });

    if (results.length > 0) {
      found = true;
      searchInput.classList.remove('not-found');
      
      docLinks.forEach(link => {
        if (!results.includes(link)) {
          link.classList.add('doc-card-hidden');
        }
      });

      // Highlight the first result
      results[0].classList.add('doc-card-highlight');

    } else {
      searchInput.classList.add('not-found');
      // Show all cards again if nothing is found
      docLinks.forEach(link => {
        link.classList.remove('doc-card-hidden');
      });
    }
  }
  
  function clearSearch() {
    docLinks.forEach(link => {
      link.classList.remove('doc-card-highlight', 'doc-card-hidden');
    });
    searchInput.classList.remove('not-found');
  }

  searchBtn.addEventListener('click', performSearch);
  searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      performSearch();
    }
  });

  // Clear search when input is empty
  searchInput.addEventListener('input', () => {
    if (searchInput.value.trim() === '') {
      clearSearch();
    }
  });
});
 