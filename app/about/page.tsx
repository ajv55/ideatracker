'use client';
import { motion } from "framer-motion"
import Nav from "../components/mainPage/nav";
import AboutHeader from "../components/aboutComponent/aboutHeader";
import AboutInfo from "../components/aboutComponent/aboutInfo";
import AboutExtra from "../components/aboutComponent/aboutExtra";
import Footer from "../components/mainPage/footer";

export default function page() {
  return (
    <>
    <Nav />
    <main className="w-full   ">
      <section className="mb-12 ">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className=" bg-gradient-to-br from-slate-950 via-slate-700 to-slate-950 w-full flex flex-col justify-center items-center lg:h-[25rem] h-[28rem] "
        >
          <h2 className="lg:text-6xl text-4xl  text-white font-bold mb-4 lg:mt-10 mt-28">About IdeaTracker+</h2>
          <p className="text-gray-100 w-[85%] lg:text-xl text-md text-center text-balance leading-relaxed">
          Welcome to IdeaTracker+, the ultimate tool for capturing, organizing, and managing your ideas effortlessly. Whether you&#39;re an entrepreneur, a creative professional, a student, or just someone who loves brainstorming, IdeaTracker+ is designed to help you keep track of your thoughts and turn them into reality.
          </p>
        </motion.div>
      </section>
      <AboutHeader />
      <AboutInfo />
      <AboutExtra />
      <Footer />
    </main>
  </>
  )
}
