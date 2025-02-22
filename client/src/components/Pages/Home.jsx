import Hero from "../Layout/Hero";
import GendersCollections from "../Products/GendersCollections";
import NewArrivals from "../Products/NewArrivals";
import ProductDetails from "../Products/ProductDetails";
import ProductsGrid from "../Products/ProductsGrid";

const placeholderProducts = [
  {
    _id:1,
    name:"Product 1",
    price:1000,
    images:[{url:"https://picsum.photos/500/500?random=27"}]
  },
  {
    _id:2,
    name:"Product 2",
    price:1000,
    images:[{url:"https://picsum.photos/500/500?random=28"}]
  },
  {
    _id:3,
    name:"Product 3",
    price:1000,
    images:[{url:"https://picsum.photos/500/500?random=29"}]
  },
  {
    _id:4,
    name:"Product 4",
    price:1000,
    images:[{url:"https://picsum.photos/500/500?random=30"}]
  },
  {
    _id:5,
    name:"Product 5",
    price:1000,
    images:[{url:"https://picsum.photos/500/500?random=31"}]
  },
  {
    _id:6,
    name:"Product 6",
    price:1000,
    images:[{url:"https://picsum.photos/500/500?random=32"}]
  },
  {
    _id:7,
    name:"Product 7",
    price:1000,
    images:[{url:"https://picsum.photos/500/500?random=33"}]
  },
  {
    _id:8,
    name:"Product 8",
    price:1000,
    images:[{url:"https://picsum.photos/500/500?random=34"}]
  },
]

const Home = () => {
  return (
    <div>
      <Hero />
      <GendersCollections />
      <NewArrivals />
      {/* Best Seller */}
      <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
      <ProductDetails/>

      <div className="conatiner mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">
          Top Wears for Women
        </h2>
        <ProductsGrid products={placeholderProducts}/>
      </div>
    </div>
  );
};

export default Home;
