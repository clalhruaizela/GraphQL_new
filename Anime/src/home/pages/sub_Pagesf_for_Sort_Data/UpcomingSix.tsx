import { useEffect } from "react";
import {
  formatTimeUntilAiring,
  GET_ANIME_BY_ID,
  graphqlClient,
  MediaSort,
  useNavigate,
  useQuery,
  useSearchParams,
  useState,
} from "../importDependencies";
import HomeGrid from "@/home/utilties/reUse/home/HomeGrid";
import { MediaStatus } from "@/gql/graphql";

const UpcomingSix = () => {
  const graphql = graphqlClient();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const upcoming = searchParams.get("upcoming") || "";
  const [itemToShow, setItemToShow] = useState(6);
  useEffect(() => {
    const updateItemToShow = () => {
      const width = window.innerWidth;
      if (width >= 1536) {
        setItemToShow(6);
      } else if (width >= 1280) {
        setItemToShow(5);
      } else if (width >= 1024) {
        setItemToShow(6);
      } else if (width >= 768) {
        setItemToShow(5);
      } else {
        setItemToShow(3);
      }
    };
    updateItemToShow();
    window.addEventListener("resize", updateItemToShow);
    return () => {
      window.removeEventListener("resize", updateItemToShow);
    };
  });

  const { isLoading, isError, data } = useQuery({
    queryKey: ["searchAnime-upcoming", upcoming],
    queryFn: async () => {
      return await graphql.request(GET_ANIME_BY_ID, {
        sort: [MediaSort.PopularityDesc],
        status: MediaStatus.NotYetReleased,
      });
    },
  });

  const onClickCard = (id: number, title: string) => {
    const formatTitle = title.replace(/[\s/]+/g, "-");
    setTimeout(() => {
      navigate(`/home/${id}/${formatTitle}`);
    }, 500);
  };

  if (isError) return <div>Error</div>;

  const limitedData = data?.Page?.media?.slice(0, itemToShow);
  return (
    <>
      <HomeGrid
        data={limitedData}
        isLoading={isLoading}
        onCardClick={onClickCard}
        formatTimeUntilAiring={formatTimeUntilAiring}
      />
    </>
  );
};

export default UpcomingSix;
