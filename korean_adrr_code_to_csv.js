let fs = require("fs");

// npm install iconv-lite
let iconv = require('iconv-lite');

let txtFile = "법정동코드 전체자료.txt";

let content = fs.readFileSync(txtFile);
let utf8Str = iconv.decode(content, 'euc-kr');

fs.writeFileSync('test.txt', utf8Str, { encoding: 'utf8' });

let utf8Txt = fs.readFileSync('test.txt').toString()

// console.log(utf8Txt);
let arr = utf8Txt.split("\n");
let txt = "id,lv,parent,id_key,name\n";
let regionId;
let regionName = "";
let data = "";
let lv = 0;
let parent = 0;
let idKey;
let prefix = [];

for (let i in arr) {

    // if (arr[i].includes("존재")) {

        let temp;

        temp = arr[i];

        regionId = temp.slice(0, 10);
        regionName = temp.replace(regionId,"");
        regionName = regionName.replace("존재","");
        regionName = regionName.trim();

        console.log(`regionId - ${regionId}`);
        console.log(`temp - ${temp}`);
        console.log(`region - ${regionName}`);
        console.log(`prefix - ${prefix}`);

        if (parseInt(regionId) % Math.pow(10,8) === 0) {
            lv = 0;
            parent = 0;
            idKey = parseInt(regionId) / Math.pow(10,8);
        }

        else if (parseInt(regionId) % Math.pow(10,5) === 0) {
            lv = 1;
            parent = parseInt(regionId) / Math.pow(10,8);
            idKey = parseInt(regionId) / Math.pow(10,5);
            
            if (regionName.length - 1 === regionName.lastIndexOf("시"))
                idKey = parseInt(idKey / 10);
        }

        else if (parseInt(regionId) % Math.pow(10,2) === 0) {
            lv = 2;
            parent = parseInt(regionId) / Math.pow(10,5);
            idKey = parseInt(regionId) / Math.pow(10,2);
        }

        else if (parseInt(regionId) % Math.pow(10,2) !== 0) {
            lv = 3;
            parent = parseInt(regionId) / Math.pow(10,2);
            idKey = parseInt(regionId);
        }

        prefix[lv] = regionName;
        console.log(`lv - ${lv}\n`);

        let name = regionName.replace(prefix[lv - 1],"").trim();

        name.replace("부산직할시","부산광역시")

        name = name.indexOf("(") > 0 ? name.slice(0, name.indexOf("(")) : name;

        data = `${regionId},${lv},${parseInt(parent)},${parseInt(idKey)},${name}\n`;
        console.log(`data | ${data}`);

        txt += data;

        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    // }
}

console.log(txt);

fs.writeFileSync('region.csv', txt, { encoding: 'utf8' });
