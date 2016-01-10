// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
// import * as vscode from 'vscode';
var vscode_1 = require('vscode');
var tabConverter_1 = require('./tabConverter');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "insertspace" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    var disposable = vscode_1.commands.registerCommand('extension.sayHello', function () {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        // vscode.window.showInformationMessage('Hello World!');
        var tabConverter = new tabConverter_1.default();
        tabConverter.convertTabToSpace();
        // window.showInformationMessage('All tabs had been converted to spaces!');
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map