import styled from 'styled-components';

const LargeScreenInfoList = () => (
  <CompanyInfo className="large-screen">
    <InfoList>
      <li>엔플루언서 대표 김성엽</li>
      <VerticalDivider />
      <li>주소: 대구광역시 달성군 성천로 5, 4층 403호 (달성청년혁신센터)</li>
      <VerticalDivider />
      <li>사업자등록번호: 627-70-00472</li>
      <VerticalDivider />
      <li>호스팅서비스사업자: 엔플루언서</li>
    </InfoList>
    <InfoList>
      <li>이메일문의: nfluencerhelp@gmail.com</li>
      <VerticalDivider />
      <li>팩스: 0504-155-2860</li>
      <VerticalDivider />
      <li>상담가능시간: 평일 10:00 ~ 19:00 (점심시간 12:00 ~ 13:00)</li>
    </InfoList>
  </CompanyInfo>
);

const SmallScreenInfoList = () => (
  <CompanyInfo className="small-screen">
    <InfoList>
      <li>엔플루언서 대표 김성엽</li>
    </InfoList>
    <InfoList>
      <li>주소: 대구광역시 달성군 성천로 5, 4층 403호 (달성청년혁신센터)</li>
    </InfoList>
    <InfoList>
      <li>사업자등록번호: 627-70-00472</li>
      <VerticalDivider />
      <li>호스팅서비스사업자: 엔플루언서</li>
    </InfoList>
    <InfoList>
      <li>이메일문의: nfluencerhelp@gmail.com</li>
      <VerticalDivider />
      <li>팩스: 0504-155-2860</li>
    </InfoList>
    <InfoList>
      <li>상담가능시간: 평일 10:00 ~ 19:00 (점심시간 12:00 ~ 13:00)</li>
    </InfoList>
  </CompanyInfo>
);

const Footer = () => {
  const handleLeftButtonClick = () => {
    window.open(
      'https://incredible-quesadilla-708.notion.site/12ae9df2d32b8085b7eacef4e6c7dc02?v=3215947ff0004806bfced4ae84a2c27a&p=3b0f75802dbd41ac9f2de84f478fadfc&pm=s',
      '_blank',
      'noopener,noreferrer',
    );
  };

  const handleRightButtonClick = () => {
    window.open(
      'https://incredible-quesadilla-708.notion.site/12ae9df2d32b8085b7eacef4e6c7dc02?v=3215947ff0004806bfced4ae84a2c27a&p=12ae9df2d32b800e9c50d2160502dec7&pm=s',
      '_blank',
      'noopener,noreferrer',
    );
  };

  return (
    <FooterContainer>
      <FooterLinks>
        <li onClick={handleLeftButtonClick}>서비스 약관/정책</li>
        <VerticalDivider />
        <li onClick={handleRightButtonClick}>개인정보처리방침</li>
      </FooterLinks>
      <Title>엔플루언서</Title>
      {/* 큰 화면에서 보여줄 컴포넌트 */}
      <LargeScreenInfoList />

      {/* 작은 화면에서 보여줄 컴포넌트 */}
      <SmallScreenInfoList />
      <Copyright>Copyright © nfluencer Corp. All rights reserved.</Copyright>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  background-color: #f9fafb;
  padding: 70px 0px 90px 250px;
  font-size: 16px;
  color: #585c61;

  @media (max-width: 768px) {
    padding: 30px 0px 50px 20px;
    font-size: 9px;
  }
`;

const FooterLinks = styled.ul`
  display: flex;
  align-items: center;
  gap: 15px;
  list-style: none;
  margin-bottom: 60px;
  line-height: 28px;

  li {
    cursor: pointer;
  }

  @media (max-width: 768px) {
    line-height: 11px;
    gap: 6px;
    margin-bottom: 30px;
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

const CompanyInfo = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
  line-height: 28px;

  @media (max-width: 768px) {
    font-size: 9px;
    line-height: 16px;
    margin-bottom: 30px;
  }

  &.large-screen {
    display: block;

    @media (max-width: 768px) {
      display: none; /* 작은 화면에서는 숨기기 */
    }
  }

  &.small-screen {
    display: none;

    @media (max-width: 768px) {
      display: block; /* 작은 화면에서만 표시 */
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

const Title = styled.p`
  font-size: 16px;
  font-weight: 700;
  line-height: 28px;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 9px;
    line-height: 11px;
  }
`;

const Copyright = styled.div`
  font-size: 16px;
  line-height: 28px;
  color: #585c61;

  @media (max-width: 768px) {
    font-size: 9px;
    line-height: 11px;
  }
`;
