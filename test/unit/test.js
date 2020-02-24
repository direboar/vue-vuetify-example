var fs = require("fs");

fs.readFile("c:/tmp/呪文リスト日本語版サンプル.txt","utf-8",
    (err,text)=>{
        var obj = JSON.parse(text);

        obj.forEach(element => {
            // let name = element.name;
            // if(name.endsWith("ｘ")){
            //     element.source = "ザナザー";
            //     element.name = name.replace("ｘ","");
            // }else{
            //     element.source = "PHB";
            // }

            element.desc = element.desc.replace(" ","")
            // var array = [];
            // for (const iterator of element.class) {
            //     array.push(iterator.trim())
            // }
            // element.class = array;

            // element.components = element.components.split(",")
            // array = [];
            // for (const iterator of element.components) {
            //     array.push(iterator.trim())
            // }
            // element.components = array;

            // console.log(element)
        });

        var out = JSON.stringify(obj);
        fs.writeFile("c:/tmp/変換後_呪文リスト日本語版サンプル.txt",out);

    });

    