/**
 * This program and the accompanying materials are made available and may be used, at your option, under either:
 * * Eclipse Public License v2.0, available at https://www.eclipse.org/legal/epl-v20.html, OR
 * * Apache License, version 2.0, available at http://www.apache.org/licenses/LICENSE-2.0
 *
 * SPDX-License-Identifier: EPL-2.0 OR Apache-2.0
 *
 * Copyright Contributors to the Zowe Project.
 */

import { AbstractSession, ImperativeExpect } from "@zowe/imperative";
import { IGreeting } from "./doc/IGreeting";
import { SampleRestClient } from "./SampleRestClient";

export class Greeting {
  public static readonly QUERY = "?name=";

  public static async greet(
    session: AbstractSession,
    name?: string
  ): Promise<IGreeting> {
    ImperativeExpect.toNotBeNullOrUndefined(
      session,
      "Required session must be defined"
    );

    let url;
    if (session.ISession.basePath == null || session.ISession.basePath === "") {
      url = this.context + this.contentResource;
    } else {
      url = this.contentResource;
    }

    if (name) {
      url = url.concat(this.QUERY, name);
    }

    return SampleRestClient.getExpectJSON<IGreeting>(session, url);
  }

  public static get contentResource(): string {
    return `greeting`;
  }

  public static get context(): string {
    return "api/v1/";
  }
}
