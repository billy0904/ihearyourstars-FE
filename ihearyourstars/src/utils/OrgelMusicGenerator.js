import { getChordProgression } from "./ChordProgression";
import { getRhythmPattern, convertRhythmPattern } from "./RhythmPattern";
import { getMelodyFromChordAndNickname } from "./MelodyGenerator";
import { saveOrgelMelody } from "../services/SupabaseService";

// 오르골 음악 생성
export async function generateOrgelMelody(nickname, birth, starNum) {
    console.log(`🎵 Generating melody for ${nickname} (Birth: ${birth}, Star: ${starNum})`);

    const chords = getChordProgression(starNum);
    const rhythmPattern = getRhythmPattern(birth);
    const rhythmDurations = convertRhythmPattern(rhythmPattern);

    if (!chords || !rhythmPattern || !rhythmDurations) {
        console.error("❌ Melody generation failed: Missing data.");
        return [];
    }

    let melody = [];
    let timeCounter = 0; // 재생 시간 관리

    for (let measure = 0; measure < 8; measure++) {
        const chord = chords[measure % chords.length]; // 해당 마디의 코드 선택
        const melodyNotes = getMelodyFromChordAndNickname(chord, nickname, measure); // 특정 마디 멜로디 생성
        let noteIndex = 0;

        for (let beat = 0; beat < 2; beat++) {
            let durations = rhythmDurations[beat] || ["8n", "8n", "8n"];

            durations.forEach((duration) => {
                let note = melodyNotes[noteIndex % melodyNotes.length];
                let time = `${timeCounter}n`;

                melody.push({ time, note, duration });
                if (duration == 'd4') timeCounter += 3;
                else if (duration == 'q') timeCounter += 2;
                else timeCounter += 1;
                noteIndex++;
            });
        }
    }
    
    // Supabase에 저장
    const title = `${nickname}의 별들`;
    const songId = await saveOrgelMelody(nickname, birth, starNum, melody, title);
    if (!songId) {
        throw new Error("저장 실패");
    }
    return { melody, songId };
}