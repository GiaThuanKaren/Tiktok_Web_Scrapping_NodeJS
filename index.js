var https = require("https");
var fs = require("fs");
const prompt = require("prompt");
const puppeteer = require("puppeteer");
// BQDbi7BNEDZ9xbkDrwjyhfs84wa7E4oCRRzUex7GVmJDHs3RLAiQmcCyxIEDgCCs3Vff-2IQsyaeXb6UlHsoduRF729bGUJSx-_Dd6ROmgHp_eZmZuDSk5Pi5RYe88U_nxxktoQMWrzrlRtmphqPbkAFFJTvZjSisavGCzMmkBWzSd962ZNn0WWjvJujuKvZKQZBvwra22i32_RuGvL4YUoQNt9ZHZ_ICqx4k3ZQNTF4uPSIBi0FuUVb31WSK3N3qdCg3PtFgb1wGM8X3HhDlWcekR9BGxEtrLo4y4SrxSXsSMK3Eqbq8fZWw85iZyRIrs6LQDC4i7fXJ0ECaCUvbjVE3pkG
prompt.start();
async function Main() {
  let flag = true;
  do {
    console.log("Welcome to tikok web scrapping !!!!");
    console.log("Option ");
    console.log(" 1 : Get detail post by id user ( Video , comments )");
    console.log(" 2 : Get video by link short ");
    console.log(" 0 : Exit");
    let { choose } = await prompt.get(["choose"]);
    console.log("Choose path you want to save this files");
    let { path } = await prompt.get(["path"]);

    switch (parseInt(choose)) {
      case 1: {
        console.log("Enter your link detail");
        let { urldetail } = await prompt.get(["urldetail"]);
        await CrawlDetailPost(
          "https://www.tiktok.com/@tiger050794/video/6846643322170215682"
        );
        break;
      }
      case 2: {
        try {
          console.log("Enter your link video on tikok");
          let { url } = await prompt.get(["url"]);
          let pathConverted = path.split("\\").join(`\\\\`);
          console.log(`"${pathConverted}"`, path);
          await download(url, pathConverted);
        } catch (e) {
          console.log(e);
        }
        console.log("Dowloaded file succesfully");
        break;
      }
      case 0: {
        flag = false;
        break;
      }
      default: {
        console.log("Default Case");
        flag = false;

        break;
      }
    }
  } while (flag);
  return;
}

Main();

var download = async function (url, dest, cb) {
  console.log(dest, " where save file");
  var file = fs.createWriteStream(dest);
  var request = https
    .get(url, function (response) {
      response.pipe(file);
      file.on("finish", function () {
        file.close(cb); // close() is async, call cb after close completes.
      });
    })
    .on("error", function (err) {
      // Handle errors
      fs.unlink(dest); // Delete the file async. (But we don't check the result)
      if (cb) cb(err.message);
    });
};
// download(
//   "https://v16-webapp.tiktok.com/a56ed4fa57d658fa15cf7659d9885c47/62d92ed6/video/tos/alisg/tos-alisg-pve-0037/efa1e21f4bd8429fb266566fedf6e4a1/?a=1988&ch=0&cr=0&dr=0&lr=tiktok_m&cd=0%7C0%7C1%7C0&cv=1&br=2472&bt=1236&btag=80000&cs=0&ds=3&ft=eXd.6Hk_Myq8Zzjnnwe2NQVQml7Gb&mime_type=video_mp4&qs=0&rc=PDU3NTVnZ2ZmZTM6ZTg5N0BpanlpNTs6ZmU0ZTMzODgzNEAyMWAvNF80Xy0xLjI2LmEtYSNfZ2ExcjRfai9gLS1kLy1zcw%3D%3D&l=202207210447160102450110690D0159CC",
//   "D:\\web-practise\\Tailwindcss\\k.mp4",
//   (e) => {
//     if (e) console.log(e);
//     else console.log("Done");
//   }
// );
// https://www.tiktok.com/@infnity_mcu/video/7106899629664472321?is_copy_url=1&is_from_webapp=v1&q=natural&t=1658381477162
// D:\\web-practise\\Tailwindcss\\sample.mp4
// https://v16-webapp.tiktok.com/dcba868c80d21113324be8169a38e93c/62d9bb91/video/tos/alisg/tos-alisg-pve-0037/ab81b3facffd4101915a2d219cca91c7/?a=1988&ch=0&cr=0&dr=0&lr=tiktok_m&cd=0%7C0%7C1%7C0&cv=1&br=2218&bt=1109&btag=80000&cs=0&ds=3&ft=TkXt216WvjVQ96d3ZSTsddcw4i_a7uwQAM7edvcya9&mime_type=video_mp4&qs=0&rc=NzppaDtpNGk6N2Q4ZjtkN0BpajlzaWQ6Znc2ZTMzODgzNEAxYTMyNWJiNWExYzFgNC1fYSNfbnBxcjRfYi9gLS1kLy1zcw%3D%3D&l=202207211447430102451332071E2833CD
async function CrawlComment(PageInstance) {
  //  class Comment tiktok-q9aj5z-PCommentText e1g2efjf6 span
  // class subcomment tiktok-1oxhn3k-PReplyActionText eo72wou4
}
async function CrawlDetailPost(urlDetailPost) {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(urlDetailPost);
    let dataFromPage = await page.evaluate(() => {
      let SubCommentList = document.querySelectorAll(
        ".tiktok-q9aj5z-PCommentText.e1g2efjf6 span"
      );
      let ListMainCommnent = document.querySelectorAll(
        ".tiktok-16r0vzi-DivCommentItemContainer.eo72wou0"
      );
      let videoLink = document.querySelector(".xgplayer-container video").getAttribute("src")
      return {
        ListComment : ListMainCommnent.length,
        SubCommentList:SubCommentList.length,
        videoLink
      };
    });
    console.log(dataFromPage);
    await browser.close();
    return dataFromPage;
  } catch (e) {}
}
