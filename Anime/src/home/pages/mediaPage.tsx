import { Card, CardHeader } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import GET_ANIME_BY_ID from "@/graphql/get_anime_by_id/animeMedia";
import graphqlClient from "@/graphql/getGraphqlClient";
import { useQuery } from "@tanstack/react-query";

const MediaPage = ({ anime }: { anime: string }) => {
  // const [hoverId, setHoverId] = useState<number | null>(null);
  // const [searchParams, setSearchParams] = useSearchParams();
  // const page = parseInt(searchParams.get("page") || "1");
  const graphql = graphqlClient();
  const { isLoading, isError, data } = useQuery({
    queryKey: ["media", anime],
    queryFn: async () => {
      return await graphql.request(GET_ANIME_BY_ID, {
        anime,
      });
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  return (
    <div className="w-full">
      <div className="lg:col-span-6">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mx-4 ">
          {data?.Page?.media?.map((anime: any) => (
            <Card
              key={anime?.id}
              className="flex flex-col justify-center text-white border-none bg-slate-900"
            >
              <CardHeader>
                <Popover>
                  <PopoverTrigger asChild>
                    <img
                      src={anime?.coverImage?.large}
                      alt={anime?.title?.english}
                      width="70%"
                      // onMouseEnter={() => setHoverId(anime?.id)}
                      // onMouseLeave={() => setHoverId(null)}
                    />
                  </PopoverTrigger>
                  <PopoverContent>
                    <h2 className="font-bold">{anime?.title?.english}</h2>
                  </PopoverContent>
                </Popover>
              </CardHeader>
              <div className="text-white"> {anime?.title?.english} </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MediaPage;
