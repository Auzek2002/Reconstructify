// app/page.tsx
'use client';

import { motion, useMotionTemplate, useMotionValue, animate } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { FiUpload, FiDatabase, FiZap } from 'react-icons/fi';
import { BiFingerprint } from 'react-icons/bi';
import { useEffect } from 'react';

export default function Home() {
  const color = useMotionValue('#7c3aed');
  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;

  useEffect(() => {
    animate(color, ['#7c3aed', '#9333ea', '#db2777'], {
      duration: 10,
      repeat: Infinity,
      repeatType: 'mirror',
    });
  }, [color]);

  // Dropzone configurations
  const { getRootProps: getDatabaseRootProps, getInputProps: getDatabaseInputProps } = useDropzone({
    accept: { 'application/zip': ['.zip'] }
  });

  const { getRootProps: getPartialRootProps, getInputProps: getPartialInputProps } = useDropzone({
    accept: { 'image/*': ['.png', '.jpg', '.jpeg'] }
  });

  return (
    <div className="min-h-screen bg-gray-900 text-purple-50" style={{ backgroundImage }}>
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='80' height='80' patternUnits='userSpaceOnUse'%3E%3Cpath d='M80 0H0V80' fill='none' stroke='%239f7aea' stroke-width='1' opacity='0.2'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E")`
        }} />
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gradient-to-br from-purple-400/10 to-pink-500/10 rounded-full"
            style={{
              width: Math.random() * 40 + 10,
              height: Math.random() * 40 + 10,
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
            }}
            animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.1, 0.3, 0.1] }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative z-10 overflow-hidden">
        <div className="container mx-auto px-4 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="mb-10 relative inline-block">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute inset-0 bg-purple-500/10 blur-3xl rounded-full"
              />
              <h1 className="text-6xl md:text-7xl font-bold mb-6">
                <motion.span
                  initial={{ backgroundPosition: '0% 50%' }}
                  animate={{ backgroundPosition: '100% 50%' }}
                  transition={{ duration: 6, repeat: Infinity }}
                  className="bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 bg-[length:200%] bg-clip-text text-transparent"
                >
                  Reconstructify AI
                </motion.span>
              </h1>
            </div>
            
            <motion.p
              className="text-2xl md:text-3xl text-purple-100/80 mb-12 font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Next-Generation Forensic Fingerprint Reconstruction
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="inline-block relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity" />
              <button className="relative bg-gradient-to-r from-purple-600 to-pink-500 px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl transition-all">
                Start Free Trial
              </button>
            </motion.div>
          </motion.div>

          {/* 3D Fingerprint Visualization */}
          <motion.div
            className="mx-auto mt-24 relative w-full max-w-[800px] h-[500px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 blur-3xl rounded-[40%]" />
            <div className="relative z-10 h-full w-full perspective-1000">
              <motion.div
                className="h-full w-full preserve-3d"
                animate={{ rotateY: 15, rotateX: -5 }}
                transition={{ duration: 20, repeat: Infinity, repeatType: 'mirror' }}
              >
                <FingerprintSVG className="absolute inset-0 text-purple-300/80" />
                <FingerprintSVG className="absolute inset-0 text-purple-400/30 [transform:translateZ(40px)]" />
                <FingerprintSVG className="absolute inset-0 text-pink-400/20 [transform:translateZ(80px)]" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Upload Sections */}
      <section className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-2 gap-8">
          {[['Database', FiDatabase], ['Partial', BiFingerprint]].map(([type, Icon], i) => (
            <motion.div
              key={type as string}
              className="bg-gradient-to-br from-purple-900/30 to-pink-900/20 rounded-2xl p-1 backdrop-blur-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <div className="bg-gray-900/80 rounded-xl p-8 h-full">
                <div {...(type === 'Database' ? getDatabaseRootProps() : getPartialRootProps())} className="cursor-pointer">
                  <input {...(type === 'Database' ? getDatabaseInputProps() : getPartialInputProps())} />
                  <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-purple-400/30 rounded-xl hover:border-purple-400/60 transition-all group">
                    <motion.div whileHover={{ scale: 1.1 }} className="mb-6 relative">
                      <Icon className="w-16 h-16 text-purple-400" />
                      <div className="absolute inset-0 bg-purple-400/10 blur-xl rounded-full" />
                    </motion.div>
                    <h3 className="text-2xl font-semibold mb-2">
                      Upload {type} {type === 'Database' ? 'Database' : 'Fingerprint'}
                    </h3>
                    <p className="text-purple-300/80">
                      {type === 'Database' 
                        ? '(ZIP file containing fingerprint images)' 
                        : '(PNG, JPG, or JPEG format)'}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {[
            { icon: <FiZap className="w-8 h-8" />, title: 'Generative AI Reconstruction', gradient: 'from-purple-400 to-pink-500' },
            { icon: <FiDatabase className="w-8 h-8" />, title: 'Instant Matching', gradient: 'from-blue-400 to-purple-500' },
            { icon: <BiFingerprint className="w-8 h-8" />, title: 'Expert Validation', gradient: 'from-pink-400 to-purple-500' }
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-8 border border-purple-500/20 relative overflow-hidden group"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity`} />
              <div className="relative z-10">
                <div className="w-14 h-14 mb-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center text-purple-400">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-purple-300/80">
                  {feature.title === 'Generative AI Reconstruction' 
                    ? 'Deep neural networks reconstruct missing fingerprint patterns with forensic precision' 
                    : feature.title === 'Instant Matching' 
                    ? 'Real-time search across millions of prints with GPU-accelerated matching' 
                    : 'Algorithmic results verified by forensic experts for legal admissibility'}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}

// Embedded SVG Component
const FingerprintSVG = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 200 200"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
  >
    <motion.path
      d="M40 60 Q50 50 60 60 Q70 70 80 60 Q90 50 100 60"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <motion.path
      d="M50 80 Q60 70 70 80 Q80 90 90 80 Q100 70 110 80"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, delay: 0.3, repeat: Infinity }}
    />
    <motion.path
      d="M60 100 Q70 90 80 100 Q90 110 100 100 Q110 90 120 100"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, delay: 0.6, repeat: Infinity }}
    />
    <motion.path
      d="M90 90 Q100 80 110 90 Q100 100 90 90"
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      style={{ transformOrigin: 'center' }}
    />
  </svg>
);