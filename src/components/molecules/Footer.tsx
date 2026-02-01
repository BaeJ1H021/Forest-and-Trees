import styled from 'styled-components';

/* ================= 정보 리스트 ================= */

const LargeScreenInfoList = () => (
  <CompanyInfo className="large-screen">
    <InfoList>
      <li>숲과 나무 대표 전승희</li>
      <VerticalDivider />
      <li>주소: 인천광역시 연수구 청솔로 62-3</li>
      <VerticalDivider />
      <li>전화번호: 1533-2959</li>
      <VerticalDivider />
      <li>이메일: fntree22@naver.com</li>
    </InfoList>
  </CompanyInfo>
);

const SmallScreenInfoList = () => (
  <CompanyInfo className="small-screen">
    <InfoList>
      <li>숲과 나무 대표 전승희</li>
    </InfoList>
    <InfoList>
      <li>주소: 인천광역시 연수구 청솔로 62-3</li>
    </InfoList>
    <InfoList>
      <li>전화번호: 1533-2959</li>
      <VerticalDivider />
      <li>이메일: fntree22@naver.com</li>
    </InfoList>
  </CompanyInfo>
);

/* ================= Footer ================= */

const Footer = () => {
  return (
    <FooterContainer>
      <Title>숲과 나무</Title>

      {/* PC */}
      <LargeScreenInfoList />

      {/* Mobile */}
      <SmallScreenInfoList />

      <Copyright>Copyright © 숲과 나무. All rights reserved.</Copyright>
    </FooterContainer>
  );
};

export default Footer;

/* ================= styles ================= */

const FooterContainer = styled.footer`
  background-color: #f9fafb;
  padding: 70px 0 90px 250px;
  font-size: 16px;
  color: #585c61;

  @media (max-width: 768px) {
    padding: 30px 0 50px 20px;
    font-size: 12px;
  }
`;

const CompanyInfo = styled.div`
  margin-bottom: 20px;
  line-height: 28px;

  @media (max-width: 768px) {
    line-height: 16px;
    margin-bottom: 20px;
  }

  &.large-screen {
    display: block;

    @media (max-width: 768px) {
      display: none;
    }
  }

  &.small-screen {
    display: none;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;

const InfoList = styled.ul`
  display: flex;
  align-items: center;
  gap: 10px;
  list-style: none;

  @media (max-width: 768px) {
    gap: 6px;
  }
`;

const VerticalDivider = styled.div`
  width: 1px;
  height: 12px;
  background-color: #ccd0d6;

  @media (max-width: 768px) {
    height: 7px;
  }
`;

const Title = styled.p`
  font-size: 16px;
  font-weight: 700;
  line-height: 28px;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 12px;
    line-height: 12px;
  }
`;

const Copyright = styled.div`
  font-size: 16px;
  line-height: 28px;
  color: #585c61;

  @media (max-width: 768px) {
    font-size: 11px;
    line-height: 11px;
  }
`;
