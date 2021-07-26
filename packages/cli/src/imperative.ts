/**
 * This program and the accompanying materials are made available and may be used, at your option, under either:
 * * Eclipse Public License v2.0, available at https://www.eclipse.org/legal/epl-v20.html, OR
 * * Apache License, version 2.0, available at http://www.apache.org/licenses/LICENSE-2.0
 *
 * SPDX-License-Identifier: EPL-2.0 OR Apache-2.0
 *
 * Copyright Contributors to the Zowe Project.
 */

import { IImperativeConfig } from "@zowe/imperative";
import { Constants } from "./Constants";
import { SampleSessionUtils } from "./SampleSessionUtils";

const config: IImperativeConfig = {
  commandModuleGlobs: ["*/*.definition!(.d).*s"],
  pluginHealthCheck: __dirname + "/healthCheck.handler",
  pluginSummary: Constants.PLUGIN_SUMMARY,
  pluginAliases: [Constants.ALIAS],
  rootCommandDescription: Constants.PLUGIN_DESCRIPTION,
  productDisplayName: Constants.DISPLAY_NAME,
  name: Constants.NAME,
  profiles: [
    {
      type: "sample",
      schema: {
        type: "object",
        title: "Sample Profile",
        description:
          "A Sample profile is required to issue commands in the sample command group that interact with the Sample REST API. The Sample " +
          "profile contains your host and port for the sample REST API instance of your choice.",
        properties: {
          host: {
            type: "string",
            optionDefinition: SampleSessionUtils.SAMPLE_OPTION_HOST,
          },
          port: {
            type: "number",
            optionDefinition: SampleSessionUtils.SAMPLE_OPTION_PORT,
          },
          user: {
            type: "string",
            secure: true,
            optionDefinition: SampleSessionUtils.SAMPLE_OPTION_USER,
          },
          password: {
            type: "string",
            secure: true,
            optionDefinition: SampleSessionUtils.SAMPLE_OPTION_PASSWORD,
          },
          basePath: {
            type: "string",
            optionDefinition: SampleSessionUtils.SAMPLE_OPTION_BASE_PATH,
          },
          rejectUnauthorized: {
            type: "boolean",
            optionDefinition:
              SampleSessionUtils.SAMPLE_OPTION_REJECT_UNAUTHORIZED,
          },
          protocol: {
            type: "string",
            optionDefinition: SampleSessionUtils.SAMPLE_OPTION_PROTOCOL,
          },
        },
        required: [],
      },
      createProfileExamples: [
        {
          options:
            "jcl123 --host zos123 --port 1234 --user ibmuser --pass myp4ss",
          description:
            "Create a Sample profile named 'jcl123' to run Sample at host zos123 and port 1234",
        },
      ],
    },
  ],
};

export = config;
