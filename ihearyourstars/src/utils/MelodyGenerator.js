const ChordTones = {
    C: ["C4", "E4", "G4", "B4"],
    Cm: ["C4", "E♭4", "G4", "B♭4"],
    Dm: ["D4", "F4", "A4", "C5"],
    Em: ["E4", "G4", "B4", "D5"],
    F: ["F4", "A4", "C5", "E5"],
    G: ["G4", "B4", "D5", "F5"],
    Am: ["A4", "C5", "E5", "G5"],
    Bdim: ["B4", "D5", "F5", "A5"],
};

// 특정 마디의 코드에서 멜로디 음 선택
export function getMelodyFromChordAndNickname(chord, nickname, measure) {
    const availableNotes = ChordTones[chord] || ["C4", "E4", "G4", "B4"]; // 기본값 C 코드
    let melody = [];

    for (let i = 0; i < 4; i++) { // 마디당 4개의 음 선택 (조정 가능)
        const charCode = nickname.charCodeAt((measure + i) % nickname.length);
        const noteIndex = (charCode + getRandomInt(0, availableNotes.length)) % availableNotes.length;
        const selectedNote = availableNotes[noteIndex];

        melody.push(selectedNote);
    }
    return melody;
}

// 랜덤 인덱스 선택 유틸 함수
export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
