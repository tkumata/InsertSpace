var vscode_1 = require('vscode');
var TabConverter = (function () {
    function TabConverter() {
    }
    TabConverter.prototype.convertTabToSpace = function () {
        var editor = vscode_1.window.activeTextEditor, options = editor.options, document = editor.document, startPos = new vscode_1.Position(0, 0), endPos = new vscode_1.Position(document.lineCount - 1, 10000), selection = new vscode_1.Selection(startPos, endPos), text = document.getText(), newText = '';
        editor.edit(function (edit) {
            // create spaces as same as number of tabSize
            var replaceValue = '';
            for (var i = 0; i < options.tabSize; i++) {
                replaceValue += " ";
            }
            // replace all tabs to space
            newText = text.replace(/\t/g, replaceValue);
            // 全角を文字コードの移動で変換する
            newText = newText.replace(/[！-～]/g, toHalf);
            function toHalf(match) {
                //
                return String.fromCharCode(match.charCodeAt(0) - 0xFEE0);
            }
            // 文字コードの引き算で対応できないものを個別で変換
            newText = newText.replace(/”/g, "\"")
                .replace(/’/g, "'")
                .replace(/‘/g, "`")
                .replace(/＼/g, "\\")
                .replace(/　/g, " ")
                .replace(/〜/g, "~");
            // 特定箇所に空白文字を挿入
            newText = newText.replace(/([^\x01-\x7E])([0-9a-z])/ig, "$1 $2")
                .replace(/([0-9a-z])([^\x01-\x7E])/ig, "$1 $2");
            // 編集画面に反映させる
            edit.replace(selection, newText);
            editor.selections = [selection];
        }).then(function (bool) {
            if (bool) {
                console.log('executed sucessfully.');
            }
            else {
                console.log('failed.');
            }
        });
    };
    TabConverter.prototype.toggleTabSpace = function () {
        var options = vscode_1.window.activeTextEditor.options;
        if (options.insertSpaces) {
            vscode_1.window.activeTextEditor.options = { tabSize: options.tabSize, insertSpaces: false };
        }
        else {
            vscode_1.window.activeTextEditor.options = { tabSize: options.tabSize, insertSpaces: true };
        }
    };
    return TabConverter;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TabConverter;
//# sourceMappingURL=tabConverter.js.map