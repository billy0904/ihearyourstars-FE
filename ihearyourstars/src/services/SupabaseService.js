import { supabase } from "../supabase";

// 악보 저장 후 song_id 반환
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

// song_id에 해당하는 곡의 title 변경
export async function updateSongTitle(song_id, newTitle) {
    if (!song_id || !newTitle) {
        console.error("song_id 또는 newTitle이 제공되지 않았습니다.");
        return null;
    }

    const { data, error } = await supabase
        .from("songs")
        .update({ title: newTitle })
        .eq("song_id", song_id);

    if (error) {
        console.error("곡 제목 변경 실패:", error);
        alert("곡 제목 변경에 실패했습니다.");
        return null;
    }
    console.log("곡 제목을 변경했습니다.");
}