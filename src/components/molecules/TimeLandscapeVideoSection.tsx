// src/components/TimeLandscapeVideoSection.tsx
import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const VIDEOS = [
  '/videos/1.mp4',
  '/videos/2.mp4',
  '/videos/3.mp4',
  '/videos/4.mp4',
  '/videos/5.mp4',
  '/videos/6.mp4',
];

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
    if (index === 0) return; // 맨 앞이면 이동 없음

    const next = index - 1;
    setIndex(next);
    setMobileIndex(next);
    pauseAllVideos();
    setPlayingIndex(null);
  };

  const goNext = () => {
    if (index === len - 1) return; // 맨 뒤이면 이동 없음

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
      // 이전 (오른쪽 → 왼쪽 스와이프)
      if (mobileIndex === 0) return; // 첫 페이지면 멈춤
      next = mobileIndex - 1;
    } else if (diff < -50) {
      // 다음 (왼쪽 → 오른쪽 스와이프)
      if (mobileIndex === len - 1) return; // 마지막 페이지면 멈춤
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

  return (
    <Section>
      <Inner>
        <Title>시간이 만든 풍경</Title>

        {/* ================= PC ================= */}
        <DesktopWrapper>
          <ArrowLeft onClick={goPrev} />

          <DesktopViewport>
            <DesktopTrack style={{ transform: `translateX(-${index * 100}%)` }}>
              {VIDEOS.map((src, i) => (
                <DesktopSlide key={i} onClick={() => playDesktopVideo(i)}>
                  <VideoCard>
                    <VideoPreview
                      ref={(el) => (desktopVideoRefs.current[i] = el)}
                      muted
                      preload="metadata"
                      src={src}
                    />
                    <Overlay
                      hidden={
                        playingIndex === i &&
                        !desktopVideoRefs.current[i]?.paused
                      }
                    >
                      <PlayIcon />
                    </Overlay>
                  </VideoCard>
                </DesktopSlide>
              ))}
            </DesktopTrack>
          </DesktopViewport>

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
        <MobileWrapper>
          {/* 🔽 여기 래퍼 추가: overflow: hidden */}
          <MobileViewport>
            <MobileSlider
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              style={{ transform: `translateX(-${mobileIndex * 100}%)` }}
            >
              {VIDEOS.map((src, i) => (
                <MobileSlide key={i} onClick={() => playMobileVideo(i)}>
                  <VideoPreview
                    ref={(el) => (mobileVideoRefs.current[i] = el)}
                    muted
                    preload="metadata"
                    src={src}
                  />
                  <Overlay
                    hidden={
                      playingIndex === i && !mobileVideoRefs.current[i]?.paused
                    }
                  >
                    <PlayIcon />
                  </Overlay>
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
   스타일
================================================ */

const Section = styled.section`
  width: 100%;
  padding: 180px 50px;
  background-color: #e8f6e8;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 150px 20px 120px;
  }
`;

const Inner = styled.div`
  width: 100%;
  max-width: 1200px;
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

/* ---------- PC SLIDER ---------- */

const DesktopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  @media (max-width: 768px) {
    display: none;
  }
`;

const DesktopViewport = styled.div`
  width: 100%;
  max-width: 900px;
  overflow: hidden;
`;

const DesktopTrack = styled.div`
  display: flex;
  transition: transform 0.5s ease;
`;

const DesktopSlide = styled.div`
  flex: 0 0 100%;
  display: flex;
  justify-content: center;
`;

const VideoCard = styled.div`
  width: 40%;
  max-width: 420px;
  aspect-ratio: 9 / 16;
  position: relative;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.18);
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
`;

const VideoPreview = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  background: #000;
`;

const Overlay = styled.div<{ hidden?: boolean }>`
  position: absolute;
  inset: 0;
  background: ${({ hidden }) =>
    hidden ? 'transparent' : 'rgba(0, 0, 0, 0.25)'};
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
`;

const ArrowRight = styled(ArrowLeft)`
  left: auto;
  right: -100px;
  background: url('/images/rightArrow.png') center/contain no-repeat;
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

/* ---------- MOBILE SLIDER ---------- */

const MobileWrapper = styled.div`
  @media (min-width: 769px) {
    display: none;
  }
`;

/* 🔽 새로 추가된 뷰포트 */
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
  position: relative;
  cursor: pointer;
  max-width: 380px;
  margin: 0 auto;
`;

const MobileDots = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 12px;
  gap: 8px;
`;
