const fs = require("fs");

const MMTL_FRAMEDATA = "https://wiki.gbl.gg/index.php?title=Special:CargoExport&tables=MBTL_MoveData%2C&&fields=MBTL_MoveData.chara%2C+MBTL_MoveData.input%2C+MBTL_MoveData.name%2C+MBTL_MoveData.images%2C+MBTL_MoveData.hitboxes%2C+MBTL_MoveData.damage%2C+MBTL_MoveData.guard%2C+MBTL_MoveData.cancel%2C+MBTL_MoveData.property%2C+MBTL_MoveData.cost%2C+MBTL_MoveData.attribute%2C+MBTL_MoveData.startup%2C+MBTL_MoveData.active%2C+MBTL_MoveData.recovery%2C+MBTL_MoveData.overall%2C+MBTL_MoveData.frameAdv%2C+MBTL_MoveData.invul%2C+MBTL_MoveData.minDamage%2C+MBTL_MoveData.landing%2C&&order+by=%60mizuwiki_cargo__MBTL_MoveData%60.%60chara%60%2C%60mizuwiki_cargo__MBTL_MoveData%60.%60input%60%2C%60mizuwiki_cargo__MBTL_MoveData%60.%60name%60%2C%60mizuwiki_cargo__MBTL_MoveData%60.%60images__full%60%2C%60mizuwiki_cargo__MBTL_MoveData%60.%60hitboxes__full%60&limit=5000&format=json";
const GGST_FRAMEDATA = "https://www.dustloop.com/wiki/index.php?title=Special:CargoExport&tables=MoveData_GGST&&fields=MoveData_GGST.chara%2C+MoveData_GGST.name%2C+MoveData_GGST.input%2C+MoveData_GGST.damage%2C+MoveData_GGST.guard%2C+MoveData_GGST.startup%2C+MoveData_GGST.active%2C+MoveData_GGST.recovery%2C+MoveData_GGST.onBlock%2C+MoveData_GGST.onHit%2C+MoveData_GGST.level%2C+MoveData_GGST.counter%2C+MoveData_GGST.images%2C+MoveData_GGST.hitboxes%2C+MoveData_GGST.type%2C+MoveData_GGST.riscGain%2C+MoveData_GGST.prorate%2C+MoveData_GGST.invuln%2C&&order+by=%60cargo__MoveData_GGST%60.%60chara%60%2C%60cargo__MoveData_GGST%60.%60name%60%2C%60cargo__MoveData_GGST%60.%60input%60%2C%60cargo__MoveData_GGST%60.%60damage%60%2C%60cargo__MoveData_GGST%60.%60guard%60&limit=5000&format=json";


const fetchData = async () => {
  // The fucking lord and savior I have no idea why the fuck this shit works but holy shit
  // https://github.com/node-fetch/node-fetch/issues/1279
  const fetchPromise = import('node-fetch').then(mod => mod.default)
  const fetch = (...args) => fetchPromise.then(fetch => fetch(...args));

  let fetchedData = await fetch(MMTL_FRAMEDATA)
    .then(response => response.json())
    .catch((err) => {
      console.log(err)
      console.log("hello")
  });


  // Parsing data to desirable format
  if (fetchedData) {
    console.log("Data Fetched From Cargo")
    for (let i = 0; i < fetchedData.length; i++) {
      if (fetchedData[i]['chara'] == "Hisui &amp; Kohaku") {
        fetchedData[i]['chara'] = "Maids"
      }
    }
    fs.writeFileSync("./src/Data/frameDataBase.json", JSON.stringify(fetchedData, undefined, 2))
  }

  return;
}

module.exports = fetchData;

