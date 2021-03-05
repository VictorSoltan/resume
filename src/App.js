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
      let area = document.querySelectorAll('.textarea')
      for(let x=0; x<area.length; x++){
        area[x].style = 'border-bottom: none;'
      }
      const buttons = document.querySelectorAll('.add-buttons')
      for (let x = 0; x < buttons.length; x++){
        buttons[x].style = 'display: none;'
      }
      document.querySelector('.browseImg').style = 'display: none;'

      let inputList = document.querySelectorAll('.input')
      for (let x = 0; x < inputList.length; x++){
        inputList[x].style = 'border-bottom: none; resize: none;'
      }
      let procents = document.querySelectorAll('.procents')
      for (let x = 0; x < procents.length; x++){
        procents[x].style = 'display: none;'
      }    
      const iconsEditing = document.querySelectorAll('.close-icon')

      for (let x = 0; x < iconsEditing.length; x++){
        iconsEditing[x].style = 'visibility: hidden;'
      }                 
      document.querySelector('.browse-img').style = 'visibility: hidden;'
      window.scrollTo(0,document.body.scrollHeight);
      SetPermission(permission = false)
    }
  }
  const Editing = () => {
    if (permission === false){
      let area = document.querySelectorAll('.textarea')
      for(let x=0; x<area.length; x++){
        area[x].style.borderBottom =  '1px solid #11adb5';
      } 
      let inputList = document.querySelectorAll('.input')
      for (let x = 0; x < inputList.length; x++){
        inputList[x].style = 'border-bottom: 1px solid #11adb5; resize: both;'
      }
      document.querySelector('.browseImg').style = 'display: block;'
      let procents = document.querySelectorAll('.procents')
      for (let x = 0; x < procents.length; x++){
        procents[x].style = 'display: block;'
      }    
      const buttons = document.querySelectorAll('.add-buttons')
      for (let x = 0; x < buttons.length; x++){
        buttons[x].style = 'display: block;'
      }        
      const iconsEditing = document.querySelectorAll('.close-icon')
      for (let x = 0; x < iconsEditing.length; x++){
        iconsEditing[x].style = 'visibility: visible;'
      }           
      document.querySelector('.browse-img').style = 'visibility: visible;'
      window.scrollTo(0,document.body.scrollHeight);
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
    if(event.target.classList[0] === 'input-profession' || event.target.classList[0] === 'input-name'){
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
    padding: "4px",
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
