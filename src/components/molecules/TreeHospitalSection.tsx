import styled from 'styled-components';

export default function TreeHospitalSection() {
  const workImages = [
    '/images/tree_hospital/1.png',
    '/images/tree_hospital/2.png',
    '/images/tree_hospital/3.png',
    '/images/tree_hospital/4.png',
  ];

  return (
    <Section>
      <MobileOverlay />
      <Inner>
        <TextBlock>
          <Title>나무병원</Title>
          <SubTitle>
            수목피해 진단 처방, 병충해 방제,
            <MobileBr /> 생육환경 개선
          </SubTitle>
          <Description>
            풍부한 경험의 나무의사와 수목치료사의 <MobileBr />
            진단과 처방으로
            <PCBr /> 벌레로 부터의 <MobileBr />
            해방과 생육환경을 개선해 드립니다.
          </Description>
        </TextBlock>

        <ImageGrid>
          {workImages.map((src, idx) => (
            <ImageItem key={idx}>
              <WorkImage src={src} alt={`나무병원 작업 사진 ${idx + 1}`} />
            </ImageItem>
          ))}
        </ImageGrid>
      </Inner>
    </Section>
  );
}

/* ========== styled-components ========== */

const Section = styled.section`
  position: relative;
  width: 100%;
  background-color: #f8fff8;
  padding: 128px 0 150px;

  @media (max-width: 768px) {
    padding: 180px 20px;
    background-color: transparent;
    background-image: url('/images/tree_hospital/5.png'); /* 배경으로 쓸 대표 사진 */
    background-size: cover;
    background-position: center;
  }
`;

const MobileOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 80, 19, 0.8);
  pointer-events: none;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Inner = styled.div`
  position: relative;
  z-index: 1;

  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 1024px) {
    padding: 0 40px;
  }

  @media (max-width: 768px) {
    padding: 0;
    max-width: 360px;
    align-items: center;
    text-align: center;
  }
`;

/* 텍스트 영역 */

const TextBlock = styled.div`
  max-width: 420px;
  margin-bottom: 36px;

  @media (max-width: 768px) {
    max-width: 100%;
    margin-bottom: 38px;
  }
`;

const Title = styled.h2`
  font-size: 40px;
  font-weight: 700;
  color: #005013;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 28px;
    color: #ffffff;
    margin-bottom: 16px;
  }
`;

const SubTitle = styled.p`
  font-size: 20px;
  font-weight: 700;
  color: #282828;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 16px;
    font-weight: 500;
    line-height: 1.5;
    color: #ffffff;
    margin-bottom: 26px;
  }
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: #8e8e8e;

  @media (max-width: 768px) {
    font-size: 16px;
    line-height: 1.8;
    color: #ffffff;
  }
`;

/* 이미지 그리드: PC 4열, 모바일 2열 */

const ImageGrid = styled.div`
  width: 100%;
  max-width: 1200px;

  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  column-gap: 20px;

  @media (max-width: 1024px) {
    column-gap: 20px;
  }

  @media (max-width: 768px) {
    max-width: 360px;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: 10px;
    row-gap: 10px;
  }
`;

const ImageItem = styled.div`
  width: 100%;
  overflow: hidden;
`;

const WorkImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
`;

const MobileBr = styled.br`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const PCBr = styled.br`
  display: block;

  @media (max-width: 768px) {
    display: none;
  }
`;
