import React from 'react';
import ReactModal from 'react-modal';

if (typeof window !== 'undefined') ReactModal.setAppElement('#root');

const ResultModal = ({ isOpen, stats, onClose, onRetake }) => {
	return (
		<ReactModal
			isOpen={!!isOpen}
			onRequestClose={onClose}
			className="bg-white rounded-xl p-6 max-w-lg mx-auto relative shadow-xl outline-none"
			overlayClassName="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
		>
			<button onClick={onClose} className="absolute right-4 top-4 text-gray-600 hover:text-gray-800">✕</button>
			<h2 className="text-2xl font-bold mb-3">Results</h2>
			<div className="space-y-2">
				<p><b>Correct Words:</b> {stats?.correct ?? 0}</p>
				<p><b>Incorrect Words:</b> {stats?.incorrect ?? 0}</p>
				<p><b>Backspaces:</b> {stats?.backspaceCount ?? 0}</p>
				<p><b>Speed (5-char WPM):</b> {stats?.wpmByChars ?? 0}</p>
				<p><b>Speed (Space-based WPM):</b> {stats?.wpmByWords ?? 0}</p>
			</div>
			<div className="mt-4 flex justify-end gap-3">
				<button onClick={onClose} className="px-4 py-2 rounded border">Close</button>
				<button onClick={onRetake} className="px-4 py-2 rounded bg-green-600 text-white">Retake Exam</button>
			</div>
		</ReactModal>
	);
};

export default ResultModal;
