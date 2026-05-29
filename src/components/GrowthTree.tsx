"use client";

'use client'

import { motion } from 'framer-motion'
import { Sprout, Leaf } from 'lucide-react'

interface GrowthTreeProps {
  level: number
  progress: number
}

export function GrowthTree({ level, progress }: GrowthTreeProps) {
  const treeSize = Math.min(100 + level * 10, 200)
  const leafCount = Math.floor(level / 2) + 3

  return (
    <div className="relative flex items-center justify-center">
      <motion.div
        animate={{
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative"
        style={{ width: treeSize, height: treeSize }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <Sprout className="text-growth-500" style={{ width: treeSize * 0.6, height: treeSize * 0.6 }} />
        </div>
        {Array.from({ length: leafCount }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="absolute"
            style={{
              top: `${20 + Math.random() * 30}%`,
              left: `${20 + Math.random() * 60}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          >
            <Leaf className="text-growth-400" style={{ width: 20, height: 20 }} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
