import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AnimeHome from "./home/animeHome";
import AnimeSearch from "./home/pages/AnimeSearch";
import MediaPage from "./home/pages/cardDetail/mediaPage";
import AnimeTrending from "./home/pages/animeTrending";
import AnimePopularity from "./home/pages/AnimePopularity";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AnimeHome />} />
          <Route path="/search" element={<AnimeSearch />} />
          <Route path="/trending" element={<AnimeTrending />} />
          <Route path="/Popularity" element={<AnimePopularity />} />
          <Route path="/home/:id/:title" element={<MediaPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
