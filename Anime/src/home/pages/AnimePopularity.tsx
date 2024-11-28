import {
  Button,
  MediaSort,
  GET_ANIME_BY_ID,
  graphqlClient,
  keepPreviousData,
  useQuery,
  useState,
  useNavigate,
  useSearchParams,
  useDebounce,
  formatTimeUntilAiring,
  Layout,
  Popover,
  PopoverContent,
  PopoverTrigger,
  MenuUnfoldOutlined,
  AnimeGrid,
} from "@/home/pages/importDependencies";

const AnimePopularity = () => {
  const graphql = graphqlClient();
  const navigate = useNavigate();
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();
  const popularity = searchParams.get("popularity") || "";
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const genre = searchParams.get("genre")?.split(",") || [];
  // const page = parseInt(searchParams.get("page") || "1");

  const { isLoading, isError, data } = useQuery({
    queryKey: ["searchAnime", popularity, genre],
    queryFn: async () => {
      return await graphql.request(GET_ANIME_BY_ID, {
        sort: [MediaSort.PopularityDesc],
        search: debouncedSearchTerm,
        genres: genre.length ? genre : undefined,
      });
    },
    placeholderData: keepPreviousData,
    enabled: !!popularity || !!searchParams,
  });

  const onClickCard = (id: number, title: string) => {
    const formatTitle = title.replace(/\s+/g, "-");
    setTimeout(() => {
      navigate(`/home/${id}/${formatTitle}`);
    }, 500);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate({
      pathname: "/search",
      search: `?name=${searchTerm}`,
    });
  };

  const handleFilterClick = (selectGenre: string) => {
    const updatedGenres = selectedGenres.includes(selectGenre)
      ? selectedGenres.filter((genre) => genre !== selectGenre)
      : [...selectedGenres, selectGenre];
    setSelectedGenres(updatedGenres);
    setSearchParams({ genre: updatedGenres.join(",") });

    if (updatedGenres.length === 0) {
      navigate("/popularity");
    }
  };

  if (isError) {
    return <div>Error</div>;
  }
  return (
    <Layout>
      <div className="w-full min-h-screen py-6 pt-32 bg-[#e4ebf0]">
        <div className="flex flex-col justify-center items-center w-full pb-10">
          <div className="flex flex-row py-10">
            <div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant={"destructive"} onClick={handleSearchSubmit}>
                Search
              </Button>
            </div>
            <div>
              <Popover>
                <PopoverTrigger className="text-3xl ml-2">
                  <MenuUnfoldOutlined />
                </PopoverTrigger>
                <PopoverContent>
                  <div className="grid grid-cols-8 gap-1">
                    <div className="col-span-8">
                      <h2>Genres</h2>
                      <div className="grid grid-cols-8">
                        {Array.from(
                          new Set(
                            data?.Page?.media
                              ?.flatMap((media) => media?.genres)
                              .filter(
                                (genre, index, genres) =>
                                  genres.indexOf(genre) === index
                              )
                              .map((genre, index) => (
                                <div key={index} className="mb-2 col-span-1">
                                  <Button
                                    onClick={() => handleFilterClick(genre!)}
                                    className={`px-3 py-1 rounded ${
                                      selectedGenres.includes(genre!)
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-600"
                                    }`}
                                  >
                                    {" "}
                                    {genre}{" "}
                                  </Button>
                                </div>
                              ))
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div>
            <AnimeGrid
              data={data?.Page?.media}
              isLoading={isLoading}
              onCardClick={onClickCard}
              formatTimeUntilAiring={formatTimeUntilAiring}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AnimePopularity;
