import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMode, setText, setInput, setTime, decrementTime, startTyping, completeTyping, incrementBackspace, setStats, stopTyping, reset } from './store';
import { Timer, Globe } from 'lucide-react';

const App = () => {
  const dispatch = useDispatch();
  const { mode, text, input, time, timeLeft, started, completed, stats, backspaceCount } = useSelector((s) => s.typing);
  const [currentPage, setCurrentPage] = useState('typing'); // 'typing' | 'about' | 'contact'
  const [showResultsModal, setShowResultsModal] = useState(false);

  useEffect(() => {
    // only run timer if started, not completed and time remains
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
  }, []);

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
    // count any deletions as backspaces
    if (val.length < input.length) {
      dispatch(incrementBackspace());
    }
    if (!started) dispatch(startTyping());
    dispatch(setInput(val));
  };

  const handleSubmit = () => {
    // stop timer and mark completed
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
    const safeElapsedMinutes = (elapsedSeconds > 0) ? (elapsedSeconds / 60) : (1/60); // avoid divide by zero
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

      // finalized words: indices less than parts.length - 1
      if (i < parts.length - 1) {
        const typed = parts[i] || '';
        className = typed === word ? 'text-green-600 px-1' : 'text-red-600 px-1';
      } else if (i === currentIndex) {
        // current word being typed (highlight dark yellow)
        className = 'bg-yellow-500 text-black rounded px-1';
      }

      return <span key={i} className={className}>{word} </span>;
    });
  };

  // Simple SVG icons used in About/Contact/footer
  const InstagramSVG = () => (
    <svg className="w-5 h-5 inline-block mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 6.5A4.5 4.5 0 1016.5 13 4.5 4.5 0 0012 8.5zm5.5-.9a1.1 1.1 0 11-1.1-1.1 1.1 1.1 0 011.1 1.1z"/></svg>
  );
  const WhatsAppSVG = () => (
    <svg className="w-5 h-5 inline-block mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 3.5A11 11 0 0012 1a11 11 0 00-9.9 14.3L1 23l7.9-1.9A11 11 0 0020.5 3.5zM12 19.2a8.9 8.9 0 01-4.6-1.3l-.3-.2-4.7 1.1 1.1-4.6-.2-.3A8.9 8.9 0 1112 19.2z"/><path d="M17.4 14.4c-.3-.2-2-.9-2.3-1-.3-.1-.6-.2-.8.2s-.9 1-.9 1c-.2.3-.4.4-.7.4-.2 0-.5 0-.8-.3-.9-.6-3-1.8-3-3.9 0-2.2 1.6-3.9 1.8-4.2.2-.3.1-.5 0-.7-.1-.2-.8-2-1.1-2.7-.3-.7-.6-.6-.8-.6-.2 0-.5 0-.8 0-.3 0-.7.1-1 .4-.3.3-1.2 1.2-1.2 3s1.3 3.5 1.5 3.7c.2.3 2.6 4 6.2 5.6 3.6 1.6 3.6 1 4.2.9.6-.1 2-1 2.3-2.1.3-1.1.3-2.1.2-2.3-.1-.2-.3-.3-.6-.5z"/></svg>
  );
  const MailSVG = () => (
    <svg className="w-5 h-5 inline-block mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
  );

  // About content (personal, English, as requested)
  const AboutContent = () => (
    <div className="prose max-w-none text-gray-800">
      <h2 className="text-2xl font-bold">About Sandeep Kumar</h2>
      <p>
        I'm Sandeep Kumar, a candidate for the UPSSSC PET exam. I noticed many websites charging for typing practice content and subscriptions.
        Instead of buying those services, I built this lightweight typing site so anyone can paste topics from the web and start typing instantly.
        It's simple, fast and runs smoothly on low-spec systems — in Hindi we say "aapda me avasar" — turning constraints into opportunities.
        I keep this project personal and continuously improve it based on feedback.
      </p>
    </div>
  );

  const ContactContent = () => (
    <div className="text-gray-800 space-y-4">
      <h2 className="text-2xl font-bold">Contact</h2>
      <p>Reach out for suggestions, feature requests or feedback.</p>
      <div className="space-y-2">
        <div>
          <InstagramSVG />
          <a href="https://instagram.com/sandykr29" target="_blank" rel="noreferrer" className="text-blue-600">@sandykr29</a>
        </div>
        <div>
          <WhatsAppSVG />
          <a href="https://wa.me/8574357192" target="_blank" rel="noreferrer" className="text-green-600">+91 8574357192</a>
        </div>
        <div>
          <MailSVG />
          <a href="mailto:sandeepkumar29774@yahoo.com" className="text-red-600">sandeepkumar29774@yahoo.com</a>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f4f6fa] flex flex-col items-center p-6 font-sans">
      {/* Navbar */}
      <nav className="w-full max-w-4xl flex items-center justify-between bg-gradient-to-r from-indigo-600 to-pink-500 text-white rounded-xl p-3 mb-6 shadow">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white text-indigo-700 font-bold rounded-full flex items-center justify-center">SKT</div>
          <div className="text-lg font-semibold">vibetype</div>
        </div>
        <div className="space-x-4">
          <button onClick={() => setCurrentPage('typing')} className={`px-3 py-1 rounded ${currentPage==='typing' ? 'bg-white/20' : 'hover:bg-white/10'}`}>Typing</button>
          <button onClick={() => setCurrentPage('about')} className={`px-3 py-1 rounded ${currentPage==='about' ? 'bg-white/20' : 'hover:bg-white/10'}`}>About</button>
          <button onClick={() => setCurrentPage('contact')} className={`px-3 py-1 rounded ${currentPage==='contact' ? 'bg-white/20' : 'hover:bg-white/10'}`}>Contact</button>
        </div>
      </nav>

      {/* Page content */}
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-4">
        {currentPage !== 'typing' ? (
          <div className="p-6">
            {currentPage === 'about' && <AboutContent />}
            {currentPage === 'contact' && <ContactContent />}
            {/* Footer in About/Contact */}
            <footer className="mt-8 border-t pt-4 text-sm text-gray-600 flex justify-between">
              <div>© {new Date().getFullYear()} Sandeep Kumar</div>
              <div className="space-x-4">
                <a href="https://instagram.com/sandykr29" target="_blank" rel="noreferrer" className="hover:underline">Instagram</a>
                <a href="mailto:sandeepkumar29774@yahoo.com" className="hover:underline">Email</a>
              </div>
            </footer>
          </div>
        ) : (
          <>
            {/* interactive area: dim when completed */}
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
                    {[2,3,5,10,15].map(t => <option key={t} value={t}>{t} min</option>)}
                  </select>
                </div>
              </div>

              <div className="relative">
                <textarea
                  placeholder="Paste your paragraph here..."
                  value={text}
                  onChange={handlePaste}
                  className="w-full border rounded-lg p-3 h-32 mb-2 font-mono"
                />
                <button onClick={handleClearPaste} className="absolute right-2 top-2 bg-red-500 text-white px-3 py-1 rounded">Clear</button>
              </div>

              <div className="border rounded-lg p-3 mb-4 min-h-[100px] bg-[#fafafa] leading-relaxed text-justify">
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
                <div className="text-lg text-[#1a237e] font-semibold">Time Left: {Math.floor(timeLeft/60)}:{String(timeLeft%60).padStart(2,'0')}</div>
                <div className="flex gap-2">
                  <button onClick={handleSubmit} className="bg-[#1a237e] text-white px-4 py-2 rounded-lg hover:bg-blue-900">Submit</button>
                  <button onClick={() => { dispatch(reset()); }} className="bg-gray-200 px-4 py-2 rounded-lg">Reset</button>
                </div>
              </div>
            </div>

            {/* small motivating animated area under typing (simple tailwind animation) */}
            <div className="mt-4 p-4 rounded-lg bg-gradient-to-r from-yellow-100 to-rose-100 text-center animate-pulse">
              <div className="text-xl font-bold text-amber-700">Practice makes progress — Type to improve your speed and accuracy!</div>
              <div className="text-sm text-gray-600 mt-2">Lightweight, free and runs on low-spec systems — paste any content and start typing.</div>
            </div>

            {/* footer for home */}
            <footer className="mt-6 border-t pt-4 text-sm text-gray-600 flex justify-between items-center">
              <div>© {new Date().getFullYear()} Sandeep Kumar</div>
              <div className="flex items-center gap-4">
                <a href="https://instagram.com/sandykr29" target="_blank" rel="noreferrer" className="flex items-center gap-2">
                  <InstagramSVG />@sandykr29
                </a>
                <a href="https://wa.me/8574357192" target="_blank" rel="noreferrer" className="flex items-center gap-2">
                  <WhatsAppSVG />8574357192
                </a>
                <a href="mailto:sandeepkumar29774@yahoo.com" className="flex items-center gap-2">
                  <MailSVG />sandeepkumar29774@yahoo.com
                </a>
              </div>
            </footer>
          </>
        )}
      </div>

      {/* Results Modal */}
      {showResultsModal && completed && stats && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-40" onClick={() => setShowResultsModal(false)} />
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg p-6 z-10">
            <button onClick={() => setShowResultsModal(false)} className="absolute right-3 top-3 text-gray-600 hover:text-gray-800">✕</button>
            <h2 className="text-2xl font-bold mb-3">Results</h2>
            <div className="space-y-2">
              <p><b>Correct Words:</b> {stats.correct}</p>
              <p><b>Incorrect Words:</b> {stats.incorrect}</p>
              <p><b>Backspaces:</b> {stats.backspaceCount}</p>
              <p><b>Speed (5-char WPM):</b> {stats.wpmByChars}</p>
              <p><b>Speed (Space-based WPM):</b> {stats.wpmByWords}</p>
            </div>
            <div className="mt-4 flex justify-end gap-3">
              <button onClick={() => setShowResultsModal(false)} className="px-4 py-2 rounded border">Close</button>
              <button onClick={handleRetake} className="px-4 py-2 rounded bg-green-600 text-white">Retake Exam</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;