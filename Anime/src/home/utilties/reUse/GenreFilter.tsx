import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MenuUnfoldOutlined } from "@ant-design/icons";

interface GenreFilterProps {
  genres: string[];
  selectedGenres: string[];
  onGenreClick: (updatedGenre: string[]) => void;
}

const GenreFilter: React.FC<GenreFilterProps> = ({
  genres,
  selectedGenres,
  onGenreClick,
}) => {
  const handleFilterClick = (selectedGenre: string) => {
    const updatedGenres = selectedGenres.includes(selectedGenre)
      ? selectedGenres.filter((g) => g !== selectedGenre) // Remove genre
      : [...selectedGenres, selectedGenre]; // Add genre

    onGenreClick(updatedGenres);
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <MenuUnfoldOutlined />
        </PopoverTrigger>
        <PopoverContent>
          <div className="grid grid-cols-8 gap-1">
            <div className="col-span-8">
              <h2>Genres</h2>
              <div className="grid grid-cols-8">
                {genres.map((genre, index) => (
                  <div key={index} className="mb-2 col-span-1">
                    <Button
                      onClick={() => handleFilterClick(genre)}
                      className={`px-3 py-1 rounded ${
                        selectedGenres.includes(genre!)
                          ? "bg-blue-500 text-white"
                          : "bg-gray-600 "
                      }`}
                    >
                      {genre}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
export default GenreFilter;
