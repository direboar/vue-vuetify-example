var fs = require("fs");

fs.readFile("c:/tmp/b.txt","utf-8",
    (err,text)=>{
        var obj = JSON.parse(text);

        obj.forEach(element => {
            element.class = element.class.split(",")
            var array = [];
            for (const iterator of element.class) {
                array.push(iterator.trim())
            }
            element.class = array;

            element.components = element.components.split(",")
            array = [];
            for (const iterator of element.components) {
                array.push(iterator.trim())
            }
            element.components = array;

            console.log(element)
        });

        var out = JSON.stringify(obj);
        fs.writeFile("c:/tmp/out.txt",out);

    });

    