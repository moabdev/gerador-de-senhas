import { useState } from 'react'
import styles from "./App.module.css"
import Input from './components/Input'

function App() {
  const [password, setPassword] = useState("Senha")
  const [copyText, setCopyText] = useState("Copiar")
  const [customSize, setCustomSize] = useState(20)
  const [showInput, setShowInput] = useState(false)

  const passwordSize = showInput ? customSize : 20

  function generatePassword() {
    const characters = "'1234567890-=!@#$%¨&*()_+qwertyuiop[asdfghjklç~]zxcvbnm,.;/QWERTYUIOP{ASDFGHJKLÇ^}ZXCVBNM<>:?";
    let newPassword = "";
    for (let i = 0; i < passwordSize; i++) {
      const position = Math.floor(Math.random() * characters.length);
      newPassword += characters[position];
    }
    setPassword(newPassword)
    setCopyText("Copiar")
  }

  function copyToClipboard() {
    window.navigator.clipboard.writeText(password)
    setCopyText('Copiado!')
  }

  return (
    <div className={styles.container}>

      <h1>Gerador de Senhas</h1>

      <div className={styles.showInput}>
        <label htmlFor="showInput">Customizar tamanho: </label>
        <input
        className={styles.inputSize}
          type="checkbox" 
          name="showInput" 
          id="showInput"
          onChange={() => setShowInput(!showInput)}
        />
      </div>
      
      {showInput && (
        <div className={styles.input}>
          <label htmlFor="customSize">Tamanho: </label>
          <Input passwordSize={customSize} setPasswordSize={setCustomSize} 
          />
        </div>
        )}

      <div className={styles.buttons}>
        <button onClick={generatePassword}>Gerar senha de {showInput ? customSize : 8} caracteres!</button>
        <button onClick={copyToClipboard}>
          {copyText}
        </button>
      </div>

      <div className={styles.password}>
        {password}
      </div>

    </div>
  )
}

export default App
