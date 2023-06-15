'use client';

import React, { useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import './globals.css'
import { Context } from './context';

export const metadata = {
  title: 'Devjobs',
  description: '',
}

const lightTheme = {
  body: "#F4F6F8",
  component: "#FFFFFF",
}

const darkTheme = {
  body: "#121721",
  component: "#19202D"
}

const Content = styled.div`
  background-color: ${({ theme }) => theme.body};
  width: 100vw;
  height: 100vh;
`;

export default function RootLayout({ children }) {
  const [isLightTheme, setIsLightTheme] = useState(true);

  const toggleTheme = () => {
    setIsLightTheme(!isLightTheme);
  }

  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={isLightTheme ? lightTheme : darkTheme}
          isLightTheme={isLightTheme}
        >
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
