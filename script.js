// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Hero Animation
const tl = gsap.timeline();

tl.to(".reveal-text", {
    y: 0,
    opacity: 1,
    duration: 1.5,
    stagger: 0.2,
    ease: "power4.out",
    delay: 0.5
});


// Banner/Marquee Animation (Optional - keeping if elements exist)
const marquee = document.querySelector('.marquee-content');
if (marquee) {
    // Marquee CSS animation handles this, so no manual JS needed unless for dynamic length
}

// Fade In Elements on Scroll
const fadeElements = gsap.utils.toArray('.product-card-pro, .section-header, .mission-content, .review-card, .locator-text-center');
fadeElements.forEach(el => {
    gsap.from(el, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: el,
            start: "top 80%"
        }
    });
});


// Custom Cursor Logic
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
    });

    gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3
    });
});

// Enable custom cursor only if JS runs
document.body.classList.add('has-custom-cursor');

// Magnetic Buttons & Interactive Elements
const magBtns = document.querySelectorAll('.magnetic, .btn-magnetic, .nav-item, a, button');

magBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
            x: x * 0.2, // Strength of magnet
            y: y * 0.2,
            duration: 0.3
        });

        // Expand cursor
        gsap.to(cursor, { scale: 0.5 });
        gsap.to(follower, { scale: 1.5, borderColor: "transparent", background: "rgba(255,255,255,0.1)" });
    });

    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.3 });

        // Reset cursor
        gsap.to(cursor, { scale: 1 });
        gsap.to(follower, { scale: 1, borderColor: "var(--text-color)", background: "transparent" });
    });
});

// Philosophy Parallax
gsap.to(".text-block", {
    yPercent: -30,
    ease: "none",
    scrollTrigger: {
        trigger: ".philosophy-section",
        start: "top bottom",
        end: "bottom top",
        scrub: true
    }
});
