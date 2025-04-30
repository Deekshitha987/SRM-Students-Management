
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import { Member } from '@/types/member';
import { fetchMembers } from '@/services/api';
import { useToast } from '@/components/ui/use-toast';

const ViewMembers = () => {
  const { toast } = useToast();
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMembers = async () => {
      try {
        const data = await fetchMembers();
        setMembers(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load team members",
          variant: "destructive"
        });
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getMembers();
  }, [toast]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Team Members</h1>
          <Button asChild>
            <Link to="/add">Add New Member</Link>
          </Button>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-pulse text-center">
              <p className="text-lg text-muted-foreground">Loading members...</p>
            </div>
          </div>
        ) : members.length === 0 ? (
          <div className="text-center py-12 border rounded-lg bg-muted/30">
            <h2 className="text-xl font-semibold mb-2">No Team Members Yet</h2>
            <p className="text-muted-foreground mb-6">
              Get started by adding your first team member!
            </p>
            <Button asChild>
              <Link to="/add">Add First Member</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member) => (
              <Card key={member.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle>{member.name}</CardTitle>
                  <p className="text-muted-foreground">{member.role}</p>
                </CardHeader>
                <CardContent className="pt-2 pb-4">
                  {member.image && (
                    <div className="mb-4 flex justify-center">
                      <img 
                        src={member.image} 
                        alt={`${member.name} profile`}
                        className="w-32 h-32 object-cover rounded-full border-2 border-primary"
                      />
                    </div>
                  )}
                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">Email:</span> {member.email}
                    </p>
                    {member.department && (
                      <p className="text-sm">
                        <span className="font-medium">Department:</span> {member.department}
                      </p>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link to={`/members/${member.id}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ViewMembers;
