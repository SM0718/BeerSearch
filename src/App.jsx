import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetch("https://api.punkapi.com/v2/beers")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => alert(error))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = () => {
    const filteredData = data.filter((beer) =>
      beer.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    return filteredData;
  };

  const ClipParagraph = ({ text, maxWords }) => {
    const words = text.split(' ');
    const clippedText = words.slice(0, maxWords).join(' ');
  
    return (
      <p>{clippedText}{words.length > maxWords ? '...' : ''}</p>
    );
  };

  const ItemCard = ({ imageUrl, title, description, price }) => {
    return (
      <div className="max-w-xs h-[400px] mt-8 flex flex-col justify-evenly text-center cursor-pointer rounded overflow-hidden shadow-lg hover:shadow-xl">
        <div className="w-12 h-32 mx-auto">
          <img className="w-12 h-32 " src={imageUrl} alt={title} />
        </div>
        <div className="h-3/4 px-6 py-4 flex flex-col justify-center">
          <p className=" bg-gray-200 rounded-full px-4 py-1 text-sm font-semibold mb-2 text-gray-700">${price}</p>
          <div className="font-bold text-xl mb-2">{title}</div>
          <ClipParagraph text={description} maxWords={15} />
        </div>
        <div className="px-6 py-4 flex justify-between gap-2">
          <button className="bg-[#74A84A] w-full tracking-wide px-4 py-2 text-white hover:bg-green-800">Buy Now</button>
          <button className="bg-blue-400 w-full tracking-wide px-4 py-2 text-white hover:bg-blue-800">Add To Cart</button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className='w-1/4 mx-auto mt-8 flex justify-center'>
        <input onChange={(e) => setSearchInput(e.target.value)} value={searchInput} className='w-full border-2 px-4 py-2' type='search' placeholder='Search Your Favourite Beer...' />
      </div>

      <div className='mt-4'>
        <div className="flex flex-wrap justify-center gap-6 h-screen">
          {!loading ? (
            handleSearch().map((item) => (
              <ItemCard
                key={item.id}
                imageUrl={item.image_url}
                title={item.name}
                description={item.description}
                price="23.99"
              />
            ))
          ) : (
            <div className='w-full flex flex-col justify-center content-center gap-10 my-10'>
              <div className='w-16 h-16 mx-auto rounded-full border-2 border-t-black animate-spin' />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
