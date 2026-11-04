(() => {
  const products = window.CHEST_PRODUCTS || [];
  const params = new URLSearchParams(window.location.search);
  const product = products.find((item) => item.id === params.get("id")) || products[0];
  if (!product) return;

  const setText = (selector, value) => {
    const element = document.querySelector(selector);
    if (element) element.textContent = value;
  };
  document.title = `${product.name} — ТЕКСТ ДЛЯ ЗАМЕНЫ`;
  setText("#breadcrumb-title", product.name);
  setText("#product-category", `МОДЕЛЬ ${product.id.slice(-2)}`);
  setText("#product-title", product.name);
  setText("#product-description", product.description);
  setText("#product-price", window.formatChestPrice(product.price));
  const requestProduct = document.querySelector("#request-product");
  if (requestProduct) requestProduct.value = product.name;

  const specs = document.querySelector("#product-specs");
  if (specs) {
    const values = [["Материал", product.wood], ["Покрытие", product.finish], ["Размеры", product.size], ["Фурнитура", product.hardware]];
    specs.replaceChildren(...values.flatMap(([label, value]) => {
      const term = document.createElement("dt");
      term.textContent = label;
      const definition = document.createElement("dd");
      definition.textContent = value;
      return [term, definition];
    }));
  }
})();
