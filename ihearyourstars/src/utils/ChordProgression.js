// 별 색상에 따른 화성 진행 패턴 (8마디, 각 마디에 [화성1, 화성2])
const chordProgressions = {
    antares: [['C', 'Am'], ['F', 'G7'], ['Em', 'Am'], ['Dm', 'G7'], ['Am', 'F'], ['C', 'G7'], ['Em', 'Dm7'], ['G7', 'C']],
    polaris: [['A', 'F#m'], ['D', 'E7'], ['C#m', 'F#m'], ['Bm', 'E7'], ['F#m', 'D'], ['A', 'E7'], ['C#m', 'Bm7'], ['E7', 'A']],
    vega: [['F', 'Dm'], ['Bb', 'C7'], ['Am', 'Dm'], ['Gm', 'C7'], ['Dm', 'Bb'], ['F', 'C7'], ['Am', 'Gm7'], ['C7', 'F']],
    sirius: [['F#m', 'D'], ['Bm', 'C#7'], ['C#m', 'F#m'], ['G#m7♭5', 'C#7'], ['D', 'Bm'], ['F#m', 'C#7'], ['C#m', 'G#m7♭5'], ['C#7', 'F#m']],
    altair: [['Em', 'C'], ['Am', 'B7'], ['Bm', 'Em'], ['F#m7♭5', 'B7'], ['C', 'Am'], ['Em', 'B7'], ['Bm', 'F#m7♭5'], ['B7', 'Em']]
};

// 코드 진행 패턴 반환
export function getChordProgression(starNum) {
    const colors = ["betelgeuse", "polaris", "vega", "sirius", "altair"];
    const color = colors[(starNum) % colors.length];
    return chordProgressions[color] || chordProgressions.antares;
}