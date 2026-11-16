// Coração de fundo da página inicial, no formato do logo da He4rt.
// Desenhado com geometria exata: retas em 45° (L) e arcos de círculo (A).
//   - lóbulo da esquerda: círculo de centro (176, 176) e raio 176
//   - coraçãozinho de dentro: mesmo centro, raio 58
//   - lóbulo da direita: círculo de centro (500, 176) e raio 176
// Duas partes: o laço da esquerda com a faixa diagonal, e a ponta da direita.
// Um contorno fraco fica sempre visível e uma "faísca" roxa percorre cada parte.

const PARTES = [
    "M300.45 51.55L217.01 134.99A58 58 0 1 0 134.99 217.01L172.55 254.55L375.55 51.55A176 176 0 0 1 578.5 18.5L174.05 422.95L51.55 300.45A176 176 0 0 1 300.45 51.55Z",
    "M659.6 101.9A176 176 0 0 1 624.45 300.45L335.95 588.95L256 509L421.5 343.5L379.25 301.25L461.25 219.25L501.75 259.75Z",
];

const HeartBackground = ({ className = "" }) => {
    return (
        <svg
            viewBox="-20 -20 716 632"
            fill="none"
            aria-hidden="true"
            className={`pointer-events-none select-none ${className}`}
        >
            <defs>
                <linearGradient id="heart-brilho" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#c084fc" />
                    <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
                <filter id="heart-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* contorno fraco, sempre visível */}
            <g className="stroke-purple-600/40 dark:stroke-purple-600/45" strokeWidth="3" strokeLinejoin="round">
                {PARTES.map((d) => (
                    <path key={d} d={d} />
                ))}
            </g>

            {/* faíscas brilhantes que percorrem o contorno (uma em cada parte) */}
            {PARTES.map((d, i) => (
                <path
                    key={`faisca-${i}`}
                    d={d}
                    pathLength="100"
                    stroke="url(#heart-brilho)"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#heart-glow)"
                    className="heart-faisca"
                    style={{ animationDelay: `${i * -3.5}s` }}
                />
            ))}
        </svg>
    );
};

export default HeartBackground;
