async function buildSectionFromFile(sectionHtmlFilePath, sectionName, sectionId){
    return new Promise(async function(resolve, reject) {
        var container = document.createElement("div");

        var sectionHeadder = buildSectionHeadder(sectionName);
        container.appendChild(sectionHeadder);
        sectionHeadder.addEventListener("click", function(){
            setActiveControl(sectionId);
        });
        var sectionContent;
        await getSectionFromFile(sectionHtmlFilePath).then(function(section){
            sectionContent = section;
        });



        sectionContent.id = sectionId;
        if(sectionId != "overview"){
            sectionContent.classList.add("hidden");
        }
        container.appendChild(sectionContent);
        container.addEventListener("resize", function(){
            console.log(container.offsetHeight)
        });
        document.getElementById("sections-container").appendChild(container);
        console.log("container.offsetHeight " + container.offsetHeight);
        await animateWindow(container.offsetHeight)
        .catch(err => console.error(err));
        resolve();
    });
};

function setActiveControl(elemId){
    var elem = document.getElementById(elemId);
    var classes = elem.classList;
    var hidden = false;
    var size = elem.offsetHeight;
    // console.log("Element size: " + elem.offsetHeight);
    classes.forEach(function(item){
        if(item === "hidden"){
            hidden = true;
        };
    });
    if(hidden === true){
        classes.remove("hidden");
        animateWindow(elem.offsetHeight - size)
        .catch(err => console.error(err));

    }else{
        classes.add("hidden");
        animateWindow(-size)
        .catch(err => console.error(err));
    };
};

async function animateWindow(size) {
    const transitions = {
        size: {
            height: size,
            relative: true
        }
    };
    const win = await fin.Window.getCurrent();
    return win.animate(transitions);
}

function buildSectionHeadder(text){
    container = document.createElement("div");
    container.classList.add("section-headder");
    label = document.createElement("p").appendChild(document.createTextNode("+ " + text));
    container.appendChild(label);
    return container;
};

function getSectionFromFile(filePath){
    return new Promise(function(resolve, reject) {
        var section;
        xhr = new XMLHttpRequest();
        xhr.open('GET', filePath, true);
        xhr.onreadystatechange= function() {
            if (this.readyState!==4) return;
            if (this.status!==200) return;
            var html = this.responseText;
            section = document.createElement("div");
            section.classList.add( "section" );
            section.innerHTML = html;
            console.log(section.innerHTML.toString());
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(section.innerHTML.toString(),"text/xml");
            try{    
                var title = xmlDoc.getElementsByTagName('title')[0].childNodes[0].nodeValue;
                console.log(title);
            }catch(err){
                console.log("error!! wa wa " + err);
            }
     

            resolve(section);
        };
        xhr.send();
    });
};