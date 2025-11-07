import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Typing from './pages/Typing';
import About from './pages/About';
import Contact from './pages/Contact';

const App = () => {
	return (
		<Router>
			<div className="min-h-screen bg-[#f4f6fa] flex flex-col">
				<Navbar />
				<main className="flex-1 pt-20">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/typing" element={<Typing />} />
						<Route path="/about" element={<About />} />
						<Route path="/contact" element={<Contact />} />
					</Routes>
				</main>
				<Footer />
			</div>
		</Router>
	);
};

export default App;