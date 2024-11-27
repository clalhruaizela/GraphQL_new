import Cards from "./Card";

interface FeatureGridProps {
  features: Array<{
    title: string;
    description: string;
    imageSrc: string;
    altText: string;
  }>;
}

const FeatureGrid: React.FC<FeatureGridProps> = ({ features }) => {
  return (
    <div className="grid grid-cols-12 gap-4 lg:gap-10 pt-12 pb-10  border-b-2 border-gray-300 lg:border-black ">
      {features.map((feature, index) => (
        <Cards
          key={index}
          imageSrc={feature.imageSrc}
          altText={feature.altText}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  );
};

export default FeatureGrid;
