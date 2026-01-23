// src/components/TrimmingMowingSection.tsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { useInViewOnce } from '../../hooks/useInViewOnce';

export default function TrimmingMowingSection() {
  // ✅ 20장 (경로/확장자 필요하면 맞춰줘)
  const IMAGES = useMemo(
    () =>
      Array.from({ length: 20 }).map(
        (_, i) => `/images/trimming_mowing/${i + 1}.jpg`,
      ),
    [],
  );

  // index: 데스크탑은 2장/페이지, 모바일은 4장/페이지
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

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

  // ✅ 페이지당 개수
  const DESKTOP_PER_PAGE = 2;
  const MOBILE_PER_PAGE = 4;

  // ✅ 페이지 수
  const maxDesktopIndex = useMemo(
    () => Math.ceil(IMAGES.length / DESKTOP_PER_PAGE),
    [IMAGES.length],
  );
  const maxMobileIndex = useMemo(
    () => Math.ceil(IMAGES.length / MOBILE_PER_PAGE),
    [IMAGES.length],
  );

  // ✅ inView 훅
  const { ref: textRef, inView: textInView } = useInViewOnce();
  const { ref: desktopRef, inView: desktopInView } = useInViewOnce();
  const { ref: mobileRef, inView: mobileInView } = useInViewOnce();

  // ------------------------ DESKTOP ARROWS (2장씩) ------------------------
  const onPrev = () => setIndex((prev) => (prev === 0 ? prev : prev - 1));
  const onNext = () =>
    setIndex((prev) => (prev === maxDesktopIndex - 1 ? prev : prev + 1));

  // ------------------------ MOBILE SWIPE (4장씩 페이지 이동) ------------------------
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;

    if (diff > 50) {
      setIndex((prev) => (prev === 0 ? prev : prev - 1));
    } else if (diff < -50) {
      setIndex((prev) => (prev === maxMobileIndex - 1 ? prev : prev + 1));
    }
  };

  return (
    <Section>
      <Inner>
        {/* ------------------- TEXT ------------------- */}
        <TextBlock ref={textRef} $inView={textInView}>
          <Title>전지 및 예초공사</Title>
          <SubTitle>수목 전지, 잔디예초, 제초 작업</SubTitle>

          <Description>
            아파트, 학교, 기업을 대상으로 수목 전지,
            <MobileBr /> 교육 전정, 잔디예초, 잡초 제거를
            <MobileBr /> 통해 <WebBr /> 안전하고 깨끗한 정원관리.
            <br />
            <MobileBr />
            수목 상태 진단과 적절한 약제 처방으로 <MobileBr />
            건강한 나무성장 관리(수목 병충해 방제)
          </Description>
        </TextBlock>

        {/* -------------------------- DESKTOP (2장씩) -------------------------- */}
        <DesktopContainer ref={desktopRef} $inView={desktopInView}>
          <ArrowLeft
            onClick={onPrev}
            aria-label="이전"
            disabled={index === 0}
          />
          <ArrowRight
            onClick={onNext}
            aria-label="다음"
            disabled={index === maxDesktopIndex - 1}
          />

          <DesktopViewport>
            <DesktopSlider
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {Array.from({ length: maxDesktopIndex }).map((_, pageIndex) => (
                <DesktopPage key={pageIndex}>
                  {IMAGES.slice(
                    pageIndex * DESKTOP_PER_PAGE,
                    pageIndex * DESKTOP_PER_PAGE + DESKTOP_PER_PAGE,
                  ).map((src, i) => (
                    <ImageItem key={`${pageIndex}-${i}`}>
                      <img
                        src={src}
                        alt={`전지/예초 이미지 ${pageIndex * DESKTOP_PER_PAGE + i + 1}`}
                        loading="lazy"
                      />
                    </ImageItem>
                  ))}
                </DesktopPage>
              ))}
            </DesktopSlider>
          </DesktopViewport>
        </DesktopContainer>

        {/* -------------------------- MOBILE (4장씩 = 2x2) -------------------------- */}
        <MobileContainer
          ref={mobileRef}
          $inView={mobileInView}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <MobileViewport>
            <MobileSlider style={{ transform: `translateX(-${index * 100}%)` }}>
              {Array.from({ length: maxMobileIndex }).map((_, pageIndex) => (
                <MobilePage key={pageIndex}>
                  {IMAGES.slice(
                    pageIndex * MOBILE_PER_PAGE,
                    pageIndex * MOBILE_PER_PAGE + MOBILE_PER_PAGE,
                  ).map((src, i) => (
                    <MobileImageItem key={`${pageIndex}-${i}`}>
                      <img
                        src={src}
                        alt={`전지/예초 이미지 ${pageIndex * MOBILE_PER_PAGE + i + 1}`}
                        loading="lazy"
                      />
                    </MobileImageItem>
                  ))}
                </MobilePage>
              ))}
            </MobileSlider>
          </MobileViewport>

          {/* ✅ 페이지 기준 dots */}
          <MobileDots>
            {Array.from({ length: maxMobileIndex }).map((_, i) => (
              <Dot key={i} $active={i === index} />
            ))}
          </MobileDots>
        </MobileContainer>
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
  background-color: #f5f5f5;

  @media (max-width: 1550px) {
    padding: 235px 100px;
  }

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
    padding: 0 20px;
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

/* ----------------- DESKTOP (2장씩 슬라이드) ----------------- */

const DesktopContainer = styled.div<{ $inView?: boolean }>`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  ${fadeUpMixin};

  @media (max-width: 768px) {
    display: none;
  }
`;

const DesktopViewport = styled.div`
  overflow: hidden;
  width: 100%;
`;

const DesktopSlider = styled.div`
  display: flex;
  transition: transform 0.5s ease;
  width: 100%;
`;

const DesktopPage = styled.div`
  flex: 0 0 100%;
  width: 100%;

  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;

  @media (max-width: 1550px) {
    gap: 12px;
  }
`;

const ImageItem = styled.div`
  width: 100%;

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const ArrowLeft = styled.button<{ disabled?: boolean }>`
  position: absolute;
  top: 50%;
  left: -180px;
  transform: translateY(-50%);
  width: 96px;
  height: 120px;
  background: url('/images/leftArrow.png') center/contain no-repeat;
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

const ArrowRight = styled(ArrowLeft)`
  left: auto;
  right: -180px;
  background: url('/images/rightArrow.png') center/contain no-repeat;

  @media (max-width: 1550px) {
    right: -100px;
    width: 72px;
    height: 90px;
  }
`;

/* ----------------- MOBILE (4장씩: 2x2) ----------------- */

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
  width: 100%;
  transition: transform 0.35s ease-out;
`;

const MobilePage = styled.div`
  flex: 0 0 100%;
  width: 100%;

  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
`;

const MobileImageItem = styled.div`
  width: 100%;

  img {
    width: 100%;
    height: auto;
    display: block;
  }
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

const Dot = styled.div<{ $active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${(p) => (p.$active ? '#0f4d18' : '#c8d9c8')};
`;
