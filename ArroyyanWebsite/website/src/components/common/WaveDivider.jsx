function WaveDivider({ flip = false, className = "", tone = "#ffffff" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 ${
        flip
          ? "top-0 -translate-y-full rotate-180"
          : "bottom-0 translate-y-full"
      } ${className}`}
    >
      <svg
        viewBox="0 0 1440 90"
        className="h-[46px] w-full sm:h-[70px]"
        preserveAspectRatio="none"
      >
        <path
          fill={tone}
          d="M0,32 C240,90 480,0 720,24 C960,48 1200,88 1440,40 L1440,90 L0,90 Z"
        />
      </svg>
    </div>
  );
}

export default WaveDivider;
