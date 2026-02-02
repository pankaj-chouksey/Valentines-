"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import FloatingHearts from "@/components/FloatingHearts";

const NO_MESSAGES = [
  "Are you sure?",
  "Pura soch lo?",
  "Dil mat todo...",
  "You’re breaking my heart!",
  "I’m gonna cry...",
  "Think again! 🥺",
  "Is that your final answer?",
  "You're being mean! 😭",
  "Wait, let's reconsider...",
  "Really? 💔",
];

const PROPOSAL_GIF = "https://media1.tenor.com/m/N7GiO8UsfooAAAAC/bubu-dudu-heart.gif"; // Bubu Dudu Heart Sticker
const SUCCESS_GIF = "https://media.tenor.com/skdV4MKVLgMAAAAj/bear-hug.gif"; // Bear hug gif
const COUPLE_IMAGE = "https://static.toiimg.com/thumb/121615492.jpg?imgsize=31114&photoid=121615492&width=600&height=335&resizemode=75"; // Virat & Anushka

export default function ValentineProposal() {
  const [noClicks, setNoClicks] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [noButtonText, setNoButtonText] = useState("No");

  const handleNoClick = useCallback(() => {
    setNoClicks((prev) => prev + 1);
    setNoButtonText(NO_MESSAGES[Math.floor(Math.random() * NO_MESSAGES.length)]);
  }, []);

  const handleYesClick = useCallback(() => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ff4d6d", "#ff758f", "#ff8fa3", "#ffb3c1"],
    });
    setIsSuccess(true);
  }, []);

  const yesScale = 1 + noClicks * 0.4;
  const noScale = Math.max(0.3, 1 - noClicks * 0.1);

  return (
    <main className="min-h-screen flex items-center justify-center p-4 relative bg-[#fff5f7]">
      <FloatingHearts />

      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.div
            key="proposal"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="z-10 bg-white/40 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-pink-200 shadow-2xl flex flex-col items-center text-center max-w-lg w-full"
          >
            <motion.img
              key={noClicks}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={PROPOSAL_GIF}
              alt="Cute Bear"
              className="w-48 h-48 md:w-64 md:h-64 object-contain mb-8 rounded-2xl"
            />

            <h1 className="text-3xl md:text-4xl font-bold text-[#ff4d6d] mb-12 drop-shadow-sm">
              Will you be my Valentine? 💖
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-6 w-full">
              <motion.button
                onClick={handleYesClick}
                style={{ scale: yesScale }}
                whileHover={{ scale: yesScale * 1.05 }}
                whileTap={{ scale: yesScale * 0.95 }}
                className="bg-[#ff4d6d] text-white px-8 py-3 rounded-full font-bold text-xl shadow-lg hover:bg-[#ff758f] transition-colors min-w-[120px]"
              >
                Yes
              </motion.button>

              <motion.button
                onClick={handleNoClick}
                initial={false}
                animate={{ scale: noScale }}
                whileHover={{ scale: noScale * 1.05 }}
                className="bg-gray-400 text-white px-8 py-3 rounded-full font-bold text-xl shadow-md hover:bg-gray-500 transition-colors min-w-[120px]"
              >
                {noButtonText}
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="z-10 bg-white/40 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-pink-200 shadow-2xl flex flex-col items-center text-center max-w-2xl w-full"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 10 }}
              className="relative w-full aspect-4/3 mb-8 overflow-hidden rounded-2xl shadow-xl border-4 border-white"
            >
              <img
                src={COUPLE_IMAGE}
                alt="Happy Couple"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 w-24 h-24 md:w-32 md:h-32">
                <img src={SUCCESS_GIF} alt="Celebration" className="w-full h-full object-contain" />
              </div>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-serif text-[#ff4d6d] mb-6 italic">
              Yay! She said YES! 🌸
            </h2>

            <div className="mt-6 p-6 md:p-8 bg-white/60 rounded-2xl border border-pink-100 italic">
              <p className="font-serif text-2xl md:text-4xl text-gray-700 leading-relaxed drop-shadow-sm">
                "Hazaaron mein kisi ko taqdeer aisi milti hai,<br />
                Ek raanjha aur ek heer jaisi milti hai...<br />
                Mubarak ho aapko yeh naya safar,<br />
                Hume toh zindagi mein bas aapki kami milti hai."
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 text-pink-500 font-medium"
            >
              See you on Feb 14th! 💌
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
