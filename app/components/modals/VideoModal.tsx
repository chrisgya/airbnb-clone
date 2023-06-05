"use client";

import useVideoModal from "@/app/hooks/useVideoModal";
import VideoPlayer from "../VideoPlayer";

const VideoModal = () => {
  const videoModal = useVideoModal();

  if (!videoModal.isOpen) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-black outline-none focus:outline-none">
        <div className="grid place-content-center">
          {/*content*/}
          <div
            className={`
            translate
            duration-300
            h-full
            ${videoModal.isOpen ? "translate-y-0" : "translate-y-full"}
            ${videoModal.isOpen ? "opacity-100" : "opacity-0"}
          `}
          >
            <VideoPlayer onClose={videoModal.onClose} />
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoModal;
