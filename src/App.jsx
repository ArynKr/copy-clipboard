import axios from 'axios'
import './App.css'

function App() {
  const copyText = async (text) => {
    try {
      if(navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      }
    } catch(e) {
      console.log(e)
    }
  }

  const fetchUrlToCopy = async () => {
    const {data} = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
    console.log(data.title);
    copyText(data.title);
  }

  return (
    <div className="App" style={{fontSize: '2rem', display:'flex', flexDirection: 'column', gap: '1rem'}}>

      <button
        onClick={fetchUrlToCopy}
       style={{outline: 'none'}}>Click to copy</button>
      <br />
      <input type="text" name="" id="" placeholder='Paste to check' style={{padding: '1rem', fontSize: '2rem' , width: '50rem'}} />
    </div>
  )
}

export default App
