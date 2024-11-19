import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import graphqlClient from "@/graphql/getGraphqlClient";
import { GET_FILTERED_GENRES } from "@/graphql/search/filterGenre";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Genre } from "./genre/genre";
import AnimeGrid from "../AnimeGrid";
import { formatTimeUntilAiring } from "./formatTimeUntilAiring";
import { Button } from "@/components/ui/button";

const FilterGenre = () => {
  const graphql = graphqlClient();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  // const selectedGenres = searchParams.getAll("genre");
  const genre = searchParams.get("genre") || "";
  const { isLoading, isError, data } = useQuery({
    queryKey: ["filterData", genre],
    queryFn: async () => {
      return await graphql.request(GET_FILTERED_GENRES, {
        genre: genre,
      });
    },
    placeholderData: keepPreviousData,
    enabled: !!genre,
  });

  const handleClick = (genre: string) => {
    toggleGenre(genre);
  };
  const toggleGenre = (genre: string) => {
    const currentGenres = searchParams.getAll("genre");
    if (currentGenres.includes(genre)) {
      setSearchParams((prev) => {
        const newGenres = prev.getAll("genre").filter((g) => g !== genre);
        prev.delete("genre");
        newGenres.forEach((g) => prev.append("genre", g));
        return prev;
      });
    } else {
      setSearchParams((prev) => {
        prev.append("genre", genre);
        return prev;
      });
    }
  };

  const onClickCard = (id: number, title: string) => {
    const formatTitle = title.replace(/\s+/g, "-");
    setTimeout(() => {
      window.scrollTo(0, 0);
      navigate(`/home/${id}/${formatTitle}`);
    }, 500);
  };
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  return (
    // <Layout>
    <div className=" py-6 pt-32 bg-[#e4ebf0]">
      <Popover>
        <PopoverTrigger>filter</PopoverTrigger>
        <PopoverContent>
          <div>
            {Genre.map((genre) => (
              <div key={genre}>
                <Button variant={"destructive"} onClick={() => handleClick}>
                  {genre}
                </Button>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      <div className="grid grid-cols-6 xl:w-10/12 2xl:w-9/12  mx-auto">
        <AnimeGrid
          data={data?.Page?.media}
          isLoading={isLoading}
          onCardClick={onClickCard}
          formatTimeUntilAiring={formatTimeUntilAiring}
        />
      </div>
    </div>
    // </Layout>
  );
};

export default FilterGenre;
