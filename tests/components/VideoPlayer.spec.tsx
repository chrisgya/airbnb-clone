import React from "react";
import { render } from "@testing-library/react";
import VideoPlayer from "@/app/components/VideoPlayer";
import "@testing-library/jest-dom/extend-expect";

//@to-do: fix these tests
describe("VideoPlayer", () => {
  const onClose = jest.fn();

  Object.defineProperty(HTMLMediaElement.prototype, "play", {
    configurable: true,
    get() {
      return jest.fn();
    },
  });

  test("renders without errors", () => {
    const { baseElement } = render(<VideoPlayer onClose={onClose} />);
    const videoPlayerElement = baseElement.querySelector("#video-player");
    expect(videoPlayerElement).toBeInTheDocument();
  });

  // test("handles play/pause button click", async () => {
  //   const { container } = render(<VideoPlayer onClose={onClose} />);

  //   let pauseButton = container.querySelector("#pause-icon");
  //   expect(pauseButton).toBeInTheDocument();

  //   let playButton = container.querySelector("#play-icon");
  //   expect(playButton).not.toBeInTheDocument();

  //   fireEvent.click(pauseButton as Element);

  //   playButton = await waitFor(() => container.querySelector("#play-icon"));
  //   expect(playButton).toBeInTheDocument();

  //   // expect(pauseButton).not.toBeInTheDocument();

  //   // expect(playButton).toBeInTheDocument();

  //   // fireEvent.click(playButton as Element);
  //   // expect(pauseButton).toBeInTheDocument();
  // });

  // test("handles play/pause button click", async () => {
  //   const { container } = render(<VideoPlayer onClose={onClose} />);

  //   // Initial state - Video is playing
  //   const pauseButton = container.querySelector("#pause-icon") as Element;
  //   expect(pauseButton).toBeInTheDocument();

  //   const playButton = container.querySelector("#play-icon");
  //   expect(playButton).not.toBeInTheDocument();

  //   fireEvent.click(pauseButton);

  //   // Wait for the video to pause
  //   await waitFor(() => {
  //     expect(playButton).toBeInTheDocument();
  //     expect(pauseButton).not.toBeInTheDocument();
  //   });

  //   fireEvent.click(playButton as Element);
  //   expect(pauseButton).toBeInTheDocument();
  // });

  // test("handles mute/unmute button click", () => {
  //   const { getByText } = render(<VideoPlayer onClose={onClose} />);
  //   const muteUnmuteButton = getByText("Mute");
  //   fireEvent.click(muteUnmuteButton);
  //   expect(muteUnmuteButton.textContent).toBe("Unmute");
  //   fireEvent.click(muteUnmuteButton);
  //   expect(muteUnmuteButton.textContent).toBe("Mute");
  // });

  // test("handles seeking through the video", () => {
  //   const { getByLabelText } = render(<VideoPlayer onClose={onClose} />);
  //   const seekInput = getByLabelText("Seek") as HTMLInputElement;
  //   fireEvent.change(seekInput, { target: { value: "30" } });
  //   expect(seekInput.value).toBe("30");
  // });

  // test("forwards the video by 10 seconds", () => {
  //   const { getByText } = render(<VideoPlayer onClose={onClose} />);
  //   const forwardButton = getByText("Forward 10s");
  //   const videoElement = document.createElement("video");
  //   videoElement.currentTime = 30;
  //   const playSpy = jest.spyOn(videoElement, "play");
  //   const pauseSpy = jest.spyOn(videoElement, "pause");
  //   Object.defineProperty(window, "HTMLMediaElement", {
  //     writable: true,
  //     value: videoElement,
  //   });

  //   fireEvent.click(forwardButton);
  //   expect(videoElement.currentTime).toBe(40);
  //   expect(playSpy).toHaveBeenCalledTimes(1);
  //   expect(pauseSpy).not.toHaveBeenCalled();
  // });

  // test("updates progress bar when seeking", () => {
  //   const { getByLabelText, getByTestId } = render(
  //     <VideoPlayer onClose={onClose} />
  //   );
  //   const seekInput = getByLabelText("Seek");
  //   const progressBarFill = getByTestId("progress-bar-fill");
  //   fireEvent.change(seekInput, { target: { value: "30" } });
  //   expect(progressBarFill.style.width).toBe("30%");
  // });
});
