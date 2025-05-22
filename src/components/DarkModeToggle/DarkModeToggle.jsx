'use client'
import React, { useContext } from 'react';
import style from './DarkMode.module.css';
import { ThemeContext } from '@/context/ThemeContext';

const DarkModeToggle = () => {
  const{mode,toggle} = useContext(ThemeContext);
  return (

    <div className={style.container} onClick={toggle}>
      <div className={style.icon}>🌙</div>
      <div className={style.icon}>🌞</div>
      <div
        className={style.ball}
        style={mode === "light" ? { left: "23px" } : { right: "23px" }}
      ></div>
    </div>
  );
};

export default DarkModeToggle;
