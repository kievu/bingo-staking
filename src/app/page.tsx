"use client";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import { useEffect, useRef, useState } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import ConfettiExplosion, { ConfettiProps } from "react-confetti-explosion";

const inter = Inter({ subsets: ["latin"] });

const largeProps: ConfettiProps = {
  force: 0.8,
  duration: 3000,
  particleCount: 300,
  width: 1600,
  colors: ["#C0C2FA", "#676EF6", "#F7F7F7", "#D8D9FC"],
};

export default function Home() {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);
  const [showWinner, setShowWinner] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const onShowWinnerPlayAudio = () => {
    audioRef.current?.play();
    setShowWinner(true);
    setTimeout(() => {
      setShowConfetti(true);
    }, 6000);
  };

  return (
    <>
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          colors={["#C0C2FA", "#676EF6", "#F7F7F7", "#D8D9FC"]}
        />
      )}
      <main className={styles.main}>
        <div>
          <Image
            src="/bingo-staking.png"
            className={styles.logo}
            alt="Bingo staking logo"
            width={282}
            height={155}
            priority
          />
        </div>
        <div>
          {showConfetti && (
            <div className={styles.section}>
              <h1 className={inter.className}>Vinner!</h1>
              <Image
                className={styles.winner}
                src="/thao.png"
                alt="thao logo"
                width={345}
                height={530}
                priority
              />
            </div>
          )}
          {showConfetti && <ConfettiExplosion {...largeProps} />}
          {!showWinner && (
            <button onClick={onShowWinnerPlayAudio}>
              Vis meg ukens vinner
            </button>
          )}
          <audio src="/drum-roll.m4a" ref={audioRef}>
            Your browser does not support the
            <code>audio</code> element.
          </audio>
        </div>
      </main>
    </>
  );
}
