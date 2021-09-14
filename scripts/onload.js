const fs = require("fs");
const path = require("path");
var windows;
var matn = "wl";
var deg = 0;
var FULLSCREEN = false;
let GPATH = "../Yurakchaa";

var htmlFiles = [];
var cssFiles = [];
var jsFiles = [];
let ThemeDesctiption = "";
let TAHRIRLANDI = false;
let GLOBALGLYPH = "wl";
var WhoFocus = 1;
var htmlView = true,
    cssView = false,
    jsView = false,
    horizon = true;
$(function() {
    let dd = JSON.parse(
        fs.readFileSync(path.join(__dirname, localStorage.getItem("WL_THEME") || '/themes/Telegram Dark.json'))
    );
    $(".wl-logo path,polygon").css({
        fill: dd["panels"]["activityBar.foreground"],
    });
    splitterBackground = dd["panels"]["activityBar.background"];
    splitterBorder = dd["panels"]["activityBar.foreground"];
    $("#indicator").css({
        "background-color": dd["panels"]["activityBar.foreground"],
    });
    $(".splash-screen").css({
        "background-color": dd.colors["editor.background"],
    });
    GetThemeList();
    SplitterLayout();
    window.onmessage = function(e) {
        switch (e.data) {
            case 3:
                {
                    $("#console").css({
                        visibility: "hidden",
                    });
                    fs.writeFileSync(GPATH + "\\wl-index.html", windows.heditor.getValue());
                    RenderWebSite();
                    break;
                }
            case 4:
                {
                    $("#console").css({
                        visibility: "hidden",
                    });
                    fs.writeFileSync(
                        GPATH + "\\Dizayn\\style.css",
                        windows.ceditor.getValue()
                    );
                    RenderWebSite();
                    break;
                }
            case 5:
                {
                    $("#console").css({
                        visibility: "hidden",
                    });
                    fs.writeFileSync(
                        GPATH + "\\JavaScript\\jscript.js",
                        windows.jeditor.getValue()
                    );
                    RenderWebSite();
                    break;
                }
            case 0:
                {
                    $("#console").css({
                        visibility: "hidden",
                    });
                    RenderWebSite();
                    break;
                }
        }
    };

    $("#console").css({
        visibility: "hidden",
    });

    var editor = document.getElementById("codeframe");
    editor.setAttribute(
        "src",
        path.join(__dirname, "./mon_editor/index-editor.html")
    );
    windows = editor.contentWindow;
    editor.onload = function() {
        ToggleHtml();
        splitterBackground = dd["panels"]["activityBar.background"];
        splitterBorder = dd["panels"]["activityBar.foreground"];
        ThemeDesctiption = dd;
        windows.ChangeTheme("meniki", ThemeDesctiption);
    };

    LoadClicks();

    setTimeout(function() {
        $("#indicator").css({ width: "100%" });
    }, 1000);
    setTimeout(function() {
        document.getElementById("splash-screen").innerHTML = "";
        document.getElementById("splash-screen").style.visibility = "hidden";
        var m = path.join(__dirname, localStorage.getItem("WL_GPATH"));
        if (m != undefined || m != "" || m != null) {
            LoadProject(m);
            ViewTabs();
        }
    }, 3000);
});

function SplitterLayout(full = false, layout = "vertical") {
    $("#splitter").jqxSplitter({
        showSplitBar: !full,
        splitBarSize: 4,
        width: "100%",
        height: "100%",
        orientation: layout,
        panels: [{
                size: full ? "100%" : "50%",
                min: 300,
                max: "80%",
                collabsible: false,
            },
            {
                collabsible: true,
                size: full ? "0%" : "50%",
            },
        ],
    });

    horizon = layout === "vertical";
    $("#splitter").css({
        border: "none",
    });
}

function LoadClicks() {
    $("#htmlEdit").on("click", function() {
        ToggleHtml();
    });

    $("#cssEdit").on("click", function() {
        ToggleCss();
    });

    $("#jsEdit").on("click", function() {
        ToggleJs();
    });

    $("#p5Edit").on("click", function() {
        ToggleJs((ma = 1));
        ToggleCss((ma = 1));
        ToggleHtml((ma1 = 1));
    });

    $("#fr-close").on("click", function() {
        $("#FullRes").css({ transform: "translateX(100%)", opacity: "0" });
    });
    $("#fr-minimize").on("click", function() {
        FULLSCREEN = false;
        RenderWebSite();
        $("#FullRes").css({ transform: "translateX(100%)", opacity: "0" });
        $("#HideResult").addClass("pactive");
        SplitterLayout((full = FULLSCREEN), horizon ? "vertical" : "horizontal");
    });

    $("#fullscreen").on("click", function() {
        FULLSCREEN = true;
        RenderWebSite();
        SplitterLayout((full = true));
        $("#FullRes").css({ transform: "translateX(0%)", opacity: "1" });
        $("#HideResult").removeClass("pactive");
    });

    $("#HideResult").on("click", function(e) {
        if (e.currentTarget.classList.contains("pactive")) {
            e.currentTarget.classList.remove("pactive");
            FULLSCREEN = true;
            SplitterLayout((full = FULLSCREEN), horizon ? "vertical" : "horizontal");
        } else {
            FULLSCREEN = false;
            e.currentTarget.classList.add("pactive");
            SplitterLayout((full = FULLSCREEN), horizon ? "vertical" : "horizontal");
            RenderWebSite();
        }
    });
    $(".tabul>li").on("click", function() {
        $(".tabul>li").removeClass("tabliactive");
        $(this).addClass("tabliactive");
    });
    $("*").on("mouseenter", function() {
        let mm = $(this).attr("data-tooltip");
        $("#tooltip").html(mm);
    });
    $("#wl-undo").on("click", function() {
        deg -= 90;
        getId("big-icon").style.transform = "rotate(" + deg + "deg)";
    });

    $("#wl-redo").on("click", function() {
        deg += 90;
        getId("big-icon").style.transform = "rotate(" + deg + "deg)";
    });

    $("#wl-image-res").on("click", function() {
        loadGlyph(matn, new RegExp(".*(" + getId("qidir").value + ").*", "ig"));
    });

    $("#close-icons-form").on("click", function() {
        getId("ic-container").classList.remove("ic-con-show");
        getClass("icons-form").classList.remove("icons-form-show");
    });

    $("#add-favourite").on("click", function() {
        SaveToFavourite();
    });

    $("#fwl").on("click", function() {
        loadGlyph("fwl", new RegExp(getId("qidir").value, "ig"));
        GLOBALGLYPH = "fwl";
    });

    $("#android").on("click", function() {
        loadGlyph("wlp", new RegExp(getId("qidir").value, "ig"));
        GLOBALGLYPH = "wlp";
    });
    $("#wl").on("click", function() {
        loadGlyph("wl", new RegExp(getId("qidir").value, "ig"));
        GLOBALGLYPH = "wl";
    });
    $("#dialog").on("click", function() {
        if (!/\<head\>/gi.test(windows.getEditorText().html))
            xabar("HTML strukturada head qismi joylashtirilmagan!", "warn");
        else {
            $(".link-window").css({ visibility: "visible" });
            $("#links").css({ visibility: "visible" });
        }
    });
    $(".link-window").on("click", function(e) {
        e.stopPropagation();
    });
    $("#links").on("click", function() {
        $(".link-window").css({ visibility: "hidden" });
        $("#links").css({ visibility: "hidden" });
    });
    $("#wl-katalog-ochish").on("click", function() {
        const { shell } = require("electron");
        shell.openPath(GPATH);
    });

    $(".links li").on("click", function() {
        const path = require("path");
        var q = this.querySelectorAll("span")[0].getAttribute("data-name");
        if (q.includes("─")) {
            let mas = q.split("─");
            mas.filter(function(a) {
                if (path.extname(a) === ".css") {
                    windows.LinkJoylash("./Dizayn/" + a);
                } else {
                    windows.LinkJoylash("./JavaScript/" + a);
                }
            });
        } else {
            windows.LinkJoylash("./Resurslar/" + path.basename(q));
        }
    });

    $("#lines").on("click", function() {
        loadGlyph("wll", new RegExp(getId("qidir").value, "ig"));
        GLOBALGLYPH = "wll";
    });

    $("#fsystem").on("click", function() {
        loadGlyph("wlf", new RegExp(getId("qidir").value, "ig"));
        GLOBALGLYPH = "wlf";
    });

    $("#iqlim").on("click", function() {
        loadGlyph("wlm", new RegExp(getId("qidir").value, "ig"));
        GLOBALGLYPH = "wlm";
    });

    $("#animate-icon").on("click", function() {
        $(".iconcha").addClass("animatsiya");
    });

    $("#nameCopy").on("click", function() {
        $("#clipboard").val($("#icon-name").text());
        $("#clipboard").select();
        document.execCommand("Copy");
    });

    $("#ic-unicode").on("click", function() {
        $("#clipboard").val($("#ic-unicode").text());
        $("#clipboard").select();
        document.execCommand("Copy");
    });

    var contrast = false;
    $("#contrast").on("click", function() {
        if (contrast) {
            $(".icon-view").addClass("iw-light");
        } else {
            $(".icon-view").removeClass("iw-light");
        }
        contrast = !contrast;
    });
    getId("qidir").addEventListener("input", function() {
        loadGlyph(GLOBALGLYPH, new RegExp(this.value, "ig"));
    });
    $("#history-back").on("click", function() {
        getId("natija-frame").contentWindow.history.back();
    });
    $("#fr-back").on("click", function() {
        getId("fr-natija-frame").contentWindow.history.back();
    });

    $("#fr-forvard").on("click", function() {
        getId("fr-natija-frame").contentWindow.history.forward();
    });

    $("#refresh-frame").on("click", function() {
        getId("natija-frame").contentWindow.location.reload();
    });
    $("#fr-refresh").on("click", function() {
        getId("fr-natija-frame").contentWindow.location.reload();
    });

    var tdeg = 0;

    $(".tab").on("click", function(e) {
        $(".tab").removeClass("active");
        $(e.target).addClass("active");
    });

    $("#refresh").on("click", function() {});

    $("#wl-vertical-view").on("click", function() {
        SplitterLayout((full = FULLSCREEN), "vertical");
        windows.Joylashuv(htmlView, cssView, jsView, horizon);
    });
    $("#wl-horizontal-view").on("click", function() {
        SplitterLayout((full = FULLSCREEN), "horizontal");
        windows.Joylashuv(htmlView, cssView, jsView, horizon);
    });
}

function LoadProject(path) {
    GPATH = path;
    let Code = "";
    if (GPATH === "") {
        return
    }
    if (!fs.existsSync(path + "\\wl-index.html")) {
        xabar(
            "wl-index.html fayl topilmadi!Bu loyiha WebLive Loyihasi emas",
            "warning"
        );
        return;
    } else {
        Code = fs.readFileSync(path + "\\wl-index.html", "utf-8");
        windows.heditor.setValue(Code);
    }
    windows.ceditor.setValue(
        fs.readFileSync(path + "\\Dizayn\\style.css", "utf-8")
    );
    windows.jeditor.setValue(
        fs.readFileSync(path + "\\JavaScript\\jscript.js", "utf-8")
    );
    try {
        var data = JSON.parse(fs.readFileSync(path + "\\config.json", "utf-8"));
        htmlFiles = data[0];
        cssFiles = data[1];
        jsFiles = data[2];
        LoadTabs();
    } catch {
        xabar("Xatolik: loyiha fayli ochilmadi!", "err");
    }

    RenderWebSite();
}

function NewProject(path) {
    console.log([htmlFiles, cssFiles, jsFiles]);
    GPATH = path;
    localStorage.setItem("WL_GPATH", GPATH);
    var dd = fs.readFileSync(GPATH + "\\wl-index.html", "utf-8");
    windows.heditor.setValue(dd);
    windows.ceditor.setValue("/*Bu yerda Css*//*");
    windows.jeditor.setValue("//Bu yerda JS");
    $("#tabul,#tabul1,#tabul2").html("")
    LoadTabs();
    RenderWebSite();
}

function getClass(selector) {
    return document.getElementsByClassName(selector)[0];
}

function getId(selector) {
    return document.getElementById(selector);
}

function RenderWebSite() {
    var natijaFrame = document.getElementById(
        FULLSCREEN ? "fr-natija-frame" : "natija-frame"
    );
    natijaFrame.src = GPATH + "\\wl-index.html";
    natijaFrame.onload = function() {
        // var doc = natijaFrame.contentWindow.document;
        // var heada = doc.getElementsByTagName("head")[0];
        // let style = `
        // <link rel="stylesheet" href="./Resurslar/androidstyle.css">
        // <link rel="stylesheet" href="./Resurslar/filesstyle.css">
        // <link rel="stylesheet" href="./Resurslar/fwlstyle.css">
        // <link rel="stylesheet" href="./Resurslar/icomoon-ultimate-webfont.css">
        // <link rel="stylesheet" href="./Resurslar/iqlimstyle.css">
        // <link rel="stylesheet" href="./Resurslar/linestyle.css">
        // <link rel="stylesheet" href="./Resurslar/wlstyle.css">
        // `;
        // heada.insertAdjacentHTML("beforeend", style);

        if (FULLSCREEN === true)
            $("#FullRes").css({ transform: "translateX(0%)", opacity: "1" });
        let m = $("#natija-frame").contents().find("title").text();
        $("#restitle,#frestitle").text(m);
        $("#natija-frame")
            .contents()
            .find("a")
            .click(function(event) {
                /*event.preventDefault();
                event.stopPropagation();
                xabar(
                  event.currentTarget.getAttribute("href") +
                    " havola amalga oshirildi!",
                  "succes"
                );*/
            });
    };
}

function RenderP5() {
    var natijaFrame = document.getElementById("natija-frame");
    const CodeData = windows.GetP5Text();
    var htmlCode =
        `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
       
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="./scripts/p5.min.js"></sc` +
        `ript>
        <script>
        ${CodeData}
    </sc` +
        `ript>
    <style>
        body
        {
            padding:1;
            margin:1;
        }
    </sty` +
        `le>
    </head>
    
    <body>
      Sa
    </body>
    
    </html>
    `;
    natijaFrame.srcdoc = htmlCode;
}

function XatolikChiqarish(e) {
    $("#console").css({
        visibility: "visible",
    });
    var console_frame = document.getElementById("console");
    console_frame.innerHTML += `
        <div class='error-frame'>${e}</div>
        `;
}

function LogChiqarish(e) {
    $("#console").css({
        visibility: "visible",
    });
    var console_frame = document.getElementById("console");
    console_frame.innerHTML += `
        <div class='log-frame'>${e}</div>
        `;
}

function ClearConsole() {
    $("#console").html(`<div class="console-titlebar">
    <span class="console-title">JavaScript konsol</span>
  </div>`);
}

function ToggleHtml(ma = undefined) {
    var html = getClass("stt");
    if (ma != undefined) {
        html.classList.remove("button-bg-light");
        htmlView = false;
    } else if (html.classList.contains("button-bg-light")) {
        html.classList.remove("button-bg-light");
        htmlView = false;
        localStorage.setItem("CodePanels", htmlView + "|" + cssView + "|" + jsView);
    } else {
        html.classList.add("button-bg-light");
        htmlView = true;
    }
    localStorage.setItem("CodePanels", htmlView + "|" + cssView + "|" + jsView);
    windows.Joylashuv(
        (html = htmlView),
        (css = cssView),
        (js = jsView),
        (horizon = horizon)
    );
}

function ToggleCss(ma = undefined) {
    var css = getClass("st1");
    if (ma != undefined) {
        css.classList.remove("button-bg-light");
        cssView = false;
    } else if (css.classList.contains("button-bg-light")) {
        css.classList.remove("button-bg-light");
        cssView = false;
    } else {
        css.classList.add("button-bg-light");
        cssView = true;
    }
    localStorage.setItem("CodePanels", htmlView + "|" + cssView + "|" + jsView);
    windows.Joylashuv(
        (html = htmlView),
        (css = cssView),
        (js = jsView),
        (horizon = horizon)
    );
}

function ToggleJs(ma = undefined) {
    var js = getClass("st2");
    if (ma != undefined) {
        js.classList.remove("button-bg-light");
        jsView = false;
    } else if (js.classList.contains("button-bg-light")) {
        js.classList.remove("button-bg-light");
        jsView = false;
    } else {
        js.classList.add("button-bg-light");
        jsView = true;
    }
    localStorage.setItem("CodePanels", htmlView + "|" + cssView + "|" + jsView);
    windows.Joylashuv(
        (html = htmlView),
        (css = cssView),
        (js = jsView),
        (horizon = horizon)
    );
}

function sendBigIcon(ed) {
    getId("icon-name").innerHTML = ed.getAttribute("name");
    getId("icon-unicode").innerHTML = "\\" + ed.getAttribute("unicode");
    getId("big-icon").style.transform = "rotate(0deg)";
    deg = 0;
    getId("big-icon").className = "iconcha " + ed.getAttribute("name");
}

function loadGlyph(matn = "wl", pat = /.*/) {
    $("#add-favourite").css({
        display: "inline",
    });

    let icfile = "./fweblive.txt";
    switch (matn) {
        case "wl":
            {
                icfile = "./icomon.txt";
                matn = "wli";
                break;
            }
        case "wlp":
            {
                icfile = "./android.txt";
                break;
            }
        case "wlm":
            {
                icfile = "./iqlim.txt";
                break;
            }
        case "wll":
            {
                icfile = "./lines.txt";
                break;
            }
        case "wlf":
            {
                icfile = "./files.txt";
                break;
            }
    }
    var weblive = fs
        .readFileSync(path.join(__dirname, icfile), "utf-8")
        .split("/");
    $("#ic-container").addClass("ic-con-show");
    $(".icons-form").addClass("icons-form-show");
    const table = getId("icons-table");
    var us = 8;
    var tr = "<tr>";
    let webl = weblive.filter(function(str) {
        return pat.test(str);
    });
    for (let i = 1; i < webl.length + 1; i++) {
        k = webl[i - 1].split("|");
        cont = `<td>
           <div class="icon" id="mini-icon" name="${
             matn + "-" + k[1]
           }" unicode="${k[0]}" onclick="sendBigIcon(this)">
            <i class="iconi ${matn}-${k[1]}"></i>
           </div>
        </td>`;
        tr += cont;
        if (i % us == 0) {
            tr += "</tr><tr>";
        }
    }
    table.innerHTML = tr;
}

function SaveToFavourite() {
    name = getId("icon-name").innerText;
    unicode = getId("icon-unicode").innerText.replace("\\", "");
    if (localStorage.getItem("wl-favourites") === null) {
        localStorage.setItem("wl-favourites", unicode + "|" + name + "~");
        return;
    }
    var list = localStorage.getItem("wl-favourites");
    list += unicode + "|" + name + "~";
    localStorage.setItem("wl-favourites", list);
}

function ViewFavourites() {
    $("#add-favourite").css({
        display: "none",
    });
    var table = getId("icons-table");
    table.get;
    table.innerHTML = "";
    var m = localStorage.getItem("wl-favourites").split("~");
    var us = 8;
    var tr = "<tr>";
    for (let i = 1; i < m.length + 1; i++) {
        k = m[i - 1].split("|");
        cont = `<td>
           <div class="icon" id="mini-icon" name="${k[1]}" unicode="${k[0]}" onclick="sendBigIcon(this)">
            <i class="iconi ${k[1]}"></i>
           </div>
        </td>`;
        tr += cont;
        if (i % us == 0) {
            tr += "</tr><tr>";
        }
    }
    tr += "</tr>";
    table.innerHTML = tr;
}

function RemoveFavourite(old) {
    var m = localStorage.getItem("wl-favourites");
    m.replace(old, "");

    localStorage.setItem(m);
}

function ChangeTheme(obj) {
    $(".navbar").css({
        "background-color": obj.panels["activityBar.background"],
    });
    $(".header").css({
        "background-color": obj.panels["activityBar.background"],
    });
    $(".footer").css({
        "background-color": obj.panels["activityBar.background"],
    });
    $("#root-colors").html(`
        :root{
            --theme-color:${obj.panels["activityBar.foreground"]};
            --border-color:${obj.panels["activityBar.foreground"]};
            --background-color:${obj.panels["activityBar.background"]};
            --widget-foni:${obj.panels["editorWidget.background"]};
            --split-top:${obj.panels["activityBar.foreground"]};
            --split-left:${obj.panels["activityBar.foreground"]};
            --split-back:${obj.panels["activityBar.background"]};
            --tabbar-background:${obj.colors["editor.background"]};
          }
    `);
    $(".frame-bar").css({
        "background-color": obj.panels["activityBar.background"],
    });
    $(".icons-form").css({
        "background-color": obj.panels["activityBar.background"],
    });
    $("#icon-name").css({
        color: obj.panels["activityBar.foreground"],
    });
    $("#icon-unicode").css({
        color: obj.panels["activityBar.foreground"],
    });
    $("#html-modifier").css({
        border: `4px solid ${obj.panels["activityBar.background"]}`,
        "background-color": obj.panels["activityBar.foreground"],
    });
    // $('.tab').css({"background-color":obj["activityBar.background"],"color":obj["activityBar.inactiveForeground"]})
    $("#natija-frame,#fr-natija-frame").css({
        background: obj.panels["activityBar.background"],
    });

    $(".close,.minimize,.maximize").css({
        color: obj.panels["activityBarBadge.background"],
    });
}

function Changed(holat = false) {
    TAHRIRLANDI = holat;
    $(".change-mode").css({
        opacity: TAHRIRLANDI ? "1" : "0",
    });
}

function LoadTheme(tema = "MoviyMavzu.json") {
    localStorage.setItem("WL_THEME", "./themes/" + tema);
    let dd = JSON.parse(
        fs.readFileSync(path.join(__dirname, "./themes/" + tema))
    );
    $(".wl-logo path,polygon").css({
        fill: dd["panels"]["activityBar.foreground"],
    });
    $("#indicator").css({
        "background-color": dd["panels"]["activityBar.foreground"],
    });
    splitterBackground = dd["panels"]["activityBar.background"];
    splitterBorder = dd["panels"]["activityBar.foreground"];
    windows.ChangeTheme("meniki", dd);
}

function GetThemeList() {
    fs.readdir(path.join(__dirname, "./themes/"), function(err, files) {
        let themes = "";
        files.forEach((e) => {
            if (path.extname("./themes/" + e) === ".json") {
                var li = document.createElement("li");
                li.innerText = e.replace(".json", "");
                li.addEventListener("click", function() {
                    LoadTheme(e);
                });
                $("#theme-items").append(li);
            }
        });
    });
}

function LoadTabs() {
    for (let i = 0; i < htmlFiles.length; i++) {
        let li = document.createElement("li");
        li.innerHTML = htmlFiles[i]["name"];
        li.setAttribute("data-path", htmlFiles[i]["path"]);
        li.className = "tabli" + ((i < 1) ? " tabliactive" : "");
        li.setAttribute("data-index", i);
        $("#tabul").append(li);
    }
    for (let i = 0; i < cssFiles.length; i++) {
        let li = document.createElement("li");
        li.innerHTML = cssFiles[i]["name"];
        li.setAttribute("data-path", cssFiles[i]["path"]);
        li.className = "tabli" + (i === 0) ? " tabliactive" : "";
        li.setAttribute("data-index", i);
        $("#tabul1").append(li);
    }

    for (let i = 0; i < jsFiles.length; i++) {
        let li = document.createElement("li");
        li.innerHTML = jsFiles[i]["name"];
        li.setAttribute("data-path", jsFiles[i]["path"]);
        li.className = "tabli" + (i === 0) ? " tabliactive" : "";
        li.setAttribute("data-index", i);
        $("#tabul2").append(li);
    }
    RegisterTabClick();
}

function JsFocus() {
    WhoFocus = 3;
    $("#addFile span").html("&nbsp;JS&nbsp;");
    ViewTabs("js");
}

function CssFocus() {
    WhoFocus = 2;
    $("#addFile span").html("&nbsp;CSS");
    ViewTabs("css");
}

function HtmlFocus() {
    WhoFocus = 1;
    $("#addFile span").html("HTML");
    ViewTabs();
}

function addTabs(path) {
    const patha = require("path");
    switch (WhoFocus) {
        case 1:
            {
                htmlFiles.push({
                    path: path,
                    name: patha.basename(path),
                    view: windows.heditor.saveViewState(),
                });

                let li = document.createElement("li");
                li.innerHTML = patha.basename(path);
                li.setAttribute("data-path", path);
                li.className = "tabli";
                li.setAttribute("data-index", $("#tabul").children().length);
                $("#tabul").append(li);
                break;
            }
        case 2:
            {
                cssFiles.push({
                    path: path,
                    name: patha.basename(path),
                    view: windows.ceditor.saveViewState(),
                });
                let li = document.createElement("li");
                li.innerHTML = patha.basename(path);
                li.setAttribute("data-path", path);
                li.className = "tabli";
                li.setAttribute("data-index", $("#tabul1").children().length);
                $("#tabul1").append(li);
                break;
            }
        case 3:
            {
                jsFiles.push({
                    path: path,
                    name: patha.basename(path),
                    view: windows.jeditor.saveViewState(),
                });
                let li = document.createElement("li");
                li.innerHTML = patha.basename(path);
                li.setAttribute("data-path", path);
                li.className = "tabli";
                li.setAttribute("data-index", $("#tabul2").children().length);
                $("#tabul2").append(li);
                break;
            }
    }

    RegisterTabClick();
    let data = JSON.stringify([htmlFiles, cssFiles, jsFiles]);
    fs.writeFileSync(patha.join(GPATH + "\\config.json"), data);
}

function ViewTabs(h = "html") {
    if (h === "html") {
        $("#tabul1").hide();
        $("#tabul2").hide();
        $("#tabul").show();
    }

    if (h === "css") {
        $("#tabul").hide();
        $("#tabul2").hide();
        $("#tabul1").show();
    }
    if (h === "js") {
        $("#tabul1").hide();
        $("#tabul").hide();
        $("#tabul2").show();
    }
}

function RegisterTabClick() {
    $("#tabul>li,#tabul1>li,#tabul2>li").on("click", function(e) {
        if (($(this).attr("class")).includes('tabliactive')) {
            return
        }
        e.stopPropagation()
        const ma = $(this).parent().find(".tabliactive").attr('data-index')
        htmlFiles[ma]["view"] = windows.heditor.saveViewState()
        windows.heditor.focus()
        windows.heditor.setValue(fs.readFileSync($(this).attr("data-path"), "utf-8"))
        windows.heditor.restoreViewState(htmlFiles[$(this).attr('data-index')]["view"])
        e.stopPropagation();
        $(this).parent().children().removeClass("tabliactive");
        let pa = $(this).attr("data-path");
        $(this).addClass("tabliactive");
    });
}