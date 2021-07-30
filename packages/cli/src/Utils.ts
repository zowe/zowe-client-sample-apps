/**
 * This program and the accompanying materials are made available and may be used, at your option, under either:
 * * Eclipse Public License v2.0, available at https://www.eclipse.org/legal/epl-v20.html, OR
 * * Apache License, version 2.0, available at http://www.apache.org/licenses/LICENSE-2.0
 *
 * SPDX-License-Identifier: EPL-2.0 OR Apache-2.0
 *
 * Copyright Contributors to the Zowe Project.
 */

import { ICommandProfileTypeConfiguration } from "@zowe/imperative";

export class Utils {
  public static async getProfileMeta(): Promise<
    ICommandProfileTypeConfiguration[]
  > {
    // TODO(Kelosky): resolve lint problems
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-var-requires
    return (await require("./imperative")
      .profiles) as ICommandProfileTypeConfiguration[];
  }
}
