(() => {
  const config = window.CHEST_SITE_CONFIG || {};
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector("#mobile-nav");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      menu.hidden = expanded;
    });
    menu.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        toggle.setAttribute("aria-expanded", "false");
        menu.hidden = true;
      }
    });
  }

  const about = document.querySelector("#about-copy");
  if (about && config.aboutText?.trim()) about.textContent = config.aboutText.trim();

  const setContact = (key, value, scheme) => {
    const element = document.querySelector(`[data-contact="${key}"]`);
    if (!element || !value?.trim()) return;
    const link = document.createElement("a");
    link.textContent = value.trim();
    link.href = `${scheme}:${scheme === "tel" ? value.replace(/[^\d+]/g, "") : value.trim()}`;
    element.replaceWith(link);
  };
  setContact("phone", config.phone, "tel");
  setContact("email", config.contactEmail, "mailto");

  const setChannel = (key, label, url) => {
    const element = document.querySelector(`[data-channel="${key}"]`);
    if (!element) return;
    const cleanUrl = url?.trim();
    if (!cleanUrl) return;
    try {
      const parsed = new URL(cleanUrl);
      if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return;
      const link = document.createElement("a");
      link.textContent = label;
      link.href = parsed.href;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      element.replaceWith(link);
    } catch {
      // Invalid URLs stay as editable placeholders until corrected in config.js.
    }
  };
  setChannel("telegram", "Telegram", config.telegramUrl);
  setChannel("vk", "ВКонтакте", config.vkUrl);
  setChannel("other", config.otherLabel?.trim() || "Другой канал", config.otherUrl);
})();
