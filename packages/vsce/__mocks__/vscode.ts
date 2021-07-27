// vscode api mock
const vscode = {
    _commands: new Map<string, () => void>(),
    commands: {
        executeCommand: (command: string) => {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            vscode._commands.get(command)!();
        },
        registerCommand: (command: string, fn: () => void) => {
            vscode._commands.set(command, fn);
        },
    },
    window: {
        showInformationMessage: jest.fn(() => {
            // do nothing
        })
    }

};

module.exports = vscode