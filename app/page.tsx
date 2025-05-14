'use client';

import { motion, useMotionTemplate, useMotionValue, animate } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { FiUpload, FiDatabase, FiZap } from 'react-icons/fi';
import { BiFingerprint } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const color = useMotionValue('#7c3aed');
  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
  const [zipFile, setZipFile] = useState<File | null>(null);
  const [partialFile, setPartialFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    animate(color, ['#7c3aed', '#9333ea', '#db2777'], {
      duration: 10,
      repeat: Infinity,
      repeatType: 'mirror',
    });
  }, [color]);

  // Database dropzone config
  const { getRootProps: getDatabaseRootProps, getInputProps: getDatabaseInputProps } = useDropzone({
    accept: { 'application/zip': ['.zip'] },
    multiple: false,
    onDropAccepted: (files) => setZipFile(files[0]),
  });

  // Partial fingerprint dropzone config
  const { getRootProps: getPartialRootProps, getInputProps: getPartialInputProps } = useDropzone({
    accept: { 'image/*': ['.png', '.jpg', '.jpeg'] },
    multiple: false,
    onDropAccepted: (files) => setPartialFile(files[0]),
  });

  const handleUpload = async () => {
    if (!zipFile || !partialFile) {
      alert('Please upload both files');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('zip', zipFile);
    formData.append('partial', partialFile);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');
      
      const { id } = await response.json();
      const pyRes = await fetch('http://localhost:8000/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
    if (!pyRes.ok) throw new Error('Processing API failed');
    const pyResult = await pyRes.json();
    console.log('Python API result:', pyResult);
    router.push(`/results?id=${id}`);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-900 text-purple-50" style={{ backgroundImage }}>
            {/* NAV */}
      <nav className="sticky top-0 z-50 w-full border-b border-purple-500/20 bg-gray-900/80 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="/">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-2xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 bg-clip-text text-transparent cursor-pointer"
              >
                Reconstructify AI
              </motion.span>
            </Link>
            <motion.div whileHover={{ scale: 1.1 }}>
              <BiFingerprint className="w-16 h-15 text-purple-400" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
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

      {/* HERO */}
      <section className="relative z-10 overflow-hidden">
        <div className="container mx-auto px-4 py-32 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
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
            <p className="text-2xl md:text-3xl text-purple-100/80 mb-12 font-light">
              Next-Generation Forensic Fingerprint Reconstruction
            </p>
            <button
              onClick={() => document.getElementById('Upload')?.scrollIntoView({ behavior: 'smooth' })}
              className="relative bg-gradient-to-r from-purple-600 to-pink-500 px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl transition-all"
            >
              Get Started!
            </button>
          </motion.div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="relative z-10">
        <div className="container mx-auto px-4 py-24">
          <div className="relative max-w-5xl mx-auto">
            <div
              className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-1 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"
              style={{ transformOrigin: 'top' }}
            />
            <div className="mt-10 space-y-16">
              {[
                { icon: <FiUpload />, title: 'Upload Evidence', desc: 'Submit partial prints or database archives' },
                { icon: <FiZap />, title: 'AI Reconstruction', desc: 'Restore missing fingerprint patterns' },
                { icon: <BiFingerprint />, title: 'Get Results', desc: 'Download reconstructed prints & reports' },
              ].map((step, i) => {
                const left = i % 2 === 0;
                return (
                  <div
                    key={i}
                    className={`flex items-center ${left ? 'justify-start' : 'justify-end'} gap-8`}
                  >
                    <div className={`w-1/2 ${left ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-xl">
                        {step.icon}
                      </div>
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                        {step.title}
                      </h3>
                      <p className="text-purple-200/80">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Upload Sections */}
      <section id="Upload" className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Database Upload */}
          <motion.div
            className="bg-gradient-to-br from-purple-900/30 to-pink-900/20 rounded-2xl p-1 backdrop-blur-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-gray-900/80 rounded-xl p-8 h-full">
              <div {...getDatabaseRootProps()} className="cursor-pointer">
                <input {...getDatabaseInputProps()} />
                <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-purple-400/30 rounded-xl hover:border-purple-400/60 transition-all group">
                  <motion.div whileHover={{ scale: 1.1 }} className="mb-6 relative">
                    <FiDatabase className="w-16 h-16 text-purple-400" />
                    <div className="absolute inset-0 bg-purple-400/10 blur-xl rounded-full" />
                  </motion.div>
                  <h3 className="text-2xl font-semibold mb-2">
                    Upload Database
                  </h3>
                  <p className="text-purple-300/80">
                    {zipFile ? (
                      <span className="text-purple-200">{zipFile.name}</span>
                    ) : (
                      '(ZIP file containing fingerprint images)'
                    )}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Partial Fingerprint Upload */}
          <motion.div
            className="bg-gradient-to-br from-purple-900/30 to-pink-900/20 rounded-2xl p-1 backdrop-blur-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-gray-900/80 rounded-xl p-8 h-full">
              <div {...getPartialRootProps()} className="cursor-pointer">
                <input {...getPartialInputProps()} />
                <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-purple-400/30 rounded-xl hover:border-purple-400/60 transition-all group">
                  <motion.div whileHover={{ scale: 1.1 }} className="mb-6 relative">
                    <BiFingerprint className="w-16 h-16 text-purple-400" />
                    <div className="absolute inset-0 bg-purple-400/10 blur-xl rounded-full" />
                  </motion.div>
                  <h3 className="text-2xl font-semibold mb-2">
                    Upload Partial Fingerprint
                  </h3>
                  <p className="text-purple-300/80">
                    {partialFile ? (
                      <span className="text-purple-200">{partialFile.name}</span>
                    ) : (
                      '(PNG, JPG, or JPEG format)'
                    )}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Upload Button */}
        <div className="flex justify-center items-center mt-12">
          <button 
            onClick={handleUpload}
            disabled={isUploading}
            className={`relative bg-gradient-to-r from-purple-600 to-pink-500 px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl transition-all ${
              isUploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            {isUploading ? 'Uploading...' : 'Upload Files'}
          </button>
        </div>
      </section>

            {/* FOOTER */}
      <footer className="bg-gray-950 border-t border-purple-500/20 mt-28 py-8 text-center text-purple-100 text-sm">
        <div>
          © {new Date().getFullYear()} Reconstructify AI — All rights reserved.
        </div>
        <div className="mt-2 flex justify-center gap-4">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </footer>
    </div>
  );
}
