import styled from "styled-components";
const bgField = "#051937";
const lightBlue = "#045adb";
const borderColor = "#374462";
const eltHeight = "56px";
const textColor = "#FFFFFF";
const paddingStart = "20px";
const borderRadius = "20px";
const XPDropDownBorder = "6px";

export const XPButton = styled("button")`
  margin-top: 1vw;
  height: 56px;
  height: 56px;
  background: ${lightBlue};
  opacity: 0.9;
  border: none;
  margin-bottom: 0.5vw;
  box-shadow: inset 0px 2px 2px rgba(104, 164, 255, 0.25);
  border-radius: 6px;
  &:disabled{
    background: #374462;
  }
`;

export const XPButtonText = styled("div")`
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 126%;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.03em;
  color: ${textColor};
  &:disabled{
    color:#AAA;
  }
`;

export const XPApp = styled("div")`
  text-align: center;
  @media (max-width: 768px) {
    width: 100%;
    margin-top: 100px;
  }
  @media(orientation: landscape)
    and (max-width: 1000px)
  {
    margin-top: 450px;
  }
`;

export const XPMain = styled("main")`
  align-content: center;
  text-align: center;
  width: 780px;
  @media (max-width: 1300px) {
    width: 720px
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const XPFlexCenter = styled("div")`
  display: flex;
  flex-direction: column;
  text-align: center;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const XPBoxCenter = styled("div")`
  height: fit-content;
  background: #030c21;
  padding: 30px;
  border: 1px solid ${borderColor};
  border-radius: ${borderRadius};
  margin-left:0px;
  @media (max-width: 1300px) {
    width: 100%;
    margin-left:0;
  }
  @media (max-width: 1024px){
    margin-left:-30px;
  }
  @media (max-width: 768px) {
    width: calc(100% - 40px);
    padding: 20px;
    border: none;
    margin-left:0;
  }
`;

export const XPLabel = styled("div")`
  width: 150px;
  height: 30px;
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 126%;
  display: flex;
  align-items: center;
  letter-spacing: 0.03em;
  opacity: 0.6;
  color: ${textColor};
  text-align: center;
  @media (max-width: 1300px) {
  }
`;

export const XPColumn = styled("div")`
  display: flex;
  flex-direction: column;
  padding-bottom: 0.8vw;
  width: 350px;
  @media(max-width: 1300px){
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const XPRow = styled("div")`
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const XPTitle = styled("div")`
font-size: 26px;
line-height: 126%;
font-family: 'Roboto', sans-serif;
font-weight: bold;
display: flex;
align-items: center;
letter-spacing: 0.03em;
margin 15px 0;
  color: ${textColor};
  @media (max-width: 768px){
    font-size: 20px;
    width: 100%;
  }
`;

export const XPDiv = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const XPInput = styled("input")`
  background: ${bgField};
  border: 1px solid ${borderColor};
  box-sizing: border-box;
  border-radius: 6px 0 0 6px;
  border-bottom-right-radius: 0px   !important  ;
  border-top-right-radius: 0px   !important;
  width: 100%;
  color: ${textColor};
  height: ${eltHeight};
  caret-color: ${textColor};
  padding-inline-start: ${paddingStart};
  border-bottom-right-radius: 6px;
  border-top-right-radius: 6px;
  &:focus {
    outline: none;
  }
  @media (max-width: 1300px) {
    width: 100%;
    height: 56px;
    margin-bottom: 10px;
  }
  @media (max-width: 768px) {
    height: 56px;
    width: 100%;
    font-size:16px;
  }
`;

export const XPInfo = styled("div")`
  // height: 1.9vw;
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 126%;
  display: flex;
  align-items: center;
  letter-spacing: 0.03em;
  color: ${textColor};
  opacity: 0.6;
  @media (max-width: 1300px) {
    font-size: 12px;
    margin-bottom: 20px;
    
  }
  @media (max-width: 768px) {
    font-size: 12px;
    width: 100%;
  }
  @media (max-width: 450px) {
    word-break: break-all;
    width: 100%;
  }
`;

export const XPTransaction = styled("input")`
  height: ${eltHeight};
  background: ${bgField};
  border: 1px solid ${borderColor};
  box-sizing: border-box;
  border-radius: 6px;
  color: ${textColor};
  width: 100%;
  padding-left: 10px;
  &:focus {
    outline: none;
    font-family: Inter;
    font-weight: 500;
    font-size: 0.8em;
  }
  @media (max-width: 1300px) {
    height: 45px;
  }
  @media (max-width: 768px) {
    font-size: 16px;
    width: 100%;
    height: 56px;
  }
  @media (max-width: 450px) {
    font-size: 12px;
    width: 100%;
    height: 56px;
  }
  @media (max-width: 375px) {
    font-size: 10px;
    width: 100%;
    height: 56px;
  }
  @media (max-width: 330px) {
    font-size: 9px;
    width: 100%;
    height: 56px;
  }
`;

export const XPWrapper = styled("div")`
  height: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-grow: 4;
`;

export const XPStyledText = styled("span")`
  display: flex;
  font-family: Inter;
  margin-left: 1vw;
  order: 2;
  flex-grow: 4;
  cursor: pointer
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 126%;
  align-items: center;
  letter-spacing: 0.03em;
  color: #fff;
  
  @media (max-width: 1300px) {
    
    height: 56px;   
    margin-left: 20px;
  }
  @media (max-width: 768px){
    height: 56px;
  }
  
`;

export const XPDropDown = styled("div")`
  background: ${bgField};
  border: 1px solid ${borderColor};
  border-top-left-radius: ${XPDropDownBorder};
  border-top-right-radius: ${XPDropDownBorder};
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  box-sizing: border-box;
  color: ${textColor};
  padding-inline-start: ${paddingStart};
  cursor: pointer;
  height: ${eltHeight};
  @media (max-width: 1300px) {
    width: 100%;
    height: 56px;
    margin-bottom: 10px;
  }
  @media (max-width: 768px) {
    font-size: 16px;
    width: 100%;
    height: 56px;
  }
`;

/**
 * A placeholder for the option menu items
 */
export const XPDropDownContent = styled("div")`
  display: none;
  width: 48.8%;
  position: absolute;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  margin-left: -21px;
  @media (max-width: 1300px) {
    width: 52.9%;
  }
  @media (max-width: 768px) {
    width: 100%;
    overflow-y: scroll;
    scroll-padding-right: 0;
    overflow: auto !important;
    max-height: 150px;
    z-index:999;
  }
`;
/**
 * An item of the option menu
 *
 * On hover changes background color to light blue
 */
export const XPDropDownElement = styled("a")`
  padding: 1vw 1.2vw;
  margin-inline-start: 0px;
  display: block;
  background: ${bgField};
  border-bottom: 1px solid ${borderColor};
  border-left: 1px solid ${borderColor};
  border-right: 1px solid ${borderColor};
  box-sizing: border-box;
  padding-inline-start: ${paddingStart};
  height: ${eltHeight};
  color: ${textColor};
  text-decoration: none;
  text-align: left;
  cursor: pointer;
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 126%;
  &:hover {
    background-color: ${lightBlue};
  }
  &:last-child {
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }
  &:first-child {
    border-top: 1px solid ${borderColor};
  }
  @media (max-width: 1300px) {
    width: 92%;
    height: 40px;
  }
  @media (max-width: 768px) {
    width: 100%;
    height: 55px;
    max-height: 100px;
  }
`;


export const XPSpace = styled('div')`
margin-top:10px;
`
