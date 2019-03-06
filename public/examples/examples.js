function openUrlWithBrowser(){
    fin.System.openUrlWithBrowser('http://cdn.openfin.co/docs/javascript/stable/tutorial-System.openUrlWithBrowser.html')
    .then(() => console.log('Opened URL'))
    .catch(err => console.log(err));
};

function launchExternalProcessDefault(){
    fin.System.launchExternalProcess({ 
        path: 'http://www.openfin.co' 
    }).then(processIdentity => console.log(processIdentity))
    .catch(err => console.log(err));
};

function launchExternalProcessSpecific(){
    fin.desktop.System.launchExternalProcess({
        path: "iexplore",
        arguments: "http://openfin.co"
    });
};

function overrideAnchorLinks(){
    console.log("overrideing anchors");
    window.addEventListener('click', t => {
        const a = t.target.closest('a');
        if (a && (a.target === '_blank' || !a.href.startsWith('#'))) {
            t.preventDefault();
            t.stopPropagation();
            fin.desktop.System.openUrlWithBrowser(a.href,
                _ => console.log('opened ', a.href, 'from ', location.href),
                e => console.log(e, location.href));
        }
    }, true);
};

