import { Card, CardHeader } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import GET_ANIME_BY_ID from "@/graphql/get_anime_by_id/animeMedia";
import graphqlClient from "@/graphql/getGraphqlClient";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

const MediaPage = () => {
  const graphql = graphqlClient();
  // const [hoverId, setHoverId] = useState<number | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");

  const { isLoading, isError, data } = useQuery({
    queryKey: ["animePageMedia", page],
    queryFn: async () => {
      return await graphql.request(GET_ANIME_BY_ID, {
        page,
        perPage: 28,
      });
    },
    keepPreviousData: true,
  });
  const handlePageChange = (page: number) => {
    setSearchParams(
      (param) => {
        param.set("page", page.toString());
        return param;
      },
      {
        preventScrollReset: true,
      }
    );
  };
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  const totalPages = data?.Page?.pageInfo?.lastPage;
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
        <div className="py-10">
          {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (item) => {
                    if (
                      item === 1 ||
                      item === totalPages ||
                      Math.abs(item - page) <= 2
                    ) {
                      return (
                        <PaginationItem key={item}>
                          <PaginationLink
                            className="bg-gray-500"
                            isActive={item === page}
                            onClick={() => {
                              window.scrollTo(0, 0);
                              handlePageChange(item);
                            }}
                          >
                            {item}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    } else if (item === page - 3 || item === page + 3) {
                      return (
                        <PaginationEllipsis key={item} className="text-white" />
                      );
                    }
                    return null;
                  }
                )}
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </div>
  );
};

export default MediaPage;
