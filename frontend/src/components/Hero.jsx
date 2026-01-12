import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext.jsx";
import heroImg from "../assets/heroImg.png";
import pulseCheckLogo from "../assets/pulseCheck_logo.png";
import {
  Timer,
  Bell,
  BarChart3,
  Globe,
  LayoutDashboard,
  Zap,
  Mail,
  Github,
  Linkedin,
} from "lucide-react";

export default function Hero() {
  const { authUser } = useContext(AuthContext);

  return (
    <>
      <div className="min-h-screen bg-hero-gradient text-gray-900 relative overflow-hidden">
        {/* NAVBAR */}
        <nav className="top-0 left-0 right-0 z-10 bg-transparent">
          <div className="max-w-292.5 mx-auto px-6 py-5 flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              PulseCheck
            </h1>
            {authUser ? (
              <Link
                to="/monitors"
                className="inline-flex items-center justify-center py-2 px-6 rounded-lg font-semibold border-2 border-blue-500 bg-blue-500 text-white hover:bg-blue-600 transition-shadow shadow-md"
              >
                My Dashboard
              </Link>
            ) : (
              <Link
                to="/signup"
                className="inline-flex items-center justify-center py-2 px-6 rounded-lg font-semibold border-2 border-white bg-white text-gray-900 hover:bg-gray-100 transition-shadow shadow-md"
              >
                Get Started
              </Link>
            )}
          </div>
        </nav>

        {/* HERO SECTION */}
        <div className="max-w-292.5 mx-auto pt-32 md:pt-36 flex flex-col-reverse md:flex-row items-center justify-between gap-12 px-6">
          {/* Left Side */}
          <div className="md:w-1/2 flex flex-col gap-6">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
              Effortless Website & API Monitoring
            </h1>
            <p className="text-gray-700 text-lg md:text-xl">
              PulseCheck keeps your services online with real-time alerts,
              uptime analytics, and detailed insights. Monitor, analyze, and
              optimize all from one place.
            </p>
          </div>

          {/* Right Side */}
          <div className="md:w-1/2 flex justify-center relative">
            <div className="relative">
              {/* subtle floating glow */}
              <div className="absolute -top-10 -left-10 w-100 h-100 bg-purple-300 rounded-full opacity-30 blur-3xl"></div>
              <div className="absolute -bottom-10 -right-10 w-75 h-75 bg-pink-300 rounded-full opacity-30 blur-3xl"></div>

              <img
                src={heroImg}
                alt="hero-image"
                className="relative w-full max-w-125 h-auto rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* FEATURE SECTION */}
      <div className="bg-[#FAFBFC]">
        <div className="max-w-292.5 mx-auto px-6 py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What PulseCheck Does
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition cursor-pointer">
              <Timer
                size={36}
                strokeWidth={1.5}
                className="mb-4 text-indigo-600"
              />

              <h3 className="text-xl font-semibold mb-2">
                Real-Time Monitoring
              </h3>
              <p className="text-gray-700 text-sm">
                Track your website and API uptime 24/7 so you never miss
                downtime.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition cursor-pointer">
              <Bell
                size={36}
                strokeWidth={1.5}
                className="mb-4 text-indigo-600"
              />

              <h3 className="text-xl font-semibold mb-2">Instant Alerts</h3>
              <p className="text-gray-700 text-sm">
                Get notifications immediately if your site or API goes down.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition cursor-pointer">
              <BarChart3
                size={36}
                strokeWidth={1.5}
                className="mb-4 text-indigo-600"
              />

              <h3 className="text-xl font-semibold mb-2">Detailed Analytics</h3>
              <p className="text-gray-700 text-sm">
                View performance trends, response times, and historical data
                easily.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition cursor-pointer">
              <Globe
                size={36}
                strokeWidth={1.5}
                className="mb-4 text-indigo-600"
              />

              <h3 className="text-xl font-semibold mb-2">
                Multi-Website Support
              </h3>
              <p className="text-gray-700 text-sm">
                Monitor multiple websites or APIs all from a single dashboard.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition cursor-pointer">
              <LayoutDashboard
                size={36}
                strokeWidth={1.5}
                className="mb-4 text-indigo-600"
              />

              <h3 className="text-xl font-semibold mb-2">Custom Dashboards</h3>
              <p className="text-gray-700 text-sm">
                Organize your monitoring data the way you want for better
                insights.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition cursor-pointer">
              <Zap
                size={36}
                strokeWidth={1.5}
                className="mb-4 text-indigo-600"
              />

              <h3 className="text-xl font-semibold mb-2">
                Reliable API Checks
              </h3>
              <p className="text-gray-700 text-sm">
                Ensure your APIs are always performing as expected with
                confidence.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER SECTION  */}
      <footer className="footer footer-horizontal footer-center bg-black text-primary-content p-7">
        <aside className="flex flex-col gap-2 items-center">
          <img src={pulseCheckLogo} alt="logo" className="h-19 w-auto" />
          <p className="font-bold">Built by Tejas Birla</p>
          <p className="text-sm text-gray-400">
            Monitor. Alert. Analyze. Stay online.
          </p>
        </aside>
        <nav>
          <div className="grid grid-flow-col gap-5 text-[24px]">
            {/* Email */}
            <a
              target="_blank"
              rel="noreferrer"
              href="mailto:tejasbirla3@gmail.com"
              className="transition-colors duration-200 text-gray-400 hover:text-[#D44638]"
            >
              <Mail />
            </a>

            {/* GitHub */}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/TejasBirla"
              className="transition-colors duration-200 text-gray-400 hover:text-[#181717]"
            >
              <Github />
            </a>

            {/* LinkedIn */}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.linkedin.com/in/tejas-birla"
              className="transition-colors duration-200 text-gray-400 hover:text-[#0A66C2]"
            >
              <Linkedin />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://tejasbirla-portfolio.vercel.app"
              className="transitio-colors duration-200 text-gray-400 hover:text-green-500"
            >
              <Globe />
            </a>
          </div>
        </nav>
      </footer>
    </>
  );
}
