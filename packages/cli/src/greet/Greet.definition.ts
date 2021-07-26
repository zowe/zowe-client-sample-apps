/**
 * This program and the accompanying materials are made available and may be used, at your option, under either:
 * * Eclipse Public License v2.0, available at https://www.eclipse.org/legal/epl-v20.html, OR
 * * Apache License, version 2.0, available at http://www.apache.org/licenses/LICENSE-2.0
 *
 * SPDX-License-Identifier: EPL-2.0 OR Apache-2.0
 *
 * Copyright Contributors to the Zowe Project.
 */

import { ICommandDefinition } from "@zowe/imperative";
import { UserDefinition } from "./user/User.definition";
import { SampleSessionUtils } from "../SampleSessionUtils";

const GreetDefinition: ICommandDefinition = {
  name: "greet",
  summary: "Greet command",
  description: "Calls service for a greeting on an optional name",
  type: "group",
  children: [UserDefinition],
  passOn: [
    {
      property: "options",
      value: SampleSessionUtils.SAMPLE_CONNECTION_OPTIONS,
      merge: true,
      ignoreNodes: [{ type: "group" }],
    },
  ],
};

export = GreetDefinition;
