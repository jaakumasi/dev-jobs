'use client';

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import './globals.css'
import { Context } from './_shared/context';
import DashBoardBG from './components/DashBoardBG';


const commonTheme = {
  primary: '#5964E0',
  hover: '#939BF4'
}

const lightTheme = {
  ...commonTheme,
  mode: 'l',
  background: "#F4F6F8",
  secondary: "#FFFFFF",
  textColor: "#19202D",
  jobLoadingBG: "rgb(229, 231, 235)",
  jobLoadingElems: "rgb(209, 213, 219)",
}

const darkTheme = {
  ...commonTheme,
  mode: 'd',
  background: "#121721",
  secondary: "#19202D",
  textColor: "#FFFFFF",
  textColorGray: "#6E8098",
  textColorBlue: "#0668EA",
  jobLoadingBG: "rgb(107, 114, 128)",
  jobLoadingElems: "rgb(75, 85, 99)",
}

const Content = styled.div`
  background-color: ${({ theme }) => theme.background};
  height: fit-content;
  min-height: 100vh;
  overflow-x: hidden;
`;

export default function RootLayout({ children }) {
  const [isLightTheme, setIsLightTheme] = useState(true);
  const [isDOMLoaded, setIsDOMLoaded] = useState(false);
  const [filterObj, setFilterObj] = useState({});

  /* set the initial theme to the client's preference */
  useEffect(() => {
    setIsDOMLoaded(true);

    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    if (darkModeMediaQuery.matches) setIsLightTheme(false);
    else setIsLightTheme(true);
  }, []);

  const toggleTheme = () => {
    setIsLightTheme(!isLightTheme);
  }

  const updateFilterObj = (obj) => {
    setFilterObj(obj);
  }

  return (
    <html lang="en">
      <head>
        <meta name='theme-color' content={`${isLightTheme ? lightTheme.background : darkTheme.background}`} />
        <meta name='description' content='A platform for searching and browsing developer job listings. Filter job searches to your specific criteria.' />
        <title>Devjobs web app</title>
      </head>
      <body>
        <ThemeProvider theme={isLightTheme ? lightTheme : darkTheme}>
          <Context.Provider value={
            {
              toggleTheme,
              updateFilterObj,
              filterObj,
              isDOMLoaded
            }}
          >
            <Content>
              <DashBoardBG />
              {children}
            </Content>
          </Context.Provider>
        </ThemeProvider>
      </body>
    </html >
  )
}
