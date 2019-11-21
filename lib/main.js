"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const exec = __importStar(require("@actions/exec"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
function setPrivate() {
    return __awaiter(this, void 0, void 0, function* () {
        let repo = core.getInput("repo");
        core.info(`Setting up Go private modules for repo prefix '${repo}'`);
        const username = core.getInput("username");
        const password = core.getInput("token");
        const content = `machine github.com login ${username} password ${password}`;
        const netrcFile = path.join(process.env.HOME, ".netrc");
        core.info(`writing ${netrcFile} with ${content}`);
        fs.writeFileSync(netrcFile, content);
        return exec.exec(`go env -w GOPRIVATE="${repo}"`);
    });
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const exitCode = yield setPrivate();
            if (exitCode != 0) {
                core.setFailed("sorry, couldn't set go repo prefix to private");
            }
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
