import React,{useState} from "react"

function Chat({messages,sendMessage}){

const [text,setText] = useState("")

const handleSend = ()=>{

if(!text) return

sendMessage(text)

setText("")

}

return(

<div>

<div className="chatbox">

{messages.map((msg,i)=>(
<div key={i}>{msg}</div>
))}

</div>

<input
value={text}
onChange={(e)=>setText(e.target.value)}
placeholder="Type message"
/>

<button onClick={handleSend}>
Send
</button>

</div>

)

}

export default Chat