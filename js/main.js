(function () {
  "use strict";

  const header = document.getElementById("siteHeader");
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  const backToTop = document.getElementById("backToTop");

  function onScroll() {
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 8);
    }
    if (backToTop) {
      backToTop.classList.toggle("visible", window.scrollY > 520);
    }
  }

  window.addEventListener("scroll", onScroll);
  onScroll();

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", function () {
      const isOpen = mainNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "إغلاق القائمة" : "فتح القائمة");
    });

    mainNav.addEventListener("click", function (event) {
      if (event.target.matches("a")) {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("in-view");
    });
  }

  document.querySelectorAll(".filter-bar").forEach(function (bar) {
    const buttons = bar.querySelectorAll(".filter-btn");
    const section = bar.closest(".section");
    const items = section ? section.querySelectorAll(".filter-item") : [];

    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        const filter = button.getAttribute("data-filter");

        buttons.forEach(function (btn) {
          btn.classList.remove("active");
        });
        button.classList.add("active");

        items.forEach(function (item) {
          const category = item.getAttribute("data-category");
          const show = filter === "all" || filter === category;
          item.classList.toggle("hidden", !show);
        });
      });
    });
  });

  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const fields = ["name", "email", "service", "message"];
      let isValid = true;
      const data = {};

      fields.forEach(function (id) {
        const input = document.getElementById(id);
        const error = input.parentElement.querySelector(".error");
        const value = input.value.trim();
        data[id] = value;

        error.textContent = "";

        if (!value) {
          error.textContent = "هذا الحقل مطلوب.";
          isValid = false;
          return;
        }

        if (id === "email") {
          const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
          if (!emailOk) {
            error.textContent = "يرجى إدخال بريد إلكتروني صحيح.";
            isValid = false;
          }
        }
      });

      if (!isValid) return;

      const subject = encodeURIComponent("طلب تواصل - مركز نعمة رسام");
      const body = encodeURIComponent(
        "الاسم: " + data.name + "\n" +
        "البريد: " + data.email + "\n" +
        "نوع الطلب: " + data.service + "\n\n" +
        "الرسالة:\n" + data.message
      );

      window.location.href = "mailto:info@namahrassam.org?subject=" + subject + "&body=" + body;
    });
  }
})();
