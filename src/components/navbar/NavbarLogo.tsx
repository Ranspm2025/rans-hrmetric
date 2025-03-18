
import { Link } from 'react-router-dom';

const NavbarLogo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
        <span className="text-white font-bold">GM</span>
      </div>
      <span className="font-semibold text-lg">GrowMetric</span>
    </Link>
  );
};

export default NavbarLogo;
