import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  amount?: number;
  className?: string;
}

export const Skeletons = ({ amount, className }: Props) => {
  return (
    <>
      {[...Array(amount || 6)].map((_, index) => (
        <Skeleton className={className} key={index} />
      ))}
    </>
  );
};
