"use client";
import React, { useState, useEffect } from "react";
import { IconBrandX, IconBrandGithub } from "@tabler/icons-react";

const Footer = () => {  
  return (
    <footer className="py-6 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* 3 Column Layout */}
        <div className="flex items-start justify-between gap-10 mb-4">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-4 group w-fit">
               <span className="font-bold text-gray-800 group-hover:bg-gradient-to-r group-hover:from-gray-500 group-hover:via-gray-500 group-hover:to-gray-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                JustUs
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Instant, private, ephemeral chat rooms. No accounts, no tracking,
              no baggage.
            </p>
            <div className="flex gap-4 mt-5">
              <a href="#" className="text-gray-400 hover:text-gray-800 transition">
                <IconBrandX size={16} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-800 transition">
                <IconBrandGithub size={16} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-2">
            <h4 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Product
            </h4>
            <ul className="space-y-2">
              {["Features", "How it works"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-gray-800 text-sm transition">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              {["Privacy", "Terms", "Cookies", "Contact"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-gray-800 text-sm transition">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Full Width JustUs Text Effect */}
        <div className="hidden md:block pt-1 overflow-hidden -mx-6 px-6">
          <div className="group relative text-center py-1 cursor-pointer w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
            {/* Default Text - Light Gray */}
            <div className="text-[18vw] md:text-[15vw] lg:text-[12vw] font-black tracking-tighter text-gray-200 select-none whitespace-nowrap">
              JUSTUS
            </div>

            {/* Hover Gradient Shine Effect */}
            <div className="hidden absolute inset-0 md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="text-[18vw] md:text-[15vw] lg:text-[12vw] font-black tracking-tighter whitespace-nowrap bg-gradient-to-r from-gray-900 via-gray-500 via-gray-700 to-gray-900 bg-[length:200%_auto] bg-clip-text text-transparent animate-shine">
                JUSTUS
              </div>
            </div>
            
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shine {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
        .animate-shine {
          animation: shine 3s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;