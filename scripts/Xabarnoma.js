var vaqt
function xabar(matn, holati="succes") {
  let c = ""
  let j=""
  switch (holati) {
    case "err": {
      c = "error"
      j="wl-cancel-circle"
      break
    }
    case "warn":
      {
        c = "warning"
        j="wl-warning"
        break
      }
    case "succes":
      {
        c="success"
        j="wl-checkmark"
        break
      }
  }
  var aframe = document.getElementById("alert-frame")
  let frame = document.createElement("div")
  frame.className = "frame "+c
  let aicon = document.createElement('div')
  aicon.className = "alert-icon"
  let i = document.createElement('i')
  i.className = "i"+c+" "+j
  aicon.appendChild(i)
  frame.appendChild(aicon)
  let content = document.createElement('div')
  content.className = "alert-content"
  content.id = "alert_content"
  content.innerHTML = matn
  frame.appendChild(content)
  aframe.appendChild(frame)
  setTimeout(() => frame.classList.add('frame-show'), 1)
  setTimeout(() => {
    frame.classList.remove('frame-show')
    setTimeout(()=>{
      frame.parentNode.removeChild(frame)
    },200)
  }, 5000)
}