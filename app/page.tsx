import ContactSection from "./components/ContactSection";
import Gallery from "./components/Gallery";
import Hero from "./components/Hero";
import Reviews from "./components/Reviews";
import Services from "./components/Services";

export default function Home() {
	return (
		<main>
			<Hero />
			<Services />
			<Gallery />
			<section id="reviews">
				<Reviews />
			</section>
			<section id="contacts">
				<ContactSection />
			</section>
		</main>
	)
}
