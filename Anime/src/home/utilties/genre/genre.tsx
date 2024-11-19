export const Genre = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Ecchi",
  "Fantasy",
  "Horror",
  "Mahou Shoujo",
  "Mecha",
  "Music",
  "Mystery",
  "Psychological",
  "Romance",
  "Sci-Fi",
  "Slice of Life",
  "Sports",
  "Supernatural",
  "Thriller",
];

export const GenreList = () => {
  return (
    <div>
      {Genre.map((genre) => (
        <div
          key={genre}
          className={`px-4 py-2 rounded-sm text-white bg-blue-500`}
        >
          {genre}
        </div>
      ))}
    </div>
  );
};
