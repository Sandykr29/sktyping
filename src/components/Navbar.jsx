import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
	const [scrolled, setScrolled] = useState(false);
	const location = useLocation();

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 20);
		window.addEventListener('scroll', onScroll);
		onScroll();
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	// contrast aware classes
	const textClass = scrolled ? 'text-white' : 'text-gray-900';
	const linkBase = 'px-3 py-1 rounded transition-colors duration-200';
	const activeBg = scrolled ? 'bg-white/20' : 'bg-gray-200/30';
	const hoverBg = scrolled ? 'hover:bg-white/10' : 'hover:bg-gray-100';

	return (
		<motion.nav
			initial={{ y: -10, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.4 }}
			className={`fixed top-0 left-0 w-full z-40 transition-colors duration-300 ${scrolled ? 'bg-gradient-to-r from-indigo-600 to-pink-500 shadow' : 'bg-transparent'}`}
		>
			<div className={`max-w-6xl mx-auto flex items-center justify-between p-3 ${scrolled ? '' : ''}`}>
				<Link to="/" className="flex items-center gap-3">
					<img
						src="/sandeep-logo.jpg"
						alt="SKT"
						className={`w-10 h-10 rounded-full p-1 ${scrolled ? 'bg-white shadow-sm' : 'bg-white/90 shadow-sm'}`}
					/>
					<div className={`font-bold text-lg ${textClass}`}>SKT</div>
				</Link>

				<div className="space-x-4">
					<Link to="/typing" className={`${linkBase} ${textClass} ${location.pathname === '/typing' ? activeBg : hoverBg}`}>
						Typing
					</Link>
					<Link to="/about" className={`${linkBase} ${textClass} ${location.pathname === '/about' ? activeBg : hoverBg}`}>
						About
					</Link>
					<Link to="/contact" className={`${linkBase} ${textClass} ${location.pathname === '/contact' ? activeBg : hoverBg}`}>
						Contact
					</Link>
				</div>
			</div>
		</motion.nav>
	);
};

export default Navbar;
