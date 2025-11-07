import React from 'react';

const About = () => {
	return (
		<div className="max-w-4xl mx-auto p-6">
			<div className="flex items-center gap-6">
				<img src="/sandeep-logo.jpg" alt="Sandeep" className="w-28 h-28 rounded-full" />
				<div>
					<h2 className="text-2xl font-bold">About Sandeep Kumar</h2>
					<p className="text-gray-700 mt-2">
						I'm Sandeep Kumar, a candidate for the UPSSSC PET exam. Many sites charge for typing content;
						I built this lightweight app so people can paste any topic and practice for free — "aapda me avasar".
					</p>
				</div>
			</div>
		</div>
	);
};

export default About;
