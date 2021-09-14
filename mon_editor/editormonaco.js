/*var junction_font = new FontFace(
  "Fira Code",
  "url(../fonts/FiraCode-regular.ttf)"
);
junction_font
  .load()
  .then(function (loaded_face) {
    document.fonts.add(loaded_face);
  })
  .catch(function (error) {});*/
var htmlEditor = document.getElementById("edFrame");
var cssEditor = document.getElementById("cedFrame");
var jsEditor = document.getElementById("jedFrame");
var pedEditor = document.getElementById("pedFrame");
var ACTIVE_EDITOR_NAME = "main";

var heditor = monaco.editor.create(htmlEditor, {
  language: "html",
  automaticLayout: true,
  fontFamily: "Consolas",
  fontSize: "14 px",
  roundedSelection: false,
  smoothScrolling: true,
  renderWhitespaces: "all",
  cursorWidth: 1,
  disableLayerHinting: true,
});
heditor.addAction({
  id: "__wl__save__html",
  label: "HTML Saqlash",
  keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S],
  precondition: null,
  keybindingContext: null,
  contextMenuGroupId: "navigation",
  contextMenuOrder: 1.5,
  run: function (ed) {
    window.top.postMessage(3, "*");
    window.top.Changed(false);
  },
});

var hTimer, cTimer, jTimer, pTimer;
heditor.onDidChangeModelContent(function (e) {
  window.top.Changed(true);
});
heditor.onKeyDown(function (e) {
  localStorage.setItem("__weblivehtml__", heditor.getValue());
  if (e.code === "F5") {
    window.top.postMessage(0, "*");
  }
});
heditor.onMouseDown(function (e) {
  heditor.focus();
  window.top.HtmlFocus();
});
var ceditor = monaco.editor.create(cssEditor, {
  language: "css",
  automaticLayout: true,
  minimap: {
    enabled: true,
  },
  fontSize: "14px",
  fontFamily: "Consolas",
  roundedSelection: false,
  smoothScrolling: true,
});
ceditor.onDidChangeModelContent(function (e) {
  window.top.Changed(true);
});
ceditor.addAction({
  id: "__wl__save__css",
  label: "CSS Saqlash",
  keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S],
  precondition: null,
  keybindingContext: null,
  contextMenuGroupId: "navigation",
  contextMenuOrder: 1.5,
  run: function (ed) {
    window.top.postMessage(4, "*");
    window.top.Changed(false);
  },
});
ceditor.onKeyDown(function (e) {
  window.top.Changed();
  localStorage.setItem("__weblivecss__", ceditor.getValue());
  if (e.code === "F5") {
    window.top.postMessage(0, "*");
  }
});
ceditor.onMouseDown(function (e) {
  ceditor.focus();
  window.top.CssFocus();
});

var jeditor = monaco.editor.create(jsEditor, {
  language: "javascript",
  automaticLayout: true,
  minimap: {
    enabled: true,
  },
  fontSize: "14px",
  fontFamily: "Consolas",
  roundedSelection: false,
  smoothScrolling: true,
  contextmenu: false,
});
jeditor.onDidChangeModelContent(function (e) {
  window.top.Changed();
  window.top.Changed(true);
});
jeditor.addAction({
  id: "__wl__save__js",
  label: "JavaScript Saqlash",
  keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S],
  precondition: null,
  keybindingContext: null,
  contextMenuGroupId: "navigation",
  contextMenuOrder: 1.5,
  run: function (ed) {
    window.top.postMessage(5, "*");
    window.top.Changed(false);
    console.log(jeditor.saveViewState());
  },
});
jeditor.onKeyDown(function (e) {
  window.top.Changed();
  localStorage.setItem("__weblivejs__", jeditor.getValue());
  if (e.code === "F5") {
    window.top.postMessage(0, "*");
  }
});
jeditor.onMouseDown(function (e) {
  jeditor.focus();
  window.top.JsFocus();
});
var peditor = monaco.editor.create(pedEditor, {
  language: "javascript",
  automaticLayout: true,
  minimap: {
    enabled: true,
  },
  fontSize: "14px",
  fontFamily: "Consolas",
  roundedSelection: false,
  smoothScrolling: true,
  renderIndentGuides: false,
  contextmenu: false,
});
peditor.onKeyDown(function (e) {
  window.top.Changed();
  localStorage.setItem("__weblivep5__", peditor.getValue());
  if (e.code === "F5") {
    window.top.postMessage(4, "*");
  }
});

function CodeBeautify(editor) {
  switch (editor) {
    case "html": {
      heditor.getAction("editor.action.formatDocument").run();
      break;
    }
  }
}
/*controller = heditor.getContribution('editor.contrib.findController');
controller.toggleRegex();*/

function LinkJoylash(link,ext='c') {
  let re = new RegExp("[.*]{0,}<link {0,}.*href=['\"`]" + link + "['\"`].*>", "ig");
  let m = heditor.getModel().findMatches(re, false, true).length > 0;
  var range = heditor
    .getModel()
    .findMatches(m ? re : "</head>", false, m ? true : false)[0].range;
  if (m)
  {
    range.startLineNumber -= 1;
    range.startColumn=15000;
  } 
  var id = { major: 1, minor: 1 };
  var op = {
    identifier: id,
    range: range,
    text: (ext==='c')?(m ? "" : "\t<link rel='stylesheet' href='" + link + "'>\n</head>"):("<script src='>"),
    forceMoveMarkers: true,
  };
  heditor.executeEdits("", [op]);
}

function createDependencyProposals(range) {
  return [
    {
      label: "html:5",
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: "Tayyor HTML snippet joylashtirish",
      insertText:
        "<!DOCTYPE html>\n" +
        '<html lang="en">\n\n' +
        "<head>\n" +
        '\t<meta charset="UTF-8">\n' +
        '\t<meta name="viewport" content="width=${1:device-width}, initial-scale=1.0">\n' +
        "\t<title>${2:Sarlavha}</title>\n" +
        '\t<link rel="stylesheet" href="./Dizayn/style.css">\n' +
        '\t<script src="./JavaScript/wl-lugin.js"></script>\n' +
        '\t<script src="./JavaScript/jscript.js"></script>\t' +
        "</head>\n\n" +
        "<body>\n" +
        "\t${0:}\n" +
        "</body>\n\n" +
        "</html>",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      range: range,
    },
    {
      label: "div.class",
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: "Fast, unopinionated, minimalist web framework",
      insertText: '<div class="${1:class_nomi}">${0:}</div>',
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      range: range,
    },
    {
      label: "div.class#id",
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: "Fast, unopinionated, minimalist web framework",
      insertText: '<div class="${1:class_nomi}" id="${2:id_nomi}">${0:}</div>',
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      range: range,
    },
    {
      label: "link",
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: "Fast, unopinionated, minimalist web framework",
      insertText: '<link rel="${1:}" href="${2:}">${0:}',
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      range: range,
    },
  ];
}

function createJSDependencyProposals(range) {
  return [
    {
      label: "function:snipped",
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: "Tayyor HTML snippet joylashtirish",
      insertText:
        "function ${1:funksiya_nomi} (${2:argumentlar})\n{\n\t${0:}\n}",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      range: range,
    },
    {
      label: "setInterval:snipped",
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: "Fast, unopinionated, minimalist web framework",
      insertText: "setInterval(function(){\n\t${0:}\n},${1:millisekund})",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      range: range,
    },
  ];
}
monaco.languages.registerCompletionItemProvider("html", {
  provideCompletionItems: function (model, position) {
    // find out if we are completing a property in the 'dependencies' object.
    var textUntilPosition = model.getValueInRange({
      startLineNumber: 1,
      startColumn: 1,
      endLineNumber: position.lineNumber,
      endColumn: position.column,
    });

    var word = model.getWordUntilPosition(position);
    var range = {
      startLineNumber: position.lineNumber,
      endLineNumber: position.lineNumber,
      startColumn: word.startColumn,
      endColumn: word.endColumn,
    };
    return {
      suggestions: createDependencyProposals(range),
    };
  },
});
monaco.languages.registerCompletionItemProvider("javascript", {
  provideCompletionItems: function (model, position) {
    // find out if we are completing a property in the 'dependencies' object.
    var textUntilPosition = model.getValueInRange({
      startLineNumber: 1,
      startColumn: 1,
      endLineNumber: position.lineNumber,
      endColumn: position.column,
    });

    var word = model.getWordUntilPosition(position);
    var range = {
      startLineNumber: position.lineNumber,
      endLineNumber: position.lineNumber,
      startColumn: word.startColumn,
      endColumn: word.endColumn,
    };
    return {
      suggestions: createJSDependencyProposals(range),
    };
  },
});

/*
+--------+--------+
|  html  |        |
+--------+        |
| css=?  |    B   |
+--------+        |
|  js=?  |        |
|--------+--------+
*/
function Joylashuv(html = true, css = false, js = false, horizon = true) {
  if (!(html || css || js)) html = true;

  $("#split").jqxSplitter({
    splitBarSize: 4,
    width: "100%",
    height: "100%",
    showSplitBar: js ? (html || css ? true : false) : false,
    orientation: horizon ? "horizontal" : "vertical",
    panels: [
      {
        size:
          html && css
            ? js
              ? "68%"
              : "100%"
            : html || css
            ? js
              ? "50%"
              : "100%"
            : "0%",
      },
      {
        size:
          html && css
            ? js
              ? "68%"
              : "100%"
            : html || css
            ? js
              ? "50%"
              : "100%"
            : "0%",
      },
    ],
  });
  $("#left-split").jqxSplitter({
    splitBarSize: 4,
    width: "100%",
    height: "100%",
    orientation: horizon ? "horizontal" : "vertical",
    showSplitBar: html & css ? true : false,
    panels: [
      { size: html & css ? "50%" : html ? "100%" : "0%" },
      { size: html & css ? "50%" : css ? "100%" : "0%" },
    ],
  });
  $("#right-split").jqxSplitter({
    splitBarSize: 4,
    width: "100%",
    height: "100%",
    orientation: horizon ? "horizontal" : "vertical",
    panels: [{ size: js ? "100%" : "0%" }, { size: "0%" }],
  });
  $("#split").css({
    border: "0",
  });

  $("#split").on("resize", function (event) {
    jeditor.layout();
    heditor.layout();
    ceditor.layout();
  });
}
var splitBg = "#000000",
  splitbr = "#000000";
function ChangeTheme(name, obj) {
  monaco.editor.defineTheme(name, obj);
  monaco.editor.setTheme(name);
  window.top.ChangeTheme(obj);
  splitBg = obj.colors["editor.background"];
  splitbr = obj.panels["activityBar.foreground"];
  $("#splitColors").html(`
  :root{
  --split-top:${splitbr};
  --split-left:${splitbr};
  --split-back:${splitBg};
  }`);
}
function getEditorText() {
  var h = heditor.getValue();
  var c = ceditor.getValue();
  var j = jeditor.getValue();
  return {
    html: h,
    css: c,
    js: j,
  };
}
