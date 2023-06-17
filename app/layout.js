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
  background: "#F4F6F8",
  secondary: "#FFFFFF",
  textColor: "#19202D"
}

const darkTheme = {
  ...commonTheme,
  background: "#121721",
  secondary: "#19202D",
  textColor: "#FFFFFF"
}

const Content = styled.div`
  background-color: ${({ theme }) => theme.background};
  width: 100vw;
  height: 100vh !important;
`;

export default function RootLayout({ children }) {
  const [isLightTheme, setIsLightTheme] = useState(true);

  const toggleTheme = () => {
    setIsLightTheme(!isLightTheme);
  }

  return (
    <html lang="en">
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
