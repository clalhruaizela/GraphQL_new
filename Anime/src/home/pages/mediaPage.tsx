import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import GET_ANIME_BY_ID from "@/graphql/get_anime_by_id/animeMedia";
import graphqlClient from "@/graphql/getGraphqlClient";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

const MediaPage = () => {
  const graphql = graphqlClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");

  const { isLoading, isError, data } = useQuery({
    queryKey: [page],
    queryFn: async () => {
      return await graphql.request(GET_ANIME_BY_ID, {
        page,
        perPage: 28,
      });
    },
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
    <div>
      <div>
        {data?.Page?.media?.map((anime: any) => (
          <div>
            <div>
              <img src={anime?.coverImage?.large} alt={anime?.title?.english} />
            </div>
            <div> {data?.title?.english} </div>
          </div>
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
  );
};

export default MediaPage;
