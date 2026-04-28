/* Import Components */
import Navbar from "../../components/homepage-components/Navbar";
import Hero from "../../components/homepage-components/Hero.tsx";
import Stats from "../../components/homepage-components/Stats.tsx";
import About from "../../components/homepage-components/About.tsx";
import ServicesPreview from "../../components/homepage-components/ServicesPreview.tsx";
import Projects from "../../components/homepage-components/Projects.tsx";
import Contact from "../../components/homepage-components/Contact.tsx";
import Footer from "../../components/homepage-components/Footer.tsx";

export default function Homepage() {
	return (
		<>
			<title>RJS Homes - Home</title>
			<div className="min-h-screen overflow-x-hidden bg-[radial-gradient(120%_80%_at_50%_0%,#182d43_0%,#0a1320_45%,#060b14_100%)] font-sans text-white">
				{/* NAVBAR */}
				<Navbar />

				{/* HERO SECTION */}
				<Hero />

				{/* STATS STRIP */}
				<Stats />
				{/* ABOUT SECTION */}
				<About />

				{/* SERVICES PREVIEW SECTION */}
				<ServicesPreview />

				{/* PROJECTS SECTION */}
				<Projects />

				{/* CONTACT SECTION */}
				<Contact />

				{/* FOOTER */}
				<Footer />
			</div>
		</>
	);
}
