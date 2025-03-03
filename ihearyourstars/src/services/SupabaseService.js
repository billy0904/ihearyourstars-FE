import { supabase } from "../supabase";

// Supabase에 악보 저장 후 song_id 반환
export async function saveOrgelMelody(nickname, birth, starNum, melody, title) {
    if (!nickname || !birth || starNum < 1 || starNum > 5) {
        alert("모든 정보를 입력하고 별은 1~5 범위 내에서 선택하세요.");
        return null;
    }

    const { data, error } = await supabase
        .from("songs")
        .insert([{ nickname, birth, star_num: starNum, notes: melody, title }])
        .select("song_id")
        .single();

    if (error) {
        console.error("저장 실패:", error);
        alert("저장 실패!");
        return null;
    }

    return data.song_id;
}

// 특정 song_id로 곡 조회
export async function fetchSongById(song_id) {
    if (!song_id) {
        console.error("song_id가 제공되지 않았습니다.");
        return null;
    }

    const { data, error } = await supabase
        .from("songs")
        .select("nickname, title, notes")
        .eq("song_id", song_id)
        .single();

    if (error) {
        console.error("곡을 가져오는 데 실패했습니다:", error);
        return null;
    }

    return data; // { nickname, title, notes }
}
