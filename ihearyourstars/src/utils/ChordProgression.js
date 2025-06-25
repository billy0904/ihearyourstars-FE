// 별 색상에 따른 화성 진행 패턴 (8마디, 각 마디에 [화성1, 화성2])
const chordProgressions = {
    antares: [
      ['C', 'Am'], ['F', 'G7'],
      ['Em', 'Am'], ['Dm', 'G7'],
      ['Am', 'F'], ['C', 'G7'],
      ['Em', 'Dm7'], ['G7', 'C']
    ],
    sirius: [
      ['Fsm', 'D'], ['Bm', 'Cs7'],
      ['Csm', 'Fsm'], ['Gsm7b5', 'Cs7'],
      ['D', 'Bm'], ['Fsm', 'Cs7'],
      ['Csm', 'Gsm7b5'], ['Cs7', 'Fsm']
    ],
    polaris: [
      ['A', 'Fsm'], ['D', 'E7'],
      ['Csm', 'Fsm'], ['Bm', 'E7'],
      ['Fsm', 'D'], ['A', 'E7'],
      ['Csm', 'Bm7'], ['E7', 'A']
    ],
    capella: [
      ['Em', 'C'], ['Am', 'B7'],
      ['Bm', 'Em'], ['Fsm7b5', 'B7'],
      ['C', 'Am'], ['Em', 'B7'],
      ['Bm', 'Fsm7b5'], ['B7', 'Em']
    ],
    vega: [
      ['F', 'Dm'], ['Bb', 'C7'],
      ['Am', 'Dm'], ['Gm', 'C7'],
      ['Dm', 'Bb'], ['F', 'C7'],
      ['Am', 'Gm7'], ['C7', 'F']
    ],
  };
  

// 코드 진행 패턴 반환
export function getChordProgression(starNum) {
    const colors = ["antares", "sirius", "polaris", "capella", "vega"];
    console.log("별 색상:", (starNum) % colors.length);
    const color = colors[(starNum) % colors.length];
    return chordProgressions[color] || chordProgressions.antares;
}