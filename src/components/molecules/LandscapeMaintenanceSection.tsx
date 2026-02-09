import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { useInViewOnce } from '../../hooks/useInViewOnce';

// ✅ 20장
const IMAGES = Array.from({ length: 12 }).map(
  (_, i) => `/images/landscape_maintenance/${i + 1}.jpg`,
);

export default function LandscapeMaintenanceSection() {
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
    [],
  );
  const maxMobileIndex = useMemo(
    () => Math.ceil(IMAGES.length / MOBILE_PER_PAGE),
    [],
  );

  // ✅ 인뷰 훅
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
      // 이전 페이지
      setIndex((prev) => (prev === 0 ? prev : prev - 1));
    } else if (diff < -50) {
      // 다음 페이지
      setIndex((prev) => (prev === maxMobileIndex - 1 ? prev : prev + 1));
    }
  };

  return (
    <Section>
      <Inner>
        {/* 텍스트 */}
        <TextBlock ref={textRef} $inView={textInView}>
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
                        alt={`유지관리 이미지 ${pageIndex * DESKTOP_PER_PAGE + i + 1}`}
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
                        alt={`유지관리 이미지 ${pageIndex * MOBILE_PER_PAGE + i + 1}`}
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

/* ===== fade-up 믹스인 ===== */
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

/* ===== styles ===== */

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

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const TextBlock = styled.div<{ $inView?: boolean }>`
  max-width: 520px;
  margin-bottom: 64px;
  ${fadeUpMixin};

  @media (max-width: 768px) {
    margin: 0 auto 48px;
  }
`;

const Title = styled.h2`
  font-size: 40px;
  font-weight: 700;
  color: #005013;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 28px;
    margin-bottom: 12px;
  }
`;

const SubTitle = styled.p`
  font-size: 20px;
  font-weight: 700;
  color: #282828;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 18px;
    line-height: 1.6;
  }
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.8;
  color: #8e8e8e;

  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 2;
    white-space: pre-line;
  }
`;

/* ----------------- DESKTOP ----------------- */

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

const DesktopPage = styled.div`
  flex: 0 0 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
  width: 100%;
`;

/** ✅ 여기서 높이 고정 + cover */
const ImageItem = styled.div`
  width: 100%;
  background: #eee;

  img {
    width: 100%;
    height: 100%;
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

const ArrowRight = styled.button<{ disabled?: boolean }>`
  position: absolute;
  top: 50%;
  right: -180px;
  transform: translateY(-50%);
  width: 96px;
  height: 120px;
  background: url('/images/rightArrow.png') no-repeat center/contain;
  border: none;
  cursor: pointer;
  z-index: 10;
  opacity: ${({ disabled }) => (disabled ? 0.35 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};

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
  transition: transform 0.35s ease-out;
  width: 100%;
`;

const MobilePage = styled.div`
  flex: 0 0 100%;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
`;

/** ✅ 모바일도 높이 고정 + cover */
const MobileImageItem = styled.div`
  width: 100%;
  background: #eee;

  img {
    width: 100%;
    height: 100%;
    display: block;
  }
`;

const MobileDots = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 14px;
`;

const Dot = styled.div<{ $active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: ${(p) => (p.$active ? '#0f4d18' : '#c8d9c8')};
  transition: background 0.3s;
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
    height: 14px;
  }
`;
