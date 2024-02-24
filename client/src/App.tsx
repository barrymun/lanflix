import { Route, Routes } from "react-router-dom";

import { Home, Movie } from "routes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies/:path" element={<Movie />} />
    </Routes>
  );
}

export default App;
