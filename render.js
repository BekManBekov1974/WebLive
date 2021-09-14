const { ipcRenderer } = require("electron");
$("#save-button").on("click", function () {
  ipcRenderer.send("saqlash");
});

$("#mainmenu li").on("click", function (e) {
  e.stopPropagation();
  e.currentTarget.parentNode.parentNode.style.display = "none";
  OPENEDCONTEXT = false;
});
$(".menu-item").on("click", function (e) {
  $(".menyu-content").css({ display: "none" });
  e.currentTarget.childNodes[2].style.display = "block";
});

$(".menu-item").on("mouseleave", function (e) {
  e.stopPropagation();
  e.currentTarget.childNodes[2].style.display = "none";
});

$("#minimize").on("click", function (e) {
  ipcRenderer.send("minimize");
});

$("#newProject").on("click", function (e) {
  ipcRenderer.send("newproject");
});

$("#closewindow").on("click", function () {
  ipcRenderer.send("closewindow");
});

$("#maximize").on("click", function () {
  ipcRenderer.send("maxmin");
});
$("#addFile").on("click", function () {
  ipcRenderer.send("addHtml", WhoFocus, window.GPATH);
});

ipcRenderer.on("addedH", (event, paths) => {
  FaylQoshish(paths);
});

ipcRenderer.on("saqlandi", (event, path) => {
  YangidanSaqlash(path);
});
ipcRenderer.on("projected", (event, path) => {
  window.GPATH = path.filePaths[0];
  CreateProject(window.GPATH);
});

function CreateProject(path) {
  let emptyView={
    "cursorState": [
      {
        "inSelectionMode": false,
        "selectionStart": { "lineNumber": 1, "column": 1 },
        "position": { "lineNumber": 1, "column": 1 }
      }
    ],
    "viewState": {
      "scrollLeft": 0,
      "firstPosition": { "lineNumber": 1, "column": 1 },
      "firstPositionDeltaTop": 0
    },
    "contributionsState": {
      "editor.contrib.folding": { "lineCount": 1, "provider": "syntax" },
      "editor.contrib.wordHighlighter": false
    }
  }
  window.htmlFiles = [];
  window.cssFiles = [];
  window.jsFiles = [];
  const util = require("util");
  const fs = require("fs");
  const pat = require("path");
  const Nusxalash = util.promisify(fs.copyFile);

  fs.mkdirSync(path + "\\JavaScript");
  fs.mkdirSync(path + "\\Dizayn");
  fs.mkdirSync(path + "\\Resurslar");
  fs.mkdirSync(path + "\\Resurslar\\css");
  fs.mkdirSync(path + "\\Resurslar\\fonts");
  function FaylNusxalash(scrDir, destDir, files = []) {
    return Promise.all(
      files.map((f) => {
        return Nusxalash(pat.join(scrDir + f), pat.join(destDir + f));
      })
    );
  }
  FaylNusxalash("./webliveicons/", path + "\\Resurslar\\", [
    "androidstyle.css",
    "filesstyle.css",
    "fwlstyle.css",
    "icomoon-ultimate-webfont.css",
    "iqlimstyle.css",
    "linestyle.css",
    "wlstyle.css",
  ])
  FaylNusxalash("./webliveicons/fonts/", path + "\\Resurslar\\fonts\\", [
    "android.eot",
    "android.svg",
    "android.ttf",
    "android.woff",
    "files.eot",
    "files.svg",
    "files.ttf",
    "files.woff",
    "fweblive.eot",
    "fweblive.svg",
    "fweblive.ttf",
    "fweblive.woff",
    "icomoon-ultimate.eot",
    "icomoon-ultimate.svg",
    "icomoon-ultimate.ttf",
    "icomoon-ultimate.woff",
    "iqlim.eot",
    "iqlim.svg",
    "iqlim.ttf",
    "iqlim.woff",
    "line.eot",
    "line.svg",
    "line.ttf",
    "line.woff",
    "weblive.eot",
    "weblive.svg",
    "weblive.ttf",
    "weblive.woff",
  ])
  FaylNusxalash("./__weblive__Library__/Bootstrap/css/", path + "\\Dizayn\\", [
    "bootstrap.css"
  ])
  FaylNusxalash("./__weblive__Library__/Bootstrap/js/", path + "\\JavaScript\\", [
    "bootstrap.js"
  ])
  FaylNusxalash("./__weblive__Library__/materialize/css/",path+"\\Dizayn\\",["materialize.css"])
  FaylNusxalash("./__weblive__Library__/Chart.js-2.9.3/dist/",path+"\\Dizayn\\",["chart.css"])
  FaylNusxalash("./__weblive__Library__/Chart.js-2.9.3/dist/",path+"\\JavaScript\\",["chart.js"])
  FaylNusxalash("./__weblive__Library__/",path+"\\Dizayn\\",["animate.css"])
  FaylNusxalash("./__weblive__Library__/materialize/js/",path+"\\JavaScript\\",["materialize.js"])
  FaylNusxalash("./__weblive__Library__/",path+"\\JavaScript\\",["create.min.js"])
  FaylNusxalash("./__weblive__Library__/",path+"\\JavaScript\\",["easeljs.min.js"])
  FaylNusxalash("./__weblive__Library__/",path+"\\JavaScript\\",["fabric.min.js"])
  FaylNusxalash("./__weblive__Library__/",path+"\\JavaScript\\",["jQuery-3.5.1.js"])
  FaylNusxalash("./__weblive__Library__/",path+"\\JavaScript\\",["MooTools-1.6.0.js"])
  fs.writeFileSync(
    path + "\\wl-index.html",
    `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sarlavha</title>
    <link rel="stylesheet" href="./Dizayn/style.css">
    <link rel="stylesheet" href="./Dizayn/wlplugin.css">
    <script id='wlplugin' type='text/javascript' src='./JavaScript/wlPlugin.js'></script>
</head>

<body>
    <!--Bu yer HTML boshlanishi-->
    <h1>WebLive</h1>
    <!--Bu yer HTML tugashi-->
    <script type='text/javascript' src='./JavaScript/jScript.js'></script>
</body>
</html>
`
  );
  fs.writeFileSync(path + "\\Dizayn\\style.css", "/*Bu yerda CSS bloklar*/");
  fs.writeFileSync(
    path + "\\JavaScript\\jScript.js",
    "//Bu yerda JavaScript kodlar"
  );

  fs.copyFile(
    pat.join(__dirname, "./scripts/wlPlugin.js"),
    path + "\\JavaScript\\wlPlugin.js",
    function () {}
  );
  fs.copyFile(
    pat.join(__dirname, "./styles/wlPlugin.css"),
    path + "\\Dizayn\\wlPlugin.css",
    function () {}
  );

  window.htmlFiles.push({
    path: path + "\\wl-index.html",
    name: "wl-index.html",
    view:emptyView
    
  });
  window.cssFiles.push({
    path: path + "\\Dizayn\\style.css",
    name: "style.css",
    view:emptyView
  });
  window.jsFiles.push({
    path: path + "\\JavaScript\\jScript.js",
    name: "jScript.js",
    view:emptyView
  });
  let data = JSON.stringify([
    window.htmlFiles,
    window.cssFiles,
    window.jsFiles,
  ]);
  fs.writeFileSync(path + "\\config.json", data);
  window.NewProject(path);
}

function FaylQoshish(path) {
  const fs = require("fs");
  fs.writeFileSync(path, "");
  addTabs(path);
}
