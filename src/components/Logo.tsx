import { Link } from "react-router-dom"
import { Film } from "lucide-react"

function Logo() {
  return (
    <Link to='/' data-testid='logo' className="hidden lg:flex justify-center items-center bg-primary p-2 rounded-lg text-white" >
      <Film className="w-9 h-8" />
    </Link>
  );
}

export default Logo