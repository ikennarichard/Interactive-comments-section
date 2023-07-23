import Header from "./Header"
import Interaction from "./Interactions"

export default function UserComment() {
  return (
    <div className="user_comment">
      <Header/>
      <p>Text</p>
      <div className="interactions">
      <Interaction/>
      <button>?Delete</button>
      <button>?Edit</button>
      </div>
    </div>
  )
}
