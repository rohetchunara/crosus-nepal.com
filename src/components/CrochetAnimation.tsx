export default function CrochetAnimation() {
  return (
    <div className="relative w-full h-[50vh] md:h-full flex items-center justify-center">
      <svg
        viewBox="0 0 400 500"
        className="w-full max-w-md h-full"
        style={{ overflow: "visible" }}
      >
        {/* Base strand - the initial thread */}
        <path
          d="M200 480 Q200 450 200 400"
          fill="none"
          stroke="#A97C65"
          strokeWidth="2"
          strokeLinecap="round"
          className="animate-thread-base"
          style={{ opacity: 0.6 }}
        />

        {/* Bag silhouette outline - draws in */}
        <path
          d="M120 180
             Q100 200 100 280
             Q100 380 140 420
             Q180 460 200 460
             Q220 460 260 420
             Q300 380 300 280
             Q300 200 280 180
             Q250 150 200 150
             Q150 150 120 180"
          fill="none"
          stroke="#2C2520"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-bag-outline"
          style={{
            strokeDasharray: 800,
            strokeDashoffset: 800,
          }}
        />

        {/* Weaving pattern layer 1 - horizontal rows */}
        <g className="animate-weave-1" style={{ opacity: 0 }}>
          {[...Array(8)].map((_, i) => (
            <path
              key={`row1-${i}`}
              d={`M115 ${200 + i * 28} Q200 ${195 + i * 28} 285 ${200 + i * 28}`}
              fill="none"
              stroke="#A97C65"
              strokeWidth="1"
              strokeLinecap="round"
              opacity={0.4 + i * 0.05}
              style={{
                strokeDasharray: 200,
                strokeDashoffset: 200,
                animationDelay: `${i * 0.15}s`,
              }}
              className="animate-stitch"
            />
          ))}
        </g>

        {/* Weaving pattern layer 2 - interlocking stitches */}
        <g className="animate-weave-2" style={{ opacity: 0 }}>
          {[...Array(6)].map((_, i) => (
            <path
              key={`row2-${i}`}
              d={`M125 ${215 + i * 35} C150 ${210 + i * 35} 250 ${220 + i * 35} 275 ${215 + i * 35}`}
              fill="none"
              stroke="#2C2520"
              strokeWidth="0.8"
              strokeLinecap="round"
              opacity={0.25}
              style={{
                strokeDasharray: 180,
                strokeDashoffset: 180,
                animationDelay: `${i * 0.18 + 0.5}s`,
              }}
              className="animate-stitch"
            />
          ))}
        </g>

        {/* Decorative crochet texture - V patterns */}
        <g className="animate-weave-3" style={{ opacity: 0 }}>
          {[...Array(5)].map((_, i) => (
            <path
              key={`v-${i}`}
              d={`M${150 + i * 25} 250 L${160 + i * 25} 270 L${170 + i * 25} 250`}
              fill="none"
              stroke="#A97C65"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.3}
              style={{
                strokeDasharray: 50,
                strokeDashoffset: 50,
                animationDelay: `${i * 0.12 + 1.2}s`,
              }}
              className="animate-stitch"
            />
          ))}
        </g>

        {/* Handle of the bag */}
        <path
          d="M150 160 Q150 80 200 80 Q250 80 250 160"
          fill="none"
          stroke="#2C2520"
          strokeWidth="3"
          strokeLinecap="round"
          className="animate-handle"
          style={{
            strokeDasharray: 250,
            strokeDashoffset: 250,
          }}
        />

        {/* Floating yarn strand - decorative */}
        <path
          d="M320 350 Q350 300 330 250 Q310 200 340 150"
          fill="none"
          stroke="#A97C65"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="animate-float-strand"
          style={{ opacity: 0 }}
        />

        {/* Second floating strand */}
        <path
          d="M80 320 Q50 280 70 230 Q90 180 60 140"
          fill="none"
          stroke="#2C2520"
          strokeWidth="1"
          strokeLinecap="round"
          className="animate-float-strand-alt"
          style={{ opacity: 0 }}
        />

        {/* Small decorative dots - stitch markers */}
        <g className="animate-dots" style={{ opacity: 0 }}>
          <circle cx="130" cy="280" r="3" fill="#A97C65" />
          <circle cx="270" cy="280" r="3" fill="#A97C65" />
          <circle cx="200" cy="150" r="2.5" fill="#2C2520" />
        </g>

        {/* Hook needle indicator */}
        <g className="animate-hook" style={{ opacity: 0 }}>
          <line x1="200" y1="50" x2="200" y2="100" stroke="#2C2520" strokeWidth="2" strokeLinecap="round" />
          <circle cx="200" cy="50" r="4" fill="none" stroke="#2C2520" strokeWidth="1.5" />
          <path d="M196 54 Q200 58 204 54" fill="none" stroke="#A97C65" strokeWidth="1" />
        </g>
      </svg>

      {/* Subtle gradient overlays for depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#A97C65]/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-[#2C2520]/5 rounded-full blur-3xl animate-pulse-slow-alt" />
      </div>

      {/* Label - appears at end */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-label-fade" style={{ opacity: 0 }}>
        <p className="text-[#2C2520]/40 text-[10px] tracking-[0.35em] uppercase font-light">
          Hand Woven
        </p>
      </div>
    </div>
  );
}
