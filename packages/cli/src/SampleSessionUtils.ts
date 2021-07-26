/**
 * This program and the accompanying materials are made available and may be used, at your option, under either:
 * * Eclipse Public License v2.0, available at https://www.eclipse.org/legal/epl-v20.html, OR
 * * Apache License, version 2.0, available at http://www.apache.org/licenses/LICENSE-2.0
 *
 * SPDX-License-Identifier: EPL-2.0 OR Apache-2.0
 *
 * Copyright Contributors to the Zowe Project.
 */

import {
  ICommandOptionDefinition,
  ICommandArguments,
  Logger,
  ISession,
} from "@zowe/imperative";

export class SampleSessionUtils {
  public static SAMPLE_CONNECTION_OPTION_GROUP = "Sample Connection Options";

  public static SAMPLE_OPTION_HOST: ICommandOptionDefinition = {
    name: "host",
    aliases: ["H"],
    type: "string",
    description: "Host name of the Sample API service that is running.",
    required: false,
    group: SampleSessionUtils.SAMPLE_CONNECTION_OPTION_GROUP,
  };

  public static SAMPLE_OPTION_PORT: ICommandOptionDefinition = {
    name: "port",
    aliases: ["P"],
    type: "number",
    description: "Port for the Sample API service that is running.",
    required: false,
    defaultValue: 10080,
    group: SampleSessionUtils.SAMPLE_CONNECTION_OPTION_GROUP,
  };

  public static SAMPLE_OPTION_USER: ICommandOptionDefinition = {
    name: "user",
    aliases: ["u"],
    type: "string",
    description:
      "User name for authenticating connections to the Sample API service that is running.",
    required: false,
    group: SampleSessionUtils.SAMPLE_CONNECTION_OPTION_GROUP,
  };

  public static SAMPLE_OPTION_PASSWORD: ICommandOptionDefinition = {
    name: "password",
    aliases: ["pass", "pw"],
    type: "string",
    description:
      "Password for authenticating connections to the Sample API service that is running.",
    required: false,
    group: SampleSessionUtils.SAMPLE_CONNECTION_OPTION_GROUP,
  };

  public static SAMPLE_OPTION_BASE_PATH: ICommandOptionDefinition = {
    name: "base-path",
    aliases: ["bp"],
    description:
      "The base path for your API mediation layer instance." +
      " Specify this option to prepend the base path to all resources when making REST requests." +
      " Do not specify this option if you are not using an API mediation layer.",
    type: "string",
    group: SampleSessionUtils.SAMPLE_CONNECTION_OPTION_GROUP,
  };

  public static SAMPLE_OPTION_REJECT_UNAUTHORIZED: ICommandOptionDefinition = {
    name: "reject-unauthorized",
    aliases: ["ru"],
    description: "Reject self-signed certificates.",
    type: "boolean",
    defaultValue: true,
    required: false,
    group: SampleSessionUtils.SAMPLE_CONNECTION_OPTION_GROUP,
  };

  public static SAMPLE_OPTION_PROTOCOL: ICommandOptionDefinition = {
    name: "protocol",
    aliases: ["o"],
    description:
      "Specifies protocol to use for Sample connection (http or https).",
    type: "string",
    defaultValue: "https",
    required: false,
    allowableValues: { values: ["http", "https"], caseSensitive: false },
    group: SampleSessionUtils.SAMPLE_CONNECTION_OPTION_GROUP,
  };

  public static SAMPLE_CONNECTION_OPTIONS: ICommandOptionDefinition[] = [
    SampleSessionUtils.SAMPLE_OPTION_HOST,
    SampleSessionUtils.SAMPLE_OPTION_PORT,
    SampleSessionUtils.SAMPLE_OPTION_USER,
    SampleSessionUtils.SAMPLE_OPTION_PASSWORD,
    SampleSessionUtils.SAMPLE_OPTION_BASE_PATH,
    SampleSessionUtils.SAMPLE_OPTION_REJECT_UNAUTHORIZED,
    SampleSessionUtils.SAMPLE_OPTION_PROTOCOL,
  ];

  public static createSessCfgFromArgs(args: ICommandArguments): ISession {
    this.log.debug("Creating a sample session from arguments");
    return {
      hostname: args.host,
      port: args.port,
      user: args.user,
      password: args.password,
      basePath: args.basePath,
      rejectUnauthorized: args.rejectUnauthorized,
      protocol: args.protocol || "https",
    };
  }

  private static get log(): Logger {
    return Logger.getAppLogger();
  }
}
