import * as Tone from "tone";

let lastX = 0;
let lastY = 0;
let lastTime = Date.now();
let bpm = 100; // 기본 BPM
let targetBPM = bpm; // 목표 BPM (점진적인 변경을 위해 필요)
const bpmSmoothingFactor = 0.1; // BPM 변화 속도 조절 (값이 작을수록 부드러움)
const minBPM = 80;
const maxBPM = 130;
let isPlaying = false;
let currentMelody = [];
let setNotesOnScreenRef = null;
let currentPlaybackTime = 0;
let nextNoteTime = 0;

// 마우스 속도 감지 및 BPM 조절 (점진적 변화 적용)
function updateBPM(event) {
    if (!isPlaying) return;

    const now = Date.now();
    const deltaTime = now - lastTime;

    if (deltaTime > 0) {
        const dx = event.clientX - lastX;
        const dy = event.clientY - lastY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // 마우스 속도를 80~130 BPM 범위로 조절
        targetBPM = Math.min(maxBPM, Math.max(minBPM, (distance / deltaTime) * 600));
        console.log(`🎵 Target BPM: ${Math.round(targetBPM)}`);

        lastX = event.clientX;
        lastY = event.clientY;
        lastTime = now;
    }
}

// BPM 변화가 서서히 적용되도록 스무딩 처리
function smoothBPMUpdate() {
    bpm += (targetBPM - bpm) * bpmSmoothingFactor;
    Tone.Transport.bpm.value = bpm;
    setTimeout(smoothBPMUpdate, 100); // 🔄 100ms마다 BPM 업데이트
}

smoothBPMUpdate(); // BPM 스무딩 시작

// 마우스 이벤트 리스너 등록
// window.addEventListener("mousemove", updateBPM);
export async function playMelody(melody, setNotesOnScreen, bpm = 120) {
    if (!melody || melody.length === 0) {
        alert("재생할 멜로디가 없습니다!");
        return;
    }
    
    Tone.Transport.stop();
    Tone.Transport.cancel();
    Tone.context.resume();
    isPlaying = false;

    isPlaying = true;
    setNotesOnScreenRef = setNotesOnScreen;
    currentPlaybackTime = 0;

    await Tone.start();

    const synth = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: "sine" },
        envelope: { attack: 0.01, decay: 0.1, sustain: 0.2, release: 0.3 }
    }).toDestination();

    setNotesOnScreen([]);
    let index = 0;
    let beatDuration = Tone.Time("4n").toSeconds() * (60 / bpm); // 한 마디의 기본 단위 길이
    nextNoteTime = Tone.now();

    function playNextMeasure(time) {
        if (index >= melody.length) {
            Tone.Transport.stop();
            isPlaying = false;
            setNotesOnScreen([]);
            console.log("Melody playback completed.");
            return;
        }

        const measure = melody[index];
        let noteStartTime = time;
        const noteDuration = beatDuration;

        measure.forEach(note => {
            if (note !== "-") {
                synth.triggerAttackRelease(note, noteDuration, noteStartTime);
            }
            noteStartTime += noteDuration;
        });

        Tone.Draw.schedule(() => {
            setNotesOnScreen(measure.map(note => note !== "-" ? { symbol: "♪", x: `${Math.random() * 80 + 10}%`, duration: 2 } : null).filter(n => n));
        }, time);

        index++;
        currentPlaybackTime += beatDuration * measure.length;
        nextNoteTime = Tone.now() + (beatDuration * measure.length);
        Tone.Transport.scheduleOnce(playNextMeasure, nextNoteTime);
    }

    nextNoteTime = Tone.now();
    Tone.Transport.scheduleOnce(playNextMeasure, nextNoteTime);
    Tone.Transport.start();
}