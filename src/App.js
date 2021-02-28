import React, {useState} from 'react';
import './App.css';
import Avatar from './components/Avatar'
import Bio from './components/Bio'
import { jsPDF } from "jspdf";
import domtoimage from 'dom-to-image';

function App() {
  let [permission, SetPermission] = useState(true)

  const Save = () => {
    if (permission === true){
      let area = document.querySelectorAll('textarea')
        for(let x=0; x<area.length; x++){
          let textSpan = document.createElement("div");
          textSpan.classList.add('contint')
          textSpan.contentEditable = "true"; 
          for(let i = 0; i<area[x].classList.length; i++){
            textSpan.classList.add(area[x].classList[i])
        }
        textSpan.innerText = area[x].value
        textSpan.style.width = area[x].offsetWidth + 'px'
        textSpan.style.height = area[x].offsetHeight + 'px'
        area[x].parentNode.appendChild(textSpan)
        area[x].parentNode.removeChild(area[x])
        document.querySelector('.browseImg').style = 'display: none;'
        let inputList = document.querySelectorAll('.input')
        for (let x = 0; x < inputList.length; x++){
          inputList[x].style = 'border-bottom: none;'
        }
        let procents = document.querySelectorAll('.procents')
        for (let x = 0; x < procents.length; x++){
          procents[x].style = 'display: none;'
        }    
        const buttons = document.querySelectorAll('.add-buttons')
        for (let x = 0; x < buttons.length; x++){
          buttons[x].style = 'display: none;'
        }        
        document.querySelector('.browse-img').style = 'visibility: hidden;'
        SetPermission(permission = false)
      }
    }
  }
  const Editing = () => {
    if (permission === false){
      let textSpan = document.querySelectorAll('.contint')
      for(let x=0; x<textSpan.length; x++){
        let textArea = document.createElement("textarea");
        textArea.value = textSpan[x].innerText
        for(let i = 0; i<textSpan[x].classList.length; i++){
        textArea.classList.add(textSpan[x].classList[i])
        }
        textArea.addEventListener('keydown', autosize); 
        textArea.style.width = (textSpan[x].offsetWidth -1) + 'px'
        textArea.style.height = (textSpan[x].offsetHeight -1) + 'px'
        textSpan[x].parentNode.appendChild(textArea)
        textSpan[x].parentNode.removeChild(textSpan[x])
      } 
      document.querySelector('.browseImg').style = 'display: block;'
      let inputList = document.querySelectorAll('.input')
      for (let x = 0; x < inputList.length; x++){
        inputList[x].style = 'border-bottom: 1px solid #11adb5;'
      }
      let procents = document.querySelectorAll('.procents')
      for (let x = 0; x < procents.length; x++){
        procents[x].style = 'display: block;'
      }    
      const buttons = document.querySelectorAll('.add-buttons')
      for (let x = 0; x < buttons.length; x++){
        buttons[x].style = 'display: block;'
      }        
      document.querySelector('.browse-img').style = 'visibility: visible;'
      SetPermission(permission = true)
    }
  }
  const printDocument = () => {
    Save()
    SetPermission(permission = false)

    const input = document.querySelector('.App');
    const scale = 3
    
    const style = {
      transform: 'scale('+scale+')',
      transformOrigin: 'top left',
      width: input.offsetWidth + "px",
      height: input.offsetHeight + "px"
    }
  
    const param = {
      height: input.offsetHeight * scale,
      width: input.offsetWidth * scale,
      quality: 1,
      style
    }

    domtoimage.toJpeg(input, param)
      .then(function (imgData) {
          let ImWidth = input.offsetWidth;
          let ImHeight = input.offsetHeight;
          let millimeters = {};
          millimeters.Width = Math.floor(ImWidth / 5.90476190476);
          millimeters.Height = Math.floor(ImHeight / 5.90476190476);
          let orient, leftValue, rightValue
          if (ImWidth > ImHeight){
            orient = "l"
            leftValue = millimeters.Width
            rightValue = millimeters.Height
          }else{
            orient = 'p'
            leftValue = millimeters.Height
            rightValue = millimeters.Width   
          }
          const pdf = new jsPDF({
            orientation: orient,
            unit: "mm",
            format: [leftValue, rightValue]
          });
          pdf.internal.scaleFactor = 30;
          pdf.addImage(imgData, 'PNG', 0, 0, (millimeters.Width), millimeters.Height);
          pdf.save("download.pdf");
    });
  }
  function autosize(event){
    let el
    if(event.target.classList[0] === 'input-profession'){
      el = event.target
    }else{
      el = this;
    }
    setTimeout(function(){
      el.style.cssText = 'height:auto; padding:0';
      el.style.cssText = 'height:' + el.scrollHeight + 'px';
    },0);
  }
  const mystyle = {
    backgroundColor: "DodgerBlue",
    padding: "5px",
    width: '20px'
  };    
  return (
    <div>
      <div className="App">
        <Avatar autosize={autosize} mystyle={mystyle}/>
        <Bio autosize={autosize} mystyle={mystyle}/>
      </div>
      <div className="redactor-buttons">
        <button className="save-button" onClick={printDocument}>Экспортировать файл в PDF</button>
        <button className="save-button" onClick={Save}>Сохранить изменения</button>
        <button className="save-button" onClick={Editing}>Продолжить редактирование</button>
      </div>
    </div>
  );
}

export default App;
