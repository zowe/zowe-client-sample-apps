/**
 * This program and the accompanying materials are made available and may be used, at your option, under either:
 * * Eclipse Public License v2.0, available at https://www.eclipse.org/legal/epl-v20.html, OR
 * * Apache License, version 2.0, available at http://www.apache.org/licenses/LICENSE-2.0
 *
 * SPDX-License-Identifier: EPL-2.0 OR Apache-2.0
 *
 * Copyright Contributors to the Zowe Project.
 */

import * as path from "path";
import { ICommandDefinition } from "@zowe/imperative";

export const UserDefinition: ICommandDefinition = {
  name: "user",
  aliases: ["u"],
  summary: "User",
  description: "User to greet",
  type: "command",
  handler: path.join(__dirname, "User.handler"),
  positionals: [
    {
      name: "name",
      type: "string",
      description: "Name to greet",
      required: false,
    },
  ],
  options: [],
  profile: {
    optional: ["sample"],
  },
  examples: [
    {
      options: `John --host hostname`,
      description: "Greet John",
    },
  ],
};
