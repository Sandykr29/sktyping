import React from 'react';

const Contact = () => {
	return (
		<div className="max-w-4xl mx-auto p-6">
			<h2 className="text-2xl font-bold mb-4">Contact</h2>
			<p className="text-gray-700 mb-4">Reach out for suggestions, feature requests or feedback — I keep improving this app.</p>

			<ul className="space-y-3 text-gray-800">
				<li><strong>Instagram:</strong> <a className="text-blue-600" href="https://instagram.com/sandykr29" target="_blank" rel="noreferrer">@sandykr29</a></li>
				<li><strong>WhatsApp:</strong> <a className="text-green-600" href="https://wa.me/8574357192" target="_blank" rel="noreferrer">+91 8574357192</a></li>
				<li><strong>Email:</strong> <a className="text-red-600" href="mailto:sandeepkumar29774@yahoo.com">sandeepkumar29774@yahoo.com</a></li>
			</ul>
		</div>
	);
};

export default Contact;
