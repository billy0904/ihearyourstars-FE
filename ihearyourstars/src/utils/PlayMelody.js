
// 1. WebAudio 컨텍스트 생성
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// 2. SoundFont 로드 (천공 오르골 timbre 사용)
async function loadSoundFont(instrument = 'music_box') {
    const response = await fetch(`https://gleitz.github.io/midi-js-soundfonts/FluidR3_GM/${instrument}-mp3.js`);
    const script = await response.text();
    eval(script); // SoundFont 데이터를 실행하여 사용할 수 있도록 설정
}

export async function playMelody(melody, bpm = 60) {
    await loadSoundFont();
    
    // 🔴 사용자 이벤트 이후에 실행되도록 수정
    if (audioContext.state === "suspended") {
        await audioContext.resume();
        console.log("🔊 AudioContext 활성화됨");
    }

    const beatDuration = 60 / bpm; // 한 박자의 길이 (초 단위)

    let currentTime = 0; // 전체적인 시간 관리

    for (let measureIndex = 0; measureIndex < melody.length; measureIndex++) {
        const chordGroup = melody[measureIndex];

        // 리듬 패턴에 따른 음표 길이 설정 (BPM 기준)
        // 음을 순차적으로 재생 (한 음이 끝난 후 다음 음을 재생)
        for (let noteIndex = 0; noteIndex < chordGroup.length; noteIndex++) {
            if (chordGroup[noteIndex] != "-") {
                await playNote(chordGroup[noteIndex], 500); // 각 음을 재생 후 기다림
            } else {
                await new Promise(resolve => setTimeout(resolve, 500)); // "-"이면 1초 동안 대기
            }
            console.log(chordGroup[noteIndex]);
        }

        currentTime += 2 * beatDuration; // 각 마디(0.5마디 x 2)당 2박자 증가
    }
}

// **🎹 개별 음을 재생하는 함수 (재생이 끝날 때까지 대기)**
function playNote(note, duration) {
    return new Promise((resolve) => {
        const player = new Audio();
        player.src = `https://gleitz.github.io/midi-js-soundfonts/FluidR3_GM/music_box-mp3/${note[0]}4.mp3`;

        player.onended = resolve; // 음이 끝난 후 resolve 호출 → 다음 음 재생 가능
        player.onerror = () => {
            console.error(`음원 로드 실패: ${note}`);
            resolve(); // 오류가 나도 다음 음을 재생할 수 있도록 보장
        };

        setTimeout(() => {
            player.play();
        }, 0);

        // 일정 시간이 지나면 강제로 resolve (혹시 onended가 호출되지 않을 경우 대비)
        setTimeout(resolve, duration);
    });
}