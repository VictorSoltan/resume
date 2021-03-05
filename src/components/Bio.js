import React, { useState } from 'react';
import Option from 'react-select';
import { library, icon } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle, faPlus, faMapMarkerAlt, faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons'

import QualityExpert from './../static/Quality_Expert.png'

import resume from './../static/resume.png'
import experience from './../static/experience.png'
import mortarboard from './../static/mortarboard.png'
import onlineCourse from './../static/online-course.png'
import button from './../static/button.png'
import briefing from './../static/briefing.png'

import './bio.css';

function Bio({autosize, mystyle}) {
  const options = [
    { value: '0', label: <img alt="resume" src={resume} style={mystyle}/>},
    { value: '1', label: <img alt="exp" src={experience} style={mystyle}/>},
    { value: '2', label: <img alt="mortar" src={mortarboard} style={mystyle}/>},
    { value: '3', label: <img alt="course" src={onlineCourse} style={mystyle}/>},
    { value: '4', label: <img alt="button" src={button} style={mystyle}/>},
    { value: '5', label: <img alt="briefing" src={briefing} style={mystyle}/>}
  ]
  let [input, setInput] = useState([
    {name: 'Adress', value: "36020, Poltava, Ukraine", fontIcon: faMapMarkerAlt},
    {name: 'Phone', value: '+38-096-492-40-21', fontIcon: faPhoneAlt},
    {name: 'E-Mail', value: "company@quality-expert.com", fontIcon: faEnvelope},
    {name: 'Linkedin', value: 'linkedin.com/in/quality-expert-com', fontIcon: faLinkedinIn}
  ]);

  const handleChange = index => e => {
      let newArr = [...input];
      newArr[index].value = e.target.value; 
      setInput(newArr);
  };

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
  const addSomeElem = e => addElement(e)

  const handleInputChange = (inputValue) => {
    setSelectValue(selectValue = options[inputValue.value])
    setImgValue(imgValue = Number(inputValue.value))
    if(document.querySelector('.icon-add-element') !== null){
      let addIcon = document.querySelectorAll('.icon-add-element')
      for(let i = 0; i < addIcon.length; i++){
        let new_element = addIcon[i].cloneNode(true);
        new_element.addEventListener("click", addSomeElem);
        addIcon[i].parentNode.replaceChild(new_element, addIcon[i]);
      }
    }
  }

  library.add(faTimesCircle, faPlus);

  const addElem = (e, item) => {
    let value;
    if(e.target === undefined){
      value = Number(e)
    }else{
      value = Number(e.target.nextElementSibling.value)
    }
    const bioCont = document.querySelector('.biography')

    let container = document.createElement("div");
    let cont = document.createElement("div");
    let img = document.createElement("img");
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

    if (value === 0){
      if (imgValue === 0){
        img.src = resume
        img.classList.add('resume')
      }else if(imgValue === 1){
        img.src = experience
        img.classList.add('experience')
      }else if(imgValue === 2){
        img.src = mortarboard
        img.classList.add('mortarboard')
      }else if(imgValue === 3){
        img.src = onlineCourse
        img.classList.add('onlineCourse')
      }else if(imgValue === 4){
        img.src = button
        img.classList.add('button-img')
      }else{
        img.src = briefing
        img.classList.add('briefing')
      }
      cont.classList.add('icon-column')
      cont.appendChild(img)
      container.appendChild(cont)
      area.classList.add('bio-header-area')
      container.appendChild(area)
      container.classList.add('bio-header-container')
      container.appendChild(iconContainer)
      if (item !== 'addAbove'){
        if (item === undefined){
          if(bioCont.firstChild !== null){
            if (bioCont.firstChild.classList[1] === 'bio-container-mpTop'){
              bioCont.firstChild.classList.remove("bio-container-mpTop");
            }
          }
          bioCont.appendChild(container)   
        }else if(item.nextSibling !== null){
          console.log(item.nextSibling)
          bioCont.insertBefore(container, item.nextSibling);  
        }else{
          bioCont.appendChild(container)   
        }
      }else{
        if (bioCont.firstChild.classList[1] === 'bio-container-mpTop'){
          bioCont.firstChild.classList.remove("bio-container-mpTop");
        }
        bioCont.insertBefore(container, bioCont.firstChild)    
      }
    }else if(value === 1){
      container.appendChild(area)
      area.classList.add('bio-marker-input')
      container.classList.add('bio-container')
      container.classList.add('bio-container-mpTop')
      container.appendChild(iconContainer)
      if (item !== 'addAbove'){
        if (item === undefined){
          if(bioCont.lastChild !== null){
            console.log(bioCont.lastChild)
            if(bioCont.lastChild.classList[0] === 'bio-header-container'){
              container.classList.remove('bio-container-mpTop')
            }
          }
          bioCont.appendChild(container)    
        }else if(item.nextSibling !== null){
          if(item.classList[0] === 'bio-header-container'){
            container.classList.remove('bio-container-mpTop')
          }
          bioCont.insertBefore(container, item.nextSibling);  
        }else{
          if(item.classList[0] === 'bio-header-container'){
            container.classList.remove('bio-container-mpTop')
          }
          bioCont.appendChild(container)   
        }   
      }else{
        bioCont.insertBefore(container, bioCont.firstChild)    
      }   
    }else if(value === 2){
      container.appendChild(area)
      area.classList.add('bio-marker-input')
      liElem.classList.add('bio-marker')
      container.classList.add('bio-marker-container')
      liElem.appendChild(container)
      liElem.appendChild(iconContainer)
      if (item !== 'addAbove'){
        if (item === undefined){
          bioCont.appendChild(liElem)    
        }else if(item.nextSibling !== null){
          document.querySelector('.biography').insertBefore(liElem, item.nextSibling);  
        }else{
          document.querySelector('.biography').appendChild(liElem)   
        }       
      }else{
        bioCont.insertBefore(liElem, bioCont.firstChild)    
      }
    }else if(value === 3){
      container.appendChild(area)
      area.classList.add('bio-marker-area')
      container.classList.add('bio-area-container')
      container.classList.add('bio-container-mg')
      container.appendChild(iconContainer)
      if (item !== 'addAbove'){
        if (item === undefined){
          bioCont.appendChild(container)    
        }else if(item.nextSibling !== null){
          document.querySelector('.biography').insertBefore(container, item.nextSibling);  
        }else{
          document.querySelector('.biography').appendChild(container)   
        }   
      }else{
        bioCont.insertBefore(container, bioCont.firstChild)    
      }
    }else{
      container.appendChild(area)
      area.classList.add('bio-marker-area')
      liElem.classList.add('bio-area-marker')
      container.classList.add('bio-area-container')
      liElem.appendChild(container)
      liElem.appendChild(iconContainer)
      if (item !== 'addAbove'){
        if (item === undefined){
          bioCont.appendChild(liElem)  
        }else if(item.nextSibling !== null){
          document.querySelector('.biography').insertBefore(liElem, item.nextSibling);  
        }else{
          document.querySelector('.biography').appendChild(liElem)   
        }     
      }else{
        bioCont.insertBefore(liElem, bioCont.firstChild)    
      }
    }
  };
  
  const deleteElement = (e) => {
    let item = e.target.parentNode.parentNode;
    if(item.nextSibling !== null){
      if(item.classList[0] === 'bio-header-container' && item.nextSibling.classList[0] === 'bio-container'){
        item.nextSibling.classList.add("bio-container-mpTop");
      }
    }
    if(item.previousSibling !== null && item.nextSibling !== null){
      if (item.previousSibling.classList[0] === 'bio-header-container' && item.nextSibling.classList[1] === 'bio-container-mpTop'){
        console.log(item.nextSibling.classList)
        item.nextSibling.classList.remove("bio-container-mpTop")
      }
    }
    item.parentNode.removeChild(item);
  }

  const addElement = e => {
    let item = e.target.parentNode.parentNode;
    let elem = document.querySelector('.optionValue')
    addElem(elem.value, item)
  }
  const addElemAbove = (e) => {
    let item = 'addAbove'
    let elem = document.querySelector('.optionValue')
    addElem(elem.value, item)
  };

  function getSelectionHtml() {
    let sel, range, node;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = window.getSelection().getRangeAt(0);
            
            var html = '<span style="font-weight:bold;">' + range + '</span>'
            range.deleteContents();
            
            let el = document.createElement("div");
            el.innerHTML = html;
            let frag = document.createDocumentFragment();
            while ( (node = el.firstChild) ) {
              frag.appendChild(node);
            }
            range.insertNode(frag);
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        range.collapse(false);
        range.pasteHTML(html);
    }
  }
  const removeSelectionHtml = () => {
    let rt = window.getSelection()
    if (rt.focusNode.children !== undefined){
      rt.focusNode.children[0].style = 'fontWeight: normal;'
    }else if(rt.focusNode.previousSibling !== null){
      rt.focusNode.previousSibling.style = 'fontWeight: normal;'
    }else{
      rt.focusNode.parentElement.style = 'fontWeight: normal;'      
    }
  }
  return (
    <div className="bio">
      <div className="contacts">
        <div className="contact-info">
        {input.map( (input, index) =>{
          return(
          <div className="info" key={index}>
            <FontAwesomeIcon icon={input.fontIcon} />
            <div>
              <span>{input.name}</span>
              <input value={input.value} onChange={handleChange(index)} className="input" />
            </div>
          </div>
          )})}
        </div>
        <div className="logo">
          <img src={QualityExpert} alt="expert"/>
          <h2>quality-expert.com</h2>
        </div>          
      </div>
      <div className="add-buttons bio-buttons">
        <div className="add-element bio-element">
          <button onClick={addElem}>Добавить элемент</button>
          <select className="optionValue">
            <option value="0">Иконка+оглавление</option>
            <option value="1">Оглавление столбца</option>
            <option value="2">Оглавление столбца(Ма́ркер)</option>
            <option value="3">Список</option>
            <option value="4">Список(Ма́ркер)</option>
          </select>
          <MyComponent/>            
          <button onClick={addElemAbove}>Добавить элемент сверху</button>
        </div>
        <button className="removeElem" onClick={getSelectionHtml}>Обозначить выделенное</button>
        <button onClick={removeSelectionHtml}>Удалить выделенное</button>
      </div>
      <div className="biography">
      </div>
    </div>
  );
}

export default Bio;
