/* ==========================================================================
   TJKT SMART NETWORK - JAVASCRIPT INTERACTIVITY
   Fitur: Sticky Header Scroll, Hero Typing Animation, Scroll Reveal Observer,
          Back to Top Button, dan Navigation Active State Highlight.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
    // ----------------------------------------------------------------------
    // 1. EFEK NAVBAR SAAT DI-SCROLL (GLASSMORPHISM & COMPACT STATE)
    // ----------------------------------------------------------------------
    const header = document.querySelector("header");
    const backToTopBtn = document.getElementById("backToTop");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section");

    function handleScroll() {
        const scrollY = window.scrollY;

        // Tambah/hapus kelas 'scroll' pada header saat di-scroll lebih dari 50px
        if (header) {
            if (scrollY > 50) {
                header.classList.add("scroll");
            } else {
                header.classList.remove("scroll");
            }
        }

        // Tampilkan/sembunyikan tombol 'Back to Top' jika scroll lebih dari 300px
        if (backToTopBtn) {
            if (scrollY > 300) {
                backToTopBtn.classList.add("show");
            } else {
                backToTopBtn.classList.remove("show");
            }
        }

        // Highlight menu navigasi yang aktif sesuai bagian/section di layar
        let currentSection = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    }

    // Pasang listener pada event scroll window
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Jalankan sekali saat inisialisasi

    // ----------------------------------------------------------------------
    // 2. TOMBOL BACK TO TOP (KEMBALI KE ATAS)
    // ----------------------------------------------------------------------
    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // ----------------------------------------------------------------------
    // 3. ANIMASI MENGETIK (TYPING ANIMATION) PADA JUDUL HERO
    // ----------------------------------------------------------------------
    const titleElement = document.querySelector(".hero h2");
    if (titleElement) {
        const textToType = "Solusi Jaringan Cepat dan Stabil";
        titleElement.innerHTML = ""; // Bersihkan teks awal
        let charIndex = 0;

        function ketik() {
            if (charIndex < textToType.length) {
                titleElement.innerHTML += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(ketik, 65);
            }
        }

        // Beri sedikit jeda sebelum animasi ketik dimulai
        setTimeout(ketik, 300);
    }

    // ----------------------------------------------------------------------
    // 4. ANIMASI INTERSECTION OBSERVER (SCROLL REVEAL)
    // ----------------------------------------------------------------------
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const observerOptions = {
            root: null,
            threshold: 0.15, // Muncul saat 15% elemen terlihat di viewport
            rootMargin: "0px 0px -50px 0px"
        };

        const revealObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    // Berhenti mengamati setelah elemen muncul
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    } else {
        // Fallback jika browser lama tidak mendukung IntersectionObserver
        revealElements.forEach(element => {
            element.classList.add("active");
        });
    }
});