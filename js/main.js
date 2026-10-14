/* =========================================
   TOPCODES PORTFOLIO
   MAIN JAVASCRIPT
========================================= */


/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("open");

        menuToggle.classList.toggle("active", isOpen);

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

        document.body.classList.toggle(
            "menu-open",
            isOpen
        );

    });


    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("open");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            document.body.classList.remove(
                "menu-open"
            );

        });

    });

}


/* =========================================
   HEADER + SCROLL PROGRESS
   One passive listener, batched with
   requestAnimationFrame so it runs at most
   once per frame.
========================================= */

const header = document.querySelector(".site-header");

const scrollProgress =
    document.getElementById("scrollProgress");

let maxScroll = 0;
let scrollTicking = false;
let headerScrolled = null;

function measureScroll() {

    maxScroll =
        document.documentElement.scrollHeight -
        window.innerHeight;

}

function updateOnScroll() {

    scrollTicking = false;

    const scrollTop = window.scrollY;

    if (header) {

        const isScrolled = scrollTop > 40;

        if (isScrolled !== headerScrolled) {

            header.classList.toggle("scrolled", isScrolled);

            headerScrolled = isScrolled;

        }

    }

    if (scrollProgress) {

        const progress =
            maxScroll > 0
                ? Math.min(scrollTop / maxScroll, 1)
                : 0;

        scrollProgress.style.transform =
            `scaleX(${progress})`;

    }

}

function requestScrollUpdate() {

    if (!scrollTicking) {

        scrollTicking = true;

        requestAnimationFrame(updateOnScroll);

    }

}

window.addEventListener(
    "scroll",
    requestScrollUpdate,
    { passive: true }
);

window.addEventListener(
    "resize",
    () => {
        measureScroll();
        requestScrollUpdate();
    },
    { passive: true }
);

/* page height can change once fonts load */
window.addEventListener("load", () => {
    measureScroll();
    requestScrollUpdate();
});

measureScroll();
updateOnScroll();


/* =========================================
   REVEAL ON SCROLL
========================================= */

const revealElements =
    document.querySelectorAll(".reveal");

if (revealElements.length) {

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "show"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });

}


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );

const navAnchors =
    document.querySelectorAll(
        '.nav-link[href^="#"]'
    );

if (
    sections.length &&
    navAnchors.length
) {

    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        navAnchors.forEach(
                            link => {

                                link.classList.remove(
                                    "active"
                                );

                            }
                        );


                        const activeLink =
                            Array.from(navAnchors).find(
                                link =>
                                    link.getAttribute("href") ===
                                    `#${entry.target.id}`
                            );


                        if (activeLink) {

                            activeLink.classList.add(
                                "active"
                            );

                        }

                    }

                });

            },
            {
                threshold: 0.45
            }
        );


    sections.forEach(section => {

        sectionObserver.observe(section);

    });

}


/* =========================================
   CURRENT YEAR
========================================= */

const currentYear =
    document.getElementById("currentYear");

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================
   CURSOR GLOW
   Moves at most once per frame.
========================================= */

const cursorGlow =
    document.querySelector(".cursor-glow");

if (
    cursorGlow &&
    window.matchMedia("(pointer:fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {

    let mouseX = 0;
    let mouseY = 0;
    let glowTicking = false;

    function moveGlow() {

        glowTicking = false;

        cursorGlow.style.transform =
            `translate3d(${mouseX}px, ${mouseY}px, 0)`;

    }

    document.addEventListener(
        "mousemove",
        event => {

            mouseX = event.clientX;
            mouseY = event.clientY;

            if (!glowTicking) {

                glowTicking = true;

                requestAnimationFrame(moveGlow);

            }

        },
        { passive: true }
    );

}


/* =========================================
   PAUSE HERO ANIMATIONS OFF-SCREEN
========================================= */

const hero = document.querySelector(".hero");

if (hero) {

    new IntersectionObserver(
        ([entry]) => {

            hero.classList.toggle(
                "is-offscreen",
                !entry.isIntersecting
            );

        }
    ).observe(hero);

}
