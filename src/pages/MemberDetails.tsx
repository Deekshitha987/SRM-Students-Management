
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/Header';
import { Member } from '@/types/member';
import { fetchMemberById } from '@/services/api';
import { useToast } from '@/components/ui/use-toast';
import { ArrowRight } from 'lucide-react';

const MemberDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMember = async () => {
      if (!id) {
        navigate('/members');
        return;
      }

      try {
        const data = await fetchMemberById(id);
        setMember(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load member details. The member may not exist.",
          variant: "destructive"
        });
        console.error(error);
        navigate('/members');
      } finally {
        setLoading(false);
      }
    };

    getMember();
  }, [id, navigate, toast]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-6 py-8 flex items-center justify-center">
          <div className="animate-pulse text-center">
            <p className="text-lg text-muted-foreground">Loading member details...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-6 py-8 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Member Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The team member you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/members">Back to Members</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-6 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <ArrowRight size={14} />
            <Link to="/members" className="hover:text-foreground">Members</Link>
            <ArrowRight size={14} />
            <span>{member.name}</span>
          </div>
          
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl">{member.name}</CardTitle>
              <p className="text-lg text-muted-foreground">{member.role}</p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {member.image && (
                  <div className="mx-auto md:mx-0">
                    <img 
                      src={member.image} 
                      alt={`${member.name} profile`}
                      className="w-48 h-48 object-cover rounded-lg shadow-md"
                    />
                  </div>
                )}
                
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Contact Information</h3>
                    <div className="grid grid-cols-1 gap-2">
                      <p>
                        <span className="font-medium">Email:</span>{" "}
                        <a 
                          href={`mailto:${member.email}`} 
                          className="text-primary hover:underline"
                        >
                          {member.email}
                        </a>
                      </p>
                      {member.phone && (
                        <p>
                          <span className="font-medium">Phone:</span>{" "}
                          <a 
                            href={`tel:${member.phone}`} 
                            className="text-primary hover:underline"
                          >
                            {member.phone}
                          </a>
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Team Information</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {member.department && (
                        <p>
                          <span className="font-medium">Department:</span> {member.department}
                        </p>
                      )}
                      {member.joinDate && (
                        <p>
                          <span className="font-medium">Join Date:</span>{" "}
                          {new Date(member.joinDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {member.bio && (
                <>
                  <Separator />
                  <div>
                    <h3 className="text-lg font-medium mb-2">About</h3>
                    <p>{member.bio}</p>
                  </div>
                </>
              )}
              
              <div className="pt-4 flex justify-end">
                <Button variant="outline" onClick={() => navigate('/members')}>
                  Back to Members
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default MemberDetails;
