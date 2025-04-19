import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Stage, Layer, Rect, Text as KonvaText, Image as KonvaImage } from "react-konva";
import useImage from "use-image";

const pageVariants = {
  initial: { opacity: 0, rotateY: -90 },
  in: { opacity: 1, rotateY: 0 },
  out: { opacity: 0, rotateY: 90 }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 1
};

const BackgroundTexture = ({ children }) => (
  <div className="min-h-screen bg-[url('/textures/paper.jpg')] bg-cover p-6 font-serif">
    {children}
  </div>
);

const BackgroundMusic = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = 0.3;
    audio.play().catch(() => {});
  }, []);

  return (
    <audio ref={audioRef} loop>
      <source src="/music/love_theme.mp3" type="audio/mpeg" />
    </audio>
  );
};

const HomePage = () => (
  <BackgroundTexture>
    <BackgroundMusic />
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen text-center"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <h1 className="text-5xl text-rose-600 font-bold mb-6">Welcome to Our Scrapbook 💕</h1>
      <p className="text-xl text-gray-700 mb-6">A journey of memories, love, and laughter.</p>
      <Link to="/story">
        <Button className="bg-rose-500 text-white px-6 py-2 rounded-full text-lg">
          Start the Story <ArrowRight className="ml-2" />
        </Button>
      </Link>
    </motion.div>
  </BackgroundTexture>
);

const StoryPage = () => {
  const pages = [
    {
      title: "How We Met",
      content: "It all started with a smile... and a cup of coffee ☕.",
      image: "/photos/1.jpg"
    },
    {
      title: "Our First Trip",
      content: "Remember the mountains and getting lost in love? 🏔️",
      image: "/photos/2.jpg"
    },
    {
      title: "Silly Moments",
      content: "Banana socks and dance battles 🍌💃",
      image: "/photos/3.jpg"
    }
  ];

  return (
    <BackgroundTexture>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mt-10"
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        {pages.map((page, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-4 border-4 border-pink-300"
            whileHover={{ rotate: 2, scale: 1.05 }}
          >
            <Card>
              <CardContent className="p-4">
                <h2 className="text-2xl font-bold text-rose-500 mb-2">{page.title}</h2>
                <img src={page.image} alt={page.title} className="rounded mb-4 shadow-md" />
                <p className="text-gray-700">{page.content}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      <div className="text-center mt-10">
        <Link to="/proposal">
          <Button className="bg-rose-500 text-white px-6 py-2 rounded-full text-lg">
            To the Big Question 💍
          </Button>
        </Link>
      </div>
    </BackgroundTexture>
  );
};

const ProposalPage = () => (
  <BackgroundTexture>
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen text-center"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <h2 className="text-4xl text-rose-600 font-bold mb-4">Will You Marry Me? 💖</h2>
      <Button className="bg-rose-500 text-white hover:bg-rose-600 px-6 py-2 text-lg rounded-full flex items-center gap-2">
        <Heart className="w-5 h-5" /> Yes, Forever <ArrowRight className="w-4 h-4" />
      </Button>
    </motion.div>
  </BackgroundTexture>
);

const EditorPage = () => {
  const [text, setText] = useState("Our memory...");
  const [image] = useImage("/photos/1.jpg");
  const [sticker] = useImage("/stickers/heart-doodle.png");

  return (
    <BackgroundTexture>
      <h2 className="text-3xl text-center text-rose-600 font-bold mb-6">Create Your Own Page 🎨</h2>
      <div className="bg-white border-2 border-dashed border-pink-300 p-4 max-w-4xl mx-auto rounded-xl shadow-xl">
        <Stage width={window.innerWidth - 100} height={500} className="bg-pink-50">
          <Layer>
            <KonvaImage image={image} x={50} y={50} width={200} height={150} />
            <KonvaText
              text={text}
              x={300}
              y={100}
              fontSize={24}
              fill="hotpink"
              draggable
            />
            <KonvaImage image={sticker} x={100} y={250} width={80} height={80} draggable />
          </Layer>
        </Stage>
        <div className="mt-4 text-center">
          <input
            className="border border-pink-300 rounded px-4 py-2"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </div>
    </BackgroundTexture>
  );
};

const ScrapbookLoveProposal = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/story" element={<StoryPage />} />
        <Route path="/proposal" element={<ProposalPage />} />
        <Route path="/editor" element={<EditorPage />} />
      </Routes>
    </Router>
  );
};

export default ScrapbookLoveProposal;