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
    { href: "#", text: "المقالات" },
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
