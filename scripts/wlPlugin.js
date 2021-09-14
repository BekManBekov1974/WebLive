window.alert = (param) => {
    var m = document.getElementsByTagName("body")[0];
    let f = document.createElement("div");
    f.className = "alertBG";
    f.id = "alertBG";
    let fi = document.createElement("div");
    fi.className = "alertForm";
    f.addEventListener("click", function () {
      fi.classList.remove("alertFormShow");
      this.innerHTML = "";
      this.classList.remove("alertBG");
    });
    let but = document.createElement("div");
    but.className = "buttonOk";
    but.innerText = "Ok";
    let titleFi = document.createElement("div");
    let alertContent = document.createElement("span");
    alertContent.innerText = param;
    alertContent.className = "alertContent";
    titleFi.className = "alertTitle";
    titleFi.innerHTML = `
    <svg x="0px" y="0px" viewBox="0 0 448 456.32" id="wl_info_svg">
    <path  scale="1" d="M197.47,142.27c0-11.04,8.95-20.07,19.9-20.07h13.26c10.94,0,19.9,9.03,19.9,20.07v13.38
      c0,11.04-8.95,20.07-19.9,20.07h-13.26c-10.94,0-19.9-9.03-19.9-20.07V142.27z M277.06,336.28H170.94v-26.76h26.53v-80.28h-26.53
      v-26.76h79.59v107.04h26.53V336.28z M224,15.17c-117.21,0-212.23,95.84-212.23,214.07S106.79,443.31,224,443.31
      s212.23-95.84,212.23-214.07S341.21,15.17,224,15.17z M224,403.18c-95.23,0-172.43-77.87-172.43-173.94S128.77,55.31,224,55.31
      s172.43,77.87,172.43,173.94S319.23,403.18,224,403.18z"/>
    </svg>
    `;
    fi.appendChild(titleFi);
    fi.appendChild(alertContent);
    fi.appendChild(but);
    f.appendChild(fi);
    m.appendChild(f);
    setTimeout(() => {
      fi.classList.add("alertFormShow");
      f.classList.add("alertBGShow");
    }, 1);
  };
  