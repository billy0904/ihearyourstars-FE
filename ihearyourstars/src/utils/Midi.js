// 한글 초성 인덱스 추출 (가나다 순서상의 index)
function getChoseong(char) {
    const code = char.charCodeAt(0) - 0xAC00;
    if (code < 0 || code > 11171) return null; // 한글 음절이 아니면 null
    return Math.floor(code / (21 * 28));
}

// 한국어 닉네임에서 첫 글자와 마지막 글자를 이용해 두 개의 숫자(1, 3, 5 중)를 반환
function convertNicknameToNumbers(nickname) {
    if (nickname.length < 2) throw new Error("닉네임은 최소 2자 이상이어야 합니다.");

    const first = nickname[0];
    const last = nickname[nickname.length - 1];
    const cho1 = getChoseong(first);
    const cho2 = getChoseong(last);

    // 초성 인덱스 mod 3을 이용해 숫자 할당 (1, 3, 5 균등 분포)
    const numMap = [1, 3, 5]; // 순서대로 0 → 1, 1 → 3, 2 → 5
    let num1 = numMap[cho1 % 3];
    let num2 = numMap[cho2 % 3];

    // 두 숫자가 같으면 다른 값으로 조정
    if (num1 === num2) {
        num2 = numMap[(cho2 + 1) % 3];
    }
    return [num1, num2];
}

// 화성 문자열에서 루트 음 추출 후, 해당 화성 삼화음 중 두 음을 반환 (닉네임 숫자로 결정)
function getChordTones(chord, nickname) {
    const match = chord.match(/^[A-G][sb]?/);
    if (!match) return { tone1: chord, tone2: chord };
    
    const root = chord[0];
    const isMinor = chord.includes('m') && !chord.toLowerCase().includes('maj');

    const chromatic = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
    let rootIndex = chromatic.indexOf(root);
    if (rootIndex === -1) rootIndex = 0;

    // 기본 음정
    const thirdInterval = isMinor ? 3 : 4;
    const fifthInterval = 7;

    const thirdNote = chromatic[(rootIndex + thirdInterval) % 12];
    const fifthNote = chromatic[(rootIndex + fifthInterval) % 12];

    // 닉네임을 기반으로 선택할 음 결정
    const [choice1, choice2] = convertNicknameToNumbers(nickname);
    
    // 숫자와 음 매칭
    const toneMap = { 1: root, 3: thirdNote, 5: fifthNote };
    
    return { tone1: toneMap[choice1], tone2: toneMap[choice2] };
}

// 두 음 사이의 보강(패싱) 음 추출 (간단히 tone1에서 한 반음 올라간 음을 사용)
function getPassingTone(tone1, tone2) {
    const chromatic = ["C", "Cs", "D", "Ds", "E", "F", "Fs", "G", "Gs", "A", "As", "B"];
    const index1 = chromatic.indexOf(tone1);
    const index2 = chromatic.indexOf(tone2);
    if (index1 === -1 || index2 === -1) return tone1;
    // 기본적으로 tone1 다음 음을 보강음으로 사용 (실제 음정 관계에 따라 조정 가능)
    const passingIndex = (index1 + 1) % 12;
    return chromatic[passingIndex];
}

// 최종 멜로디 생성: 각 마디별로 닉네임에서 얻은 숫자와 리듬 패턴에 따라 음 확장
function getGroupNotes(baseGroup, pattern) {
    switch (pattern) {
        case 'A':
            return [baseGroup[0], '-', '-'];
        case 'B':
            return [baseGroup[0], baseGroup[1], '-'];
        case 'C':
            return [baseGroup[0], '-', baseGroup[1]];
        case 'D':
        default:
            return [baseGroup[0], getPassingTone(baseGroup[0], baseGroup[1]), baseGroup[1]];
    }
}

export async function generateFinalMelody(nickname, chords, rhythmPattern) {
    const finalMelody = chords.map((measureChords, i) => {
        const pat1 = rhythmPattern[i]; // 현재 마디의 리듬 패턴
        const pat2 = ['A', 'B', 'D'][Math.floor(Math.random() * 3)]; // 'A', 'B', 'D' 중 랜덤 선택
    
        const chord1 = getChordTones(measureChords[0], nickname);
        const chord2 = getChordTones(measureChords[1], nickname);
    
        let baseGroup1 = [chord1.tone1, chord1.tone2];
        let baseGroup2 = [chord2.tone1, chord2.tone2];
    
        const group1Notes = getGroupNotes(baseGroup1, pat1);
        const group2Notes = getGroupNotes(baseGroup2, pat2);
    
        return [...group1Notes, ...group2Notes];
    });
    console.log(finalMelody);
    return finalMelody;
}