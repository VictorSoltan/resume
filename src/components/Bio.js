import React, { useState } from 'react';
import Option from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons'
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
  const handleInputChange = (inputValue) => {
    setSelectValue(selectValue = options[inputValue.value])
    setImgValue(imgValue = inputValue.value)
  }

  const addElem = (e) => {
    let value = e.target.nextElementSibling.value
    let container = document.createElement("div");
    let cont = document.createElement("div");
    let img = document.createElement("img");
    let liElem = document.createElement("li");
    let area = document.createElement("textarea")
    area.addEventListener('keydown', autosize); 
    area.rows= '1'
    if (Number(value) === 0){
      cont.classList.add('icon-column')
      if (Number(imgValue) === 0){
        img.src = resume
        img.classList.add('resume')
      }else if(Number(imgValue) === 1){
        img.src = experience
        img.classList.add('experience')
      }else if(Number(imgValue) === 2){
        img.src = mortarboard
        img.classList.add('mortarboard')
      }else if(Number(imgValue) === 3){
        img.src = onlineCourse
        img.classList.add('onlineCourse')
      }else if(Number(imgValue) === 4){
        img.src = button
        img.classList.add('button-img')
      }else{
        img.src = briefing
        img.classList.add('briefing')
      }
      cont.appendChild(img)
      container.appendChild(cont)
      area.classList.add('bio-header-area')
      container.appendChild(area)
      container.classList.add('bio-header-container')
      document.querySelector('.biography').appendChild(container)   
    }else if(Number(value) === 1){
      const bioCont = document.querySelector('.biography')
      if (bioCont.children[bioCont.children.length-1] !== undefined){
        if (bioCont.children[bioCont.children.length-1].classList[0] !== 'bio-header-container'){
          container.classList.add('bio-container-mpTop')
        }
      }
      container.appendChild(area)
      area.classList.add('bio-marker-input')
      container.classList.add('bio-container')
      document.querySelector('.biography').appendChild(container)
    }else if(Number(value) === 2){
      container.appendChild(area)
      area.classList.add('bio-marker-input')
      liElem.classList.add('bio-marker')
      container.classList.add('bio-marker-container')
      liElem.appendChild(container)
      document.querySelector('.biography').appendChild(liElem)
    }else if(Number(value) === 3){
      container.appendChild(area)
      area.classList.add('bio-marker-area')
      container.classList.add('bio-area-container')
      container.classList.add('bio-container-mg')
      document.querySelector('.biography').appendChild(container)
    }else{
      container.appendChild(area)
      area.classList.add('bio-marker-area')
      liElem.classList.add('bio-area-marker')
      container.classList.add('bio-area-container')
      liElem.appendChild(container)
      document.querySelector('.biography').appendChild(liElem)
    }
  };
  const removeElem = (e) => {
    let biography = document.querySelector('.biography')
    if (biography.children.length > 0){
      biography.removeChild(biography.lastElementChild)
    }  
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
          <select>
            <option value="0">Иконка+оглавление</option>
            <option value="1">Оглавление столбца</option>
            <option value="2">Оглавление столбца(Ма́ркер)</option>
            <option value="3">Список</option>
            <option value="4">Список(Ма́ркер)</option>
          </select>
          <MyComponent/>            
          <button onClick={removeElem}>Удалить последний элемент</button>
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
