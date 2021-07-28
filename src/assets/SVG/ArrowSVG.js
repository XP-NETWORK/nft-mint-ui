import styled from "styled-components";

const SVGContainer = styled("div")`
  display: flex;
  align-items: center;
  order: 4;
  width: 20px;
  height: 15px;
  margin-right: 20px;
  width: 50px;
  height: 50px;
`;

const ArrowSVG = () => {
  return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d)">
          <path
            d="M15.01 16H4V18H15.01V21L19 17L15.01 13V16ZM7.99 11V8H19V6H7.99V3L4 7L7.99 11Z"
            fill="#1972F9"
          />
        </g>
        <defs>
          <filter
            id="filter0_d"
            x="-4"
            y="0"
            width="32"
            height="32"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
  );
};

export default ArrowSVG;
