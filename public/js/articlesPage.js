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

  const articles = await fetchArticlesData();
  const section = createHtmlElement("section", "section articles-section");
  const container = createHtmlElement("div", "container");
  const title = createHtmlElement("h2", "section-title", "جميع المقالات");

  const articlesGrid = createHtmlElement("div", "articles-grid");

   

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

const renderArticleDetailPage = async (id) => {
  const main = document.querySelector("main");
  main.innerHTML = "";

  const article = await fetchArticleById(id);
  if (!article) {
    main.innerHTML = "<p>المقال غير موجود</p>";
    return;
  }

  const section = createHtmlElement("section", "article-detail");
  section.style.display = "flex";
  section.style.justifyContent = "center";
  section.style.padding = "40px 20px";

  const card = createHtmlElement("div", "article-card-single");
  card.style.maxWidth = "600px";
  card.style.width = "100%";
  card.style.background = "#fff";
  card.style.borderRadius = "8px";
  card.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
  card.style.textAlign = "center";

  const img = createHtmlElement("img", "", "", { src: article.img_url, alt: article.title });
  img.style.width = "100%";

  const title = createHtmlElement("h2", "", article.title);
  title.style.margin = "20px 0 10px";

  const p = createHtmlElement("p", "", article.content);
  p.style.padding = "0 20px 20px";
  p.style.lineHeight = "1.6";

  customAppendChild(card, img, title, p);
  section.appendChild(card);
  main.appendChild(section);
};
