/* Import Components */
import Navbar from "../../components/homepage-components/Navbar";
import Hero from "../../components/homepage-components/Hero";
import Stats from "../../components/homepage-components/Stats";
import About from "../../components/homepage-components/About";
import Projects from "../../components/homepage-components/Projects";
import Contact from "../../components/homepage-components/Contact";
import Footer from "../../components/homepage-components/Footer";

export default function Homepage() {
	return (
		<div className="min-h-screen overflow-x-hidden bg-[#111111] font-sans text-white">
			{/* NAVBAR */}
			<Navbar />

			{/* HERO SECTION */}
			<Hero />

			{/* STATS STRIP */}
			<Stats />
			{/* ABOUT SECTION */}
			<About />

			{/* PROJECTS SECTION */}
			<Projects />

			{/* CONTACT SECTION */}
			<Contact />

			{/* FOOTER */}
			<Footer />
		</div>
	);
}
