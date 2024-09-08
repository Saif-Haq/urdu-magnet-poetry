import { KeyboardLayoutObject } from "react-simple-keyboard";

export const urduLayout: KeyboardLayoutObject = {
  default: [
    "` \u0661 \u0662 \u0663 \u0664 \u0665 \u0666 \u0667 \u0668 \u0669 \u0660 - = {bksp}",
    "{tab} \u0642 \u0648 \u0639 \u0631 \u062A \u06D2 \u0621 \u0649 \u06C1 \u067E [ ]",
    "{lock} \u0627 \u0633 \u062F \u0641 \u06AF \u06BE \u062C \u06A9 \u0644 \u061B \u060C {enter}",
    "{shift} \u0632 \u0634 \u0686 \u0637 \u0628 \u0646 \u0645 \u06E4 , . / {shift}",
    ".com @ {space}",
  ],
  shift: [
    "~ ! @ # $ \u066A ^ & * ( ) _ + {bksp}",
    "{tab} \uFE70 \uFE77 \uFE79 \u0691 \u0679 \uFE7A \uFEFB \uFE8B \u0629 | { }",
    "{lock} \u0622 \u0635 \u0688 \u060D \u063A \u062D \u0636 \u062E \u06D4 \u0703 \u05f4 {enter}",
    "{shift} \u0630 \u0698 \u062B \u0638 \u06BA \u066b \u0640 < > \u061F {shift}",
    ".com @ {space}",
  ],
};

// const buck2uni: { [key: string]: string } = {
//   "\u0627": "A",
//   "\u0675": "A",
//   "\u0673": "A",
//   "\u0630": "Z",
//   "\u0622": "AA",
//   "\u0628": "B",
//   "\u067E": "P",
//   "\u062A": "T",
//   "\u0637": "T",
//   "\u0679": "T",
//   "\u062C": "J",
//   "\u0633": "S",
//   "\u062B": "S",
//   "\u0635": "S",
//   "\u0686": "CH",
//   "\u062D": "H",
//   "\u0647": "H",
//   "\u0629": "H",
//   "\u06DF": "H",
//   "\u062E": "KH",
//   "\u062F": "D",
//   "\u0688": "D",
//   "\u0632": "Z",
//   "\u0636": "Z",
//   "\u0638": "Z",
//   "\u068E": "Z",
//   "\u0631": "R",
//   "\u0691": "R",
//   "\u0634": "SH",
//   "\u063A": "GH",
//   "\u0641": "F",
//   "\u06A9": "K",
//   "\u0642": "K",
//   "\u06AF": "G",
//   "\u0644": "L",
//   "\u0645": "M",
//   "\u0646": "N",
//   "\u06BA": "N",
//   "\u0648": "O",
//   "\u0649": "Y",
//   "\u0626": "Y",
//   "\u06CC": "Y",
//   "\u06D2": "E",
//   "\u06C1": "H",
//   "\u064A": "E",
//   "\u06C2": "AH",
//   "\u06BE": "H",
//   "\u0639": "A",
//   "\u0643": "K",
//   "\u0621": "A",
//   "\u0624": "O",
//   "\u060C": "" // separator
// };

// export function transString(input: string, reverse: boolean = false): string {
//   let ans = input;
//   if (!reverse) {
//     for (const [key, value] of Object.entries(buck2uni)) {
//       // Escape special characters in the key for RegExp
//       const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
//       ans = ans.replace(new RegExp(escapedKey, 'g'), value);
//     }
//   } else {
//     // Reverse the buck2uni map for reverse translation
//     const uni2buck = Object.fromEntries(
//       Object.entries(buck2uni).map(([k, v]) => [v, k])
//     );
//     for (const [value, key] of Object.entries(uni2buck)) {
//       // Escape special characters in the value for RegExp
//       const escapedValue = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
//       ans = ans.replace(new RegExp(escapedValue, 'g'), key);
//     }
//   }
//   return ans;
// }


const romanToUrdu: { [key: string]: string } = {
  "A": "\u0627",
  "AA": "\u0622",
  "B": "\u0628",
  "P": "\u067E",
  "T": "\u062A",
  "TH": "\u062B",
  "J": "\u062C",
  "CH": "\u0686",
  "H": "\u06C1",// "\u062D", // 
  "KH": "\u062E",
  "D": "\u062F",
  "Z": "\u0630", //  "Z": "\u0636",
  "R": "\u0631",
  "ZH": "\u0698",
  "S": "\u0633",
  "SH": "\u0634",
  "SS": "\u0635",
  "TT": "\u0637",
  "ZZ": "\u0638",
  "AI": "\u0639",
  "GH": "\u063A",
  "F": "\u0641",
  "Q": "\u0642",
  "K": "\u06A9",
  "G": "\u06AF",
  "L": "\u0644",
  "M": "\u0645",
  "N": "\u0646",
  "W": "\u0648",
  "V": "\u0648",
  "Y": "\u06CC",
  "E": "\u06D2",
  "U": "\u0626",
  "I": "\u0649",
  "O": "\u06C1",
};

export function convertToUrdu(romanUrdu: string): string {
  const words = romanUrdu.split(' ');
  return words.map(word => {
    let urduWord = '';
    let i = 0;
    while (i < word.length) {
      if (i < word.length - 1 && romanToUrdu[word.substr(i, 2).toUpperCase()]) {
        urduWord += romanToUrdu[word.substr(i, 2).toUpperCase()];
        i += 2;
      } else if (romanToUrdu[word[i].toUpperCase()]) {
        urduWord += romanToUrdu[word[i].toUpperCase()];
        i++;
      } else {
        urduWord += word[i];
        i++;
      }
    }
    return urduWord;
  }).join(' ');
}

export function snapToGrid(x: number, y: number): [number, number] {
  const snappedX = Math.round(x / 32) * 32
  const snappedY = Math.round(y / 32) * 32
  return [snappedX, snappedY]
}