import { ICommandProfileTypeConfiguration } from "@zowe/imperative";

export class Utils {
    public static async getProfileMeta(): Promise<ICommandProfileTypeConfiguration[]> {
        // TODO(Kelosky): resolve lint problems
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-var-requires
        return await require("./imperative").profiles as ICommandProfileTypeConfiguration[];
    }
}