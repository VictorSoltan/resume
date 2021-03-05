import React, { useState } from 'react';
import { library, icon } from '@fortawesome/fontawesome-svg-core';
import { faTimesCircle, faPlus } from '@fortawesome/free-solid-svg-icons'
import Option from 'react-select';
import userpic from './../static/userpic.png'
import skillDev from './../static/skill-development.png'
import language from './../static/language.png'
import code from './../static/default-qr.png'

import './avatar.css';

function Avatar({autosize, mystyle}) {
  const options = [
    { value: '0', label: <img alt='skill' src={skillDev} style={mystyle} width="20px"/>},
    { value: '1', label: <img alt="lang" src={language} style={mystyle} width="20px"/>},
  ]
  let [imgValue, setImgValue] = useState(0)
  let [selectValue, setSelectValue] = useState(options[0])
  const MyComponent = () => (
    <Option 
      value={selectValue}
      options={options}
      onChange={handleInputChange}
      isSearchable
      className="img-options"
    />
  )
  const handleInputChange = (inputValue) => {
    setSelectValue(selectValue = options[inputValue.value])
    setImgValue(imgValue = inputValue.value)
    if(document.querySelector('.icon-add-element') !== null){
      let addIcon = document.querySelectorAll('.icon-add-element')
      for(let i = 0; i < addIcon.length; i++){
        let new_element = addIcon[i].cloneNode(true);
        new_element.addEventListener("click", addSomeElem);
        addIcon[i].parentNode.replaceChild(new_element, addIcon[i]);
      }
    }
  }
  const loadFile = (e) => {
    let image = document.querySelector('.avatar');
    image.src = URL.createObjectURL(e.target.files[0])
  };
  const loadQrCode = (e) => {
    let image = document.querySelector('.code').children[0];
    image.src = URL.createObjectURL(e.target.files[0])
  };
  library.add(faTimesCircle, faPlus);

  const addSomeElem = e => addElement(e)

  const addElem = (e, item) => {
    let value;
    if(e.target === undefined){
      value = Number(e)
    }else{
      value = Number(e.target.nextElementSibling.value)
    }
    const skillCont = document.querySelector('.skills')

    let container = document.createElement("div");
    let cont = document.createElement("div");
    let pBar = document.createElement("div");
    let div = document.createElement("div");
    let img = document.createElement("img");
    let ProcNode = document.createElement("input");
    let liElem = document.createElement("li");
    let area = document.createElement("div")
    area.addEventListener('paste', function (e) {
      e.preventDefault()
      var text = e.clipboardData.getData('text/plain')
      document.execCommand('insertText', false, text)
    })
    area.contentEditable = "true"; 
    area.classList.add('textarea')
    area.addEventListener('keydown', autosize); 
    area.rows= '1'    
    area.classList.add('input')

    let iconContainer = document.createElement('div')
    let iconDelete = document.createElement('span');
    let iconAdd = document.createElement('span');
    iconAdd.classList.add('icon-add-element')
    iconContainer.appendChild(iconAdd)
    iconContainer.appendChild(iconDelete)
    iconDelete.addEventListener('click', deleteElement); 
    iconAdd.addEventListener('click', addSomeElem); 
    iconContainer.classList.add('close-icon')
    iconDelete.innerHTML = icon({ prefix: 'fas', iconName: 'times-circle' }).html;
    iconAdd.innerHTML = icon({ prefix: 'fas', iconName: 'plus' }).html;

    if (Number(value) === 0){
      if (Number(imgValue) === 0){
        img.classList.add('skill-Dev')
        img.src = skillDev
      }else{
        img.classList.add('language')
        img.src = language
      }
      area.classList.add('header-input')
      cont.classList.add('icon-column')
      cont.appendChild(img)
      container.appendChild(cont)
      container.appendChild(area)
      container.classList.add('header-container')
      container.appendChild(iconContainer)
      if (item !== 'addAbove'){
        if (item === undefined){
          skillCont.appendChild(container)    
        }else if(item.nextSibling !== null){
          skillCont.insertBefore(container, item.nextSibling);  
        }else{
          skillCont.appendChild(container)   
        }   
      }else{
        skillCont.insertBefore(container, skillCont.firstChild)    
      }

    }else if(Number(value) === 1){
      area.classList.add('column-input')
      if (skillCont.children[skillCont.children.length-1] !== undefined){
        if (skillCont.children[skillCont.children.length-1].classList[0] === 'progress-bar'){
          area.classList.add('column-input-mpTop')
        }
      }
      container.appendChild(area)
      container.appendChild(iconContainer)
      container.classList.add('second-header')
      if (item !== 'addAbove'){
        if (item === undefined){
          skillCont.appendChild(container)    
        }else if(item.nextSibling !== null){
          skillCont.insertBefore(container, item.nextSibling);  
        }else{
          skillCont.appendChild(container)   
        }   
      }else{
        skillCont.insertBefore(container, skillCont.firstChild)    
      }
    }else if(Number(value) === 2){
      cont.classList.add('pBar-border')
      pBar.classList.add('pBar-progress')
      div.classList.add('progress-bar')
      area.classList.add('progress-input')
      ProcNode.classList.add('procents')
      ProcNode.placeholder = "Полосa прогресса(от 1 до 10)"; 
      ProcNode.type = "number";
      ProcNode.onchange = function (e) {
        e.target.previousSibling.children[0].style = "width: "  + (e.target.value*10) + "%"  
      };
      cont.appendChild(pBar)
      container.appendChild(area)
      container.appendChild(cont)
      container.appendChild(ProcNode)
      div.appendChild(container)
      div.appendChild(iconContainer)
      if (item !== 'addAbove'){
        if (item === undefined){
          skillCont.appendChild(div)    
        }else if(item.nextSibling !== null){
          skillCont.insertBefore(div, item.nextSibling);  
        }else{
          skillCont.appendChild(div)   
        }   
      }else{
        skillCont.insertBefore(div, skillCont.firstChild)    
      }

    }else{
      container.appendChild(area)
      area.classList.add('marker-input')
      liElem.classList.add('marker')
      liElem.appendChild(container)
      liElem.appendChild(iconContainer)
      if (item !== 'addAbove'){
        if (item === undefined){
          skillCont.appendChild(liElem)    
        }else if(item.nextSibling !== null){
          skillCont.insertBefore(liElem, item.nextSibling);  
        }else{
          skillCont.appendChild(liElem)   
        }   
      }else{
        skillCont.insertBefore(liElem, skillCont.firstChild)    
      }

    }
  };
  const addElement = e => {
    let item = e.target.parentNode.parentNode;
    let elem = document.querySelector('.value-option')
    addElem(elem.value, item)
  }
  const deleteElement = (e) => {
    let item = e.target.parentNode.parentNode;
    item.parentNode.removeChild(item);
  }

  const addElemAbove = (e) => {
    let item = 'addAbove'
    let elem = document.querySelector('.value-option')
    addElem(elem.value, item)
  };

  return (
    <div className="header">
      <div className="ava-img">
        <div className="avatar-container">
          <img className="avatar" alt="avatar" src={userpic}/>	
        </div>
        <input className="browse-img" type="file"  accept="image/*" name="image" id="file"  onChange={loadFile}></input>
        <textarea rows="1" onKeyDown={autosize}  className="input-name input"></textarea>
        <textarea rows="1" onKeyDown={autosize} className="input-profession input"></textarea>
      </div>
      <div className="add-buttons">
        <div className="add-element">
          <button onClick={addElem}>Добавить элемент</button>
          <select className="value-option">
            <option value="0">Иконка+оглавление</option>
            <option value="1">Оглавление столбца</option>
            <option value="2">Аттрибут с полосой</option>
            <option value="3">Ма́ркер списка</option>
          </select>
          <MyComponent/>
        </div>
        <button className="removeElement" onClick={addElemAbove}>Добавить элемент сверху</button>
      </div>
      <div className="skills">
      </div>
      <div className="code">
        <img src={code} alt="code" />
        <input className="browseImg" type="file"  accept="image/*" name="image" id="file" onChange={loadQrCode}></input>
      </div>      
    </div>
  );
}

export default Avatar;
