# API

```typescript
import { ISession, Session } from "@zowe/imperative";
import { Greeting } from "./Greeting";

(async () => {
  const config: ISession = {
    hostname: "localhost",
    port: 10080,
    user: "zowe",
    password: "zowe",
    protocol: "https",
    type: "basic",
    rejectUnauthorized: false,
  };

  const session: Session = new Session(config);

  const resp = await Greeting.greet(session, "World");
  console.log(resp);
})();

```