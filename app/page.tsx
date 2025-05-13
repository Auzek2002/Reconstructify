// app/page.tsx
'use client';

import { motion, useMotionTemplate, useMotionValue, animate } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { FiUpload, FiDatabase, FiZap } from 'react-icons/fi';
import { BiFingerprint } from 'react-icons/bi';
import { useEffect } from 'react';
import Link from "next/link";

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
<nav className="sticky top-0 z-50 w-full border-b border-purple-500/20 bg-gray-900/80 backdrop-blur-lg">
  <div className="container mx-auto px-4">
    <div className="flex h-16 items-center justify-between">
      {/* Left Side - Logo */}
      <div className="flex items-center space-x-2">
        <Link href="/" passHref>
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-2xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 bg-clip-text text-transparent cursor-pointer"
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

      {/* Middle - Fingerprint SVG */}
      <motion.div
        className="flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
      >
        <BiFingerprint className="w-16 h-15 text-purple-400" />
      </motion.div>

      {/* Right Side - Get Started Button */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity" />
        <button
          onClick={() => document.getElementById('Upload')?.scrollIntoView({ behavior: 'smooth' })}
          className="relative bg-gradient-to-r from-purple-600 to-pink-500 px-6 py-3 rounded-xl text-md font-semibold hover:shadow-xl transition-all"
        >
          Get Started
        </button>
      </motion.div>
    </div>
  </div>
</nav>
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
              <button 
                onClick={() => document.getElementById('Upload')?.scrollIntoView({ behavior: 'smooth' })}
                className="relative bg-gradient-to-r from-purple-600 to-pink-500 px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl transition-all"
              >
                Get Started!
              </button>
            </motion.div>
          </motion.div>

        </div>
      </section>

{/* Workflow Section */}
<section className="relative z-10">
  <div className="container mx-auto px-4 py-24">
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="max-w-5xl mx-auto"
    >
      <div className="relative">
        {/* Center vertical line */}
        <motion.div
          className="absolute left-1/2 transform -translate-x-1/2 top-0 h-full w-1 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          transition={{ duration: 1.5, ease: "circOut" }}
        />

        {/* Workflow steps */}
        <div className="mt-10 mb-10 space-y-50">
          {[
            { 
              icon: <FiUpload className="w-8 h-8" />,
              title: "Upload Evidence",
              description: "Securely submit partial prints or database archives",
              color: "from-purple-500 to-pink-500"
            },
            { 
              icon: <FiZap className="w-8 h-8" />,
              title: "AI Reconstruction",
              description: "Generative networks restore missing patterns",
              color: "from-pink-500 to-purple-500"
            },
            { 
              icon: <BiFingerprint className="w-8 h-8" />,
              title: "Get Results",
              description: "Download reconstructed prints & matching reports",
              color: "from-purple-500 to-indigo-500"
            }
          ].map((step, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                className={`relative flex items-center gap-8 ${
                  isLeft ? "justify-start" : "justify-end"
                }`}
              >
                <div className={`w-1/2 ${isLeft ? "pr-12 text-right" : "pl-12 text-left"} space-y-3`}>
                  <div className={`relative z-10`}>
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-xl`}>
                      <motion.div whileHover={{ scale: 1.1 }} className="text-white">
                        {step.icon}
                      </motion.div>
                    </div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                      {step.title}
                    </h3>
                    <p className="text-purple-200/80">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  </div>
</section>


      {/* Upload Sections */}
      <section id= "Upload" className="container mx-auto px-4 py-16 relative z-10">
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

<div className="flex justify-center items-center">
  <Link href="/results">
  <button className="relative bg-gradient-to-r from-purple-600 to-pink-500 px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl transition-all cursor-pointer">
    Upload
  </button>
  </Link>
</div>


      {/* Features Section */}
      <section className="container mx-auto px-4 py-20 relative z-10 mt-28">
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

      {/* Footer */}
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