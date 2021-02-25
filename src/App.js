import React from 'react';
import './App.css';
import Avatar from './components/Avatar'
import Bio from './components/Bio'
import { jsPDF } from "jspdf";
import domtoimage from 'dom-to-image';

function App() {
  const Save = () => {
    let area = document.querySelectorAll('textarea')
    for(let x=0; x<area.length; x++){
      let textSpan = document.createElement("div");
      textSpan.classList.add('contint')
      textSpan.contentEditable = "true"; 
      textSpan.innerHTML = area[x].value
      textSpan.style.width = area[x].offsetWidth + 'px'
      textSpan.style.height = area[x].offsetHeight + 'px'
      console.log(textSpan)
      area[x].parentNode.appendChild(textSpan)
      area[x].parentNode.removeChild(area[x])
    } 
  }

  const printDocument = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    // document.querySelector('.save-button').style = 'display: none;'
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
    const input = document.querySelector('.App');
    const scale = 3
    console.log(input)
    
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

    domtoimage.toPng(input, param)
      .then(function (imgData) {
 
          let ImWidth = input.offsetWidth;
          let ImHeight = input.offsetHeight;
          let millimeters = {};
          millimeters.Width = Math.floor(ImWidth / 5.90476190476);
          millimeters.Height = Math.floor(ImHeight / 5.90476190476);
          console.log(ImWidth + '...' + millimeters.Width)
          console.log(ImHeight + '...' + millimeters.Height)
          const pdf = new jsPDF("p", "mm", "a4", millimeters.Width, millimeters.Height);
          pdf.internal.scaleFactor = 30;
          pdf.addImage(imgData, 'PNG', 0, 0, millimeters.Width, millimeters.Height);
          pdf.save("download.pdf");
      });
  }
  return (
    <div>
      <div className="App">
        <Avatar />
        <Bio />
      </div>
      <button className="save-button" onClick={printDocument}>Экспортировать файл в PDF</button>
      <button className="save-button" onClick={Save}>Сохранить</button>
    </div>
  );
}

export default App;
