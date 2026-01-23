import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { useInViewOnce } from '../../hooks/useInViewOnce';

// ✅ 20장
const IMAGES = Array.from({ length: 20 }).map(
  (_, i) => `/images/garden_work/${i + 1}.jpg`, // 확장자/경로 맞춰줘 (.jpg면 .jpg)
);

export default function GardenWork() {
  const [index, setIndex] = useState(0); // ✅ PC/모바일 모두 "1장 단위" 인덱스
  const touchStartX = useRef<number | null>(null);

  const maxIndex = IMAGES.length; // 총 슬라이드 수(=20)

  // ✅ 현재 뷰포트가 모바일인지 여부
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= 768;
  });

  useEffect(() => {
    const handleResize = () => {
      if (typeof window === 'undefined') return;
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ✅ PC <-> 모바일 전환 시 인덱스 초기화
  useEffect(() => {
    setIndex(0);
  }, [isMobile]);

  // ✅ 인뷰 상태 훅
  const { ref: textRef, inView: textInView } = useInViewOnce();
  const { ref: desktopRef, inView: desktopInView } = useInViewOnce();
  const { ref: mobileRef, inView: mobileInView } = useInViewOnce();

  // ------------------------ ARROWS (PC) ------------------------
  const onPrev = () => {
    setIndex((prev) => (prev === 0 ? prev : prev - 1));
  };

  const onNext = () => {
    setIndex((prev) => (prev === maxIndex - 1 ? prev : prev + 1));
  };

  // ------------------------ SWIPE (MOBILE) ------------------------
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;

    const diff = e.changedTouches[0].clientX - touchStartX.current;

    if (diff > 50) {
      setIndex((prev) => (prev === 0 ? prev : prev - 1));
    } else if (diff < -50) {
      setIndex((prev) => (prev === maxIndex - 1 ? prev : prev + 1));
    }
  };

  return (
    <Wrapper>
      <Inner>
        {/* 텍스트 블럭 fade-up */}
        <TextBlock ref={textRef} $inView={textInView}>
          <Title>정원공사</Title>
          <SubTitle>카페, 학교, 법인 회사, 전원주택, 정원공사</SubTitle>
          <Description>
            쉼과 산책로/숲길 학교정원, 나무와 꽃이 <MobileBr /> 어우러진 포토존
            카페정원, 잡초 관리가 어려운 <br /> 법인회사 드라이정원 등 나무,
            석주, 이끼, 바위술 등 <MobileBr />
            다양한 소재로 완성도 높은 공간창출
          </Description>
        </TextBlock>

        {/* -------------------------- DESKTOP (1장씩) -------------------------- */}
        <DesktopContainer ref={desktopRef} $inView={desktopInView}>
          <ArrowLeft
            onClick={onPrev}
            aria-label="이전"
            disabled={index === 0}
          />
          <ArrowRight
            onClick={onNext}
            aria-label="다음"
            disabled={index === maxIndex - 1}
          />

          <DesktopViewport>
            <DesktopSlider
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {IMAGES.map((src, i) => (
                <DesktopSlide key={i}>
                  <SlideImage src={src} alt={`정원 이미지 ${i + 1}`} />
                </DesktopSlide>
              ))}
            </DesktopSlider>
          </DesktopViewport>

          {/* dots (PC에서도 필요하면 유지) */}
          <DesktopDots>
            {IMAGES.map((_, i) => (
              <Dot key={i} active={i === index} />
            ))}
          </DesktopDots>
        </DesktopContainer>

        {/* -------------------------- MOBILE (1장씩) -------------------------- */}
        <MobileContainer
          ref={mobileRef}
          $inView={mobileInView}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <MobileViewport>
            <MobileSlider style={{ transform: `translateX(-${index * 100}%)` }}>
              {IMAGES.map((src, i) => (
                <MobileSlide key={i}>
                  <SlideImage src={src} alt={`정원 이미지 ${i + 1}`} />
                </MobileSlide>
              ))}
            </MobileSlider>
          </MobileViewport>

          {/* 모바일 인디케이터 */}
          <MobileDots>
            {IMAGES.map((_, i) => (
              <Dot key={i} active={i === index} />
            ))}
          </MobileDots>
        </MobileContainer>
      </Inner>
    </Wrapper>
  );
}

/* ----------------- 공통 fade-up 믹스인 ----------------- */

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

/* ----------------- STYLES ----------------- */

const Wrapper = styled.div`
  width: 100%;
  padding: 320px 50px;

  @media (max-width: 1550px) {
    padding: 320px 100px;
  }

  @media (max-width: 768px) {
    padding: 180px 20px;
  }
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

/** 텍스트 영역 전체를 fade-up */
const TextBlock = styled.div<{ $inView?: boolean }>`
  ${fadeUpMixin};
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
  margin-bottom: 71px;

  @media (max-width: 768px) {
    font-size: 15px;
    margin-bottom: 52px;
    line-height: 1.6;
  }
`;

/* ----------------- DESKTOP (1장씩) ----------------- */

const DesktopContainer = styled.div<{ $inView?: boolean }>`
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  ${fadeUpMixin};

  @media (max-width: 768px) {
    display: none;
  }
`;

const DesktopViewport = styled.div`
  width: 100%;
  overflow: hidden;
`;

const DesktopSlider = styled.div`
  display: flex;
  transition: transform 0.5s ease;
  width: 100%;
`;

const DesktopSlide = styled.div`
  flex: 0 0 100%;
  width: 100%;
`;

const SlideImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const DesktopDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 14px;
`;

/* 화살표 */
const ArrowLeft = styled.button<{ disabled?: boolean }>`
  position: absolute;
  top: 50%;
  left: -180px;
  transform: translateY(-50%);
  width: 96px;
  height: 120px;
  background: url('/images/leftArrow.png') no-repeat center/contain;
  border: none;
  cursor: pointer;
  z-index: 10;

  opacity: ${({ disabled }) => (disabled ? 0.35 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};

  @media (max-width: 1550px) {
    left: -100px;
    width: 72px;
    height: 90px;
  }
`;

const ArrowRight = styled(ArrowLeft)<{ disabled?: boolean }>`
  left: auto;
  right: -180px;
  background: url('/images/rightArrow.png') no-repeat center/contain;

  @media (max-width: 1550px) {
    right: -100px;
    width: 72px;
    height: 90px;
  }
`;

/* ----------------- MOBILE (1장씩) ----------------- */

const MobileContainer = styled.div<{ $inView?: boolean }>`
  display: none;

  @media (max-width: 768px) {
    display: block;
    width: 100%;
    ${fadeUpMixin};
  }
`;

const MobileViewport = styled.div`
  width: 100%;
  overflow: hidden;
`;

const MobileSlider = styled.div`
  display: flex;
  transition: transform 0.35s ease-out;
  width: 100%;
`;

const MobileSlide = styled.div`
  flex: 0 0 100%;
  width: 100%;
`;

const MobileDots = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 14px;
`;

const Dot = styled.div<{ active: boolean }>`
  margin-top: 10px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${(p) => (p.active ? '#0f4d18' : '#c8d9c8')};
  transition: background 0.3s;
`;

const MobileBr = styled.br`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;
