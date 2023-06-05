"use client";

import { BiPause } from "react-icons/bi";
import { BsFillPlayFill } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { MdOutlineTranscribe, MdOutlineVideoSettings } from "react-icons/md";
import { FiRotateCcw, FiRotateCw } from "react-icons/fi";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { FaExpandAlt } from "react-icons/fa";
import { useRef, useState } from "react";

const VideoPlayer = ({ onClose }: { onClose: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handlePlayPause = async (): Promise<void> => {
    const video = videoRef.current;
    if (video?.paused) {
      await video.play();
      setIsPlaying(true);
    } else if (video) {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleMuteUnmute = (): void => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  const handleTimeUpdate = (): void => {
    const video = videoRef.current;
    if (video) {
      setCurrentTime(video.currentTime);
    }
  };

  const handleLoadedMetadata = (): void => {
    const video = videoRef.current;
    if (video) {
      setDuration(video.duration);
    }
  };

  const toggleFullscreen = async (): Promise<void> => {
    const video = videoRef.current;
    if (video !== null) {
      if (!isFullscreen) {
        if (video.requestFullscreen) {
          await video.requestFullscreen();
        }
        // else if (video.mozRequestFullScreen) {
        //   video.mozRequestFullScreen();
        // } else if (video.webkitRequestFullscreen) {
        //   video.webkitRequestFullscreen();
        // } else if (video.msRequestFullscreen) {
        //   video.msRequestFullscreen();
        // }
        setIsFullscreen(true);
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
        // else if (document.mozCancelFullScreen) {
        //   document.mozCancelFullScreen();
        // } else if (document.webkitExitFullscreen) {
        //   document.webkitExitFullscreen();
        // } else if (document.msExitFullscreen) {
        //   document.msExitFullscreen();
        // }
        setIsFullscreen(false);
      }
    }
  };

  const calculateProgress = (): string => {
    const progress = (currentTime / duration) * 100;
    return `${progress}%`;
  };

  const formatDuration = (duration: number): string => {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = Math.floor(duration % 60);

    const formattedHours =
      hours > 0 ? `${hours.toString().padStart(2, "0")}:` : "";
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    return `${formattedHours}${formattedMinutes}:${formattedSeconds}`;
  };

  const forwardVideo = (): void => {
    const video = videoRef.current;
    if (video !== null) {
      video.currentTime += 10;
    }
  };

  const rewindVideo = (): void => {
    const video = videoRef.current;
    if (video !== null) {
      if (video.currentTime <= 10) {
        video.currentTime = 0;
      } else {
        video.currentTime -= 10;
      }
    }
  };

  return (
    <div className="relative">
      <div className="absolute z-50 p-2 text-white rounded-lg bg-neutral-900/90 top-1 left-1">
        <div
          className="p-1 transition-colors rounded-md cursor-pointer hover:bg-slate-400/40"
          onClick={onClose}
        >
          <IoMdClose />
        </div>
      </div>
      <div className="absolute z-50 flex items-center p-2 space-x-3 text-white rounded-lg bg-neutral-900/90 top-1 right-1">
        <div className="p-1 transition-colors rounded-md cursor-pointer hover:bg-slate-400/40">
          <MdOutlineTranscribe onClick={() => {}} />
        </div>
        <div className="p-1 transition-colors rounded-md cursor-pointer hover:bg-slate-400/40">
          <MdOutlineVideoSettings onClick={() => {}} />
        </div>
      </div>

      <div className="relative" onClick={handlePlayPause}>
        <video
          id="video-player"
          className="rounded-xl"
          autoPlay
          aria-label="Airbnb CEO Brian Chesky sits in a modern, airy home, holding a phone while smiling and gesturing, as if in mid-conversation. A play icon is overlaid on the image."
          crossOrigin="anonymous"
          playsInline
          preload="metadata"
          style={{ objectFit: "contain" }}
          src="/videos/airbnb.mp4"
          // controls
          ref={videoRef}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
        />
        <div className="absolute top-[40%] left-[46%]">
          {!isPlaying && (
            <BsFillPlayFill id="play-icon" color="white" size={80} />
          )}
        </div>
      </div>
      <div className="absolute w-[85%] p-2 text-sm font-bold gap-x-4 text-white rounded-lg bg-neutral-900/95 inset-x-0 bottom-0 md:bottom-3 mx-auto flex items-center justify-between">
        {isPlaying ? (
          <div className="p-1 transition-colors rounded-md cursor-pointer hover:bg-slate-400/40">
            <BiPause onClick={handlePlayPause} size={20} id="pause-icon" />
          </div>
        ) : (
          <div className="p-1 transition-colors rounded-md cursor-pointer hover:bg-slate-400/40">
            <BsFillPlayFill
              onClick={handlePlayPause}
              size={20}
              id="play-icon"
            />
          </div>
        )}

        <div
          className="relative p-1 transition-colors rounded-md cursor-pointer hover:bg-slate-400/40"
          onClick={rewindVideo}
        >
          <FiRotateCcw size={20} id="rewind-icon" />
          <div className="absolute text-[0.4rem] top-[0.30rem] left-[0.65rem]">
            10
          </div>
        </div>
        <div
          className="relative p-1 transition-colors rounded-md cursor-pointer hover:bg-slate-400/40"
          onClick={forwardVideo}
        >
          <FiRotateCw size={20} id="forward-icon" />
          <div className="absolute text-[0.4rem] top-[0.30rem] left-[0.60rem]">
            10
          </div>
        </div>
        <div>{formatDuration(currentTime)}</div>

        <div className="flex-1 p-1">
          <input
            className="w-full"
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            step={0.1}
            onChange={(e) => {
              const video = videoRef.current;
              if (video) {
                video.currentTime = parseFloat(e.target.value);
                setCurrentTime(video.currentTime);
              }
            }}
          />

          <div style={{ width: calculateProgress() }}></div>
        </div>

        <div>{formatDuration(duration)}</div>
        {isMuted ? (
          <div className="p-1 transition-colors rounded-md cursor-pointer hover:bg-slate-400/40">
            <HiVolumeOff size={20} onClick={handleMuteUnmute} />
          </div>
        ) : (
          <div className="p-1 transition-colors rounded-md cursor-pointer hover:bg-slate-400/40">
            <HiVolumeUp size={20} onClick={handleMuteUnmute} />
          </div>
        )}
        <div className="p-1 transition-colors rounded-md cursor-pointer hover:bg-slate-400/40">
          <FaExpandAlt size={16} onClick={toggleFullscreen} />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
