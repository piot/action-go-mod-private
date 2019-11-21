import * as core from '@actions/core';
import * as exec from '@actions/exec';

async function setPrivate(): Promise<number> {
  let repo = core.getInput("repo")
  core.info(`Setting up Go private modules for repo prefix '${repo}'`);

  const username = core.getInput("username")
  const token = core.getInput("token")
  
  await exec.exec(`go env -w GOPRIVATE="${repo}"`)
  return exec.exec(`echo "machine github.com login ${username} password ${token}" > $HOME/.netrc`)
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
