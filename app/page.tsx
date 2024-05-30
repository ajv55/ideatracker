import Action from "./components/mainPage/action";
import Contact from "./components/mainPage/contact";
import Features from "./components/mainPage/features";
import Footer from "./components/mainPage/footer";
import Header from "./components/mainPage/header";
import How from "./components/mainPage/how";
import Nav from "./components/mainPage/nav";


export default function Home() {
  return (
    <div className="w-full relative flex flex-col justify-center items-center">
      <Nav />
      <Header />
      <Features />
      <How />
      <Action />
      <Contact />
      <Footer />
    </div>
  );
}
