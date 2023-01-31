import React, { useState, useEffect } from 'react';

const Demo = () => {
  const [text, setText] = useState('');
  const [voices, setVoices] = useState([]);
  const [voice, setVoice] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);



  useEffect(() => {
    window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
    };
  }, []);

  const handleVoicesChanged = () => {
    setVoices(window.speechSynthesis.getVoices());
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleVoiceChange = (event) => {
    setVoice(voices.find((voice) => voice.name === event.target.value));
  };

  const handleSpeak = () => {
    setIsPlaying(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    window.speechSynthesis.speak(utterance);
    utterance.addEventListener('end', handleSpeakEnd);
  };

  const handleSpeakEnd = () => {
    setIsPlaying(false);
  };

  console.log(voice)

  return (
    <div>
      <textarea value={text} onChange={handleTextChange} />
      <select value={voice?.name || ''} onChange={handleVoiceChange}>
        <option value="">-- Select a voice --</option>
        {voices.map((voice) => (
          <option key={voice.name} value={voice.name}>
            {voice.name} ({voice.lang})
          </option>
        ))}
      </select>
      <button disabled={isPlaying || !voice} onClick={handleSpeak}>
        Speak
      </button>
    </div>
  );
};

export default Demo;