import { useEffect, useState } from 'react';

// Define a type for the theme
type Theme = 'light' | 'dark';

const useTheme = (): [Theme, React.Dispatch<React.SetStateAction<Theme>>] => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Get the saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    return savedTheme || 'light'; // Default to light theme if nothing is stored
  });

  useEffect(() => {
    // Apply the theme to the body element
    document.body.setAttribute('data-theme', theme);

    // Save the selected theme in localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  return [theme, setTheme];
};

export default useTheme;
