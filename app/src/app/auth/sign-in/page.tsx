import Signin from "@/components/Auth/Signin";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function SignIn() {
  return (
    <div className="flex min-h-screen">
      {/* Left branding panel */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br from-[#5750F1] via-[#4338ca] to-[#1e1b4b] p-12 xl:flex">
        {/* Background decorative circles */}
        <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-white/5" />
        <div className="absolute -bottom-32 -right-20 h-[500px] w-[500px] rounded-full bg-white/5" />
        <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-white/5" />

        {/* Logo */}
        <div className="relative z-10">
          <Image
            src="/images/logo/logo.svg"
            alt="NextAdmin Logo"
            width={160}
            height={30}
            className="brightness-0 invert"
          />
        </div>

        {/* Center content */}
        <div className="relative z-10 text-white">
          <h2 className="mb-4 text-4xl font-bold leading-tight">
            Welcome back to
            <br />
            <span className="text-indigo-300">NextAdmin</span>
          </h2>
          <p className="mb-10 max-w-sm text-lg text-indigo-200">
            Your all-in-one admin dashboard. Manage your data, analytics, and
            team — all from one place.
          </p>

          {/* Feature list */}
          <ul className="space-y-3 text-indigo-100">
            {[
              "Real-time analytics & reporting",
              "Team collaboration tools",
              "200+ UI components & templates",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs font-bold text-white">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom illustration */}
        <div className="relative z-10 mt-8">
          <Image
            src="/images/grids/grid-02.svg"
            alt="Dashboard illustration"
            width={420}
            height={280}
            className="mx-auto opacity-20"
          />
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex w-full items-center justify-center bg-white px-6 py-12 dark:bg-gray-dark xl:w-1/2">
        <div className="w-full max-w-[440px]">
          {/* Mobile logo */}
          <div className="mb-8 flex justify-center xl:hidden">
            <Image
              src="/images/logo/logo-dark.svg"
              alt="Logo"
              width={150}
              height={28}
              className="dark:hidden"
            />
            <Image
              src="/images/logo/logo.svg"
              alt="Logo"
              width={150}
              height={28}
              className="hidden dark:block"
            />
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold text-dark dark:text-white">
              Sign in
            </h1>
            <p className="text-base text-dark-4 dark:text-dark-6">
              Enter your credentials to access your account
            </p>
          </div>

          {/* Form */}
          <Signin />
        </div>
      </div>
    </div>
  );
}
