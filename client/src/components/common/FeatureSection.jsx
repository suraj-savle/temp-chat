"use client";

import React from "react";
import {
  IconBolt,
  IconShieldLock,
  IconHistoryOff,
  IconUserEdit,
  IconDeviceDesktopAnalytics,
  IconTrash,
  IconArrowRight,
} from "@tabler/icons-react";

const FeatureSection = () => {
  const features = [
    {
      title: "Features",
      description: "Built for conversations that don't need to be saved",
      icon: <IconShieldLock size={28} stroke={1.5} />,
      span: "col-span-2",
      height: "row-span-1",
    },
    {
      title: "Instant Access",
      description: "Six digits stand between you and a secure conversation.",
      icon: <IconBolt size={28} stroke={1.5} />,
      span: "col-span-1",
      height: "row-span-1",
    },
    {
      title: "Fluid Personas",
      description: "Swap identities instantly without leaving the chat.",
      icon: <IconUserEdit size={28} stroke={1.5} />,
      span: "col-span-1",
      height: "row-span-2",
    },
    {
      title: "Live Indicators",
      description:
        "Real-time typing feedback with zero data persistence. See who's typing instantly.",
      icon: <IconDeviceDesktopAnalytics size={28} stroke={1.5} />,
      span: "col-span-2",
      height: "row-span-1",
    },
    {
      title: "Auto Purge",
      description: "The moment the last user leaves, memory is wiped clean.",
      icon: <IconHistoryOff size={28} stroke={1.5} />,
      span: "col-span-1",
      height: "row-span-1",
    },
    {
      title: "Owner Logic",
      description: "Complete control over room visibility and participants.",
      icon: <IconTrash size={28} stroke={1.5} />,
      span: "col-span-1",
      height: "row-span-1",
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="max-w-6xl mx-auto px-4">
        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[220px]">
          {/* Privacy by Design - Large */}
          <div className="md:col-span-2 p-6">
            <div className="flex flex-col h-full">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-8xl font-semibold text-gray-900">
                  {features[0].title}
                </h3>
              </div>
              <p className="text-gray-500 text-xl leading-relaxed mb-4 flex-1">
                {features[0].description}
              </p>
            </div>
          </div>

          {/* end-to-end */}
          <div className="group relative bg-white rounded-2xl p-6 hover:shadow-2xl border border-gray-100 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
            {/* Glass morphism overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 backdrop-blur-sm" />

            {/* Animated gradient border */}
            <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-r from-transparent via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 rounded-2xl bg-white" />
            </div>

            {/* Neon glow effect on hover */}
            <div className="absolute -inset-1 bg-gradient-to-r from-gray-900/0 via-gray-900/10 to-gray-900/0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="flex flex-col h-full relative z-10">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-800 transition-all duration-300 flex items-center gap-2">
                  {/* Animated checkmark with spring effect */}
                  <span className="relative">
                    <svg
                      className="w-5 h-5 text-green-500 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="absolute inset-0 bg-green-500 rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                  </span>
                  End-to-End Security
                </h3>

                {/* Modern floating icon */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gray-900 rounded-full blur-md opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                  <div className="relative text-gray-400 group-hover:text-gray-900 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 group-hover:translate-y-[-2px]">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-1 group-hover:text-gray-700 transition-all duration-300">
                Your messages are sent securely, ensuring your conversations
                stay private.
              </p>

              {/* Modern stats section */}
              <div className="space-y-3">
                {/* Animated pill badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full group-hover:bg-gray-100 transition-all duration-300 group-hover:scale-105 origin-left">
                  <div className="relative">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 group-hover:animate-pulse" />
                    <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-green-500 animate-ping opacity-75" />
                  </div>
                  <span className="text-xs font-medium text-gray-600 group-hover:text-gray-800 transition-colors">
                    Active Protection
                  </span>
                </div>

                {/* Modern progress indicator */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400 group-hover:text-gray-500 transition-colors">
                    Security Index
                  </span>
                  <span className="text-gray-600 font-mono text-[10px] group-hover:text-gray-800 transition-colors group-hover:tracking-wider">
                    256-bit
                  </span>
                </div>
                <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full w-0 bg-gradient-to-r from-gray-800 to-gray-900 rounded-full group-hover:w-full transition-all duration-1000 ease-out" />
                </div>
              </div>

              {/* Modern footer with hover animation */}
              <div className="mt-4 pt-3 border-t border-gray-100 group-hover:border-gray-200 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 group-hover:text-gray-500 transition-colors">
                    Encryption
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-mono text-gray-500 group-hover:text-gray-700 transition-colors group-hover:tracking-wider">
                      AES-256-GCM
                    </span>
                    <svg
                      className="w-3 h-3 text-gray-400 group-hover:text-gray-600 transition-all duration-300 group-hover:translate-x-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* end to end */}
            <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden pointer-events-none">
              <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 transform rotate-45 translate-x-6 -translate-y-6 group-hover:translate-x-3 group-hover:-translate-y-3 transition-all duration-500" />
              <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-gray-200 to-gray-300 transform rotate-45 translate-x-10 -translate-y-10 group-hover:translate-x-5 group-hover:-translate-y-5 transition-all duration-500 delay-75" />
            </div>

            {/* Micro-interaction: ripple effect on click */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
              <div className="absolute inset-0 opacity-0 group-active:opacity-100">
                <div className="absolute inset-0 bg-white/50 transform scale-0 group-active:scale-100 transition-transform duration-300 rounded-full" />
              </div>
            </div>
          </div>

          {/* Fluid Personas - Tall */}
          <div className="md:row-span-2 group relative bg-white rounded-2xl p-6 hover:shadow-xl border border-gray-100 transition-all duration-500 hover:-translate-y-1 overflow-hidden">
            {/* Subtle black gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/0 via-gray-900/[0.02] to-gray-900/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="flex flex-col h-full relative z-10">
              {/* Header Section */}
              <div className="flex items-start justify-between mb-4">
                <div className="space-y-2">
                  {/* Black/White Badge */}
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-gray-100 rounded-full text-[10px] font-medium text-gray-600 group-hover:bg-gray-900 group-hover:text-white transition-all duration-300">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gray-600"></span>
                    </span>
                    Ephemeral
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-800 transition-all duration-300">
                    No Chats Saved
                  </h3>
                </div>

                {/* Icon */}
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-gray-900 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6">
                  <svg
                    className="w-5 h-5 text-gray-600 group-hover:text-white transition-all duration-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                    />
                  </svg>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-1 group-hover:text-gray-700 transition-all duration-300">
                Once a session is closed, all messages are gone forever. We
                don't store them.
              </p>

              {/* Stats Grid - Fills blank space */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-50 rounded-xl p-3 group-hover:bg-gray-100 transition-all duration-300">
                  <div className="text-[10px] text-gray-400 mb-1 uppercase tracking-wide">
                    Retention
                  </div>
                  <div className="text-base font-bold text-gray-900">
                    0 seconds
                  </div>
                  <div className="text-[10px] text-gray-400 mt-1">
                    Auto-delete
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 group-hover:bg-gray-100 transition-all duration-300">
                  <div className="text-[10px] text-gray-400 mb-1 uppercase tracking-wide">
                    Storage
                  </div>
                  <div className="text-base font-bold text-gray-900">
                    0 bytes
                  </div>
                  <div className="text-[10px] text-gray-400 mt-1">No logs</div>
                </div>
              </div>

              {/* Progress Bar Section */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400 uppercase tracking-wide">
                    Data Persistence
                  </span>
                  <span className="text-gray-600 font-mono text-[10px] group-hover:text-gray-900 transition-colors">
                    0%
                  </span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full w-0 bg-gray-900 rounded-full group-hover:w-full transition-all duration-1000 ease-out" />
                </div>
                <p className="text-[10px] text-gray-400">
                  Messages deleted immediately after session ends
                </p>
              </div>

              {/* Footer with metrics */}
              <div className="mt-2 pt-3 border-t border-gray-100 group-hover:border-gray-200 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-500 group-hover:animate-pulse" />
                    <span className="text-xs text-gray-400 group-hover:text-gray-600 transition-colors">
                      Auto-purge enabled
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-mono text-gray-500 group-hover:text-gray-900 transition-colors">
                      Ephemeral
                    </span>
                    <svg
                      className="w-3 h-3 text-gray-400 group-hover:text-gray-900 transition-all duration-300 group-hover:translate-x-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Animated border line */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

            {/* Corner accent */}
            <div className="absolute bottom-0 right-0 w-12 h-12 overflow-hidden pointer-events-none">
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-gray-100 transform rotate-45 translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-all duration-500" />
            </div>
          </div>

          {/* Auto Purge */}
          <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-col h-full">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {features[4].title}
                </h3>
                <div className="text-gray-400">{features[4].icon}</div>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-3 flex-1">
                {features[4].description}
              </p>
              <span className="text-xs text-gray-400 font-medium">
                Auto-delete
              </span>
            </div>
          </div>

          {/* Owner Logic */}
          <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-col h-full">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {features[5].title}
                </h3>
                <div className="text-gray-400">{features[5].icon}</div>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-3 flex-1">
                {features[5].description}
              </p>
              <span className="text-xs text-gray-400 font-medium">
                Admin Control
              </span>
            </div>
          </div>

          {/* CTA Card */}
          <div className="bg-gray-900 rounded-2xl p-6 hover:shadow-md transition-shadow group cursor-pointer">
            <div className="flex flex-col h-full justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Ready to start?
                </h3>
                <p className="text-gray-400 text-sm">
                  Create a private room instantly
                </p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-white text-sm font-medium">
                  Start Chatting
                </span>
                <IconArrowRight
                  size={18}
                  className="text-white group-hover:translate-x-1 transition-transform"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
