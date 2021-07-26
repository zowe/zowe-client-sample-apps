/**
 * SPDX-License-Identifier: MIT
 *
 * The original repository for the VS Code Extension can be found here: https://github.com/microsoft/vscode-generator-code/tree/main/generators/app/templates/ext-command-ts
 *
 * The original license for the VS Code Extension can be found here: https://github.com/microsoft/vscode-generator-code/blob/main/LICENSE
 */

import * as path from "path";
import * as Mocha from "mocha";
import * as glob from "glob";

export function run(): Promise<void> {
  // Create the mocha test
  const mocha = new Mocha({
    ui: "tdd",
    color: true,
  });

  const testsRoot = path.resolve(__dirname, "..");

  return new Promise((c, e) => {
    glob("**/**.test.js", { cwd: testsRoot }, (err, files) => {
      if (err) {
        return e(err);
      }

      // Add files to the test suite
      files.forEach((f) => mocha.addFile(path.resolve(testsRoot, f)));

      try {
        // Run the mocha test
        mocha.run((failures) => {
          if (failures > 0) {
            e(new Error(`${failures} tests failed.`));
          } else {
            c();
          }
        });
      } catch (err) {
        console.error(err);
        e(err);
      }
    });
  });
}
