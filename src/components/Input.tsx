
interface Iprops{
    passwordSize: number
    setPasswordSize: (size: number) => void
}
const Input = (props: Iprops) => {

    return (  
    <input
    style={{
        width: "10rem",
        textAlign:"center"
    }}
        type="number" 
        name="passwordSize" 
        id="passwordSize"  
        value={props.passwordSize}
        min={1}
        max={60}
        onChange={(event) => {
            const size: number =  Number(event.target.value)
            props.setPasswordSize(size)
        }}
    />    
    )
}

export default Input