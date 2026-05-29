"use client";

'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

export function StarsBackground() {
  const stars = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 10 + 5,
    delay: Math.random() * 2,
  }))

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: star.delay,
            ease: 'easeInOut',
          }}
        >
          <Star
            className="text-yellow-300"
            style={{ width: star.size, height: star.size }}
          />
        </motion.div>
      ))}
    </div>
  )
}
