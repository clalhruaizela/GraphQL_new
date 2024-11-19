import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AnimeHome from "./home/animeHome";
import MediaPage from "./home/pages/mediaPage";
import AnimeSearch from "./home/pages/AnimeSearch";
import FilterGenre from "./home/utilties/filterGenre";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AnimeHome />} />
          <Route path="/search" element={<AnimeSearch />} />
          <Route path="/genre" element={<FilterGenre />} />
          <Route path="/home/:id/:title" element={<MediaPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
