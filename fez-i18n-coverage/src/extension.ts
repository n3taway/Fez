// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs-extra';
import * as path from 'path';

const fileSuffix = ['.js', '.jsx', '.ts', '.tsx'];
const ignoreDir = ['locales','.umi'];


function getAllFiles(dir: string): Array<string> {
	return fs.readdirSync(dir).reduce((files: Array<string>, file) => {
		const name = path.join(dir, file);
		const isDirectory = fs.statSync(name).isDirectory();
		// 忽略指定目录下的文件
		if (isDirectory && ignoreDir.includes(file)) {
			return [...files];
		}
		// 过滤.d.ts
		if (!isDirectory && /\.d\.ts$/.test(file)) {
			return [...files];
		}
		// 过滤文件类型
		if (!isDirectory && !fileSuffix.includes(path.extname(file))) {
			return [...files];
		}
		return isDirectory ? [...files, ...getAllFiles(name)] : [...files, name];
	}, []);
}


function checkCoverage() {
	const rootDirPath = `${vscode.workspace.rootPath}/src`;

	const allFiles = getAllFiles(rootDirPath);

	console.log('fez-i18n-coverage is now active!');
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// This line of code will only be executed once when your extension is activated
	console.log('fez-i18n-coverage is now active!');

	context.subscriptions.push(vscode.commands.registerCommand('fez-i18n-coverage.checkCoverage', checkCoverage));
}

// this method is called when your extension is deactivated
export function deactivate() { }
