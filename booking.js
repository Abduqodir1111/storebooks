document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('booking-form');
  const successMsg = document.getElementById('success-message');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const quantity = document.getElementById('quantity').value.trim();

    if (!name || !phone || !address || !quantity) {
      alert("Пожалуйста, заполните все поля.");
      return;
    }

    const message = `
🚨 <b>Новое бронирование</b>:
👤 Имя: ${name}
📞 Телефон: ${phone}
🏠 Адрес: ${address}
🎮 Кол-во мест: ${quantity}
🕒 Время: ${new Date().toLocaleString()}
`;

    const token = '7601774753:AAEo6MkBupH__OQWnKhB_AsG6ieE1LO4bsI';
    const chat_id = '257363972';
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: chat_id,
        text: message,
        parse_mode: 'HTML'
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.ok) {
        successMsg.style.display = 'block';
        form.reset();
      } else {
        alert("❌ Ошибка при отправке данных.");
      }
    })
    .catch(error => {
      console.error("Telegram Error:", error);
      alert("❌ Не удалось связаться с сервером.");
    });
  });
});
