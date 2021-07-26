/**
 * SPDX-License-Identifier: MIT
 *
 * The original repository for the VS Code Extension can be found here: https://github.com/microsoft/vscode-generator-code/tree/main/generators/app/templates/ext-command-ts
 *
 * The original license for the VS Code Extension can be found here: https://github.com/microsoft/vscode-generator-code/blob/main/LICENSE
 */

import * as assert from "assert";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from "vscode";
// import * as myExtension from '../../extension';

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

  test("Sample test", () => {
    assert.strictEqual(-1, [1, 2, 3].indexOf(5));
    assert.strictEqual(-1, [1, 2, 3].indexOf(0));
  });
});
