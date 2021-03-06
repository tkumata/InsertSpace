import {window, Selection, Position} from 'vscode';

export default class TabConverter {
    public convertTabToSpace() {
        let editor = window.activeTextEditor,
            options = editor.options,
            document = editor.document,
            startPos = new Position(0, 0),
            endPos = new Position(document.lineCount - 1, 10000),
            selection = new Selection(startPos, endPos),
            text = document.getText(),
            newText = '';
        
        editor.edit(edit => {
            // create spaces as same as number of tabSize
            let replaceValue = '';
            for (let i = 0; i  < options.tabSize ; i++) {
                replaceValue += " ";
            }
            
            // replace all tabs to space
            newText = text.replace(/\t/g, replaceValue);
            
            // コードシフトで変換する
            function toHalf(match) {
                return String.fromCharCode(match.charCodeAt(0) - 0xFEE0);
            }
            newText = newText.replace(/[！-～]/g, toHalf);
            
            // コードシフトで対応できないものを個別で変換
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
        }).then(bool=> {
            if (bool) {
                console.log('executed sucessfully.');
            } else {
                console.log('failed.');
            }
        });
    }
    
    public toggleTabSpace() {
        let options = window.activeTextEditor.options;
        if (options.insertSpaces) {
            window.activeTextEditor.options = { tabSize: options.tabSize, insertSpaces: false };
        } else {
            window.activeTextEditor.options = { tabSize: options.tabSize, insertSpaces: true };
        }
    }
}
