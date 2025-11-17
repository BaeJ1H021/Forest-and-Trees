import styled from 'styled-components';

const HomeHeader = () => {
  return (
    <ImageContainer>
      <BackgroundImage />
      {/* 초록 전체 오버레이 */}
      <GreenOverlay />

      {/* 아래 60% 주황 그라데이션 */}
      <OrangeOverlay />

      {/* 상장 이미지 */}
      <CertificateImage src="images/award.png" alt="brand_certificate" />

      {/* 텍스트 */}
      <ContentWrapper>
        <MobileDescription>
          책임감 있는 조경유지관리와
          {'\n'}세상에 없는
          {'\n'}창의적인 정원을 만든다.
        </MobileDescription>
        <SubTitleTop>“한국 소비자 만족도 1위”</SubTitleTop>
        <SubTitleMid>2025 KOREA BRAND REPUTATION</SubTitleMid>
        <GradientTitle>숲과 나무</GradientTitle>
      </ContentWrapper>
    </ImageContainer>
  );
};

export default HomeHeader;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  margin: auto;
  overflow: hidden;

  @media (max-width: 768px) {
    //height: 100vh; /* 모바일에서 풀스크린 헤더 느낌 */
  }
`;

const BackgroundImage = styled.div`
  width: 100%;
  height: 911px;
  background-image: url('images/header_img.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 0;

  @media (max-width: 768px) {
    background-image: url('images/mobile_header_img.png');
    height: 780px;
  }
`;

const CertificateImage = styled.img`
  position: absolute;
  top: 16%;
  right: 24%;
  width: 400px;
  height: auto;
  z-index: 4;

  @media (max-width: 1700px) {
    top: 18%; /* 조금 위로 올리고 */
    right: 8%; /* 더 안쪽으로 붙이고 */
    width: 340px; /* 살짝 줄여주기 */
  }

  @media (max-width: 768px) {
    width: 70%;
    max-width: 340px;
    top: auto;
    bottom: 6%;
    left: 50%;
    right: auto;
    transform: translateX(-50%);
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 40%;
  left: 25%;
  right: 0;
  bottom: 0;
  z-index: 3;

  @media (max-width: 1700px) {
    top: 38%;
    left: 18%; /* 조금 안쪽으로 */
  }

  @media (max-width: 768px) {
    top: 10%;
    bottom: auto;
    left: 50%;
    right: auto;
    transform: translateX(-50%);
    width: 80%;
    align-items: center;
    text-align: center;
  }
`;

// 피그마: #005013 + opacity 60% (이미지 전체 덮기)
const GreenOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 80, 19, 0.6);
  z-index: 1;
  pointer-events: none;

  @media (max-width: 768px) {
    background-color: rgba(0, 80, 19, 0.8);
  }
`;

const OrangeOverlay = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 60%;
  z-index: 2;
  pointer-events: none;

  background: linear-gradient(
    to top,
    rgba(244, 193, 126, 0.85) 0%,
    rgba(244, 193, 126, 0.55) 40%,
    rgba(244, 193, 126, 0.25) 70%,
    rgba(244, 193, 126, 0) 100%
  );

  @media (max-width: 768px) {
    height: 50%; /* 모바일에서 주황 영역 약간 줄이기 */
  }
`;

const GradientTitle = styled.h1`
  font-weight: 800;
  font-size: 120px;
  line-height: 1.3;
  margin: 0;

  background: linear-gradient(100deg, #f7ffb0 0%, #00e88b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 54px;
    line-height: 1.3;
    margin-bottom: 42px;
  }
`;

const SubTitleTop = styled.p`
  color: #ffffff;
  font-weight: 700;
  font-size: 20px;
  line-height: 26px;
  margin-bottom: 6px;

  @media (max-width: 768px) {
    font-size: 24px;
    line-height: 22px;
    margin-bottom: 4px;
  }
`;

const SubTitleMid = styled.p`
  color: #ffffff;
  font-family: 'Helvetica', sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 26px;
  margin-bottom: 12px;

  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 22px;
    margin-bottom: 14px;
  }
`;

const MobileDescription = styled.p`
  display: none; /* 기본 = PC에서 숨김 */

  @media (max-width: 768px) {
    display: block; /* 모바일에서만 보임 */
    color: #ffffff;
    font-size: 15px;
    line-height: 1.6;
    text-align: center;
    margin-bottom: 40px;
    white-space: pre-line;
  }
`;
