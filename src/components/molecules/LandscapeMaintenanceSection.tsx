import React, { useState } from 'react';
import styled from 'styled-components';

type BeforeAfterKey = 'before' | 'middle' | 'after';

export default function LandscapeMaintenanceSection() {
  const [activeTab, setActiveTab] = useState<BeforeAfterKey>('before');

  // 작업 이미지 4장
  const workImages = [
    '/images/landscape_maintenance/1.png',
    '/images/landscape_maintenance/2.png',
    '/images/landscape_maintenance/3.png',
    '/images/landscape_maintenance/4.png',
  ];

  // Before / Middle / After 이미지
  const beforeAfterImages: Record<BeforeAfterKey, string> = {
    before: '/images/landscape_maintenance/5.png',
    middle: '/images/landscape_maintenance/6.png',
    after: '/images/landscape_maintenance/7.png',
  };

  // 공통 데이터 (PC/모바일 둘 다 사용)
  const beforeAfterItems: {
    key: BeforeAfterKey;
    label: string;
    src: string;
  }[] = [
    { key: 'before', label: '작업전', src: beforeAfterImages.before },
    { key: 'middle', label: '작업모습', src: beforeAfterImages.middle },
    { key: 'after', label: '작업후', src: beforeAfterImages.after },
  ];

  return (
    <Section>
      <Inner>
        {/* 상단 타이틀/설명 */}
        <TextBlock>
          <Title>조경 유지관리</Title>
          <SubTitle>
            연간 수목전지, 병해충 방제,
            <MobileBr /> 잔디관리, 시설물 보수
          </SubTitle>
          <Description>
            기업(모든 회사)의 정원유지관리를
            <MobileBr /> 최우선으로 하는 숲과나무 입니다.
            <br />
            <MobileSpace />
            회사의 정원을 가치있게
            <MobileBr /> 유지관리해 줄것을 약속 드립니다.
          </Description>
        </TextBlock>

        {/* 작업 이미지 4장 */}
        <WorkGrid>
          {workImages.map((src, idx) => (
            <WorkImageWrapper key={idx}>
              <WorkImage src={src} alt={`작업 사진 ${idx + 1}`} />
            </WorkImageWrapper>
          ))}
        </WorkGrid>

        {/* Before & After */}
        <BeforeAfterSection>
          <BAHeader>
            <BATitle>Before& After</BATitle>
            <Underline />
          </BAHeader>

          {/* ✅ 모바일 전용 : 탭 + 한 장씩 */}
          <MobileBA>
            <Tabs>
              {beforeAfterItems.map((item) => (
                <Tab
                  key={item.key}
                  type="button"
                  $active={activeTab === item.key}
                  onClick={() => setActiveTab(item.key)}
                >
                  {item.label}
                </Tab>
              ))}
            </Tabs>

            <BAImageWrapper>
              <BAImage
                src={beforeAfterImages[activeTab]}
                alt={
                  activeTab === 'before'
                    ? '작업 전'
                    : activeTab === 'middle'
                      ? '작업 모습'
                      : '작업 후'
                }
              />
            </BAImageWrapper>
          </MobileBA>

          {/* ✅ PC 전용 : 3장 나란히 */}
          <DesktopBA>
            {beforeAfterItems.map((item) => (
              <BACol key={item.key}>
                <BAImageDesktop src={item.src} alt={item.label} />
                <BACaption>{item.label}</BACaption>
              </BACol>
            ))}
          </DesktopBA>
        </BeforeAfterSection>
      </Inner>
    </Section>
  );
}

/* ===== styled-components ===== */

const Section = styled.section`
  width: 100%;
  padding: 320px 50px;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 160px 20px 180px;
  }
`;

const Inner = styled.div`
  width: 100%;
  max-width: 1200px;
`;

/* 상단 텍스트 영역 */
const TextBlock = styled.div`
  max-width: 520px;
  margin-bottom: 64px;

  @media (max-width: 768px) {
    margin: 0 auto 64px;
    text-align: center;
  }
`;

const Title = styled.h2`
  font-size: 40px;
  font-weight: 700;
  color: #005013;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 28px;
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
    margin-bottom: 26px;
    line-height: 1.4;
  }
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #8e8e8e;

  @media (max-width: 768px) {
  }
`;

/* 작업 이미지 4장 그리드 */
const WorkGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
  margin-bottom: 80px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: 24px;
    margin-bottom: 68px;
  }

  @media (max-width: 768px) {
    gap: 10px;
    margin-bottom: 68px;
  }
`;

const WorkImageWrapper = styled.div`
  width: 100%;
  overflow: hidden;
`;

const WorkImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
`;

/* Before & After 공통 영역 */

const BeforeAfterSection = styled.section`
  margin-top: 24px;
`;

const BAHeader = styled.div`
  text-align: center;
  margin-bottom: 31px;

  @media (max-width: 768px) {
    margin-bottom: 54px;
  }
`;

const BATitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #005013;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const Underline = styled.div`
  width: 27px;
  height: 3px;
  background-color: #005013;
  margin: 0 auto;
`;

/* 탭 */
const Tabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    gap: 42px;
    margin-bottom: 28px;
  }
`;

const Tab = styled.button<{ $active?: boolean }>`
  border: none;
  background: none;
  font-size: 14px;
  cursor: pointer;
  padding: 4px 0;
  font-weight: ${({ $active }) => ($active ? 700 : 400)};
  color: ${({ $active }) => ($active ? '#005013' : '#c0c0c0')};

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

/* 모바일 전용 Before&After (탭 + 한 장) */
const MobileBA = styled.div`
  @media (min-width: 769px) {
    display: none;
  }
`;

const BAImageWrapper = styled.div`
  max-width: 640px;
  margin: 0 auto;
`;

const BAImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
`;

/* PC 전용 Before&After (3장 나란히) */
const DesktopBA = styled.div`
  display: none;

  @media (min-width: 769px) {
    margin-top: 24px;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 24px;
  }
`;

const BACol = styled.div`
  text-align: center;
`;

const BAImageDesktop = styled.img`
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
`;

const BACaption = styled.p`
  margin-top: 16px;
  font-size: 14px;
  font-weight: 700;
  color: #5b5b5b;
`;

const MobileBr = styled.br`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileSpace = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    height: 25px; /* 원하는 만큼 여백 주기 (예: 20px) */
  }
`;
