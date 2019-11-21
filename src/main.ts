import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as fs from 'fs';
import * as path from 'path';

async function setPrivate(): Promise<number> {
  let repo = core.getInput("repo")
  core.info(`Setting up Go private modules for repo prefix '${repo}'`);

  const username = core.getInput("token")
  const password = "x-oauth-basic"

  const content = `machine github.com login ${username} password ${password}`
  const netrcFile = path.join(process.env.HOME as string, ".netrc");
  core.info(`writing ${netrcFile} with ${content}`)
  fs.writeFileSync(netrcFile, content)
  
  return exec.exec(`go env -w GOPRIVATE="${repo}"`)
}

async function run() {
  try {
    const exitCode = await setPrivate();
    if (exitCode != 0) {
      core.setFailed("sorry, couldn't set go repo prefix to private")
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
