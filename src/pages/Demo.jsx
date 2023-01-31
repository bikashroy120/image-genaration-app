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



const options = [
  { value: 'Afrikaans', label: 'Afrikaans' },
  { value: 'Akan', label: 'Akan' },
  { value: 'Albanian', label: 'Albanian' },
  { value: 'Amharic', label: 'Amharic' },
  { value: 'Arabic', label: 'Arabic' },
  { value: 'Armenian', label: 'Armenian' },
  { value: 'Assamese', label: 'Assamese' },
  { value: 'Aymara', label: 'Aymara' },
  { value: 'Azerbaijani', label: 'Azerbaijani' },
  { value: 'Bambara', label: 'Bambara' },
  { value: 'Bangla', label: 'Bangla' },
  { value: 'Basque', label: 'Basque' },
  { value: 'Belarusian', label: 'Belarusian' },
  { value: 'Bhojpuri', label: 'Bhojpuri' },
  { value: 'Bosnian', label: 'Bosnian' },
  { value: 'Bulgarian', label: 'Bulgarian' },
  { value: 'Burmese', label: 'Burmese' },
  { value: 'Catalan', label: 'Catalan' },
  { value: 'Cebuano', label: 'Cebuano' },
  { value: 'Corsican', label: 'Corsican' },
  { value: 'Croatian', label: 'Croatian' },
  { value: 'Czech', label: 'Czech' },
  { value: 'Danish', label: 'Danish' },
  { value: 'Divehi', label: 'Divehi' },
  { value: 'Dogri', label: 'Dogri' },
  { value: 'English', label: 'English' },
  { value: 'Esperanto', label: 'Esperanto' },
  { value: 'Finnish', label: 'Finnish' },
  { value: 'French', label: 'French' },
  { value: 'Guarani', label: 'Guarani' },
  { value: 'Nepali', label: 'Nepali' },
  { value: 'Hindi', label: 'Hindi' },
];


const datasss = [
  {   default:false,
      lang:"en-GB",
      localService:false,
      name:"Google UK English Female",
      voiceURI:"Google UK English Female",
  },
  {   default:false,
      lang:"es-ES",
      localService:false,
      name:"Google español",
      voiceURI:"Google español",
  },
  {   default:false,
      lang:"fr-FR",
      localService:false,
      name:"Google français",
      voiceURI:"Google français",
  },
  {   default:false,
      lang:"hi-IN",
      localService:false,
      name:"Google हिन्दी",
      voiceURI:"Google हिन्दी",
  },
  // {   default:false,
  //     lang:"bn-BN",
  //     localService:false,
  //     name:"Google Bengali",
  //     voiceURI:"Google Bengali",
  //     title:"Bangla"
  // },
]
