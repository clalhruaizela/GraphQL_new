import { useQuery } from "@tanstack/react-query";
import graphqlClient from "../graphql/getGraphqlClient";
import GET_ANIME_BY_ID from "../graphql/get_anime_by_id/anime";
import {
  Box,
  Button,
  Card,
  CardSection,
  Center,
  Group,
  Pagination,
  Popover,
  PopoverTarget,
  Text,
} from "@mantine/core";
import { useState } from "react";
import { formatDuration } from "./utilties/duration";
import { useDisclosure } from "@mantine/hooks";

const AnimeHome = () => {
  const graphql = graphqlClient();
  const [page, setPage] = useState(1);
  const [hoverId, setHoverId] = useState<number | null>(null);
  const [opened, { close, open }] = useDisclosure(false);
  const { isLoading, isError, data } = useQuery({
    queryKey: [],
    queryFn: async () => {
      return await graphql.request(GET_ANIME_BY_ID, {
        page,
        perPage: 28,
        lastPage: 20,
      });
    },
  });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  // console.log(data);
  const totalPages = data?.Page?.pageInfo?.lastPage || 1;
  return (
    <div style={{ width: "100%", backgroundColor: "black" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, auto)",
          gap: "10px",
          padding: "26px",
        }}
      >
        {data?.Page?.media?.map((anime: any) => (
          <Card
            key={anime.id}
            shadow="lg"
            padding=""
            radius="md"
            withBorder
            onMouseEnter={() => setHoverId(anime.id)}
            onMouseLeave={() => setHoverId(null)}
            style={{ marginBottom: "10px" }}
          >
            <CardSection>
              <Center>
                <Popover
                  position="right"
                  withArrow
                  opened={hoverId === anime.id}
                  shadow="md"
                >
                  <PopoverTarget>
                    <Box onMouseEnter={open} onMouseLeave={close}>
                      <img
                        src={anime.coverImage?.large}
                        alt={anime.title?.english}
                        height={160}
                        width={250}
                      />
                    </Box>
                  </PopoverTarget>
                  <Popover.Dropdown style={{ pointerEvents: "none" }}>
                    <Text size="sm"> {anime.title?.english} </Text>
                  </Popover.Dropdown>
                </Popover>
              </Center>
            </CardSection>
            <Group justify="space-between" mt="md" mb="xs">
              <Text style={{ width: "96px", backgroundColor: "gray" }}>
                Title: {anime.title?.english}
              </Text>
            </Group>
            <Group style={{ flexDirection: "row" }}>
              <Text>{anime.format}</Text>
              <Text>
                {anime.duration ? formatDuration(anime.duration) : "N/A"}
              </Text>

              {/* <Text>Genres: {anime.genres.join(" , ")} </Text> */}
              {/* <Text>Season: {anime.season} </Text> */}
              {/* <Text>Episode: {anime.episodes} </Text> */}
              {/* <Text>Description: {anime.description}</Text> */}
            </Group>
          </Card>
        ))}

        {/* <div>
        <Pagination
          total={totalPages}
          value={page}
          onChange={setPage}
          mt="sm"
        />
      </div> */}
      </div>
    </div>
  );
};

export default AnimeHome;
