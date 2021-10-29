import './App.css';
import { useState, useRef } from 'react';


function App() {
  // fetches JSON data passed in by flask.render_template and loaded
  // in public/index.html in the script with id "data"
  const args = JSON.parse(document.getElementById("data").text);

  
  const textInput = useRef(null);
  const [textOutPut, setText] = useState("");
  function onButtonClick() {
    let newItem = textInput.current.value;
    
    fetch('/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'image': newItem }),

    }).then((response) => response.json()).then((data) => {
      setText(data.image_text);
    });
    textInput.current.value = "";
  }

  return (
    <div>
      <h1>Hello</h1>
      <input ref={textInput} type="text"/>
      <button onClick={onButtonClick}>Translate the image</button>
      <ul>
        {textOutPut}
      </ul>
    </div>
  );
}

export default App;
