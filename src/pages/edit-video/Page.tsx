import React, { useEffect } from "react";
import { GestureAndCropVideoWrapper } from "../../components";
import { useSpring } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import ActionButtonRow from "./ActionButtonRow";
import { toast } from "react-toastify";
import { useAppStore } from "../../context";

const Page = () => {
  const { handleState, state } = useAppStore();
  const resizeRef = React.useRef<HTMLDivElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const boundBoxRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const recordedChunksRef = React.useRef<Blob[]>([]);
  const [recordedStream, setRecordedStream] =
    React.useState<MediaStream | null>();

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      video.addEventListener("pause", (ev) => {
        console.log("Video paused");
      });
    }
  }, []);

  const [{ height, width, x, y }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  }));

  const bind = useDrag(
    ({ offset: [x, y], target }) => {
      const boundRect = boundBoxRef.current?.getBoundingClientRect();
      const isResizing = target === resizeRef.current;
      if (isResizing) {
        api.set({ width: x, height: y });
      } else {
        if (boundRect) {
          if (x < 0) x = 0;
          if (y < 0) y = 0;
          if (x + width.get() > boundRect.width)
            x = boundRect.width - width.get();
          if (y + height.get() > boundRect.height)
            y = boundRect.height - height.get();
        }
        api.start({ x, y });
      }
    },
    {
      from: (event) => {
        const isResizing = event.target === resizeRef.current;
        if (isResizing) return [width.get(), height.get()];
        return [x.get(), y.get()];
      },
    }
  );

  const handlePreview = () => {
    if (recordedStream && videoRef.current) {
      console.log("Recorded Stream:", recordedStream);
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.srcObject = recordedStream;
      videoRef.current.muted = false;
      videoRef.current.play();
    }
  };

  // Draw video onto canvas in a loop
  function drawVideo() {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    requestAnimationFrame(drawVideo);
  }

  // Function to handle the download button
  const handleProcessVideo = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    video.pause();
    video.currentTime = 0;
    const isVidePlaying = video.paused;
    if (!isVidePlaying) {
      console.log(`Vide Player is playing`);
    } else {
      console.log(`Vide Player is not playing`);
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const stream = canvas.captureStream();
    setRecordedStream(stream);
    const recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
    recorder.ondataavailable = handleDataAvailable;
    recorder.onstop = handleStop;
    recorder.start();
  };

  const handleDataAvailable = (e: BlobEvent) => {
    if (e.data.size > 0) {
      recordedChunksRef.current.push(e.data);
    }
  };

  const handleStop = () => {
    const recordedChunk = recordedChunksRef.current;
    const blob = new Blob(recordedChunk, { type: "video/webm" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "video_with_logo.webm";
    document.body.appendChild(a);
    a.click();
    // window.URL.revokeObjectURL(url);
    // recordedChunksRef.current = [];
  };

  return (
    <div className="h-full  flex flex-col justify-center items-center md:mx-0 mx-5">
      <div className="">
        <GestureAndCropVideoWrapper
          ref={boundBoxRef}
          onImageUpload={({ target: { files } }) => {
            const file = files?.[0];
            if (file) {
              handleState("imageFile", file);
              const video = videoRef.current;
              if (!video) return;
              console.log("Registering play event listener for video element.");
              video.addEventListener("play", drawVideo);
            } else toast.error("No file selected");
          }}
          imageFile={state.imageFile}
          dragProps={bind}
          resizeRef={resizeRef}
          cropAreaDimensions={{ x, y, width, height }}
          className="md:max-w-[600px] md:max-h-[350px] md:min-w-[600px] md:min-h-[350px] mb-10 border border-red-600"
          isOverlayVisible={state.isEditing}
        >
          {state.videToEdit && (
            <video
              className="w-full h-full"
              muted
              src={URL.createObjectURL(state.videToEdit)}
              ref={videoRef}
            />
          )}
        </GestureAndCropVideoWrapper>
        <ActionButtonRow
          onPreview={handlePreview}
          onDownload={() => {}}
          isDone={state.hasCompleted}
          disabledDone={!state.imageFile}
          onDone={() => {
            // handleState("hasCompleted", true);
            handleProcessVideo();
          }}
          isEditing={state.isEditing}
          onCancel={() => handleState("isEditing", false)}
          onEdit={() => handleState("isEditing", !state.isEditing)}
        />
      </div>

      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default Page;
