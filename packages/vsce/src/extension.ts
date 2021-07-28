/**
 * This program and the accompanying materials are made available and may be used, at your option, under either:
 * * Eclipse Public License v2.0, available at https://www.eclipse.org/legal/epl-v20.html, OR
 * * Apache License, version 2.0, available at http://www.apache.org/licenses/LICENSE-2.0
 *
 * SPDX-License-Identifier: EPL-2.0 OR Apache-2.0
 *
 * Copyright Contributors to the Zowe Project.
 */

/**
 * SPDX-License-Identifier: MIT
 *
 * The original repository for the VS Code Extension can be found here: https://github.com/microsoft/vscode-generator-code/tree/main/generators/app/templates/ext-command-ts
 *
 * The original license for the VS Code Extension can be found here: https://github.com/microsoft/vscode-generator-code/blob/main/LICENSE
 */

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { getSession } from "./profiles";
import { Greeting } from "@zowe/sample-for-zowe-sdk";
import {  Utils } from "@zowe/sample-for-zowe-cli";
import { ZoweExplorerApi, ZoweVsCodeExtension } from "@zowe/zowe-explorer-api";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext): Promise<void> {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "vsce" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const zoweExplorerApi = ZoweVsCodeExtension.getZoweExplorerApi("1.17.0");

  if (zoweExplorerApi) {

    console.log(`Registering to Zowe Explorer`);
    const meta = await Utils.getProfileMeta();
    await zoweExplorerApi.getExplorerExtenderApi().initForZowe("sample", meta);
    await zoweExplorerApi.getExplorerExtenderApi().reloadProfiles();

    // TODO(Kelosky): how to get profile here?

  }
  // else {
  //   // The code you place here will be executed every time your command is executed
  //   // Display a message box to the user
  //   console.log(`Fallback to get profiles`);

  //   // TODO(Kelosky): optionally get the profile + session from Zowe Explorer
  //   const session = await getSession("sample");
  //   const resp = await Greeting.greet(session);
  //   void vscode.window.showInformationMessage(resp.content);
  // }

  const disposable = vscode.commands.registerCommand("vsce.helloWorld", async () => {
    console.log(`Fallback to get profiles`);
    const session = await getSession("sample");
    const resp = await Greeting.greet(session);
    void vscode.window.showInformationMessage(resp.content);

  });

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate(): void {
  // do nothing
}
