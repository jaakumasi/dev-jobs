import { useEffect, useState } from 'react';

export const useScreenWidth = () => {
  const [screenWidth, setScreenWidth] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Initial screen width
    setScreenWidth(window.innerWidth);

    // Event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenWidth;
};

export const API = async (url, method, headers, body) => {
  const response = await fetch(url, {
    method: method,
    headers: !headers ? { 'Content-Type': 'application/json' } : headers,
    body: JSON.stringify(body)
  });
  const json = await response.json();
  return json;
}