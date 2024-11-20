import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface GenreFilterProps {
  genres: string[];
  selectedGenres: string[];
  onGenreClick: (genre: string) => void;
}

const GenreFilter: React.FC<GenreFilterProps> = ({
  genres,
  selectedGenres,
  onGenreClick,
}) => {
  return (
    <div>
      <Popover>
        <PopoverTrigger></PopoverTrigger>
        <PopoverContent>
          {genres?.map((genre, index) => (
            <div key={index}>
              <Button
                onClick={() => onGenreClick(genre)}
                className={selectedGenres.includes(genre) ? "bg-blue-500" : ""}
              >
                {genre}
              </Button>
            </div>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
};
export default GenreFilter;
