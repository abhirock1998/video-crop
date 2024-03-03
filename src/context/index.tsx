import { PropsWithChildren, createContext, useContext, useState } from "react";
import video1 from "../assets/videos/video-1.mp4";

import testVideo from "../assets/videos/Coding Test.mp4";
// Define the type for the context value
type AppContextType = {
  state: AppState;
  handleState: (key: keyof AppState, value: any) => void;
};

// Create the context with an initial empty object of type AppContextType
export const appStore = createContext<AppContextType>({} as AppContextType);

// Define the Props type
type Props = PropsWithChildren<{}>;

// Define the AppState type
type AppState = {
  videToEdit: File | null;
  isEditing: boolean;
  hasCompleted: boolean;
  imageFile: File | null;
};

export const AppProvider = (props: Props) => {
  // Use useState to manage the state
  const [state, setState] = useState<AppState>({
    videToEdit: null,
    isEditing: false,
    hasCompleted: false,
    imageFile: null,
  });

  // Define the function to update the state
  const handleState = (key: keyof AppState, value: any) => {
    if (key === "videToEdit") {
      setState((pre) => ({ ...pre, videToEdit: value }));
    } else if (key === "hasCompleted") {
      setState((pre) => ({ ...pre, [key]: value, isEditing: false }));
    } else {
      setState((pre) => ({ ...pre, [key]: value }));
    }
  };

  // Provide the state and function through the context value
  return (
    <appStore.Provider
      value={{
        state,
        handleState,
      }}
    >
      {props.children}
    </appStore.Provider>
  );
};

// Custom hook to use the appStore context
export const useAppStore = () => useContext(appStore);
