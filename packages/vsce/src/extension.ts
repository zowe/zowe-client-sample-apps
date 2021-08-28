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
import { Utils } from "@zowe/sample-for-zowe-cli";
import { ZoweVsCodeExtension } from "@zowe/zowe-explorer-api";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(
  context: vscode.ExtensionContext
): Promise<void> {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "vsce" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const zoweExplorerApi = ZoweVsCodeExtension.getZoweExplorerApi("1.17.0");

  if (zoweExplorerApi) {
    // TODO(Kelosky): this APIs seem to be not working.
    console.log(`Registering to Zowe Explorer`);
    const meta = await Utils.getProfileMeta();
    await zoweExplorerApi.getExplorerExtenderApi().initForZowe("sample", meta);
  }

  const disposable = vscode.commands.registerCommand(
    "vsce.helloWorld",

    async () => {
      console.log(`Fallback to get profiles`);
      const user = (await vscode.window.showInputBox({
        // Prompt for InputBox for the user to Enter his Name
        prompt: "Enter Name ",
        placeHolder: "Enter your name ",
      })) as string;
      try {
        const session = await getSession("sample");
        const resp = await Greeting.greet(session);
        // The content called from Zowe Sample API Service Greeting API
        const data = resp.content;
        // Extracting "Hello" from the content
        const subdata = data.substr(0, 5) + data[6];
        if (user === "") {
          // Prints "Hello User" if no name has been entered by the user
          void vscode.window.showInformationMessage(subdata + "User");
        } else {
          // Prints "Hello" along with the user input(name)
          void vscode.window.showInformationMessage(subdata + user);
        }
        // Handle the error that may occur and inform the user on what he needs to do
      } catch (err) {
        return vscode.window.showErrorMessage(
          "Error! You need to have [Zowe Sample API Service](https://github.com/zowe/sample-spring-boot-api-service/blob/master/zowe-rest-api-sample-spring/README.md) running, You also need to open a config folder which can be found in the worskpace folder containing [zowe.config.json](https://github.com/zowe/zowe-client-sample-apps/blob/master/zowe.config.json) and [zowe.schema.json](https://github.com/zowe/zowe-client-sample-apps/blob/master/zowe.schema.json) files"
        );
      }
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate(): void {
  // do nothing
}
