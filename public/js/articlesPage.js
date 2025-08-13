const createArticleCard = (article) => {
  const card = createHtmlElement("div", "article-card");

  const imgWrapper = createHtmlElement("div", "article-image");
  const img = createHtmlElement("img", "", "", { src: article.img_url, alt: article.title });
  imgWrapper.appendChild(img);

  const content = createHtmlElement("div", "article-content");
  const category = createHtmlElement("span", "article-category", article.category);
  const h3 = createHtmlElement("h3", "", article.title);
  const excerpt = createHtmlElement("p", "article-excerpt", article.excerpt);
  const link = createHtmlElement("a", "read-more", "اقرأ المزيد", { href: `#article/${article.id}` });
  const icon = createHtmlElement("i", "fas fa-arrow-left");
  link.appendChild(icon);

  customAppendChild(content, category, h3, excerpt, link);
  customAppendChild(card, imgWrapper, content);

  return card;
};
const renderArticlesPage = async () => {
  const main = document.querySelector("main");
  main.innerHTML = "";

  const section = createHtmlElement("section", "section articles-section");
  const container = createHtmlElement("div", "container");
  const title = createHtmlElement("h2", "section-title", "جميع المقالات");

  const articlesGrid = createHtmlElement("div", "articles-grid");

  const articles = await fetchArticlesData(); // دالة لجلب البيانات من السيرفر

  if (articles.length === 0) {
    const emptyMessage = createHtmlElement("p", "empty-message", "لا توجد مقالات حالياً.");
    articlesGrid.appendChild(emptyMessage);
  } else {
    articles.forEach((article) => articlesGrid.appendChild(createArticleCard(article)));
  }

  container.append(title, articlesGrid);
  section.appendChild(container);
  main.appendChild(section);
};
// const renderArticleDetailPage = async (id) => {
//   const main = document.querySelector("main");
//   main.innerHTML = "";

//   const article = await fetchArticleById(id);

//   const section = createHtmlElement("section", "article-detail");
//   const container = createHtmlElement("div", "container");

//   const title = createHtmlElement("h2", "", article.title);
//   const img = createHtmlElement("img", "", "", { src: article.img_url, alt: article.title });
//   const content = createHtmlElement("p", "", article.content);

//   container.append(title, img, content);
//   section.appendChild(container);
//   main.appendChild(section);
// };
