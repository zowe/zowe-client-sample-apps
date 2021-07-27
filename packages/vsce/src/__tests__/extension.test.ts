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
