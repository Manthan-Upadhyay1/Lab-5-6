import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "../../lib/gsap";

/** Full-screen intro animation (fork + knife logo), then it fades away. */
export default function Loader({ onDone }) {
  const rootRef = useRef(null);
  const [gone, setGone] = useState(false);

  useLayoutEffect(() => {
    const finish = () => {
      setGone(true);
      onDone?.();
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set("#loader-card", { opacity: 0, scale: 0.85 });
      gsap.set("#icon-bg", {
        opacity: 0,
        scale: 0.5,
        transformOrigin: "center center",
      });
      gsap.set("#utensils", {
        opacity: 0,
        scale: 0.7,
        transformOrigin: "center center",
      });
      gsap.set(["#dinemate-text", "#ai-text"], { opacity: 0, y: 10 });

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to("#loader-card", { opacity: 1, scale: 1, duration: 0.7 })
        .to(
          "#icon-bg",
          { opacity: 1, scale: 1, duration: 0.55, ease: "back.out(1.7)" },
          "-=0.25",
        )
        .to(
          "#utensils",
          { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.8)" },
          "-=0.25",
        )
        .to("#fork", {
          rotation: -6,
          duration: 0.2,
          transformOrigin: "center center",
        })
        .to("#fork", { rotation: 0, duration: 0.2 })
        .to(
          "#knife",
          { rotation: 6, duration: 0.2, transformOrigin: "center center" },
          "<",
        )
        .to("#knife", { rotation: 0, duration: 0.2 })
        .to("#dinemate-text", { opacity: 1, y: 0, duration: 0.55 })
        .to("#ai-text", { opacity: 1, y: 0, duration: 0.45 }, "-=0.25")
        .to({}, { duration: 0.35 })
        .to("#loader", {
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut",
          onComplete: finish,
        });
    }, rootRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (gone) return null;

  const font =
    "Inter, 'Segoe UI', system-ui, -apple-system, Helvetica, Arial, sans-serif";
  return (
    <div id="loader" ref={rootRef} aria-hidden="true">
      <svg
        id="dinemate-loader"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 250 90"
        width="250"
        height="90"
        role="img"
      >
        <title>DineMate AI</title>
        <defs>
          <linearGradient id="loader-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#6743EE" />
            <stop offset="1" stopColor="#FF6A42" />
          </linearGradient>
          <linearGradient id="loader-text-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#6743EE" />
            <stop offset="1" stopColor="#FF6A42" />
          </linearGradient>
        </defs>
        <g id="loader-card">
          <rect
            x="1"
            y="8"
            width="248"
            height="74"
            rx="16"
            fill="#FFFFFF"
            stroke="#E9E3FF"
            strokeWidth="1"
          />
        </g>
        <g id="icon-bg">
          <rect
            x="24"
            y="25"
            width="40"
            height="40"
            rx="10"
            fill="url(#loader-gradient)"
          />
          <g
            id="utensils"
            transform="translate(30.8 31.8) scale(1.1)"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <g id="fork">
              <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
              <path d="M7 2v20" />
            </g>
            <g id="knife">
              <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
            </g>
          </g>
        </g>
        <g>
          <text
            id="dinemate-text"
            className="wordmark-text"
            x="74"
            y="52"
            fontFamily={font}
            fontSize="20"
            fontWeight="700"
            letterSpacing="-0.2"
            fill="#150F38"
          >
            DineMate
          </text>
          <text
            id="ai-text"
            className="wordmark-text"
            x="165"
            y="52"
            fontFamily={font}
            fontSize="20"
            fontWeight="700"
            letterSpacing="-0.2"
            fill="url(#loader-text-gradient)"
          >
            AI
          </text>
        </g>
      </svg>
    </div>
  );
}
