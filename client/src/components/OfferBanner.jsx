import bannerImg from "../assets/banner.png";

const OfferBanner = () => {
  return (
    <div className="banner">
      <img src={bannerImg} alt="Special Offer" />
      <div className="banner-content">
        <span>Special Offers</span>
      </div>
    </div>
  );
};

export default OfferBanner;
