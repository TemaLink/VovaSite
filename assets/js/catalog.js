(() => {
  const grid = document.querySelector("#product-grid");
  const sort = document.querySelector("#sort-products");
  const count = document.querySelector("#catalog-count");
  const search = document.querySelector("#catalog-search");
  const products = window.CHEST_PRODUCTS || [];
  if (!grid || !sort || !count) return;

  const initialQuery = new URLSearchParams(window.location.search).get("q") || "";
  if (search) search.value = initialQuery;

  const render = () => {
    const query = search?.value.trim().toLocaleLowerCase("ru") || "";
    const matchingProducts = products.filter((product) => product.searchIndex.includes(query));
    const sortedProducts = [...matchingProducts];
    switch (sort.value) {
      case "price-asc": sortedProducts.sort((a, b) => a.sortValues.price - b.sortValues.price); break;
      case "price-desc": sortedProducts.sort((a, b) => b.sortValues.price - a.sortValues.price); break;
      case "name": sortedProducts.sort((a, b) => a.sortValues.name.localeCompare(b.sortValues.name, "ru")); break;
    }
    grid.replaceChildren(...sortedProducts.map((product, index) => {
      const article = document.createElement("article");
      article.className = "product-card";
      const link = document.createElement("a");
      link.className = "product-card__link";
      link.href = `product.html?id=${encodeURIComponent(product.id)}`;
      link.setAttribute("aria-label", `${product.name}, ${window.formatChestPrice(product.price)} — открыть карточку товара`);

      const media = document.createElement("div");
      media.className = "product-card__media";
      media.setAttribute("aria-hidden", "true");
      const caption = document.createElement("span");
      caption.className = "placeholder-caption";
      caption.textContent = "Здесь будет фотография";
      const symbol = document.createElement("span");
      symbol.className = "placeholder-icon";
      symbol.textContent = "✳";
      const price = document.createElement("span");
      price.className = "product-card__price";
      price.textContent = window.formatChestPrice(product.price);
      media.append(caption, symbol, price);

      const meta = document.createElement("div");
      meta.className = "product-card__meta";
      const text = document.createElement("div");
      const name = document.createElement("h3");
      name.className = "product-card__name";
      name.textContent = product.name;
      const summary = document.createElement("p");
      summary.className = "product-card__summary";
      summary.textContent = product.summary;
      text.append(name, summary);
      const number = document.createElement("span");
      number.className = "product-card__index";
      number.textContent = String(index + 1).padStart(2, "0");
      meta.append(text, number);
      link.append(media, meta);
      article.append(link);
      return article;
    }));
    count.textContent = query
      ? `Найдено: ${sortedProducts.length}`
      : `${sortedProducts.length} моделей`;
  };

  sort.addEventListener("change", render);
  search?.addEventListener("input", render);
  render();
})();
