import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AnimeHome from "./home/anime_Home";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

const queryClient = new QueryClient();
function App() {
  return (
    <MantineProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AnimeHome />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </MantineProvider>
  );
}

export default App;
