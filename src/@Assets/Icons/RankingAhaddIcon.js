/* eslint-disable max-len */
export const RankingAhaddIcon = ({ type = 'A', width = 75, height = 75 }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 260.396 285.205">
      <defs>
        <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0" stopColor="#51dba5" />
          <stop offset="1" stopColor="#30a6d3" />
        </linearGradient>
      </defs>
      <g id="rank_badge" transform="translate(6950.698 21699.186)">
        <g id="Layer_2" data-name="Layer 2" transform="translate(-6950.698 -21699)">
          <g id="Object" transform="translate(0 0)">
            <path id="Path_2135" data-name="Path 2135" d="M64.1,33.6,33.6,68.071v58.123c0,68.554,45.851,128.406,114,160.424,68.147-32.019,114-91.87,114-160.424V67.607L231.116,33.6Z" transform="translate(-17.6 -17.785)" fill="url(#linear-gradient)" />
            <path id="Path_2136" data-name="Path 2136" d="M213.12,0H47.3A16.985,16.985,0,0,0,34.569,5.737L4.267,39.961A17.024,17.024,0,0,0,0,51.235v57.709c0,72.106,47.114,139.034,122.967,174.647a17,17,0,0,0,14.463,0C213.277,247.953,260.4,181.025,260.4,108.944V50.774a17.024,17.024,0,0,0-4.354-11.36L225.775,5.649A16.994,16.994,0,0,0,213.12,0Zm30.292,108.944c0,68.067-45.53,127.492-113.191,159.283C62.534,236.436,17.009,177.011,17.009,108.944V51.235L47.3,17.009H213.12l30.292,33.765Z" transform="translate(0 -0.186)" fill="#fff" />
          </g>
        </g>
        <g id="Group_8216" data-name="Group 8216" transform="translate(-6877.339 -21641.561)">
          {{
            A: <text id="A" transform="translate(56.641 133.87)" fill="#fff" fontSize="86" fontFamily="CeraPro-Bold, Cera Pro" fontWeight="700"><tspan x="-28.423" y="0">A</tspan></text>,
            B: <text id="B" transform="translate(56.641 133.87)" fill="#fff" fontSize="86" fontFamily="CeraPro-Bold, Cera Pro" fontWeight="700"><tspan x="-26.703" y="0">B</tspan></text>,
            C: <text id="C" transform="translate(56.641 133.87)" fill="#fff" fontSize="86" fontFamily="CeraPro-Bold, Cera Pro" fontWeight="700"><tspan x="-30.96" y="0">C</tspan></text>,
            AA: <text id="AA" transform="translate(56.641 133.87)" fill="#fff" fontSize="86" fontFamily="CeraPro-Bold, Cera Pro" fontWeight="700"><tspan x="-56.846" y="0">AA</tspan></text>,
            unrank: <text id="Unrank" transform="translate(56.641 119.375)" fill="#fff" fontSize="48" fontFamily="CeraPro-Bold, Cera Pro" fontWeight="700"><tspan x="-80.352" y="0">Unrank</tspan></text>,
          }[type]}
          <text id="Rank" transform="translate(56.64 37)" fill="#fff" fontSize="37" fontFamily="CeraPro-Regular, Cera Pro"><tspan x="-40.922" y="0">Rank</tspan></text>
        </g>
      </g>
    </svg>

  );
};
