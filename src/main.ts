import * as core from '@actions/core';
import * as exec from '@actions/exec';

async function setPrivate(): Promise<number> {
  let repo = core.getInput("repo")
  core.info(`Setting up Go private modules for repo prefix '${repo}'`);

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
