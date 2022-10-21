"use strict";

/*
Практическое задание
По ссылке вы найдёте файл с логами запросов к серверу весом более 2 Гб. Напишите программу, которая находит в этом файле все записи с ip-адресами
89.123.1.41 и 34.48.240.111, а также сохраняет их в отдельные файлы с названием %ip-адрес%_requests.log
*/

import fs from "fs";
import readline from "readline";
import colors from "colors";

const reIp1 = /89.123.1.41/;
const reIp2 = /34.48.240.111/;

const readingAndWritingToFiles = () => {
  if (fs.existsSync("./%89.123.1.41%_requests.log")) {
    fs.truncate("./%89.123.1.41%_requests.log", (err) => {
      if (err) throw err;
      console.log(
        colors.green("File %89.123.1.41%_requests.log cleared successfully")
      );
    });
  }

  if (fs.existsSync("./%34.48.240.111%_requests.log")) {
    fs.truncate("./%34.48.240.111%_requests.log", (err) => {
      if (err) throw err;
      console.log(
        colors.green("File %34.48.240.111%_requests.log cleared successfully")
      );
    });
  }

  const readStream = fs.createReadStream("./access_tmp.log.txt", "utf-8");
  const rl = readline.createInterface({ input: readStream });
  rl.on("line", (line) => {
    if (line.match(reIp1)) {
      fs.writeFile(
        "./%89.123.1.41%_requests.log",
        line + "\n",
        { flag: "a" },
        function (err) {
          if (err) {
            return console.log(err);
          }
        }
      );
    } else if (line.match(reIp2)) {
      fs.writeFile(
        "./%34.48.240.111%_requests.log",
        line + "\n",
        { flag: "a" },
        function (err) {
          if (err) {
            return console.log(err);
          }
        }
      );
    }
  });

  rl.on("error", (error) => console.log(error.message));
  rl.on("close", () => {
    console.log(
      colors.blue("Files read/write operation completed successfully")
    );
  });
};

readingAndWritingToFiles();
