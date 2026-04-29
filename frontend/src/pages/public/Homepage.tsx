import Navbar from "../../components/homepage-components/Navbar";
import Footer from "../../components/homepage-components/Footer";
import Hero from "../../components/homepage-components/Hero";
import About from "../../components/homepage-components/About";
import Contact from "../../components/homepage-components/Contact";
import Services from "../../components/homepage-components/Services";
import Process from "../../components/homepage-components/Process";
import Differentiator from "../../components/homepage-components/Differentiator";

export default function Homepage() {
	return (
		<>
			<title>RJS Homes - Home</title>
			<div className="min-h-screen overflow-x-hidden bg-[#eef3f6] text-[#1b242d]">
				<Navbar />
				<Hero />

				<Services />

				<Differentiator />

				<Process />

				<About />

				<Contact />

				<Footer />
			</div>
		</>
	);
}
