/**
 * This program and the accompanying materials are made available and may be used, at your option, under either:
 * * Eclipse Public License v2.0, available at https://www.eclipse.org/legal/epl-v20.html, OR
 * * Apache License, version 2.0, available at http://www.apache.org/licenses/LICENSE-2.0
 *
 * SPDX-License-Identifier: EPL-2.0 OR Apache-2.0
 *
 * Copyright Contributors to the Zowe Project.
 */

// getSecureVals: true

import {
  IProfArgAttrs,
  IProfOpts,
  ProfileInfo,
  Session,
} from "@zowe/imperative";
import { trueCasePathSync } from "true-case-path";
import { env, window, workspace } from "vscode";

declare const __webpack_require__: typeof require;
declare const __non_webpack_require__: typeof require;

export async function getSession(profileType: string): Promise<Session> {
  const profAttrs = await getProfileAttrs(profileType);
  return ProfileInfo.createSession(profAttrs);
}

// https://github.com/zowe/vscode-extension-for-zowe/commit/f47416e8e274d8d453f6e6468872b62ecf1f7a1d

export async function getProfileAttrs(
  profileType: string
): Promise<IProfArgAttrs[]> {
  // Require Keytar which is a dependency for loading secure credentials from OS vault.
  // See https://code.visualstudio.com/api/advanced-topics/remote-extensions#persisting-secrets
  // for the `getNodeModule` code which loads the Keytar module bundled with VS Code.
  const keytar: NodeModule | undefined = getNodeModule<NodeModule>("keytar");

  const attrs: IProfArgAttrs[] = [];

  const opts: IProfOpts = {};

  if (keytar != null) {
    opts.requireKeytar = () => keytar;
  }

  const profInfo = new ProfileInfo("zowe", opts);

  // Find the root path of the active VS Code workspace and look for team config there.
  // On Windows, the drive casing must be fixed to normalize the path.
  let rootPath;

  if (workspace.workspaceFolders) {
    rootPath = workspace.workspaceFolders[0].uri.fsPath;
  }

  await profInfo.readProfilesFromDisk({
    projectDir: rootPath ? trueCasePathSync(rootPath) : undefined,
  });

  const profAttrs = profInfo.getDefaultProfile(profileType);
  // const profile: IProfile = {};

  const promptFor = new Map<string, null>([
    ["host", null],
    ["port", null],
    ["user", null],
    ["password", null],
    ["rejectUnauthorized", null],
  ]);

  console.log(`Team config is: ${profInfo.usingTeamConfig}`);

  // Default profile exists
  if (profAttrs != null) {
    console.log(
      `Default profile exists for '${profileType}', named: '${profAttrs.profName}'`
    );
    try {
      const mergedArgs = profInfo.mergeArgsForProfile(profAttrs, {
        getSecureVals: true,
      });

      attrs.push(...mergedArgs.knownArgs);

      for (const arg of mergedArgs.missingArgs) {
        // rejectUnauthorized has a default argValue of `true`; however, we'll still prompt the user for it.
        if (promptFor.has(arg.argName)) {
          const argValue = await promptForValue(arg);
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
          (arg as any).argValue = argValue;
          attrs.push(arg);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
  // Default profile does not exist
  else {
    console.log(`No default profile exists for '${profileType}'`);
    try {
      // NOTE(Kelosky): this fails for old profile types where none exist.
      const mergedArgs = profInfo.mergeArgsForProfileType(profileType, {
        getSecureVals: true,
      });

      for (const arg of mergedArgs.missingArgs) {
        if (promptFor.has(arg.argName)) {
          const argValue = await promptForValue(arg);
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
          (arg as any).argValue = argValue;
          attrs.push(arg);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  return attrs;
}

// /**
//  * Load properties for the default Zowe CLI profile of a given type.
//  * @param profileType The type of profile (e.g., "zosmf")
//  * @returns Profile object with property names and values defined
//  */
// export async function getDefaultProfile(profileType: string): Promise<IProfile> {
//     // Require Keytar which is a dependency for loading secure credentials from OS vault.
//     // See https://code.visualstudio.com/api/advanced-topics/remote-extensions#persisting-secrets
//     // for the `getNodeModule` code which loads the Keytar module bundled with VS Code.
//     const keytar: NodeModule | undefined = getNodeModule<NodeModule>("keytar");

//     const opts: IProfOpts = {};

//     if (keytar != null) {
//         opts.requireKeytar = () => keytar;
//     }

//     const profInfo = new ProfileInfo("zowe", opts);

//     // Find the root path of the active VS Code workspace and look for team config there.
//     // On Windows, the drive casing must be fixed to normalize the path.
//     let rootPath;

//     if (workspace.workspaceFolders) {
//         rootPath = workspace.workspaceFolders[0].uri.fsPath;
//     }

//     await profInfo.readProfilesFromDisk({ projectDir: rootPath ? trueCasePathSync(rootPath) : undefined });

//     const profAttrs = profInfo.getDefaultProfile(profileType);
//     const profile: IProfile = {};

//     const promptFor = new Map<string, null>([["host", null], ["port", null], ["user", null], ["password", null], ["rejectUnauthorized", null]]);

//     console.log(`Team config is: ${profInfo.usingTeamConfig}`);

//     // Default profile exists
//     if (profAttrs != null) {
//         console.log(`Default profile exists for '${profileType}', named: '${profAttrs.profName}'`);
//         try {
//             const mergedArgs = profInfo.mergeArgsForProfile(profAttrs, { getSecureVals: true });

//             for (const arg of mergedArgs.knownArgs) {
//                 profile[arg.argName] = arg.argValue;
//             }

//             for (const arg of mergedArgs.missingArgs) {

//                 // rejectUnauthorized has a default argValue of `true`; however, we'll still prompt the user for it.
//                 if (promptFor.has(arg.argName)) {
//                     profile[arg.argName] = await promptForValue(arg);
//                 }

//             }

//         } catch (err) {
//             console.log(err);
//         }

//     }
//     // Default profile does not exist
//     else {
//         console.log(`No default profile exists for '${profileType}'`);
//         try {
//             // NOTE(Kelosky): this fails for old profile types where none exist.
//             const mergedArgs = profInfo.mergeArgsForProfileType(profileType, { getSecureVals: true });

//             for (const arg of mergedArgs.missingArgs) {
//                 profile[arg.argName] = await promptForValue(arg);
//             }
//         } catch (err) {
//             console.log(err);
//         }
//     }

//     return profile;
// }

async function promptForValue(arg: IProfArgAttrs) {
  console.log(`Prompting for ${arg.argName} of type ${arg.dataType}`);

  let response;
  switch (arg.dataType) {
    case "string":
    case "number":
      // Show an input box in VS Code to prompt the user for a string or number
      response = await window.showInputBox({
        prompt: `Enter a ${arg.dataType} value for "${arg.argName}"`,
        value: arg.argValue?.toString(),
        password: arg.secure,
      });
      response =
        arg.dataType === "number" && response != null
          ? parseInt(response, 10)
          : response;
      break;

    case "boolean":
      // Show a "quick pick" in VS Code to prompt the user for a boolean value
      response = await window.showQuickPick(
        arg.argValue ? ["true", "false"] : ["false", "true"],
        {
          placeHolder: `Select a boolean value for "${arg.argName}"`,
        }
      );
      response = response === "true" ? true : false;
      break;
    default:
      throw new Error(`Unsupported data type: ${arg.dataType}`);
  }

  return response;
}

function getNodeModule<T>(moduleName: string): T | undefined {
  const r =
    typeof __webpack_require__ === "function"
      ? __non_webpack_require__
      : require;
  try {
    return r(`${env.appRoot}/node_modules.asar/${moduleName}`) as T;
  } catch (err) {
    // Not in ASAR.
  }
  try {
    return r(`${env.appRoot}/node_modules/${moduleName}`) as T;
  } catch (err) {
    // Not available.
  }
  return undefined;
}
