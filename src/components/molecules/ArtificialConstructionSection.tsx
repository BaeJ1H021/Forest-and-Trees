// src/components/ArtificialConstructionSection.tsx
import React, { useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import { useInViewOnce } from '../../hooks/useInViewOnce';

export default function ArtificialConstructionSection() {
  /* ---------------------------- 공통 이미지 ---------------------------- */
  const TOP_IMAGES = [
    '/images/artificial_construction/1.jpg',
    '/images/artificial_construction/2.jpg',
    '/images/artificial_construction/3.jpg',
    '/images/artificial_construction/4.jpg',
    '/images/artificial_construction/5.jpg',
    '/images/artificial_construction/6.jpg',
    '/images/artificial_construction/7.jpg',
    '/images/artificial_construction/8.jpg',
    '/images/artificial_construction/9.jpg',
    '/images/artificial_construction/10.jpg',
    '/images/artificial_construction/11.jpg',
    '/images/artificial_construction/12.jpg',
  ];

  /* ---------------------------- PC 슬라이드 (4장씩) ---------------------------- */
  const [pcIndex, setPcIndex] = useState(0);
  const maxPcIndex = Math.ceil(TOP_IMAGES.length / 4);

  const prevPc = () =>
    setPcIndex((prev) => {
      if (prev === 0) return prev; // 맨 앞 → 멈춤
      return prev - 1;
    });

  const nextPc = () =>
    setPcIndex((prev) => {
      if (prev === maxPcIndex - 1) return prev; // 맨 뒤 → 멈춤
      return prev + 1;
    });

  /* ---------------------------- 모바일 슬라이드 (4장씩, 2x2) ---------------------------- */
  const [mobileIndex, setMobileIndex] = useState(0);
  const maxMobileIndex = Math.ceil(TOP_IMAGES.length / 4);
  const touchStartX = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;

    if (diff > 50) {
      // 이전 그룹
      setMobileIndex((prev) => {
        if (prev === 0) return prev; // 첫 그룹 → 멈춤
        return prev - 1;
      });
    } else if (diff < -50) {
      // 다음 그룹
      setMobileIndex((prev) => {
        if (prev === maxMobileIndex - 1) return prev; // 마지막 그룹 → 멈춤
        return prev + 1;
      });
    }
  };

  /* ---------------------------- inView 훅 ---------------------------- */
  const { ref: textRef, inView: textInView } = useInViewOnce();
  const { ref: pcRef, inView: pcInView } = useInViewOnce();
  const { ref: mobileRef, inView: mobileInView } = useInViewOnce();

  return (
    <Section>
      <Inner>
        {/* ------------------- TEXT ------------------- */}
        <TextBlock ref={textRef} $inView={textInView}>
          <Title>조화 공사</Title>
          <SubTitle>인조 식물 플렌테리어, 조화 공간연출</SubTitle>
          <Description>
            나무가 자라기 어려운 그늘진 실외공간, 건조
            <MobileBr />한 환경의 실내공간을 <WebBr />
            다양한 모양과 크기, <MobileBr />
            색채를 자유롭게 표현할 수 있는 공간 연출
          </Description>
        </TextBlock>

        {/* ------------------- PC 슬라이드 ------------------- */}
        <PcSliderWrapper ref={pcRef} $inView={pcInView}>
          <ArrowLeft onClick={prevPc} />
          <ArrowRight onClick={nextPc} />

          <PcViewport>
            <PcSlider style={{ transform: `translateX(-${pcIndex * 100}%)` }}>
              {Array.from({ length: maxPcIndex }).map((_, groupIndex) => (
                <PcGroup key={groupIndex}>
                  {TOP_IMAGES.slice(groupIndex * 4, groupIndex * 4 + 4).map(
                    (src, i) => (
                      <PcImgItem key={i}>
                        <img src={src} alt={`조화 공사 이미지 ${i + 1}`} />
                      </PcImgItem>
                    ),
                  )}
                </PcGroup>
              ))}
            </PcSlider>
          </PcViewport>
        </PcSliderWrapper>

        {/* ------------------- MOBILE 슬라이드 (2x2) ------------------- */}
        <MobileSliderWrapper
          ref={mobileRef}
          $inView={mobileInView}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <MobileSlider
            style={{ transform: `translateX(-${mobileIndex * 100}%)` }}
          >
            {Array.from({ length: maxMobileIndex }).map((_, groupIndex) => (
              <MobileGrid key={groupIndex}>
                {TOP_IMAGES.slice(groupIndex * 4, groupIndex * 4 + 4).map(
                  (src, i) => (
                    <MobileImage
                      key={i}
                      src={src}
                      alt={`조화 공사 이미지 ${groupIndex * 4 + i + 1}`}
                    />
                  ),
                )}
              </MobileGrid>
            ))}
          </MobileSlider>
        </MobileSliderWrapper>

        <MobileDots>
          {Array.from({ length: maxMobileIndex }).map((_, i) => (
            <Dot key={i} active={i === mobileIndex} />
          ))}
        </MobileDots>
      </Inner>
    </Section>
  );
}

/* ------------------ 공통 fade-up 믹스인 ------------------ */

const fadeUpMixin = css<{ $inView?: boolean }>`
  opacity: 0;
  transform: translateY(40px);
  transition:
    opacity 0.7s ease-out,
    transform 0.7s ease-out;

  ${({ $inView }) =>
    $inView &&
    css`
      opacity: 1;
      transform: translateY(0);
    `}
`;

/* ------------------ STYLES ------------------ */

const Section = styled.section`
  width: 100%;
  padding: 235px 50px;
  display: flex;
  justify-content: center;
  background-color: #ffffff;

  @media (max-width: 768px) {
    padding: 180px 20px 144px;
  }
`;

const Inner = styled.div`
  width: 100%;
  max-width: 1200px;
`;

const TextBlock = styled.div<{ $inView?: boolean }>`
  margin-bottom: 64px;
  ${fadeUpMixin};

  @media (max-width: 768px) {
    text-align: center;
    padding: 0 10px;
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
  margin-bottom: 20px;
  color: #282828;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 26px;
  }
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #8e8e8e;
`;

const WebBr = styled.br`
  display: block;
  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileBr = styled.br`
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;

/* ------------------- PC SLIDER ------------------- */

const PcSliderWrapper = styled.div<{ $inView?: boolean }>`
  position: relative;
  max-width: 1200px;
  margin: 0 auto 80px;
  ${fadeUpMixin};

  @media (max-width: 768px) {
    display: none;
  }
`;

const PcViewport = styled.div`
  overflow: hidden;
  width: 100%;
`;

const PcSlider = styled.div`
  display: flex;
  transition: transform 0.5s ease;
`;

const PcGroup = styled.div`
  flex: 0 0 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
`;

const PcImgItem = styled.div`
  img {
    width: 100%;
    height: auto;
  }
`;

const ArrowLeft = styled.button`
  position: absolute;
  top: 50%;
  left: -180px;
  transform: translateY(-50%);
  width: 96px;
  height: 120px;
  background: url('/images/leftArrow.png') center/contain no-repeat;
  border: none;
  cursor: pointer;
`;

const ArrowRight = styled(ArrowLeft)`
  left: auto;
  right: -180px;
  background: url('/images/rightArrow.png') center/contain no-repeat;
`;

/* ------------------- MOBILE SLIDER ------------------- */

const MobileSliderWrapper = styled.div<{ $inView?: boolean }>`
  display: none;

  @media (max-width: 768px) {
    display: block;
    overflow: hidden;
    width: 100%;
    ${fadeUpMixin};
  }
`;

const MobileSlider = styled.div`
  display: flex;
  width: 100%;
  transition: transform 0.35s ease-out;
`;

const MobileGrid = styled.div`
  flex: 0 0 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const MobileImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const MobileDots = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 16px;
  }
`;

const Dot = styled.div<{ active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${(p) => (p.active ? '#0f4d18' : '#c8d9c8')};
`;
