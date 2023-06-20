'use client';

import React, { useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import './globals.css'
import { Context } from './_shared/context';

export const metadata = {
  title: 'Devjobs',
  description: '',
}

const commonTheme = {
  primary: '#5964E0',
  hover: '#939BF4'
}

const lightTheme = {
  ...commonTheme,
  mode: 'l',
  background: "#F4F6F8",
  secondary: "#FFFFFF",
  textColor: "#19202D"
}

const darkTheme = {
  ...commonTheme,
  mode: 'd',
  background: "#121721",
  secondary: "#19202D",
  textColor: "#FFFFFF",
  textColorGray: "#6E8098",
  textColorBlue: "#0668EA",
}

const Content = styled.div`
  background-color: ${({ theme }) => theme.background};
  height: fit-content;
  min-height: 100vh;
  overflow-x: hidden;
`;

export default function RootLayout({ children }) {
  const [isLightTheme, setIsLightTheme] = useState(true);

  const toggleTheme = () => {
    setIsLightTheme(!isLightTheme);
  }

  return (
    <html lang="en">
      <meta name='theme-color' content={`${isLightTheme ? lightTheme.background : darkTheme.background}`}/>
      <body>
        <ThemeProvider theme={isLightTheme ? lightTheme : darkTheme}>
          <Context.Provider value={{ toggleTheme }}>
            <Content>
              {children}
            </Content>
          </Context.Provider>
        </ThemeProvider>
      </body>
    </html >
  )
}
