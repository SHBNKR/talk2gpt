/*
import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
import gpt_logo_black from "../assets/chatgpt.png";
import mic from "../assets/mic.png";
import mic_mute from "../assets/mic_mute.png";

function SpeechRecognitionComponent({onTranscriptChange}) {

    const [isListening, setIsListening] = useState(false); // Variable zum Steuern des Spracherkennungsprozesses

    const {
        transcript,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (isListening) {
            SpeechRecognition.startListening({continuous: true});
        } else {
            SpeechRecognition.stopListening();
        }
    }, [isListening])

    useEffect(() => {
        if (transcript && onTranscriptChange) {
            onTranscriptChange(transcript);
        }
    }, [transcript, onTranscriptChange]);

    if (!browserSupportsSpeechRecognition) {
        return <span>Dein Browser unterstützt die Spracherkennung nicht.</span>;
    }

    const startListening = () => {
        setIsListening(true);
     //   SpeechRecognition.startListening({continuous: true});
    };

    const stopListening = () => {
        setIsListening(false);
        SpeechRecognition.stopListening();
    };

    return (

        <div>
            <p>Microphone: {isListening ? <img src={mic} width={'30px'} height={'30px'} alt={"."}/> :
                <img src={mic_mute} width={'30px'} height={'30px'} alt={"."}/>}  </p>

            <button onClick={startListening}>Start</button>
            <button onClick={stopListening}>Stop</button>
            <button onClick={resetTranscript}>Reset</button>
        </div>
    );
}

export default SpeechRecognitionComponent;
*/
