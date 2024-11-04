import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AnimeHome from "./home/anime_Home";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AnimeHome />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
