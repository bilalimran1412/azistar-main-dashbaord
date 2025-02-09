import styled from 'styled-components';

export const HeadingH = styled.h2`
    font-size: 25px;
    color: rgb(51, 51, 51);
    margin: 0px;
    font-family: 'Roboto';
    font-weight: 500;
`;
export const Heading = styled.h4`
  color: #333;
  margin: 0px;
    font-size: 15px;
    color: rgb(51, 51, 51);
    margin: 0px;
    font-family: 'circular';
    font-weight: 400;
`;

export const Paragraph = styled.p`
    margin-top: 0px;
    margin-bottom: 0px;
    font-weight: 400;
    font-size: 14px;
    margin: 10px 0px 20px;
    line-height: 18px;
    letter-spacing: -0.01em;
    color: rgb(100, 116, 145);
`;
export const ParagraphDescription = styled.p`
    font-weight: 400;
    font-size: 18px;
    margin: 10px 0px 0px;
    line-height: 20px;
    letter-spacing: -0.01em;
    color: #323232;
`;

export const Column = styled.div`
  padding: 20px;
  background-color: #f7f8fa;
`;

export const ButtonM = styled.button`
    border-radius: 8px;
    font-size: 16px;
    height: 38px;
    line-height: 20px;
    min-width: 80px;
    padding: 0 16px;
    display:flex;
    margin-top:20px;
    background-color : #0566ff;
    border-color: #0566ff;
    align-items: center;
    display: inline-flex;
    justify-content: center;
    color: #fff;
    max-width: max-content;
    &:hover {
        background-color: #0049bd;
        border-color: #0049bd;
    }
    a {
      text-decoration:none;
      color : white;
    }
`

export const Button = styled.button`
    color: rgb(0, 112, 243);
    border: none;
    padding: 0px;
    font-size: 1rem;
    border-radius: 5px;
    cursor: pointer;
    max-width: max-content;
    background: transparent;
`;

export const CardTop = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-top: 20px;
  border-radius: 8px !important;
  gap: 20px;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
  flex-wrap :wrap;
  margin-top: 0px;
  border-radius: 8px !important;
  gap: 20px;
`;


export const IntegrationCard = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    flex: 1 1 220px;
    min-width: 160px;
    max-width: 220px;
    border-width: 1px;
    border-radius: 8px;
    border-style: solid;
    flex-wrap:wrap;
    border-color: rgb(226, 232, 239);
    padding: 20px;
  &:hover {
    box-shadow: rgba(0, 20, 51, 0.12) 0px 2px 6px;
    border-color: rgb(5, 102, 255);
    outline: rgb(5, 102, 255) solid 1px;
    cursor: pointer;
  }
`;

export const IconWrapper = styled.div`
  flex: 0 0 40px;
  margin-right: 15px;
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MainLayout = styled.div `
  display:flex;
  flex-direction: row;
  gap:20px;
`;

export const SideBar = styled.div`
`;