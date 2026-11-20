// 페이지 동작: 헤더 배경, 모바일 메뉴, 현재 섹션 표시, 스크롤 등장 효과
(function () {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  const navLinks = nav.querySelectorAll("a");

  // 스크롤하면 헤더에 배경을 깐다
  function updateHeader() {
    header.classList.toggle("scrolled", window.scrollY > 20);
  }
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  // 모바일 메뉴 열기/닫기
  function setMenu(open) {
    nav.classList.toggle("open", open);
    header.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
  }
  toggle.addEventListener("click", function () {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });
  // 메뉴 항목을 누르면 메뉴를 닫는다
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () { setMenu(false); });
  });
  // Esc 키로 메뉴 닫기
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenu(false);
  });

  // 지금 보고 있는 섹션의 메뉴를 강조
  const sections = document.querySelectorAll("main section[id]");
  const sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      navLinks.forEach(function (link) {
        link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach(function (s) { sectionObserver.observe(s); });

  // 요소가 화면에 들어오면 서서히 나타나게 한다
  const revealObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(function (el, i) {
    // 같은 묶음 안의 요소는 살짝씩 늦게 등장
    el.style.transitionDelay = (i % 4) * 80 + "ms";
    revealObserver.observe(el);
  });

  // 푸터 연도 자동 표시
  document.getElementById("year").textContent = new Date().getFullYear();
})();
