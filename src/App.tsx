import "./App.css";
import { HomePage, EditVideoPage } from "./pages";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="h-screen w-full">
      <Routes>
        <Route path="/edit-video" element={<EditVideoPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
