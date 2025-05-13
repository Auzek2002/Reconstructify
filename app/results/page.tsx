'use client';

import { motion, useMotionTemplate, useMotionValue, animate } from 'framer-motion';
import { FiDownload, FiCheckCircle } from 'react-icons/fi';
import { BiFingerprint } from 'react-icons/bi';
import { useEffect } from 'react';
import Link from "next/link";

export default function Results() {
  const color = useMotionValue('#7c3aed');
  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;

  useEffect(() => {
    animate(color, ['#7c3aed', '#9333ea', '#db2777'], {
      duration: 10,
      repeat: Infinity,
      repeatType: 'mirror',
    });
  }, [color]);

  return (
    <div className="min-h-screen bg-gray-900 text-purple-50" style={{ backgroundImage }}>
      {/* Navbar - Same as home page */}
      <nav className="sticky top-0 z-50 w-full border-b border-purple-500/20 bg-gray-900/80 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
            <Link href="/" passHref>
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-2xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 bg-clip-text text-transparent"
              >
                Reconstructify AI
              </motion.span>
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute inset-0 bg-purple-500/10 blur-3xl rounded-full"
              />
              </Link>
            </div>

            <motion.div
              className="flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
            >
              <FingerprintSVG className="w-12 h-12 text-purple-400" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity" />
              <Link 
                href="/#Upload"
                className="relative bg-gradient-to-r from-purple-600 to-pink-500 px-6 py-3 rounded-xl text-md font-semibold hover:shadow-xl transition-all"
              >
                New Analysis
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Animated Background - Same as home page */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* ... (Same animated background implementation as home page) */}
      </div>

      {/* Results Section */}
      <section className="relative z-10 min-h-screen">
        <div className="container mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-20">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent"
              >
                Analysis Results
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-purple-200/80"
              >
                Reconstructed fingerprint and database match visualization
              </motion.p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Reconstructed Card */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-gradient-to-br from-purple-900/30 to-pink-900/20 rounded-2xl p-1 backdrop-blur-lg"
              >
                <div className="bg-gray-900/80 rounded-xl p-8 h-full">
                  <div className="flex flex-col items-center justify-center space-y-6">
                    <div className="relative">
                      <BiFingerprint className="w-24 h-24 text-purple-400" />
                      <div className="absolute inset-0 bg-purple-400/10 blur-3xl rounded-full" />
                    </div>
                    <h3 className="text-3xl font-bold">Reconstructed Print</h3>
                    <div className="relative w-full aspect-square bg-gray-800/50 rounded-xl overflow-hidden border-2 border-purple-400/20">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <FingerprintSVG className="w-full h-full text-purple-400/30" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-purple-300">
                      <FiCheckCircle className="text-green-400" />
                      <span>98.7% Reconstruction Confidence</span>
                    </div>
                    <button className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 px-6 py-3 rounded-lg hover:shadow-xl transition-all">
                      <FiDownload />
                      Download Print
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Matched Print Card */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-purple-900/30 to-pink-900/20 rounded-2xl p-1 backdrop-blur-lg"
              >
                <div className="bg-gray-900/80 rounded-xl p-8 h-full">
                  <div className="flex flex-col items-center justify-center space-y-6">
                    <div className="relative">
                      <BiFingerprint className="w-24 h-24 text-pink-400" />
                      <div className="absolute inset-0 bg-pink-400/10 blur-3xl rounded-full" />
                    </div>
                    <h3 className="text-3xl font-bold">Top Match</h3>
                    <div className="relative w-full aspect-square bg-gray-800/50 rounded-xl overflow-hidden border-2 border-pink-400/20">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <FingerprintSVG className="w-full h-full text-pink-400/30" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-purple-300">
                      <FiCheckCircle className="text-green-400" />
                      <span>96.2% Match Confidence</span>
                    </div>
                    <div className="text-center space-y-2">
                      <p className="text-purple-200/80">From Database:</p>
                      <p className="font-mono text-purple-100">FingerprintDB_2024</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

<footer className="relative z-10 bg-gray-950 border-t border-purple-500/20 mt-28">
  <div className="container mx-auto px-6 py-8 flex flex-col items-center text-center text-purple-100 text-sm space-y-4">
    <div>
      <span className="font-semibold text-purple-300 text-base">
        © {new Date().getFullYear()} Reconstructify AI
      </span> — All rights reserved.
    </div>
    <div className="flex flex-wrap gap-4 justify-center text-purple-400">
      <Link href="/privacy" className="hover:text-purple-200 transition-colors">Privacy Policy</Link>
      <span>|</span>
      <Link href="/terms" className="hover:text-purple-200 transition-colors">Terms of Service</Link>
      <span>|</span>
      <Link href="/contact" className="hover:text-purple-200 transition-colors">Contact</Link>
    </div>
  </div>
</footer>
    </div>
  );
}

// Reuse the same FingerprintSVG component from home page
const FingerprintSVG = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 200 200"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
  >
    {/* ... (Same SVG paths as home page) */}
  </svg>
);