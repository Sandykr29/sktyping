import React from 'react';
import { Link } from 'react-router-dom';

const data = [
	{
		image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLxqxibkM3Anfgrw1_TIJlYeww8rNvsKLl4A&s',
		title: 'Build Speed with Regular Practice',
		text: 'Short, focused sessions produce the best gains. Paste any article and practice to see real progress.'
	},
	{
		image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToBlhI2qUO7EcHrpdiPHLlgC2CDbsMjV2xfw&s',
		title: 'Accuracy Matters',
		text: 'Focus on correctness first — speed improves naturally when accuracy is consistent.'
	},
	{
		image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-gi5pVvrdLoVqBlwXUZN0RCyInLDbdsJ5Sg&s',
		title: 'Lightweight & Fast',
		text: 'This app runs on low-spec systems. No subscriptions — paste and type instantly.'
	}
];

const Banner = ({ item, flip }) => (
	<div className={`flex items-center gap-8 my-12 ${flip ? 'flex-row-reverse' : ''} md:items-stretch`}>
		<img
			src={item.image}
			alt=""
			className="w-1/2 rounded-lg shadow-lg max-h-[420px] object-cover transform transition-transform duration-700 hover:scale-105"
		/>
		<div className="w-1/2 flex flex-col justify-center px-2 transition-opacity duration-700">
			<h3 className="text-3xl font-bold mb-3">{item.title}</h3>
			<p className="text-gray-700">{item.text}</p>
			<Link to="/typing" className="inline-block mt-4 bg-indigo-600 text-white px-4 py-2 rounded">Start Typing</Link>
		</div>
	</div>
);

const Home = () => {
	return (
		<div className="max-w-6xl mx-auto p-6">
			<header className="text-center py-12">
				<h1 className="text-4xl font-bold">Welcome to Vibetype</h1>
				<p className="text-gray-600 mt-2">Practice typing any content — fast, free and lightweight.</p>
			</header>

			{data.map((d, i) => <Banner key={i} item={d} flip={i % 2 === 1} />)}
		</div>
	);
};

export default Home;
