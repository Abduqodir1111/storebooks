document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalImg = document.getElementById('modal-img');
  const modalDescription = document.getElementById('modal-description');
  const modalClose = document.getElementById('modal-close');
  const modalBookBtn = document.getElementById('modal-book-btn');

  // Открытие модального окна при клике на карточку
  document.querySelectorAll('.book-card').forEach(card => {
    card.addEventListener('click', () => {
      const title = card.getAttribute('data-title') || card.querySelector('h3').textContent;
      const description = card.getAttribute('data-description') || '';
      const img = card.getAttribute('data-img') || '';

      modalTitle.textContent = title;
      modalDescription.textContent = description;
      modalImg.src = img;
      modalImg.alt = title;

      modal.classList.add('show');
    });
  });

  // Закрытие модального окна
  modalClose.addEventListener('click', () => {
    modal.classList.remove('show');
  });

  // Закрытие модального окна при клике вне контента
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('show');
    }
  });

  // При клике на кнопку "Забронировать" переходим на страницу бронирования с передачей названия книги
  modalBookBtn.addEventListener('click', () => {
    const bookTitle = encodeURIComponent(modalTitle.textContent);
    window.location.href = `booking.html?book=${bookTitle}`;
  });
});
// header-load.js
document.addEventListener('DOMContentLoaded', () => {
  fetch('header.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header-placeholder').innerHTML = data;
    })
    .catch(err => console.error('Ошибка загрузки хедера:', err));
});

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const bookTitle = urlParams.get('book') || '';
  document.getElementById('book-title').value = decodeURIComponent(bookTitle);

  const form = document.getElementById('booking-form');
  const successMsg = document.getElementById('success-message');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
      bookTitle: form['book-title'].value,
      name: form['client-name'].value,
      phone: form['client-phone'].value,
      address: form['client-address'].value,
      quantity: form['client-quantity'].value,
    };

    // Отправляем данные на сервер или API Telegram бота (поясню ниже)
    const res = await sendBookingToTelegram(data);

    if (res) {
      successMsg.style.display = 'block';
      form.reset();
      // Можно через некоторое время скрыть сообщение и/или перенаправить
    } else {
      alert('Ошибка отправки заявки. Попробуйте позже.');
    }
  });
});

// Функция отправки в Telegram (пример для Telegram Bot API)
async function sendBookingToTelegram(data) {
  const token = 'ВАШ_ТОКЕН_БОТА'; // Получить у BotFather
  const chatId = 'ВАШ_CHAT_ID'; // ID вашего чата (можно получить через @userinfobot)
  const message = `
Новое бронирование:
Книга: ${data.bookTitle}
Имя: ${data.name}
Телефон: ${data.phone}
Адрес: ${data.address}
Количество: ${data.quantity}
  `;

  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });
    const result = await response.json();
    return result.ok;
  } catch (error) {
    console.error('Ошибка отправки в Telegram:', error);
    return false;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('burger');
  const navLinks = document.querySelector('.nav-links');

  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }
});

// Добавляем класс .reveal ко всем нужным элементам
document.addEventListener("DOMContentLoaded", () => {
  const elementsToReveal = document.querySelectorAll(
    "main > * , .book-card, form, section, article, .main-content > *"
  );

  elementsToReveal.forEach(el => {
    el.classList.add("reveal");
  });

  revealOnScroll(); // запускаем проверку при загрузке
});

function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");
  const windowHeight = window.innerHeight;

  reveals.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 100;

    if (elementTop < windowHeight - revealPoint) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
