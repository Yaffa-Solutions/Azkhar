const createHeader = () => {
  const header = createHtmlElement("header", "", "", { id: "main-header" });

  const container = createHtmlElement("div", "header-container");
  const logo1 = createHtmlElement("div", "logo");

  const logoImg = createHtmlElement("img", "", "", {
    src: "../assets/images/logo.png",
    alt: "أذكار المسلم",
  });
  const logo = createHtmlElement("div", "logo");
  const h1 = createHtmlElement("h1");
  h1.innerHTML = `أذكار <span>المسلم</span>`;
  customAppendChild(logo, h1, logo1);

  const mobileBtn = createHtmlElement("button", "mobile-menu-btn", "", {
    id: "mobile-menu-btn",
  });
  const iconBars = createHtmlElement("i", "fas fa-bars");
  customAppendChild(mobileBtn, iconBars);

  customAppendChild(logo1, logoImg);

  const nav = createHtmlElement("nav", "", "", { id: "main-nav" });
  const ul = createHtmlElement("ul");

  function createNavItem(href, iconClass, text, extraClass = "") {
    const li = createHtmlElement("li");
    const a = createHtmlElement("a", extraClass, "", { href });
    const icon = createHtmlElement("i", iconClass);
    customAppendChild(a, icon, document.createTextNode(" " + text));
    li.appendChild(a);
    return li;
  }

  customAppendChild(
    ul,
    createNavItem("#", "fas fa-home", "الرئيسية"),
    createNavItem("#azkar", "fas fa-book-quran", "الأذكار"),
    createNavItem("#", "fas fa-heart", "المفضلة"),
    createNavItem("#", "fas fa-tasks", "قائمة المهام"),
    createNavItem("#", "fas fa-book-open", "المقالات"),
    createNavItem("#", "fas fa-sign-in-alt", "تسجيل الدخول", "login-btn")
  );

  customAppendChild(nav, ul);
  customAppendChild(container, logo, mobileBtn, nav);
  customAppendChild(header, container);

  return header;
};

const createFooter = () => {
  const footer = createHtmlElement("footer");
  const container = createHtmlElement("div", "container");

  const footerContent = createHtmlElement("div", "footer-content");

  const col1 = createHtmlElement("div", "footer-column");
  const h3Col1 = createHtmlElement("h3", "", "موقع أذكار المسلم");
  const pCol1 = createHtmlElement(
    "p",
    "",
    "منصة إلكترونية متكاملة لمساعدة المسلمين على المداومة على ذكر الله تعالى في جميع الأوقات."
  );

  customAppendChild(col1, h3Col1, pCol1);

  function createFooterLinksColumn(title, links) {
    const col = createHtmlElement("div", "footer-column");
    const h3 = createHtmlElement("h3", "", title);
    const ul = createHtmlElement("ul", "footer-links");

    links.forEach(({ href, text }) => {
      const li = createHtmlElement("li");
      const a = createHtmlElement("a", "", "", { href });
      const icon = createHtmlElement("i", "fas fa-arrow-left");
      a.appendChild(icon);
      a.appendChild(document.createTextNode(" " + text));
      li.appendChild(a);
      ul.appendChild(li);
    });

    customAppendChild(col, h3, ul);
    return col;
  }

  const quickLinks = [
    { href: "#", text: "الصفحة الرئيسية" },
    { href: "#azkar", text: "أذكار المسلم" },
    { href: "#", text: "الأذكار المفضلة" },
    { href: "#", text: "قائمة المهام" },
  ];

  const col2 = createFooterLinksColumn("روابط سريعة", quickLinks);

  customAppendChild(footerContent, col1, col2);

  const copyrightDiv = createHtmlElement("div", "copyright");
  const copyrightP = createHtmlElement(
    "p",
    "",
    "© 2023 موقع أذكار المسلم. جميع الحقوق محفوظة."
  );
  customAppendChild(copyrightDiv, copyrightP);

  customAppendChild(container, footerContent, copyrightDiv);
  customAppendChild(footer, container);

  return footer;
};

const setupHeaderInteractions = () => {
  const header = document.getElementById("main-header");
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mainNav = document.getElementById("main-nav");
  const navLinks = document.querySelectorAll("#main-nav ul li a");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  mobileMenuBtn.addEventListener("click", function () {
    mainNav.classList.toggle("active");
    if (mainNav.classList.contains("active")) {
      mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
    } else {
      mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 992) {
        mainNav.classList.remove("active");
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });
  });
};

const createHeroBanner = () => {
  const section = createHtmlElement("section", "hero-banner");

  const content = createHtmlElement("div", "hero-content");

  const title = createHtmlElement("h1");
  title.textContent = "وأكثر من ذكري عسى ان يفتح بين يديك";

  const paragraph = createHtmlElement("p");
  paragraph.textContent =
    "موقع متكامل لذكر الله تعالى وتحصيل الأجر والثواب في كل لحظة";

  const button = createHtmlElement("a", "btn", "", { href: "#azkar" });
  button.innerHTML = 'ابدأ الذكر الآن <i class="fas fa-arrow-left"></i>';

  // Create moving banner
  const movingBanner = createHtmlElement("div", "moving-banner");
  const bannerContent = createHtmlElement("div", "moving-banner-content");
  bannerContent.textContent =
    "﷽ • سبحان الله وبحمده سبحان الله العظيم • ﷽ • لا إله إلا الله محمد رسول الله • ﷽ • أستغفر الله وأتوب إليه • ﷽";
  movingBanner.appendChild(bannerContent);

  customAppendChild(content, title, paragraph, button);
  customAppendChild(section, content, movingBanner);

  return section;
};

const createFeaturesSection = () => {
  const featuresData = [
    {
      icon: "fas fa-book-quran",
      title: "أذكار متنوعة",
      description:
        "مجموعة شاملة من الأذكار اليومية بأقسام منظمة وسهلة التصفح مع إمكانية التصفية حسب النوع والوقت",
    },
    {
      icon: "fas fa-tasks",
      title: "عداد التكرار",
      description:
        "عداد تكرار لكل ذكر لمساعدتك على إتمام العدد المطلوب مع حفظ إحصائياتك الشخصية",
    },
    {
      icon: "fas fa-bell",
      title: "تذكيرات دورية",
      description:
        "تذكيرك بذكر الله كل 30 دقيقة مع إمكانية تخصيص الفترات والأذكار حسب رغبتك",
    },
    {
      icon: "fas fa-clipboard-list",
      title: "قائمة مهام الأذكار",
      description:
        "أنشئ قائمة مهام خاصة بك لأذكار تريد التركيز عليها وتتبع تقدمك اليومي",
    },
    {
      icon: "fas fa-heart",
      title: "الأذكار المفضلة",
      description: "احفظ أذكارك المفضلة في مكان واحد للوصول السريع والمباشر",
    },
    {
      icon: "fas fa-book-open",
      title: "مقالات إسلامية",
      description:
        "مكتبة متكاملة من المقالات المفيدة حول فضل الذكر وأهميته في حياة المسلم",
    },
  ];

  const section = createHtmlElement("section", "section", "", {
    id: "features",
  });
  const container = createHtmlElement("div", "container");
  const title = createHtmlElement(
    "h2",
    "section-title",
    "مميزات موقع أذكار المسلم"
  );

  const featuresWrapper = createHtmlElement("div", "features");

  featuresData.forEach((feature) => {
    const card = createHtmlElement("div", "feature-card");
    const iconDiv = createHtmlElement("div", "feature-icon");
    const icon = createHtmlElement("i", feature.icon);
    const h3 = createHtmlElement("h3", "", feature.title);
    const p = createHtmlElement("p", "", feature.description);

    customAppendChild(iconDiv, icon);
    customAppendChild(card, iconDiv, h3, p);
    featuresWrapper.appendChild(card);
  });

  customAppendChild(container, title, featuresWrapper);
  section.appendChild(container);

  return section;
};

const createRandomZekrSection = () => {
  const section = createHtmlElement("section", "section");
  const container = createHtmlElement("div", "container");
  const randomZekrDiv = createHtmlElement("div", "random-zekr");

  const h2 = createHtmlElement("h2", "", "ذكر عشوائي");
  const p = createHtmlElement(
    "p",
    "",
    '"اللهم إني أسألك علماً نافعاً، ورزقاً طيباً، وعملاً متقبلاً"'
  );

  customAppendChild(randomZekrDiv, h2, p);
  customAppendChild(container, randomZekrDiv);
  section.appendChild(container);

  return section;
};

const updateRandomZekr = () => {
  const randomZekrElement = document.querySelector(".random-zekr");
  const azkar = [
    "سبحان الله وبحمده، سبحان الله العظيم",
    "لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير",
    "أستغفر الله العظيم الذي لا إله إلا هو الحي القيوم وأتوب إليه",
    "اللهم صل على محمد وعلى آل محمد كما صليت على إبراهيم وعلى آل إبراهيم إنك حميد مجيد",
    "حسبي الله لا إله إلا هو عليه توكلت وهو رب العرش العظيم",
    "اللهم إني أسألك علماً نافعاً، ورزقاً طيباً، وعملاً متقبلاً",
    "اللهم إني أعوذ بك من الهم والحزن، والعجز والكسل، والجبن والبخل، وضلع الدين وغلبة الرجال",
    "اللهم إني أعوذ بك من العجز والكسل، والجبن والهرم، والبخل، وأعوذ بك من عذاب القبر، ومن فتنة المحيا والممات",
    "اللهم آتنا في الدنيا حسنة وفي الآخرة حسنة وقنا عذاب النار",
    "اللهم إني أعوذ بك من زوال نعمتك، وتحول عافيتك، وفجاءة نقمتك، وجميع سخطك",
  ];

  const randomIndex = Math.floor(Math.random() * azkar.length);
  randomZekrElement.textContent = `"${azkar[randomIndex]}"`;
};

const createArticlesSection = () => {
  const articlesData = [
    {
      img: "https://images.unsplash.com/photo-1568219656418-15c329312bf1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      alt: "فضل الذكر",
      category: "فضائل الأذكار",
      title: "فضل الذكر في القرآن والسنة",
      excerpt:
        "تعرف على فضل ذكر الله كما ورد في الكتاب والسنة وأثره في حياة المسلم اليومية وفي الآخرة",
      link: "#",
    },
    {
      img: "https://images.unsplash.com/photo-1519817650390-64a93db51149?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      alt: "أذكار الصباح والمساء",
      category: "أذكار اليوم",
      title: "أذكار الصباح والمساء الكاملة",
      excerpt:
        "دليل شامل لأذكار الصباح والمساء الصحيحة مع شرح معانيها وفضائلها وكيفية المداومة عليها",
      link: "#",
    },
    {
      img: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      alt: "المداومة على الأذكار",
      category: "نصائح عملية",
      title: "كيف تحافظ على أذكارك اليومية؟",
      excerpt:
        "10 نصائح عملية تساعدك على المداومة على الأذكار وعدم نسيانها في زحمة الحياة اليومية",
      link: "#",
    },
  ];

  const section = createHtmlElement("section", "section articles-section");
  const container = createHtmlElement("div", "container");
  const title = createHtmlElement("h2", "section-title", "مقالات مختارة");

  const articlesGrid = createHtmlElement("div", "articles-grid");

  articlesData.forEach((article) => {
    const card = createHtmlElement("div", "article-card");

    const imgWrapper = createHtmlElement("div", "article-image");
    const img = createHtmlElement("img", "", "", {
      src: article.img,
      alt: article.alt,
    });
    imgWrapper.appendChild(img);

    const content = createHtmlElement("div", "article-content");
    const category = createHtmlElement(
      "span",
      "article-category",
      article.category
    );
    const h3 = createHtmlElement("h3", "", article.title);
    const excerpt = createHtmlElement("p", "article-excerpt", article.excerpt);
    const link = createHtmlElement("a", "read-more", `اقرأ المزيد `, {
      href: article.link,
    });
    const icon = createHtmlElement("i", "fas fa-arrow-left");
    link.appendChild(icon);

    customAppendChild(content, category, h3, excerpt, link);
    customAppendChild(card, imgWrapper, content);
    articlesGrid.appendChild(card);
  });

  const showMoreBtnWrapper = createHtmlElement("div", "show-more-btn");
  const showMoreBtn = createHtmlElement("a", "btn", "عرض جميع المقالات", {
    href: "#",
  });
  const btnIcon = createHtmlElement("i", "fas fa-arrow-left");
  showMoreBtn.appendChild(btnIcon);
  showMoreBtnWrapper.appendChild(showMoreBtn);

  customAppendChild(container, title, articlesGrid, showMoreBtnWrapper);
  section.appendChild(container);

  return section;
};
