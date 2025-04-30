
import { Link } from 'react-router-dom';

interface HeaderProps {
  teamName?: string;
}

const Header = ({ teamName = "SRM Student Management" }: HeaderProps) => {
  return (
    <header className="bg-primary text-white shadow-md">
      <div className="container mx-auto py-4 px-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-primary-foreground/90 transition">
          {teamName}
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-primary-foreground/90 transition font-medium">
            Home
          </Link>
          <Link to="/add" className="hover:text-primary-foreground/90 transition font-medium">
            Add Member
          </Link>
          <Link to="/members" className="hover:text-primary-foreground/90 transition font-medium">
            View Members
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
