import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	setMode, setText, setInput, setTime, decrementTime,
	startTyping, completeTyping, incrementBackspace,
	setStats, stopTyping, reset
} from '../store';
import { Timer, Globe } from 'lucide-react';
import ResultModal from '../components/ResultModal';

const Typing = () => {
	const dispatch = useDispatch();
	const { mode, text, input, time, timeLeft, started, completed, stats, backspaceCount } = useSelector((s) => s.typing);
	const [showResultsModal, setShowResultsModal] = useState(false);

	useEffect(() => {
		if (started && !completed && timeLeft > 0) {
			const timer = setTimeout(() => dispatch(decrementTime()), 1000);
			return () => clearTimeout(timer);
		} else if (started && !completed && timeLeft === 0) {
			handleSubmit();
		}
	}, [started, timeLeft, completed]);

	useEffect(() => {
		const saved = localStorage.getItem('typingText');
		if (saved) dispatch(setText(saved));
	}, [dispatch]);

	const handlePaste = (e) => {
		const pasted = e.target.value;
		dispatch(setText(pasted));
		localStorage.setItem('typingText', pasted);
	};

	const handleClearPaste = () => {
		dispatch(setText(''));
		localStorage.removeItem('typingText');
	};

	const handleChange = (e) => {
		const val = e.target.value;
		if (val.length < input.length) dispatch(incrementBackspace());
		if (!started) dispatch(startTyping());
		dispatch(setInput(val));
	};

	const handleSubmit = () => {
		dispatch(completeTyping());
		dispatch(stopTyping());
		setShowResultsModal(true);

		const originalWords = text.trim().length ? text.trim().split(/\s+/) : [];
		const typedRaw = input;
		const typedWords = typedRaw.trim().length ? typedRaw.trim().split(/\s+/) : [];

		let correct = 0;
		let incorrect = 0;
		originalWords.forEach((word, i) => {
			if (typedWords[i] && word === typedWords[i]) correct++;
			else if (typedWords[i]) incorrect++;
		});

		const totalChars = input.length;
		const elapsedSeconds = (time * 60) - timeLeft;
		const safeElapsedMinutes = (elapsedSeconds > 0) ? (elapsedSeconds / 60) : (1 / 60);
		const wpmByChars = Math.round((totalChars / 5) / safeElapsedMinutes);
		const wpmByWords = Math.round((typedWords.length) / safeElapsedMinutes);

		dispatch(setStats({ correct, incorrect, backspaceCount, wpmByChars, wpmByWords }));
	};

	const handleRetake = () => {
		dispatch(reset());
		setShowResultsModal(false);
	};

	const renderWords = () => {
		if (!text.trim()) return null;
		const originalWords = text.trim().split(/\s+/);
		const parts = input.split(' ');
		const hasTrailingSpace = input.endsWith(' ');
		const hasAnyText = input.trim().length > 0;
		const currentIndex = (!hasTrailingSpace && hasAnyText) ? parts.length - 1 : -1;

		return originalWords.map((word, i) => {
			let className = 'text-gray-600 px-1';
			if (i < parts.length - 1) {
				const typed = parts[i] || '';
				className = typed === word ? 'text-green-600 px-1' : 'text-red-600 px-1';
			} else if (i === currentIndex) {
				className = 'bg-yellow-500 text-black rounded px-1';
			}
			return <span key={i} className={className}>{word} </span>;
		});
	};

	return (
		<div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-4 my-6">
			<div className={`${(completed || showResultsModal) ? 'opacity-40 pointer-events-none' : ''}`}>
				<div className="flex justify-between items-center mb-3">
					<div className="flex gap-2 items-center">
						<Globe className="text-blue-600" />
						<select value={mode} onChange={(e) => dispatch(setMode(e.target.value))} className="border rounded p-1">
							<option value="english">English</option>
							<option value="krutidev">KrutiDev 010</option>
						</select>
					</div>
					<div className="flex gap-2 items-center">
						<Timer className="text-red-600" />
						<select value={time} onChange={(e) => dispatch(setTime(+e.target.value))} className="border rounded p-1">
							{[2, 3, 5, 10, 15].map(t => <option key={t} value={t}>{t} min</option>)}
						</select>
					</div>
				</div>

				<div className="mb-4">
					<div className="flex gap-2 items-start">
						<textarea
							placeholder="Paste your paragraph here..."
							value={text}
							onChange={handlePaste}
							className="flex-1 border rounded-lg p-3 h-32 font-mono"
						/>
						<button onClick={handleClearPaste} className="self-start bg-red-500 text-white px-3 py-1 rounded ml-2">Clear</button>
					</div>
				</div>

				<div className="border rounded-lg p-3 mb-4 min-h-[120px] bg-[#fafafa] leading-relaxed text-justify">
					{renderWords()}
				</div>

				<textarea
					placeholder="Start typing here..."
					value={input}
					onChange={handleChange}
					disabled={completed}
					className={`w-full border rounded-lg p-3 h-40 font-mono focus:outline-none ${mode === 'krutidev' ? 'font-[KrutiDev010]' : ''}`}
				/>

				<div className="flex justify-between mt-4 items-center">
					<div className="text-lg text-[#1a237e] font-semibold">Time Left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</div>
					<div className="flex gap-2">
						<button onClick={handleSubmit} className="bg-[#1a237e] text-white px-4 py-2 rounded-lg hover:bg-blue-900">Submit</button>
						<button onClick={() => { dispatch(reset()); }} className="bg-gray-200 px-4 py-2 rounded-lg">Reset</button>
					</div>
				</div>
			</div>

			<ResultModal isOpen={showResultsModal && completed && !!stats} stats={stats} onClose={() => setShowResultsModal(false)} onRetake={handleRetake} />
		</div>
	);
};

export default Typing;
