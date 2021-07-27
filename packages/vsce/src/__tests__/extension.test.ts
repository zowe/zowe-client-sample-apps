/**
 * This program and the accompanying materials are made available and may be used, at your option, under either:
 * * Eclipse Public License v2.0, available at https://www.eclipse.org/legal/epl-v20.html, OR
 * * Apache License, version 2.0, available at http://www.apache.org/licenses/LICENSE-2.0
 *
 * SPDX-License-Identifier: EPL-2.0 OR Apache-2.0
 *
 * Copyright Contributors to the Zowe Project.
 */

jest.mock("vscode");
import * as vscode from "vscode";

describe("extension tests", () => {
    it("should call our registered command handler and display an informational message", async () => {

        // register command
        vscode.commands.registerCommand("vsce.helloWorld", () => {
            void vscode.window.showInformationMessage("Hello World from vsce!")
        });

        // call it
        await vscode.commands.executeCommand("vsce.helloWorld");

        // assert it displayed its message
        expect(vscode.window.showInformationMessage).toBeCalledWith("Hello World from vsce!");
    });

});
