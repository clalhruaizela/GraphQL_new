interface CardProps {
  imageSrc: string;
  altText: string;
  title: string;
  description: string;
}

const Cards: React.FC<CardProps> = ({
  imageSrc,
  altText,
  title,
  description,
}) => {
  return (
    <div className=" col-span-6 md:col-span-3 size-full  flex flex-col">
      <img
        src={imageSrc}
        alt={altText}
        className="h-full w-full border-2 border-black rounded-xl object-cover"
      />
      <div className="pt-1 lg:pt-6">
        <h2 className="font-bold text-sm text-gray-800 lg:text-xl  2xl:text-3xl">
          {title}
        </h2>
        <p className=" h-14 text-sm lg:text-sm xl:text-lg ">{description}</p>
      </div>
    </div>
  );
};
export default Cards;
