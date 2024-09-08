import { FC, MutableRefObject, useState } from "react";
import Keyboard, { KeyboardReactInterface } from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "./index.css";
import { urduLayout } from "./utils";

interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (input: string) => any;
  keyboardRef: MutableRefObject<KeyboardReactInterface | null>;
}

export const UrduKeyBoard: FC<IProps> = ({ onChange, keyboardRef }) => {
  const [layoutName, setLayoutName] = useState("default");
  // const [input, setInput] = useState("");

  // const onChange = (input: string) => {
  //   setInput(input);
  //   console.log("Input changed", input);
  // };

  const onKeyPress = (button: string) => {
    console.log("Button pressed", button);

    if (button === "{shift}" || button === "{lock}") handleShift();
  };

  const handleShift = () => {
    setLayoutName((prevLayoutName) =>
      prevLayoutName === "default" ? "shift" : "default"
    );
  };

  // const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const input = event.target.value;
  //   // setInput(input);
  //   keyboardRef.current?.setInput(input);
  // };

  return (
    <div>
      <Keyboard
        layoutName={layoutName}
        ketBoardRef
        inputName="hehe"
        onChange={onChange}
        layout={urduLayout}
        onKeyPress={onKeyPress}
        keyboardRef={r => (keyboardRef.current = r)}
        onRender={() => console.log("Rendered")}
      />
    </div>
  );
};