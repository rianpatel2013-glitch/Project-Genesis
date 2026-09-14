// ============================================================
// PROJECT GENESIS — mission nav behavior
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
    initNavToggle();
    initScrollState();
    initMissionClock();
});

/** Mobile hamburger: open/close the link panel, close on link click or Escape. */
function initNavToggle() {
    const toggle = document.getElementById("navToggle");
    const links = document.getElementById("navLinks");
    if (!toggle || !links) return;

    const setOpen = (open) => {
        toggle.setAttribute("aria-expanded", String(open));
        links.classList.toggle("is-open", open);
        document.body.style.overflow = open ? "hidden" : "";
    };

    toggle.addEventListener("click", () => {
        setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    links.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => setOpen(false));
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") setOpen(false);
    });
}

/** Adds a background/border treatment to the nav once the page scrolls. */
function initScrollState() {
    const nav = document.getElementById("missionNav");
    if (!nav) return;

    const update = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
}

/**
 * Decorative "mission elapsed time" readout in the top ticker.
 * Swap MISSION_EPOCH for a real launch/program start date, or replace
 * this whole function with a fetch to live telemetry if one exists.
 */
function initMissionClock() {
    const clock = document.getElementById("missionClock");
    if (!clock) return;

    const MISSION_EPOCH = new Date("2026-01-01T00:00:00Z").getTime();

    const pad = (n, len = 2) => String(n).padStart(len, "0");

    const tick = () => {
        const elapsed = Math.max(0, Date.now() - MISSION_EPOCH);
        const totalSeconds = Math.floor(elapsed / 1000);
        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        clock.textContent = `T+ ${pad(days, 3)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    };

    tick();
    setInterval(tick, 1000);
}