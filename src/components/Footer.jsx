import React from 'react';

const Footer = () => {
	return (
		<footer className="w-full bg-white border-t mt-8">
			<div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center p-6 text-sm text-gray-700">
				<div>© {new Date().getFullYear()} Sandeep Kumar. All rights reserved.</div>
				<div className="flex items-center gap-4 mt-3 md:mt-0">
					<a href="https://instagram.com/sandykr29" target="_blank" rel="noreferrer" className="flex items-center gap-2">
						{/* instagram svg */}<svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 6.5A4.5 4.5 0 1016.5 13 4.5 4.5 0 0012 8.5zm5.5-.9a1.1 1.1 0 11-1.1-1.1 1.1 1.1 0 011.1 1.1z"/></svg>
						<span>@sandykr29</span>
					</a>
					<a href="https://wa.me/8574357192" target="_blank" rel="noreferrer" className="flex items-center gap-2">
						{/* whatsapp svg */}<svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 3.5A11 11 0 0012 1a11 11 0 00-9.9 14.3L1 23l7.9-1.9A11 11 0 0020.5 3.5zM12 19.2a8.9 8.9 0 01-4.6-1.3l-.3-.2-4.7 1.1 1.1-4.6-.2-.3A8.9 8.9 0 1112 19.2z"/><path d="M17.4 14.4c-.3-.2-2-.9-2.3-1-.3-.1-.6-.2-.8.2s-.9 1-.9 1c-.2.3-.4.4-.7.4-.2 0-.5 0-.8-.3-.9-.6-3-1.8-3-3.9 0-2.2 1.6-3.9 1.8-4.2.2-.3.1-.5 0-.7-.1-.2-.8-2-1.1-2.7-.3-.7-.6-.6-.8-.6-.2 0-.5 0-.8 0-.3 0-.7.1-1 .4-.3.3-1.2 1.2-1.2 3s1.3 3.5 1.5 3.7c.2.3 2.6 4 6.2 5.6 3.6 1.6 3.6 1 4.2.9.6-.1 2-1 2.3-2.1.3-1.1.3-2.1.2-2.3-.1-.2-.3-.3-.6-.5z"/></svg>
						<span>8574357192</span>
					</a>
					<a href="mailto:sandeepkumar29774@yahoo.com" className="flex items-center gap-2">
						{/* mail svg */}<svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
						<span>sandeepkumar29774@yahoo.com</span>
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
