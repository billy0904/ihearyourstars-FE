import styled from "styled-components";

const FooterDiv = styled.div`
  padding: 30px;
  span {
    width: 100%;
    background-color: transparent;
    color: #9ea3fb;
    font-weight: 500;
    font-size: 14px;
  }
`;

function Footer() {
  return (
    <FooterDiv>
      <span>&copy; Team FourTuneStar</span>
    </FooterDiv>
  );
}

export default Footer;
