import styled from "styled-components";

const SVGContainer = styled("div")`
  display: flex;
  align-items: center;
  order: 4;
  width: 20px;
  height: 15px;
  margin-right: 20px;
`;

const ChevronDown = () => {
  return (
    <SVGContainer>
      <svg
        width="10"
        height="5"
        opacity="0.6"
        viewBox="0 0 10 5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0L5 5L10 0H0Z" fill="white" />
      </svg>
    </SVGContainer>
  );
};

export default ChevronDown;
