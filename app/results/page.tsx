'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { motion, useMotionValue, useMotionTemplate, animate } from 'framer-motion';
import { FiDownload, FiCheckCircle } from 'react-icons/fi';
import { BiFingerprint } from 'react-icons/bi';
import Link from 'next/link';

export default function ResultsPage() {
  const params = useSearchParams();
  const id = params.get('id') ?? '';
  const rawImageUrl = params.get('imageUrl') ?? '';
  const rawMatchUrl = params.get('matchUrl') ?? '';

  const imageUrl = decodeURIComponent(rawImageUrl);
  const matchUrl = decodeURIComponent(rawMatchUrl);

  // Animated background color loop
  const color = useMotionValue('#7c3aed');
  const backgroundImage = useMotionTemplate`
    radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})
  `;

  useEffect(() => {
    animate(color, ['#7c3aed', '#9333ea', '#db2777'], {
      duration: 10,
      repeat: Infinity,
      repeatType: 'mirror',
    });

    return () => {
      URL.revokeObjectURL(imageUrl);
      URL.revokeObjectURL(matchUrl);
    };
  }, [color, imageUrl, matchUrl]);

  return (
    <div className="min-h-screen bg-gray-900 text-purple-50" style={{ backgroundImage }}>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full border-b border-purple-500/20 bg-gray-900/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
            Reconstructify AI
          </Link>
          <motion.div whileHover={{ scale: 1.1 }} className="cursor-pointer">
            <BiFingerprint className="w-12 h-12 text-purple-400" />
          </motion.div>
          <Link href="/#Upload" className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl text-md font-semibold hover:shadow-xl transition-all">
            New Analysis
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-4 py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                Analysis Results
              </motion.h2>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl text-purple-200/80">
                Document ID: <span className="font-mono">{id}</span>
              </motion.p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Reconstructed Card */}
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-gradient-to-br from-purple-900/30 to-pink-900/20 rounded-2xl p-1 backdrop-blur-lg">
                <div className="bg-gray-900/80 rounded-xl p-8 h-full flex flex-col items-center space-y-6">
                  <div className="relative">
                    <BiFingerprint className="w-24 h-24 text-purple-400" />
                    <div className="absolute inset-0 bg-purple-400/10 blur-3xl rounded-full" />
                  </div>
                  <h3 className="text-3xl font-bold">Reconstructed Print</h3>
                  <div className="w-full aspect-square bg-gray-800/50 rounded-xl overflow-hidden border-2 border-purple-400/20">
                    <img src={imageUrl} alt="Reconstructed fingerprint" className="object-cover w-full h-full" />
                  </div>
                  <a href={imageUrl} download={`reconstructed_${id}.png`} className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 px-6 py-3 rounded-lg hover:shadow-xl transition-all">
                    <FiDownload />
                    Download Print
                  </a>
                </div>
              </motion.div>

              {/* Matched Print Card */}
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }} className="bg-gradient-to-br from-purple-900/30 to-pink-900/20 rounded-2xl p-1 backdrop-blur-lg">
                <div className="bg-gray-900/80 rounded-xl p-8 h-full flex flex-col items-center space-y-6">
                  <div className="relative">
                    <BiFingerprint className="w-24 h-24 text-pink-400" />
                    <div className="absolute inset-0 bg-pink-400/10 blur-3xl rounded-full" />
                  </div>
                  <h3 className="text-3xl font-bold">Top Match</h3>
                  <div className="w-full aspect-square bg-gray-800/50 rounded-xl overflow-hidden border-2 border-pink-400/20">
                    <img src={matchUrl} alt="Matched fingerprint" className="object-cover w-full h-full" />
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
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-purple-500/20 py-8 text-center text-purple-100 text-sm">
        <div>© {new Date().getFullYear()} Reconstructify AI — All rights reserved.</div>
        <div className="flex justify-center gap-4 mt-2">
          <Link href="/privacy" className="hover:text-purple-200">Privacy Policy</Link>
          <span>|</span>
          <Link href="/terms" className="hover:text-purple-200">Terms of Service</Link>
          <span>|</span>
          <Link href="/contact" className="hover:text-purple-200">Contact</Link>
        </div>
      </footer>
    </div>
  );
}
