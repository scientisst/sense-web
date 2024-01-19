import lexendWoff2 from "@fontsource-variable/lexend/files/lexend-latin-wght-normal.woff2";
import lexendStyle from "@fontsource-variable/lexend/index.css?inline";
import sourceCodeProWoff2 from "@fontsource-variable/source-code-pro/files/source-code-pro-latin-wght-normal.woff2";
import sourceCodeProStyle from "@fontsource-variable/source-code-pro/index.css?inline";

import imagineOtf from "../assets/fonts/imagine.otf";

export const HeadDefault: React.FC = () => {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: [
            lexendStyle,
            sourceCodeProStyle,
            `
            @font-face {
              font-family: "Imagine";
              src: url("${imagineOtf}") format("opentype");
            }
          `,
          ].join("\n"),
        }}
      />
      <link
        rel="preload"
        href={lexendWoff2}
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href={imagineOtf}
        as="font"
        type="font/opentype"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href={sourceCodeProWoff2}
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
    </>
  );
};
