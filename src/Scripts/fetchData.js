const { Console } = require("console");
const fs = require("fs");

const MMTL_FRAMEDATA = "https://wiki.gbl.gg/index.php?title=Special:CargoExport&tables=MBTL_MoveData%2C&&fields=MBTL_MoveData.chara%2C+MBTL_MoveData.input%2C+MBTL_MoveData.name%2C+MBTL_MoveData.images%2C+MBTL_MoveData.hitboxes%2C+MBTL_MoveData.damage%2C+MBTL_MoveData.guard%2C+MBTL_MoveData.cancel%2C+MBTL_MoveData.property%2C+MBTL_MoveData.cost%2C+MBTL_MoveData.attribute%2C+MBTL_MoveData.startup%2C+MBTL_MoveData.active%2C+MBTL_MoveData.recovery%2C+MBTL_MoveData.overall%2C+MBTL_MoveData.frameAdv%2C+MBTL_MoveData.invul%2C+MBTL_MoveData.minDamage%2C+MBTL_MoveData.landing%2C&&order+by=%60mizuwiki_cargo__MBTL_MoveData%60.%60chara%60%2C%60mizuwiki_cargo__MBTL_MoveData%60.%60input%60%2C%60mizuwiki_cargo__MBTL_MoveData%60.%60name%60%2C%60mizuwiki_cargo__MBTL_MoveData%60.%60images__full%60%2C%60mizuwiki_cargo__MBTL_MoveData%60.%60hitboxes__full%60&limit=5000&format=json";
const GGST_FRAMEDATA = "https://www.dustloop.com/wiki/index.php?title=Special:CargoExport&tables=MoveData_GGST&&fields=MoveData_GGST.chara%2C+MoveData_GGST.name%2C+MoveData_GGST.input%2C+MoveData_GGST.damage%2C+MoveData_GGST.guard%2C+MoveData_GGST.startup%2C+MoveData_GGST.active%2C+MoveData_GGST.recovery%2C+MoveData_GGST.onBlock%2C+MoveData_GGST.onHit%2C+MoveData_GGST.level%2C+MoveData_GGST.counter%2C+MoveData_GGST.images%2C+MoveData_GGST.hitboxes%2C+MoveData_GGST.type%2C+MoveData_GGST.riscGain%2C+MoveData_GGST.prorate%2C+MoveData_GGST.invuln%2C&&order+by=%60cargo__MoveData_GGST%60.%60chara%60%2C%60cargo__MoveData_GGST%60.%60name%60%2C%60cargo__MoveData_GGST%60.%60input%60%2C%60cargo__MoveData_GGST%60.%60damage%60%2C%60cargo__MoveData_GGST%60.%60guard%60&limit=5000&format=json";

const frameDataBase = require("../Data/frameDataBase.json")

const moveLinkParser = (fetchedData) => {
  let base = "https://wiki.gbl.gg/w/Melty_Blood/MBTL/"
  for (let i = 0; i < fetchedData.length; i++) {
    let moveObj = fetchedData[i]
    let charName = moveObj.chara.replaceAll(" ", "_")

    let moveName = ""
    if (moveObj.name == "") {
      if (moveObj.input.charAt(0) == "j") {
        moveName = moveObj.input.slice(0,1) + "." + moveObj.input.slice(1)
      } else {
        moveName = moveObj.input
      }
    } else {
      moveName = moveObj.name.replaceAll(" ", "_");
    }
    let outputName = base + charName + "#" + moveName;

    fetchedData[i]["moveLink"] = outputName;
  }

  console.log("All Links Parsed")
  return fetchedData;

}


const fetchImage = async (fetchedData) => {
  const fetchPromise = import('node-fetch').then(mod => mod.default)
  const fetch = (...args) => fetchPromise.then(fetch => fetch(...args));
  let tempList = []
  for (let i = 0; i < fetchedData.length; i++) {
    var imageList = fetchedData[i].images;
    for (let j = 0; j < imageList.length; j++) {
      console.log(`Fetching: ${imageList[j]}`);
      let fetchedImage = await fetch(`https://wiki.gbl.gg/api.php?action=query&format=json&prop=imageinfo&titles=File:${imageList[j]}&iiprop=url`)
      .then(response => response.json())
      .catch((err) => {
        // console.log(err)
        console.log(`Error in procuring information from: ${imageList[j]}`)
      });
      try {
        if (Object.keys(fetchedImage.query.pages) != "-1") {
          let pages = fetchedImage.query.pages
          let pageKey = Object.keys(pages);
          let keyNumber = pageKey[0]
          let url = pages[keyNumber].imageinfo[0].url;
          console.log(`Fetched: ${url}`)
          tempList.push(url);
        }
      } catch (err) {
        console.log("Catched error for when API call for fetchIamge fails")
      }
    }

    fetchedData[i].images = tempList;
    tempList = [];
  }
  console.log("All Image Fetched.")
  return fetchedData;
}

const fetchData = async () => {
  // The fucking lord and savior I have no idea why the fuck this shit works but holy shit
  // https://github.com/node-fetch/node-fetch/issues/1279
  const fetchPromise = import('node-fetch').then(mod => mod.default)
  const fetch = (...args) => fetchPromise.then(fetch => fetch(...args));

  let fetchedData = await fetch(MMTL_FRAMEDATA)
    .then(response => response.json())
    .catch((err) => {
      console.log(err)
  });


  // Parsing data to desirable format
  if (fetchedData) {
    for (let i = 0; i < fetchedData.length; i++) {
      if (fetchedData[i]['chara'] == "Hisui &amp; Kohaku") {
        fetchedData[i]['chara'] = "Maids"
      }
    }

    fetchedData = await fetchImage(fetchedData);

    let finalFetchedData = moveLinkParser(fetchedData);


    fs.writeFileSync("./src/Data/frameDataBase.json", JSON.stringify(finalFetchedData, undefined, 2))
    console.log("Data Fetched From Cargo")
  }

  return;
}

module.exports = fetchData;