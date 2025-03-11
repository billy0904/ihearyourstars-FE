// 별자리별 리듬 패턴 (각 마디에 A, B, C, D 패턴)
const rhythmPatterns = {
    aries: ['A', 'C', 'B', 'D', 'A', 'B', 'C', 'D'],
    taurus: ['B', 'D', 'A', 'C', 'B', 'A', 'D', 'C'],
    gemini: ['C', 'A', 'D', 'B', 'C', 'D', 'A', 'B'],
    cancer: ['D', 'B', 'C', 'A', 'D', 'A', 'C', 'B'],
    leo: ['A', 'B', 'D', 'C', 'A', 'D', 'C', 'B'],
    virgo: ['C', 'D', 'A', 'B', 'D', 'A', 'C', 'B'],
    libra: ['B', 'A', 'C', 'D', 'B', 'C', 'A', 'D'],
    scorpio: ['D', 'C', 'B', 'A', 'D', 'A', 'C', 'B'],
    sagittarius: ['A', 'B', 'C', 'D', 'A', 'C', 'D', 'B'],
    capricorn: ['C', 'D', 'B', 'A', 'C', 'A', 'B', 'D'],
    aquarius: ['D', 'C', 'A', 'B', 'D', 'A', 'C', 'B'],
    pisces: ['B', 'A', 'D', 'C', 'B', 'C', 'D', 'A']
};

// 실제 별자리 계산
function getZodiacSign(birth) {
    const month = parseInt(birth.substring(0, 2));
    const day = parseInt(birth.substring(2, 4));

    const zodiacSigns = [
        { sign: "capricorn", start: 1222, end: 119 },
        { sign: "aquarius", start: 120, end: 218 },
        { sign: "pisces", start: 219, end: 320 },
        { sign: "aries", start: 321, end: 419 },
        { sign: "taurus", start: 420, end: 520 },
        { sign: "gemini", start: 521, end: 620 },
        { sign: "cancer", start: 621, end: 722 },
        { sign: "leo", start: 723, end: 822 },
        { sign: "virgo", start: 823, end: 922 },
        { sign: "libra", start: 923, end: 1022 },
        { sign: "scorpio", start: 1023, end: 1121 },
        { sign: "sagittarius", start: 1122, end: 1221 },
    ];

    const birthDate = month * 100 + day;

    for (const zodiac of zodiacSigns) {
        if (
            (zodiac.start <= zodiac.end && birthDate >= zodiac.start && birthDate <= zodiac.end) ||
            (zodiac.start > zodiac.end && (birthDate >= zodiac.start || birthDate <= zodiac.end))
        ) {
            return zodiac.sign;
        }
    }
    return "aries"; // default (fallback)
}

// 별자리 기반 리듬 패턴 반환
export function getRhythmPattern(birth) {
    const zodiacSign = getZodiacSign(birth);
    return rhythmPatterns[zodiacSign] || rhythmPatterns.aries;
}

// // 🎵 리듬 패턴을 Tone.js 노트 길이로 변환
// export function convertRhythmPattern(pattern) {
//     const NoteDurations = {
//         A: ["4n."],  // 점4분음표 (dotted quarter note)
//         B: ["4n", "8n"],  // 4분음표 + 8분음표
//         C: ["8n", "4n"],  // 8분음표 + 4분음표
//         D: ["8n", "8n", "8n"],  // 8분음표 3개
//     };
//     return pattern.map((p) => NoteDurations[p] || ["8n", "8n", "8n"]); // 기본값 8분음 3개
// }