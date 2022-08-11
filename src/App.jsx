import axios from 'axios'
import './App.css'

function App() {
  async function simpleCopy() {
    const clipboardItem = new ClipboardItem({
      'text/plain': axios.get('https://jsonplaceholder.typicode.com/todos/1').then(async (res) => {
        if(!res) {
          return  new Promise(async (resolve) => {
            resolve(new Blob([``], {type: 'text/plain'}))
          })
        }
        console.log(res.data.title);
        const copyText = res.data.title;
        return new Promise(async (resolve) => {
          resolve(new Blob([copyText], {type: 'text/plain'}))
        })
      })
    })
    navigator.clipboard.write([clipboardItem])
  }
  
  const copyText = async (text) => {
    try {
      if(navigator?.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(text);
        } catch (err) {
          console.error('Failed to copy text: ', err);
        }
      } else {
        console.log('clipboard API not supported');
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
        onPointerDown={fetchUrlToCopy}
       style={{outline: 'none'}}>Click to copy</button>
      <button
        onPointerDown={simpleCopy}
       style={{outline: 'none'}}>Click to copy</button>
      <br />
      <input type="text" name="" id="" placeholder='Paste to check' style={{padding: '1rem', fontSize: '2rem' , width: '50rem'}} />
    </div>
  )
}

export default App
