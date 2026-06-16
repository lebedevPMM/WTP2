import { useInView } from "./hooks";

interface Station {
  idx: string;
  name: string;
  note: string;
}

const STATIONS: Station[] = [
  {
    idx: "01",
    name: "Bank",
    note: "Pre-screen, Banking Roadmap, account live. The hardest gate is cleared before anything else moves.",
  },
  {
    idx: "02",
    name: "Company",
    note: "Mainland, free zone or DIFC — the jurisdiction is chosen for bankability, not convenience.",
  },
  {
    idx: "03",
    name: "Visa",
    note: "Residency sequenced around your assets; spouse and children sponsored under the same structure.",
  },
  {
    idx: "04",
    name: "Assets",
    note: "Real estate, investments, digital assets — one coherent structure that survives compliance review.",
  },
];

/* Station centers sit at 12.5 / 37.5 / 62.5 / 87.5% of the 800-unit canvas, so
   the SVG strip aligns exactly with the 4-column HTML grid below it. */
const XS = [100, 300, 500, 700];
const Y = 38;

export default function RouteDiagram() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.35 });

  const ticks: number[] = [];
  for (let x = 100; x <= 700; x += 20) {
    if (!XS.includes(x)) ticks.push(x);
  }

  return (
    <div ref={ref} className={`v2-route${inView ? " is-in" : ""}`}>
      {/* Horizontal strip — desktop / tablet */}
      <svg className="v2-route-svg" viewBox="0 0 800 76" aria-hidden="true">
        {/* ruler ticks */}
        {ticks.map((x) => (
          <line key={x} className="v2-route-tick" x1={x} y1={Y - 4} x2={x} y2={Y + 4} />
        ))}
        {/* base track */}
        <line className="v2-route-track" x1={100} y1={Y} x2={700} y2={Y} />
        {/* amber progress line, drawn on scroll-in */}
        <line className="v2-route-line" x1={100} y1={Y} x2={700} y2={Y} pathLength={100} />
        {/* stations */}
        {XS.map((x, i) => (
          <g key={x}>
            <rect className="v2-route-stop" x={x - 9} y={Y - 9} width={18} height={18} />
            <rect
              className={`v2-route-fill v2-route-fill-${i}`}
              x={x - 4.5}
              y={Y - 4.5}
              width={9}
              height={9}
            />
          </g>
        ))}
      </svg>

      <div className="v2-route-grid">
        {STATIONS.map((s) => (
          <div key={s.idx} className="v2-route-cell">
            <span className="v2-route-idx">{s.idx}</span>
            <span className="v2-route-name">{s.name}</span>
            <p className="v2-route-note">{s.note}</p>
          </div>
        ))}
      </div>

      {/* Vertical list — narrow screens */}
      <ol className="v2-route-list">
        {STATIONS.map((s, i) => (
          <li key={s.idx} className="v2-route-item">
            <span className="v2-route-marker" aria-hidden="true">
              <i className={`v2-route-fill-v v2-route-fill-${i}`} />
            </span>
            <div>
              <span className="v2-route-idx">{s.idx}</span>
              <span className="v2-route-name">{s.name}</span>
              <p className="v2-route-note">{s.note}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
