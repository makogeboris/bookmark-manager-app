import localFont from "next/font/local";

export const manrope = localFont({
  src: [
    {
      path: "../fonts/Manrope/Manrope-VariableFont_wght.ttf",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-manrope",
});
