import React, { useState } from 'react';
import Option from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import './bio.css';
import QualityExpert from './../static/Quality_Expert.png'

import resume from './../static/resume.png'
import experience from './../static/experience.png'
import mortarboard from './../static/mortarboard.png'
import onlineCourse from './../static/online-course.png'
import button from './../static/button.png'
import briefing from './../static/briefing.png'


function Bio() {
  const mystyle = {
    backgroundColor: "DodgerBlue",
    padding: "5px",
    width: '20px'
  };
  const options = [
    { value: '0', label: <img src={resume} style={mystyle}/>},
    { value: '1', label: <img src={experience} style={mystyle}/>},
    { value: '2', label: <img src={mortarboard} style={mystyle}/>},
    { value: '3', label: <img src={onlineCourse} style={mystyle}/>},
    { value: '4', label: <img src={button} style={mystyle}/>},
    { value: '5', label: <img src={briefing} style={mystyle}/>}
  ]
  let [imgValue, setImgValue] = useState(0)

  const MyComponent = () => (
    <Option 
      defaultValue={options[0]}
      width="30px"
      options={options}
      onChange={handleInputChange}
      isSearchable
      className="img-options"
    />
  )
  const handleInputChange = (inputValue) => {
    setImgValue(imgValue = inputValue.value)
  }

  const addElem = (e) => {
    let value = e.target.nextElementSibling.value
    let container = document.createElement("div");
    let cont = document.createElement("div");
    let img = document.createElement("img");
    let node = document.createElement("input");
    let area = document.createElement("textarea")
    let liElem = document.createElement("li");
    node.classList.add('input')
    if (Number(value) === 0){
      node.classList.add('bio-header-input')
      cont.classList.add('icon-column')
      if (Number(imgValue) === 0){
        img.src = resume
      }else if(Number(imgValue) === 1){
        img.src = experience
      }else if(Number(imgValue) === 2){
        img.src = mortarboard
      }else if(Number(imgValue) === 3){
        img.src = onlineCourse
      }else if(Number(imgValue) === 4){
        img.src = button
      }else{
        img.src = briefing
      }
      cont.appendChild(img)
      container.appendChild(cont)
      container.appendChild(node)
      container.classList.add('bio-header-container')
      document.querySelector('.biography').appendChild(container)   
    }else if(Number(value) === 1){
      container.appendChild(area)
      area.classList.add('marker-input')
      liElem.classList.add('bio-marker')
      liElem.appendChild(container)
      document.querySelector('.biography').appendChild(liElem)
    }else{
      container.appendChild(area)
      area.classList.add('bio-marker-area')
      liElem.classList.add('bio-area-marker')
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
    var sel, range, node;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = window.getSelection().getRangeAt(0);
            
            var html = '<span style="font-weight:bold;">' + range + '</span>'
            range.deleteContents();
            
            var el = document.createElement("div");
            el.innerHTML = html;
            var frag = document.createDocumentFragment(), node, lastNode;
            while ( (node = el.firstChild) ) {
                lastNode = frag.appendChild(node);
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
    console.log(rt)
  }
  return (
    <div className="bio">
      <div className="contacts">
        <div className="contact-info">
          <div className="info">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <div>
              <span>Adress</span>
              <input className="input"></input>
            </div>
          </div>
          <div className="info">
            <FontAwesomeIcon icon={faPhoneAlt} />
            <div>
              <span>Phone</span>
              <input className="input"></input>
            </div>            
          </div>
          <div className="info">
            <FontAwesomeIcon icon={faEnvelope} />
            <div>
              <span>E-Mail</span>
              <input className="input"></input>
            </div>            
          </div>
          <div className="info">
            <FontAwesomeIcon icon={faLinkedinIn} />
            <div>
              <span>Linkedin</span>
              <input className="input"></input>
            </div>            
          </div>                              
        </div>
        <div className="logo">
          <img src={QualityExpert}/>
          <h2>quality-expert.com</h2>
        </div>          
      </div>
      <div className="add-buttons">
        <div className="add-element bio-element">
          <button onClick={addElem}>Добавить элемент</button>
          <select>
              <option value="0">Иконка+оглавление</option>
              <option value="1">Оглавление столбца</option>
              <option value="2">Ма́ркер списка</option>
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
