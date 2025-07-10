import styled, { keyframes } from "styled-components";
import React, { useState, useRef, useEffect } from 'react';
import { ReactComponent as Body } from "../img/MusicBox/musicbox_play.svg";
import { ReactComponent as Handle } from "../img/MusicBox/musicbox_handle.svg";
import { ReactComponent as CloudFront } from "../img/MusicBox/cloud_front.svg";
import { ReactComponent as CloudBack } from "../img/MusicBox/cloud_back.svg";
import { ReactComponent as Star1 } from "../img/MusicBox/Star1.svg";
import { ReactComponent as Star2 } from "../img/MusicBox/Star2.svg";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { loadSoundFont, playNote } from '../utils/PlayMelody';

export const MusicBoxComponent = () => {
    const nav = useNavigate();
    const location = useLocation();
    const DURATION = 300;

    const [rotation, setRotation] = useState(0);
    const handleRef = useRef(null);
    const isDragging = useRef(false);
    const lastAngle = useRef(0);
    const currentQuadrant = useRef(null);

    const [flatMelody, setFlatMelody] = useState([]);
    const isPlayingRef = useRef(false);
    const intervalRef = useRef(null);
    const noteIndex = useRef(0);
    const { songId } = useParams();
    const { nickname, melody } = location.state || {};

    const [floatingNotes, setFloatingNotes] = useState([]);

    const notePositions = {
        "C": 0, "Db": 1, "D": 2, "Eb": 3, "E": 4, "F": 5,
        "Gb": 6, "G": 7, "Ab": 8, "A": 9, "Bb": 10, "B": 11
    };

    const handleMouseDown = (event) => {
        isDragging.current = true;
        lastAngle.current = getMouseAngle(event);
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (event) => {
        if (!isDragging.current || !handleRef.current) return;
        const newAngle = getMouseAngle(event);
        let angleDiff = newAngle - lastAngle.current;
        angleDiff = Math.max(angleDiff, 0);

        setRotation(prevRotation => {
            const updated = prevRotation + angleDiff;
            const normalized = ((updated % 360) + 360) % 360;
            const newQuadrant = Math.floor(normalized / 45);
            if (newQuadrant !== currentQuadrant.current) {
                currentQuadrant.current = newQuadrant;
                handlePlayNote();
            }
            return updated;
        });

        lastAngle.current = newAngle;
    };

    const handleMouseUp = () => {
        isDragging.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };

    const getMouseAngle = (event) => {
        if (!handleRef.current) return 0;
        const handleRect = handleRef.current.getBoundingClientRect();
        const centerX = handleRect.left + handleRect.width / 2;
        const centerY = handleRect.top + handleRect.height / 2;
        const deltaX = event.clientX - centerX;
        const deltaY = event.clientY - centerY;
        return Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    };

    // ✅ 터치 이벤트 추가
    const handleTouchStart = (e) => {
        if (e.touches.length > 0) {
            isDragging.current = true;
            lastAngle.current = getTouchAngle(e);
            document.addEventListener("touchmove", handleTouchMove);
            document.addEventListener("touchend", handleTouchEnd);
        }
    };

    const handleTouchMove = (e) => {
        if (!isDragging.current || !handleRef.current || e.touches.length === 0) return;
        const newAngle = getTouchAngle(e);
        let angleDiff = newAngle - lastAngle.current;
        angleDiff = Math.max(angleDiff, 0);

        setRotation(prevRotation => {
            const updated = prevRotation + angleDiff;
            const normalized = ((updated % 360) + 360) % 360;
            const newQuadrant = Math.floor(normalized / 45);
            if (newQuadrant !== currentQuadrant.current) {
                currentQuadrant.current = newQuadrant;
                handlePlayNote();
            }
            return updated;
        });

        lastAngle.current = newAngle;
    };

    const handleTouchEnd = () => {
        isDragging.current = false;
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
    };

    const getTouchAngle = (e) => {
        const touch = e.touches[0];
        if (!handleRef.current || !touch) return 0;
        const rect = handleRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = touch.clientX - centerX;
        const deltaY = touch.clientY - centerY;
        return Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    };

    async function handlePlayNote() {
        const note = flatMelody[noteIndex.current];
        noteIndex.current = (noteIndex.current + 1) % flatMelody.length;

        if (note && note !== "-") {
            await playNote(note, DURATION);
            const baseNote = note.replace(/[0-9]/g, '');
            const positionIndex = notePositions[baseNote] ?? Math.floor(Math.random() * 12);
            const leftPercent = (positionIndex / 12) * 100;
            const isLong = Math.random() > 0.5;
            const id = Date.now();

            setFloatingNotes(prev => [...prev, { id, left: leftPercent, isLong }]);
            setTimeout(() => {
                setFloatingNotes(prev => prev.filter(n => n.id !== id));
            }, 3000);
        } else {
            await new Promise(res => setTimeout(res, DURATION));
        }
    }

    useEffect(() => {
        if (!melody) {
            nav(`/musicbox/${songId}`, { replace: true });
        } else {
            const flattened = melody.flat();
            setFlatMelody(flattened);
            loadSoundFont();
        }
    }, [nickname, melody, songId, nav]);

    useEffect(() => {
        return () => clearInterval(intervalRef.current);
    }, []);

    return (
        <MusicBoxWrapper>
            <NotesOverlay>
                {floatingNotes.map(({ id, left, isLong }) => (
                    <FloatingStar key={id} left={left}>
                        {isLong ? <Star1 /> : <Star2 />}
                    </FloatingStar>
                ))}
            </NotesOverlay>

            <MusicBoxDiv>
                <CloudFrontDiv><CloudFront /></CloudFrontDiv>
                <CloudBackDiv><CloudBack /></CloudBackDiv>
                <HandleDiv
                    ref={handleRef}
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                    style={{ transform: `rotate(${rotation}deg)` }}
                >
                    <Handle />
                </HandleDiv>
                <BodyDiv><Body /></BodyDiv>
            </MusicBoxDiv>
        </MusicBoxWrapper>
    );
};

const MusicBoxWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 700px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
`;

const MusicBoxDiv = styled.div`
    position: relative;
    width: 430px;
    margin-left: 40px;
`;

const floatAnimation = keyframes`
    0% { transform: translateY(0); }
    50% { transform: translateY(-7%); }
    100% { transform: translateY(0); }
`;

const CloudFrontDiv = styled.div`
    position: absolute;
    bottom: -15%;
    right: 0%;
    z-index: 3;
    animation: ${floatAnimation} 3s infinite ease-in-out;
`;

const BodyDiv = styled.div`
    position: relative;
    z-index: 2;
`;

const CloudBackDiv = styled.div`
    position: absolute;
    bottom: 25%;
    z-index: 1;
    animation: ${floatAnimation} 3s infinite ease-in-out;
`;

const HandleDiv = styled.div`
    position: absolute;
    top: 55%;
    left: 48%;
    z-index: 4;
    cursor: grab;
    user-select: none;
    touch-action: none;
    transform-origin: left;
`;

const NotesOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 430px;
    height: 500px;
    z-index: 10;
    pointer-events: none;
    overflow: hidden;
    display: flex;
    justify-content: center;
`;

const floatUp = keyframes`
    0% { transform: translateY(100%); opacity: 1; }
    100% { transform: translateY(-500%); opacity: 0.3; }
`;

const FloatingStar = styled.div`
    position: absolute;
    bottom: 0;
    left: ${({ left }) => left}%;
    animation: ${floatUp} 3s linear forwards;
    z-index: 10;
`;
