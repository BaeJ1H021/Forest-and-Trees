// src/components/TimeLandscapeVideoSection.tsx
import React, { useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import { useInViewOnce } from '../../hooks/useInViewOnce';

const VIDEOS = [
  '/videos/1.mp4',
  '/videos/2.mp4',
  '/videos/3.mp4',
  '/videos/4.mp4',
  '/videos/5.mp4',
  '/videos/6.mp4',
];

type DesktopPosition = 'center' | 'left' | 'right' | 'out';

export default function TimeLandscapeVideoSection() {
  const [index, setIndex] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const len = VIDEOS.length;

  const desktopVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const mobileVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const pauseAllVideos = () => {
    desktopVideoRefs.current.forEach((v) => v && v.pause());
    mobileVideoRefs.current.forEach((v) => v && v.pause());
  };

  /* ---------- PC 이동 ---------- */
  const goPrev = () => {
    if (index === 0) return;
    const next = index - 1;
    setIndex(next);
    setMobileIndex(next);
    pauseAllVideos();
    setPlayingIndex(null);
  };

  const goNext = () => {
    if (index === len - 1) return;
    const next = index + 1;
    setIndex(next);
    setMobileIndex(next);
    pauseAllVideos();
    setPlayingIndex(null);
  };

  /* ---------- 모바일 스와이프 ---------- */
  const touchStartX = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;

    let next = mobileIndex;

    if (diff > 50) {
      if (mobileIndex === 0) return;
      next = mobileIndex - 1;
    } else if (diff < -50) {
      if (mobileIndex === len - 1) return;
      next = mobileIndex + 1;
    } else {
      return;
    }

    setMobileIndex(next);
    setIndex(next);
    pauseAllVideos();
    setPlayingIndex(null);
  };

  /* ---------- 재생 토글 (PC) ---------- */
  const playDesktopVideo = (i: number) => {
    const video = desktopVideoRefs.current[i];
    if (!video) return;

    if (playingIndex === i && !video.paused) {
      video.pause();
      setPlayingIndex(null);
      return;
    }

    pauseAllVideos();

    setPlayingIndex(i);
    setIndex(i);
    setMobileIndex(i);
    video.muted = false;
    video.play().catch(() => {});
  };

  /* ---------- 재생 토글 (Mobile) ---------- */
  const playMobileVideo = (i: number) => {
    const video = mobileVideoRefs.current[i];
    if (!video) return;

    if (playingIndex === i && !video.paused) {
      video.pause();
      setPlayingIndex(null);
      return;
    }

    pauseAllVideos();

    setPlayingIndex(i);
    setIndex(i);
    setMobileIndex(i);
    video.muted = false;
    video.play().catch(() => {});
  };

  /* ---------- inView 훅 ---------- */
  const { ref: titleRef, inView: titleInView } = useInViewOnce();
  const { ref: desktopRef, inView: desktopInView } = useInViewOnce();
  const { ref: mobileRef, inView: mobileInView } = useInViewOnce();

  /* ---------- Desktop 카드 위치 계산 ---------- */
  const getPosition = (i: number): DesktopPosition => {
    if (i === index) return 'center';
    if (i === index - 1) return 'left';
    if (i === index + 1) return 'right';
    return 'out';
  };

  return (
    <Section>
      <Inner>
        <TitleWrapper ref={titleRef} $inView={titleInView}>
          <Title>시간이 만든 풍경</Title>
        </TitleWrapper>

        {/* ================= PC ================= */}
        <DesktopWrapper ref={desktopRef} $inView={desktopInView}>
          <ArrowLeft onClick={goPrev} />

          <DesktopStage>
            {VIDEOS.map((src, i) => {
              const pos = getPosition(i);
              const isCenter = pos === 'center';

              return (
                <DesktopCard
                  key={i}
                  $position={pos}
                  onClick={() => isCenter && playDesktopVideo(i)}
                >
                  <VideoPreview
                    ref={(el) => (desktopVideoRefs.current[i] = el)}
                    muted
                    preload="metadata"
                    src={src}
                  />
                  <Overlay
                    hidden={
                      playingIndex === i && !desktopVideoRefs.current[i]?.paused
                    }
                    $position={pos}
                  >
                    {/* 🔽 가운데 카드일 때만 재생 아이콘 표시 */}
                    {pos === 'center' && <PlayIcon />}
                  </Overlay>
                </DesktopCard>
              );
            })}
          </DesktopStage>

          <Dots>
            {VIDEOS.map((_, i) => (
              <Dot
                key={i}
                active={i === index}
                onClick={() => {
                  setIndex(i);
                  setMobileIndex(i);
                  pauseAllVideos();
                  setPlayingIndex(null);
                }}
              />
            ))}
          </Dots>

          <ArrowRight onClick={goNext} />
        </DesktopWrapper>

        {/* ================= Mobile ================= */}
        <MobileWrapper ref={mobileRef} $inView={mobileInView}>
          <MobileViewport>
            <MobileSlider
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              style={{ transform: `translateX(-${mobileIndex * 100}%)` }}
            >
              {VIDEOS.map((src, i) => (
                <MobileSlide key={i} onClick={() => playMobileVideo(i)}>
                  <VideoCard>
                    <VideoPreview
                      ref={(el) => (mobileVideoRefs.current[i] = el)}
                      muted
                      preload="metadata"
                      src={src}
                    />
                    <Overlay
                      hidden={
                        playingIndex === i &&
                        !mobileVideoRefs.current[i]?.paused
                      }
                    >
                      <PlayIcon />
                    </Overlay>
                  </VideoCard>
                </MobileSlide>
              ))}
            </MobileSlider>
          </MobileViewport>

          <MobileDots>
            {VIDEOS.map((_, i) => (
              <Dot
                key={i}
                active={i === mobileIndex}
                onClick={() => {
                  setMobileIndex(i);
                  setIndex(i);
                  pauseAllVideos();
                  setPlayingIndex(null);
                }}
              />
            ))}
          </MobileDots>
        </MobileWrapper>
      </Inner>
    </Section>
  );
}

/* ================================================
   공통 fade-up 믹스인
================================================ */

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

/* ================================================
   기본 레이아웃
================================================ */

const Section = styled.section`
  width: 100%;
  padding: 180px 50px;
  background-color: #e8f6e8;
  display: flex;
  justify-content: center;

  @media (max-width: 1550px) {
    padding: 180px 100px;
  }

  @media (max-width: 768px) {
    padding: 150px 20px 120px;
  }
`;

const Inner = styled.div`
  width: 100%;
  max-width: 1200px;
`;

const TitleWrapper = styled.div<{ $inView?: boolean }>`
  ${fadeUpMixin};
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: 700;
  color: #005013;
  margin-bottom: 64px;

  @media (max-width: 768px) {
    text-align: center;
    font-size: 24px;
    margin-bottom: 28px;
  }
`;

/* ================================================
   PC 슬라이더 (3장 레이아웃)
================================================ */

const DesktopWrapper = styled.div<{ $inView?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  ${fadeUpMixin};

  @media (max-width: 768px) {
    display: none;
  }
`;

/**
 * 카드들이 모두 겹쳐지는 "무대"
 * 왼쪽/오른쪽 카드는 transform 으로만 위치 조정
 */
const DesktopStage = styled.div`
  position: relative;
  width: 100%;
  max-width: 1000px;
  height: 640px; /* 중앙 카드 높이 확보용 */
`;

/* 공통 카드 베이스 */
const VideoCardBase = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 40%;
  max-width: 420px;
  aspect-ratio: 9 / 16;
  border-radius: 16px;
  overflow: hidden;
  background: #000;

  @media (max-width: 1550px) {
    width: 35%;
  }
`;

const DesktopCard = styled(VideoCardBase)<{ $position: DesktopPosition }>`
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.18);
  transform-origin: center center;
  transition:
    transform 0.5s ease,
    opacity 0.5s ease,
    box-shadow 0.5s ease;
  cursor: ${({ $position }) =>
    $position === 'center' ? 'pointer' : 'default'};
  pointer-events: ${({ $position }) =>
    $position === 'center' ? 'auto' : 'none'};

  ${({ $position }) => {
    switch ($position) {
      case 'center':
        return css`
          transform: translateX(-50%) scale(1);
          opacity: 1;
          z-index: 3;
        `;
      case 'left':
        return css`
          transform: translateX(calc(-50% - 260px)) scale(0.86);
          opacity: 0.4;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
          z-index: 2;

          @media (max-width: 1550px) {
            transform: translateX(calc(-50% - 230px)) scale(0.86);
          }
          @media (max-width: 1200px) {
            transform: translateX(calc(-50% - 200px)) scale(0.86);
          }
          @media (max-width: 1100px) {
            transform: translateX(calc(-50% - 180px)) scale(0.86);
          }
          @media (max-width: 1000px) {
            transform: translateX(calc(-50% - 160px)) scale(0.86);
          }
          @media (max-width: 900px) {
            transform: translateX(calc(-50% - 140px)) scale(0.86);
          }
          @media (max-width: 800px) {
            transform: translateX(calc(-50% - 120px)) scale(0.86);
          }
        `;
      case 'right':
        return css`
          transform: translateX(calc(-50% + 260px)) scale(0.86);
          opacity: 0.4;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
          z-index: 2;

          @media (max-width: 1550px) {
            transform: translateX(calc(-50% + 230px)) scale(0.86);
          }
          @media (max-width: 1200px) {
            transform: translateX(calc(-50% + 200px)) scale(0.86);
          }
          @media (max-width: 1100px) {
            transform: translateX(calc(-50% + 180px)) scale(0.86);
          }
          @media (max-width: 1000px) {
            transform: translateX(calc(-50% + 160px)) scale(0.86);
          }
          @media (max-width: 900px) {
            transform: translateX(calc(-50% + 140px)) scale(0.86);
          }
          @media (max-width: 800px) {
            transform: translateX(calc(-50% + 120px)) scale(0.86);
          }
        `;
      case 'out':
      default:
        return css`
          transform: translateX(-50%) scale(0.8);
          opacity: 0;
          box-shadow: none;
          z-index: 1;
        `;
    }
  }}
`;

const VideoPreview = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

// 기존
// const Overlay = styled.div<{ hidden?: boolean }>` ...

const Overlay = styled.div<{ hidden?: boolean; $position?: DesktopPosition }>`
  position: absolute;
  inset: 0;
  display: ${({ hidden }) => (hidden ? 'none' : 'flex')};
  justify-content: center;
  align-items: center;
`;

const PlayIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 5px solid #fff;
  display: flex;
  justify-content: center;
  align-items: center;

  &::before {
    content: '';
    border-style: solid;
    border-width: 15px 0 15px 24px;
    border-color: transparent transparent transparent white;
    margin-left: 6px;
  }
`;

const ArrowLeft = styled.button`
  position: absolute;
  left: -100px;
  top: 50%;
  transform: translateY(-50%);
  background: url('/images/leftArrow.png') center/contain no-repeat;
  width: 80px;
  height: 120px;
  border: none;
  cursor: pointer;

  @media (max-width: 1550px) {
    left: -50px;
    top: 45%;
  }

  @media (max-width: 1200px) {
    width: 60px;
    height: 90px;
    top: 42%;
  }

  @media (max-width: 1100px) {
    top: 38%;
  }

  @media (max-width: 900px) {
    top: 30%;
  }

  @media (max-width: 800px) {
    top: 25%;
  }
`;

const ArrowRight = styled(ArrowLeft)`
  left: auto;
  right: -100px;
  background: url('/images/rightArrow.png') center/contain no-repeat;

  @media (max-width: 1550px) {
    right: -50px;
    top: 45%;
  }

  @media (max-width: 1200px) {
    width: 60px;
    height: 90px;
    top: 42%;
  }

  @media (max-width: 1100px) {
    top: 38%;
  }

  @media (max-width: 900px) {
    top: 30%;
  }

  @media (max-width: 800px) {
    top: 25%;
  }
`;

const Dots = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 20px;
`;

const Dot = styled.div<{ active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ active }) => (active ? '#0f4d18' : '#c8d9c8')};
  cursor: pointer;
`;

/* ================================================
   MOBILE 슬라이더 (기존과 거의 동일)
================================================ */

const MobileWrapper = styled.div<{ $inView?: boolean }>`
  @media (min-width: 769px) {
    display: none;
  }

  @media (max-width: 768px) {
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

const MobileSlide = styled.div`
  flex: 0 0 100%;
  display: flex;
  justify-content: center;
`;

const VideoCard = styled(VideoCardBase)`
  position: relative;
  transform: translateX(-50%); /* base가 left:50%라서 보정 */
  width: 100%;
  max-width: 380px;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.18);
  cursor: pointer;
`;

const MobileDots = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 12px;
  gap: 8px;
`;
