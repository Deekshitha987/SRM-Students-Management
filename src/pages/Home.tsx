
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UserPlus, Users } from 'lucide-react';
import Header from '@/components/Header';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-6 py-12">
        <div className="flex flex-col items-center justify-center max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Welcome to the Student Team Members Hub
          </h1>
          
          <p className="mt-6 text-lg text-muted-foreground">
            Manage your team members efficiently in one place. Add new members, 
            view existing ones, and keep track of everyone's information.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto">
            <Button asChild size="lg" className="flex-1 py-6 text-lg">
              <Link to="/add" className="flex items-center justify-center gap-2">
                <UserPlus size={20} />
                <span>Add Member</span>
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="flex-1 py-6 text-lg">
              <Link to="/members" className="flex items-center justify-center gap-2">
                <Users size={20} />
                <span>View Members</span>
              </Link>
            </Button>
          </div>
          
          <div className="mt-16">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
              alt="Team collaboration" 
              className="rounded-lg shadow-lg max-w-full max-h-[400px]"
            />
          </div>
        </div>
      </main>
      
      <footer className="border-t py-6">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          Student Team Members Management &copy; {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
};

export default Home;
