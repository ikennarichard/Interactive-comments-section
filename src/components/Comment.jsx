import Header from "./Header"
import Interaction from "./Interactions"

export default function Comment() {
  return (
    <div className="comment">
      <Header/>
      <p>Text</p>
      <div className="interactions">
      <Interaction/>
      <button>?Reply</button>
      </div>
    </div>
  )
}
