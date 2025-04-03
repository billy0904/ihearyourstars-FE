import styled, { keyframes } from "styled-components";
import React, { useState, useRef, useEffect } from 'react';
import { ReactComponent as Body } from "../img/MusicBox/musicbox_play.svg"
import { ReactComponent as Handle } from "../img/MusicBox/musicbox_handle.svg"
import { ReactComponent as CloudFront } from "../img/MusicBox/cloud_front.svg"
import { ReactComponent as CloudBack } from "../img/MusicBox/cloud_back.svg"
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
    
    const handleMouseDown = (event) => {
        isDragging.current = true;
        lastAngle.current = getMouseAngle(event);
    
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    async function handlePlayNote() {
        const note = flatMelody[noteIndex.current];
            console.log("노트:", note);
            console.log("index", noteIndex.current);
            noteIndex.current = (noteIndex.current + 1) % flatMelody.length;
    
            if (note && note !== "-") {
                await playNote(note, DURATION);
            } else {
                await new Promise((res) => setTimeout(res, DURATION));
            }
    }
    
    const handleMouseMove = (event) => {
        if (!isDragging.current || !handleRef.current) return;
    
        const newAngle = getMouseAngle(event);
        let angleDiff = newAngle - lastAngle.current;

        angleDiff = Math.max(angleDiff, 0);
    
        setRotation((prevRotation) => {
        const updated = prevRotation + angleDiff;
        const normalized = ((updated % 360) + 360) % 360;
        const newQuadrant = Math.floor(normalized / 45);

        if (newQuadrant !== currentQuadrant.current) {
            console.log("asdf:", currentQuadrant)
            console.log("new!", newQuadrant)
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

    useEffect(() => {
        if (!melody) {
            nav(`/musicbox/${songId}`, { replace: true });
        } else {
            const flattened = melody.flat();
            setFlatMelody(flattened);
          loadSoundFont(); // 미리 로드
        }
    }, [nickname, melody, songId, nav]);
    
    useEffect(() => {
        return () => {
            clearInterval(intervalRef.current);
        };
    }, []);
    
    return (
        <div>
            <MusicBoxDiv>
                <CloudFrontDiv>
                    <CloudFront />
                </CloudFrontDiv>
                <CloudBackDiv>
                    <CloudBack />
                </CloudBackDiv>
                <HandleDiv
                    ref={handleRef}
                    onMouseDown={handleMouseDown}
                    style={{ transform: `rotate(${rotation}deg)` }}
                >
                    <Handle />
                </HandleDiv>
                <BodyDiv>
                    <Body />
                </BodyDiv>
                </MusicBoxDiv>
        </div>
    )
}

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
    transform-origin: left;
`;
