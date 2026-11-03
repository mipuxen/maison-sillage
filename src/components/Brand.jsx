// The Sillage mark: three strokes that fade out, like footsteps leaving a trace.
export function Mark() {
  return (
    <svg className="brand__mark" viewBox="0 0 32 32" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.2">
        <path d="M5 21c4-1 7-5 9-11" />
        <path d="M12 24c4-1 7-5 9-11" opacity=".65" />
        <path d="M19 27c3-1 5-4 7-9" opacity=".35" />
      </g>
    </svg>
  );
}

export default function Brand({ label, onClick }) {
  return (
    <a className="brand" href="#/" aria-label={label} onClick={onClick}>
      <Mark />
      <span className="brand__word">
        SILLAGE<sup>PARIS</sup>
      </span>
    </a>
  );
}
