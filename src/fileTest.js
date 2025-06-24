import { parse } from "@vue/compiler-sfc";
import fs from "fs";

export default (filePath) => {
  if (/\.vue$/.test(filePath)) {
    const { script, scriptSetup } = parse(
      fs.readFileSync(filePath, { encoding: "utf8" })
    ).descriptor;

    return !!script && !!script.lang
      ? ["ts", "tsx"].includes(script.lang.toLowerCase())
      : !!scriptSetup &&
          !!scriptSetup.lang &&
          ["ts", "tsx"].includes(scriptSetup.lang.toLowerCase());
  }
  return false;
};
