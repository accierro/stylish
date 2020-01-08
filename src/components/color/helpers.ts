import { HSLColor } from "./types";

function parseHSL(hsl: HSLColor): string {
  return `hsl(${hsl.h}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`;
}

export function colorStateToString(colors: HSLColor[], varName: string) {
  let str = "";
  colors.forEach((el: HSLColor, i: number) => {
    const name = varName.replace(" ", "");
    str += `\$${name[0].toLocaleLowerCase() + name.slice(1)}${i +
      1}: ${parseHSL(el)};\n`;
  });
  console.log(str);
  return str;
}
