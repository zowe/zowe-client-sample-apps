/*
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright Contributors to the Zowe Project.
 *
 */
import config = require("../imperative");

describe("imperative config", () => {
  // Will fail if imperative config object is changed. This is a sanity/protection check to ensure that any
  // changes to the configuration document are intended.
  it("config should match expected values", () => {
    expect(config.name).toBe("sample");
    expect(config.pluginHealthCheck).toContain("healthCheck.handler");
    expect(config.pluginSummary).toBe("Sample plugin");
    expect(config.productDisplayName).toBe("Sample");
    expect(config.rootCommandDescription).toContain(
      "Sample plugin which calls sample REST API"
    );
    expect(config.profiles).toBeDefined();
  });
});
