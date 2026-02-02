"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Heart = ({ delay = 0, x = 0 }) => (
    <motion.div
        initial={{ y: "110vh", opacity: 0, scale: 0.5 }}
        animate={{
            y: "-10vh",
            opacity: [0, 0.8, 0.8, 0],
            scale: [0.5, 1, 1, 0.8],
            x: x + Math.sin(delay) * 20
        }}
        transition={{
            duration: 10,
            delay,
            repeat: Infinity,
            ease: "linear"
        }}
        className="heart-animation text-red-400/30 text-2xl"
    >
        ❤
    </motion.div>
);

export default function FloatingHearts() {
    const [hearts, setHearts] = useState<number[]>([]);

    useEffect(() => {
        setHearts(Array.from({ length: 20 }, (_, i) => i));
    }, []);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none select-none z-0">
            {hearts.map((i) => (
                <Heart key={i} delay={i * 0.5} x={Math.random() * 100 + "vw" as any} />
            ))}
        </div>
    );
}
