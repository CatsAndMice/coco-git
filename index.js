#!/usr/bin/env zx
const inquirer = require('inquirer');
const fs = require('fs');
const { $ } = require('zx');
const getPkgPath = require('./getPkgPath');
const { isFunc } = require('medash');

const writePkg = ({ pkgPath, pkg, callBack }) => {
    fs.writeFile(pkgPath, String(JSON.stringify(pkg, null, 2)), 'utf8', async (error) => {
        if (error) {
            return;
        }
        isFunc(callBack) ? callBack() : null
    });
}

const shell = async ({ list, branch }) => {
    await $`git add .`;
    await $`git commit -m ${list}`;
    await $`git push origin release: ${branch}`;
    try {
        await $`git tag ${list}`;
        await $`git push origin ${list}`;
        //发版失败，回退版本
    } catch (error) {
        await $`git tag -d ${list}`;
        await $`git push origin :refs/tags/${list}`;
    }
}

const getBranch = async () => {
    let branch = await $`git branch`;
    const { stdout } = branch;
    const reg = /\*\D(.+)\D/g;
    branch = (reg.exec(stdout))[1];
}

const createAndPushTag = async ({ isUpdateVersion }) => {
    const pkgPath = await getPkgPath()
    const pkg = require(pkgPath)
    const version = pkg.version;
    const reg = /([1-9]+)\.([0-9]+)\.([0-9]+)(?:(\-\w*)\.([1-9]+))?/g
    const execs = reg.exec(version)
    const addOne = (num) => Number(num) + 1;
    const getVersion = ([major, minor, patch]) => `v${major}.${minor}.${patch}`
    const branch = await getBranch()
    const getVersions = () => {
        const ZERO = 0
        return [
            getVersion([addOne(execs[1]), execs[2], ZERO]),
            getVersion([execs[1], addOne(execs[2]), ZERO]),
            getVersion([execs[1], execs[2], addOne(execs[3])])
        ]
    }

    const getBetaVersionLists = (beta) => ([
        getVersion([execs[1], execs[2], execs[3]]),
        getVersion([execs[1], execs[2], execs[3]]) + `${beta}.${addOne(execs[5])}`
    ])

    const onSelectVersion = async () => {
        const beta = execs[4];
        const lists = beta ? getBetaVersionLists(beta) : getVersions();
        inquirer.prompt([{
            name: 'list',
            type: 'list',
            message: '请选择发布的版本:',
            choices: lists,
            default: [lists[0]]
        }]).then(async ({ list }) => {
            pkg.version = list.replace('v', '')
            writePkg({ pkgPath, pkg, callBack: shell.bind(null, { list, branch }) })
        })
    }

    isUpdateVersion ? onSelectVersion() : shell({ list: 'v' + version, branch })
}

module.exports = {
    createAndPushTag
}




