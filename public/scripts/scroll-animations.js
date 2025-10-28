/* Relax For You — Scroll reveal (устойчивый к Safari и старым браузерам) */
(function () {
  const doc = document;
  const root = doc.documentElement;

  function arm() {
    root.classList.add("rfy-armed");
  }

  // Проверка IntersectionObserver
  const IO_OK = "IntersectionObserver" in window && "IntersectionObserverEntry" in window;

  function revealGroupIO() {
    const groups = doc.querySelectorAll("[data-reveal-group]");
    if (!groups.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const group = entry.target;
          if (!group || !group.isConnected) continue; // 🧩 Safari fix
          const items = group.querySelectorAll("[data-reveal-item]");
          const delay = Number(group.getAttribute("data-stagger") || 120);
          group.classList.add("in");
          items.forEach((el, j) => {
            el.style.setProperty("--i", j);
            el.style.setProperty("--stagger", delay + "ms");
            el.classList.add("in");
          });
          try {
            io.unobserve(group);
          } catch {}
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    groups.forEach((g) => io.observe(g));
  }

  function revealSinglesIO() {
    const els = doc.querySelectorAll(".reveal,[data-reveal],.fade-up");
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target;
          if (!el || !el.isConnected) continue; // 🧩 Safari fix
          if (el.closest && el.closest("[data-reveal-group]")) {
            io.unobserve(el);
            continue;
          }
          el.classList.add("in");
          try {
            io.unobserve(el);
          } catch {}
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    els.forEach((el) => io.observe(el));
  }

  function safetyAutoIgnite() {
    setTimeout(() => {
      if (!root.classList.contains("rfy-ready")) return;
      const pending = doc.querySelectorAll(
        ".reveal:not(.in),[data-reveal]:not(.in),.fade-up:not(.in),[data-reveal-item]:not(.in)"
      );
      pending.forEach((el) => el.classList.add("in"));
    }, 1200);
  }

  function boot() {
    arm();

    if (!IO_OK) {
      const all = doc.querySelectorAll(".reveal,[data-reveal],.fade-up,[data-reveal-item]");
      all.forEach((el) => el.classList.add("in"));
      return;
    }

    revealGroupIO();
    revealSinglesIO();
    safetyAutoIgnite();
  }

  // 🧩 Гарантированный запуск после DOM и window.onload
  if (document.readyState === "complete") {
    setTimeout(boot, 60);
  } else {
    window.addEventListener("load", boot, { once: true });
  }

  // Повторный автозапуск после прелоадера и вкладки
  doc.addEventListener("rfy:ready", safetyAutoIgnite, { once: true });
  doc.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") safetyAutoIgnite();
  });
})();
