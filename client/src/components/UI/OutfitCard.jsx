const OutfitCard = ({ imgURL, changeOutfitImage, outfitImage }) => {
  const handleClick = () => {
    if (outfitImage !== imgURL.outfit) {
      changeOutfitImage(imgURL.outfit);
    }
  };
  return (
    <div
      className={`border-2 rounded-xl ${
        outfitImage === imgURL ? "border-primary" : "border-transparent"
      } cursor-pointer max-sm:flex-1`}
      onClick={handleClick}
    >
      <div className="flex justify-center items-center bg-card bg-center bg-cover sm:w-40 sm:h-40 rounded-xl max-sm:p-4">
        <img
          src={imgURL.thumbnail}
          width={127}
          height={103}
          alt="Combo collections"
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default OutfitCard;
