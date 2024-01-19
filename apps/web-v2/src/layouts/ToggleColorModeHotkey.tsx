import { useEffect } from "react";

import { useColorMode } from "@chakra-ui/react";

export const ToggleColorModeHotkey: React.FC = () => {
  const { toggleColorMode } = useColorMode();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key.toLowerCase() === "m") {
        toggleColorMode();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [toggleColorMode]);

  return <></>;
};
