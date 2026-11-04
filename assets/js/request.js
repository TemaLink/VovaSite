(() => {
  const form = document.querySelector("#request-form");
  const status = document.querySelector("#form-status");
  if (!form || !status) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const recipient = window.CHEST_SITE_CONFIG?.orderEmail?.trim();
    if (!recipient || !recipient.includes("@")) {
      status.textContent = "Укажите адрес для заявок в assets/js/config.js — затем форма откроет письмо для отправки.";
      return;
    }

    const data = new FormData(form);
    const subject = `Заявка на сундук: ${data.get("product")}`;
    const body = [
      `Модель: ${data.get("product")}`,
      `Имя: ${data.get("name")}`,
      `Контакт: ${data.get("contact")}`,
      `Комментарий: ${data.get("message") || "не указан"}`
    ].join("\n");
    const mailtoRecipient = encodeURIComponent(recipient).replace(/%40/gi, "@");
    window.location.href = `mailto:${mailtoRecipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    status.textContent = "Письмо подготовлено. Проверьте почтовое приложение и отправьте заявку.";
  });
})();
