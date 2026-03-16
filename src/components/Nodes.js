import React from "react"

function Nodes({nodes}){

return(

<div>

{nodes.length===0 ? (

<p>No LoRa nodes detected</p>

):(

nodes.map((n,i)=>(
<div key={i}>🛰 {n}</div>
))

)}

</div>

)

}

export default Nodes