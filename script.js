document.addEventListener('DOMContentLoaded', () => {
  // --- Модальное окно ---
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalImg = document.getElementById('modal-img');
  const modalDescription = document.getElementById('modal-description');
  const modalClose = document.getElementById('modal-close');
  const modalBookBtn = document.getElementById('modal-book-btn');

  function setupModalOpen(books) {
    books.forEach(card => {
      card.addEventListener('click', () => {
        const title = card.getAttribute('data-title') || card.querySelector('h2').textContent;
        const description = card.getAttribute('data-description') || '';
        const img = card.getAttribute('data-img') || '';

        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modalImg.src = img;
        modalImg.alt = title;

        modal.classList.add('show');
      });
    });
  }

  setupModalOpen(document.querySelectorAll('.book-card'));

  modalClose.addEventListener('click', () => modal.classList.remove('show'));
  window.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('show'); });

  modalBookBtn.addEventListener('click', () => {
    const bookTitle = encodeURIComponent(modalTitle.textContent);
    window.location.href = `booking.html?book=${bookTitle}`;
  });

  // --- Бургер меню ---
  const burger = document.getElementById('burger');
  const navLinks = document.querySelector('.nav-links');
  if (burger && navLinks) {
    burger.addEventListener('click', () => navLinks.classList.toggle('active'));
  }

  // --- Плавное появление элементов при скролле ---
  const elementsToReveal = document.querySelectorAll(
    "main > * , .book-card, form, section, article, .main-content > *"
  );
  elementsToReveal.forEach(el => el.classList.add("reveal"));

  function revealOnScroll() {
    const reveals = document.querySelectorAll(".reveal");
    const windowHeight = window.innerHeight;
    reveals.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - 100) {
        el.classList.add("active");
      }
    });
  }
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();

  // --- Книги, фильтрация, подгрузка ---
  const booksContainer = document.querySelector('.main-content');
  const loadMoreBtn = document.getElementById('load-more-btn');
  const searchInput = document.querySelector('.search-box input');

  const allBooks = Array.from(booksContainer.querySelectorAll('.book-card'));
  let filteredBooks = allBooks.slice();
  let visibleCount = 6;

  function renderBooks() {
    booksContainer.innerHTML = '';

    filteredBooks.slice(0, visibleCount).forEach(book => booksContainer.appendChild(book));

    setupModalOpen(filteredBooks.slice(0, visibleCount));

    loadMoreBtn.style.display = (visibleCount < filteredBooks.length) ? 'block' : 'none';
  }

  function filterBooks(query) {
    query = query.toLowerCase().trim();

    filteredBooks = allBooks.filter(book => {
      const title = (book.dataset.title || book.querySelector('h2').textContent).toLowerCase();
      const description = (book.dataset.description || '').toLowerCase();
      return title.includes(query) || description.includes(query);
    });

    visibleCount = 6;
    renderBooks();
  }

  searchInput.addEventListener('input', () => filterBooks(searchInput.value));

  loadMoreBtn.addEventListener('click', () => {
    visibleCount += 3;
    renderBooks();
  });

  renderBooks();
});

window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('hide'); // запускаем плавное исчезновение

      // через 0.5 сек (длительность transition) скрываем элемент полностью
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }, 2000); // задержка перед исчезновением (2 секунды)
  }
});

