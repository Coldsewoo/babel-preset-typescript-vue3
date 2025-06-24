import * as path from "path";
import fileTest from "../src/fileTest";
import fs from "fs";
import { transformSync } from "@babel/core";
import preset from "../src/index";
import { parse } from "@vue/compiler-sfc";

describe("Plugin", () => {
  describe("File test", () => {
    test("parses valid XML template with JavaScript and returns false", () => {
      const filename = path.join(__dirname, "./xml-valid-js/input.vue");
      expect(fileTest(filename)).toBe(false);
    });

    test("parses valid XML template with TypeScript and returns true", () => {
      const filename = path.join(__dirname, "./xml-valid-ts/input.vue");
      expect(fileTest(filename)).toBe(true);
    });

    test("parses valid SGML (non-XML) template with JavaScript and returns false", () => {
      const filename = path.join(__dirname, "./sgml-valid-js/input.vue");
      expect(fileTest(filename)).toBe(false);
    });

    test("parses valid SGML (non-XML) template with TypeScript and returns true", () => {
      const filename = path.join(__dirname, "./sgml-valid-ts/input.vue");
      expect(fileTest(filename)).toBe(true);
    });
    
    test("parses valid PUG template with Javascript and returns false", () => {
      const filename = path.join(__dirname, "./pug-valid-js/input.vue");
      expect(fileTest(filename)).toBe(false);
    });
    
    test("parses valid PUG template with TypeScript and returns true", () => {
      const filename = path.join(__dirname, "./pug-valid-ts/input.vue");
      expect(fileTest(filename)).toBe(true);
    });

    // Vue 3 Feature Tests
    test("detects TypeScript in <script setup> syntax", () => {
      const filename = path.join(__dirname, "./script-setup-ts/input.vue");
      expect(fileTest(filename)).toBe(true);
    });

    test("detects JavaScript in <script setup> syntax", () => {
      const filename = path.join(__dirname, "./script-setup-js/input.vue");
      expect(fileTest(filename)).toBe(false);
    });

    test("handles multiple script blocks correctly", () => {
      const filename = path.join(__dirname, "./multiple-scripts/input.vue");
      expect(fileTest(filename)).toBe(true); // Should detect TS in setup script
    });

    test("handles TSX syntax", () => {
      const filename = path.join(__dirname, "./tsx-support/input.vue");
      expect(fileTest(filename)).toBe(true);
    });

    test("handles generic components", () => {
      const filename = path.join(__dirname, "./generic-components/input.vue");
      expect(fileTest(filename)).toBe(true);
    });

    // Edge Cases
    test("handles files with no script block", () => {
      const filename = path.join(__dirname, "./edge-cases/no-script.vue");
      expect(fileTest(filename)).toBe(false);
    });

    test("handles files with empty script block", () => {
      const filename = path.join(__dirname, "./edge-cases/empty-script.vue");
      expect(fileTest(filename)).toBe(true); // Has lang="ts"
    });

    test("handles syntax errors gracefully", () => {
      const filename = path.join(__dirname, "./edge-cases/syntax-error.vue");
      expect(fileTest(filename)).toBe(true); // Should still detect lang="ts"
    });

    test("returns false for non-Vue files", () => {
      const filename = path.join(__dirname, "./index.js");
      expect(fileTest(filename)).toBe(false);
    });
  });

  describe("Script extraction and transformation", () => {
    test("extracts TypeScript from Vue SFC correctly", () => {
      const filename = path.join(__dirname, "./xml-valid-ts/input.vue");
      const code = fs.readFileSync(filename, "utf8");
      const { script, scriptSetup } = parse(code).descriptor;
      
      expect(script || scriptSetup).toBeDefined();
      if (script) {
        expect(script.lang).toBe("ts");
        expect(script.content).toContain("ref");
      }
      if (scriptSetup) {
        expect(scriptSetup.lang).toBe("ts");
        expect(scriptSetup.content).toContain("ref");
      }
    });

    test("transforms pure TypeScript code correctly", () => {
      const filename = path.join(__dirname, "./script-only/typescript.ts");
      const code = fs.readFileSync(filename, "utf8");
      
      const result = transformSync(code, {
        filename,
        presets: [["@babel/preset-typescript"]]
      });

      expect(result).toBeDefined();
      expect(result.code).toBeDefined();
      expect(result.code).not.toContain(": number");
      expect(result.code).not.toContain(": string");
      expect(result.code).not.toContain("interface User");
      expect(result.code).toContain("ref");
    });

    test("preset correctly identifies TypeScript Vue files", () => {
      const filename = path.join(__dirname, "./xml-valid-ts/input.vue");
      expect(fileTest(filename)).toBe(true);
      
      const filenameJs = path.join(__dirname, "./xml-valid-js/input.vue");
      expect(fileTest(filenameJs)).toBe(false);
    });

    test("handles preset options", () => {
      const filename = path.join(__dirname, "./script-only/typescript.ts");
      const code = fs.readFileSync(filename, "utf8");
      
      const result = transformSync(code, {
        filename,
        presets: [["@babel/preset-typescript", { allowNamespaces: false }]]
      });

      expect(result).toBeDefined();
    });
  });

  describe("Error handling", () => {
    test("handles malformed Vue files", () => {
      expect(() => {
        fileTest("/nonexistent/file.vue");
      }).toThrow();
    });

    test("handles transformation errors gracefully", () => {
      const code = "const invalid: UnknownType = 123;";
      
      expect(() => {
        transformSync(code, {
          filename: "test.ts",
          presets: [["@babel/preset-typescript"]]
        });
      }).not.toThrow();
    });
  });
});
