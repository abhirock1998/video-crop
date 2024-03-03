import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../context";

const Page = () => {
  const navigate = useNavigate();
  const { handleState } = useAppStore();
  const [video, setVideo] = useState<File | null>(null);

  const handleVideo = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      toast.warn("No file selected");
      return;
    }
    setVideo(file);
  };

  const handleSubmit = () => {
    if (!video) {
      toast.warn("No file selected");
      return;
    }
    handleState("videToEdit", video);
    navigate("/edit-video");
  };

  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <div className="w-1/2">
        <h1 className="text-2xl font-semibold tracking-[-0.05rem] leading-10 mb-12">
          Add Video URL to Edit image
        </h1>
        <div className="relative overflow-hidden">
          <label
            htmlFor="dropzone-file"
            className="flex items-center p-4 rounded-lg cursor-pointer bg-gray-700 flex-1"
          >
            {!video ? (
              <div className="flex gap-x-3 items-center">
                <p className="text-[12px] text-gray-200 truncate">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-[10px] text-gray-300 truncate">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
            ) : (
              <p className="text-[12px] text-gray-200">{video.name}</p>
            )}

            <input
              onChange={handleVideo}
              id="dropzone-file"
              type="file"
              className="hidden"
              accept="video/mp4"
            />
          </label>
          <button
            type="button"
            disabled={!video}
            onClick={handleSubmit}
            className="text-white absolute top-1/2 -translate-y-1/2 right-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2 dark:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-400 disabled:hover:bg-blue-400 disabled:opacity-70"
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
