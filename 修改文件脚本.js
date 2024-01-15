const fs = require("fs");

const folderPath = "D:\\work-space\\git-work-projects"; // 要搜索的目录
const target = ".git"; // 要修改的文件所在的文件夹
const targetFile = "config"; // 要修改的文件
const ignoreList = ["node_modules", "dist", "beta", ".svn", ".vscode"]; // 忽略搜索的目录
let dirRes = []; // 找到的所有要修改的文件夹
const oldText = "ssh://git@10.228.161.225:8888"; // 原始内容
const newText = "http://10.228.161.225"; // 修改后的内容

function findGit(path) {
  if (!fs.statSync(path).isDirectory()) {
    return;
  }
  const files = fs
    .readdirSync(path)
    .filter((item) => !ignoreList.includes(item));
  const index = files.indexOf(target);
  if (index > -1) {
    dirRes.push(path + `\\${files[index]}`);
  } else {
    files.forEach((item) => {
      findGit(path + `\\${item}`);
    });
  }
}

function editGit(result) {
  result.forEach((path) => {
    const configPath = path + "\\" + targetFile;
    fs.readFile(configPath, "utf8", (err, data) => {
      if (err) throw err;
      // 对文件内容进行修改
      const modifiedData = data.replace(oldText, newText);
      // 将修改后的内容写入文件
      fs.writeFile(configPath, modifiedData, "utf8", (err) => {
        if (err) throw err;
        console.log(configPath + "    文件已成功修改！");
      });
    });
  });
}

findGit(folderPath);
console.log("结果:\n", dirRes);
// 确认结果没问题后，手动复制结果，防止出错
const result = [];
editGit(result);
