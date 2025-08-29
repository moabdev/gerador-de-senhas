import { useState } from "react";

function App() {
  const [password, setPassword] = useState("Senha");
  const [copyText, setCopyText] = useState("Copiar");
  const [customSize, setCustomSize] = useState(16);
  const [showInput, setShowInput] = useState(false);

  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);

  const [strength, setStrength] = useState(0);
  const [tips, setTips] = useState<string[]>([]);


  const passwordSize = showInput ? customSize : 16;

  function calculateStrength(pass: string) {
    let score = 0;
    let newTips = [];

    if (pass.length >= 8) score++;
    else newTips.push("Use pelo menos 8 caracteres");

    if (/[A-Z]/.test(pass)) score++;
    else newTips.push("Adicione letras maiúsculas");

    if (/[a-z]/.test(pass)) score++;
    else newTips.push("Adicione letras minúsculas");

    if (/[0-9]/.test(pass)) score++;
    else newTips.push("Inclua números");

    if (/[^A-Za-z0-9]/.test(pass)) score++;
    else newTips.push("Use símbolos especiais");

    setStrength(score);
    setTips(newTips);
  }

  function generatePassword() {
    let characters = "";
    if (useLowercase) characters += "abcdefghijklmnopqrstuvwxyz";
    if (useUppercase) characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useNumbers) characters += "0123456789";
    if (useSymbols) characters += "!@#$%¨&*()-_=+[{]}|;:',<.>/?";

    if (characters === "") {
      setPassword("Selecione pelo menos uma opção!");
      setStrength(0);
      setTips(["Selecione ao menos um tipo de caractere"]);
      return;
    }

    let newPassword = "";
    for (let i = 0; i < passwordSize; i++) {
      const position = Math.floor(Math.random() * characters.length);
      newPassword += characters[position];
    }
    setPassword(newPassword);
    setCopyText("Copiar");
    calculateStrength(newPassword);
  }

  function copyToClipboard() {
    window.navigator.clipboard.writeText(password);
    setCopyText("Copiado!");
  }

  function getStrengthColor() {
    if (strength <= 2) return "bg-red-500";
    if (strength === 3 || strength === 4) return "bg-yellow-500";
    return "bg-green-500";
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          🔐 Gerador de Senhas
        </h1>

        <div className="space-y-3 mb-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showInput}
              onChange={() => setShowInput(!showInput)}
            />
            <span>Customizar tamanho</span>
          </label>

          {showInput && (
            <div className="flex items-center gap-2">
              <label htmlFor="customSize">Tamanho:</label>
              <input
                type="number"
                id="customSize"
                value={customSize}
                min={4}
                max={64}
                onChange={(e) => setCustomSize(Number(e.target.value))}
                className="border rounded px-2 py-1 w-20"
              />
            </div>
          )}

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={useLowercase}
              onChange={() => setUseLowercase(!useLowercase)}
            />
            Letras minúsculas
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={useUppercase}
              onChange={() => setUseUppercase(!useUppercase)}
            />
            Letras maiúsculas
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={useNumbers}
              onChange={() => setUseNumbers(!useNumbers)}
            />
            Números
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={useSymbols}
              onChange={() => setUseSymbols(!useSymbols)}
            />
            Símbolos
          </label>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={generatePassword}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-xl shadow-md transition"
          >
            Gerar senha de {passwordSize} caracteres
          </button>

          <button
            onClick={copyToClipboard}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-xl shadow-md transition"
          >
            {copyText}
          </button>
        </div>

        <div className="mt-6 p-4 bg-gray-100 rounded-xl text-center font-mono break-all shadow-inner">
          {password}
        </div>

        <div className="mt-4">
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`${getStrengthColor()} h-3 transition-all duration-500`}
              style={{ width: `${(strength / 5) * 100}%` }}
            ></div>
          </div>
          <p className="text-center text-sm mt-2 text-gray-700">
            Força da senha
          </p>

          {tips.length > 0 && (
            <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
              {tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
