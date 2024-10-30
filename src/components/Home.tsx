"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface Square {
  id: number;
  src: string;
}

const squareData: Square[] = [
  {
    id: 1,
    src: "https://media.istockphoto.com/id/1411210350/photo/indian-woman-shopping-at-grocery-store.webp?b=1&s=612x612&w=0&k=20&c=hqF4TXvzW6m51htZ6yXX2N5n4S8zlAHzSFkifEfecK0=",
  },
  // Other image objects as defined in your original data...
];

const shuffle = (array: Square[]): Square[] => {
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [squares, setSquares] = useState<JSX.Element[]>(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[600px] gap-1">
      {squares.map((sq) => sq)}
    </div>
  );
};

const Home = () => {
  return (
    <section className="w-full py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto">
      <div>
        <span className="block mb-4 text-2xl text-slate-700">
          Groceries Made Simple, Just for You.
        </span>
        <h3 className="text-6xl font-semibold">Johar Basket</h3>
        <p className="text-lg text-slate-700 my-6">
          Welcome to Johar Basket, where we make grocery shopping simple, convenient, and affordable. Our carefully curated selection of products ensures that you always have access to the freshest and finest items, handpicked and delivered right to your doorstep. With Johar Basket, you can shop with confidence, knowing that your satisfaction is our top priority.
        </p>
        <button className="bg-[#ff4900] text-white text-2xl font-medium py-2 px-4 rounded transition-all hover:bg-[#ff6d33] active:scale-95">
          Order Now
        </button>
      </div>
      <ShuffleGrid />
    </section>
  );
};

export default Home;
