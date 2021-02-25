import React, { useState } from 'react';
import Option from 'react-select';
import './avatar.css';
import userpic from './../static/userpic.png'
import skillDev from './../static/skill-development.png'
import language from './../static/language.png'
import code from './../static/qr-code.png'


function Avatar() {
  
  const mystyle = {
    backgroundColor: "DodgerBlue",
    padding: "5px",
  };
  const options = [
    { value: '0', label: <img src={skillDev} style={mystyle} width="20px"/>},
    { value: '1', label: <img src={language} style={mystyle} width="20px"/>},
  ]
  let [imgValue, setImgValue] = useState(0)
  const MyComponent = () => (
    <Option 
      defaultValue={options[0]}
      options={options}
      onChange={handleInputChange}
      isSearchable
      className="img-options"
    />
  )
  const handleInputChange = (inputValue) => {
    setImgValue(imgValue = inputValue.value)
  }
  const loadFile = (e) => {
    let image = document.querySelector('.avatar');
    image.src = URL.createObjectURL(e.target.files[0])
  };
  const loadQrCode = (e) => {
    let image = document.querySelector('.code').children[0];
    image.src = URL.createObjectURL(e.target.files[0])
  };
  const addElem = (e) => {
    let value = e.target.nextElementSibling.value
    console.log(e.target.nextElementSibling.value)
    let container = document.createElement("div");
    let cont = document.createElement("div");
    let pBar = document.createElement("div");
    let img = document.createElement("img");
    let node = document.createElement("input");
    let ProcNode = document.createElement("input");
    let liElem = document.createElement("li");
    node.classList.add('input')
    if (Number(value) === 0){
      node.classList.add('header-input')
      cont.classList.add('icon-column')
      if (Number(imgValue) === 0){
        img.src = skillDev
      }else{
        img.src = language
      }
      cont.appendChild(img)
      container.appendChild(cont)
      container.appendChild(node)
      container.classList.add('header-container')
      document.querySelector('.skills').appendChild(container)   
    }else if(Number(value) === 1){
      node.classList.add('column-input')
      container.appendChild(node)
      document.querySelector('.skills').appendChild(node)
    }else if(Number(value) === 2){
      cont.classList.add('pBar-border')
      pBar.classList.add('pBar-progress')
      container.classList.add('progress-bar')
      node.classList.add('progress-input')
      ProcNode.classList.add('procents')
      ProcNode.placeholder = "Проценты столбца(от 1 до 100)"; 
      ProcNode.type = "number";
      ProcNode.onchange = function (e) {
        e.target.previousSibling.children[0].style = "width: "  + e.target.value + "%"  
     };
      cont.appendChild(pBar)
      container.appendChild(node)
      container.appendChild(cont)
      container.appendChild(ProcNode)
      document.querySelector('.skills').appendChild(container)
    }else{
      container.appendChild(node)
      node.classList.add('marker-input')
      liElem.classList.add('marker')
      liElem.appendChild(container)
      document.querySelector('.skills').appendChild(liElem)
    }
  };
  const removeElem = (e) => {
    console.log(e.target)
    let skills = document.querySelector('.skills')
    if (skills.children.length > 0){
      skills.removeChild(skills.lastElementChild)
    }  
  };
  return (
    <div className="header">
      <div className="ava-img">
        <img className="avatar" src={userpic}/>	
        <input className="browse-img" type="file"  accept="image/*" name="image" id="file"  onChange={loadFile}></input>
        <input className="input-name input"></input>
        <input className="input-profession input"></input>
      </div>
      <div className="add-buttons">
        <div className="add-element">
          <button onClick={addElem}>Добавить элемент</button>
          <select>
            <option value="0">Иконка+оглавление</option>
            <option value="1">Оглавление столбца</option>
            <option value="2">Аттрибут с полосой</option>
            <option value="3">Ма́ркер списка</option>
          </select>
          <MyComponent/>
        </div>
        <button className="removeElem" onClick={removeElem}>Удалить последний элемент</button>
      </div>
      <div className="skills">
      </div>
      <div className="code">
        <img src={code} />
        <input className="browse-img" type="file"  accept="image/*" name="image" id="file" onChange={loadQrCode}></input>
      </div>      
    </div>
  );
}

export default Avatar;
