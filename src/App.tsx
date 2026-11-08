import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";


const App = () => {
  return (
    <div className="min-h-screen bg-[#f5f6f8]">
      <Header />

      <Routes>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;