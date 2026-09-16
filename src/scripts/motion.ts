import { animate, inView, stagger } from "motion";

const ease = [0.22, 1, 0.36, 1] as const;

const animateIn = (
  elements: Element | Element[],
  keyframes: Record<string, unknown> = {},
  transition: Record<string, unknown> = {},
) => {
  return animate(
    elements,
    { opacity: [0, 1], y: [24, 0], ...keyframes },
    { duration: 0.72, ease, ...transition },
  );
};

const resetMagnetic = (element: HTMLElement) => {
  animate(
    element,
    { x: 0, y: 0 },
    { type: "spring", stiffness: 300, damping: 22 },
  );
};

const initMagnetic = () => {
  document
    .querySelectorAll<HTMLElement>("[data-motion-magnetic]")
    .forEach((element) => {
      element.addEventListener("pointermove", (event) => {
        const bounds = element.getBoundingClientRect();
        const x = event.clientX - bounds.left - bounds.width / 2;
        const y = event.clientY - bounds.top - bounds.height / 2;

        animate(
          element,
          { x: x * 0.14, y: y * 0.14 },
          { type: "spring", stiffness: 280, damping: 18 },
        );
      });

      element.addEventListener("pointerleave", () => resetMagnetic(element));
    });
};

const initTilt = () => {
  document
    .querySelectorAll<HTMLElement>("[data-motion-tilt]")
    .forEach((element) => {
      element.addEventListener("pointermove", (event) => {
        const bounds = element.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;

        animate(
          element,
          { rotateX: y * -3, rotateY: x * 3 },
          { type: "spring", stiffness: 220, damping: 24 },
        );
      });

      element.addEventListener("pointerleave", () => {
        animate(
          element,
          { rotateX: 0, rotateY: 0 },
          { type: "spring", stiffness: 220, damping: 24 },
        );
      });
    });
};

const initSpotlights = () => {
  document
    .querySelectorAll<HTMLElement>("[data-motion-spotlight]")
    .forEach((element) => {
      element.addEventListener("pointermove", (event) => {
        const bounds = element.getBoundingClientRect();
        element.style.setProperty(
          "--spotlight-x",
          `${event.clientX - bounds.left}px`,
        );
        element.style.setProperty(
          "--spotlight-y",
          `${event.clientY - bounds.top}px`,
        );
      });
    });
};

const initReveals = () => {
  const animated = new WeakSet<Element>();

  document
    .querySelectorAll<HTMLElement>("[data-motion-header]")
    .forEach((header) => {
      animateIn(header, { y: [-18, 0] }, { duration: 0.6 });
    });

  document
    .querySelectorAll<HTMLElement>("[data-motion-section]")
    .forEach((section) => {
      inView(
        section,
        () => {
          if (animated.has(section)) return;
          animated.add(section);
          animateIn(section, { y: [30, 0] });
        },
        { amount: 0.12 },
      );
    });

  document
    .querySelectorAll<HTMLElement>("[data-motion-reveal]")
    .forEach((element) => {
      inView(
        element,
        () => {
          if (animated.has(element)) return;
          animated.add(element);
          animateIn(element);
        },
        { amount: 0.2 },
      );
    });

  document
    .querySelectorAll<HTMLElement>("[data-motion-list]")
    .forEach((list) => {
      const items = list.querySelectorAll<HTMLElement>(
        ":scope > [data-motion-item]",
      );

      inView(
        list,
        () => {
          if (animated.has(list)) return;
          animated.add(list);
          animateIn(
            Array.from(items),
            { y: [28, 0] },
            { delay: stagger(0.08) },
          );
        },
        { amount: 0.14 },
      );
    });

  document
    .querySelectorAll<HTMLElement>(
      "main h1, main h2, main h3, main p, main .section-kicker",
    )
    .forEach((element) => {
      inView(
        element,
        () => {
          if (animated.has(element)) return;
          animated.add(element);
          animateIn(element, { y: [16, 0] }, { duration: 0.58 });
        },
        { amount: 0.3 },
      );
    });
};

export const initMotion = () => {
  if (document.documentElement.dataset.motionInitialized) return;

  document.documentElement.dataset.motionInitialized = "true";
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  document.documentElement.dataset.motion = reducedMotion ? "reduced" : "ready";

  if (reducedMotion) return;

  initReveals();

  const supportsFinePointer = window.matchMedia(
    "(hover: hover) and (pointer: fine)",
  ).matches;
  if (!supportsFinePointer) return;

  initMagnetic();
  initTilt();
  initSpotlights();
};
