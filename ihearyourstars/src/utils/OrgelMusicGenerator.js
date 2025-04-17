import { getChordProgression } from "./ChordProgression";
import { getRhythmPattern } from "./RhythmPattern";
import { generateFinalMelody } from "./Midi";
import { saveOrgelMelody } from "../services/SupabaseService";

// 오르골 음악 생성
export async function generateOrgelMelody(nickname, birth, starNum) {
    console.log("starNum1", starNum);
    const chords = getChordProgression(starNum);
    const rhythmPattern = getRhythmPattern(birth);
    if (!chords || !rhythmPattern) {
        console.error("❌ Melody generation failed: Missing data.");
        return [];
    }

    let melody = await generateFinalMelody(nickname, chords, rhythmPattern);
    
    // Supabase 저장
    const title = `${nickname}의 별들`;
    const songId = await saveOrgelMelody(nickname, birth, starNum, melody, title);
    if (!songId) {
        throw new Error("저장 실패");
    }
    return { melody, songId };
}
