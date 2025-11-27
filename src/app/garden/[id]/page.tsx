import { PlantDisplay } from "@/components/plant-display";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Clock, Zap, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";

const users = {
  alice: { id: "alice", name: "0xAlice", state: "bloomed", age: 256, points: 5230, species: "Chrono-Fern" },
  bob: { id: "bob", name: "0xBob", state: "growing", age: 128, points: 1204, species: "Luminous Bloom" },
  charlie: { id: "charlie", name: "0xCharlie", state: "wilting", age: 90, points: 450, species: "Starpetal" },
  dave: { id: "dave", name: "0xDave", state: "growing", age: 150, points: 1800, species: "Aether-Weave" },
  eve: { id: "eve", name: "0xEve", state: "sprout", age: 5, points: 50, species: "Luminous Bloom" },
  fiona: { id: "fiona", name: "0xFiona", state: "bloomed", age: 312, points: 8900, species: "Starpetal" },
  george: { id: "george", name: "0xGeorge", state: "growing", age: 78, points: 980, species: "Chrono-Fern" },
  heidi: { id: "heidi", name: "0xHeidi", state: "bloomed", age: 500, points: 12500, species: "Aether-Weave" },
};

const recentActivities = [
    { action: "Minted an NFT", time: "2h ago", icon: <Leaf className="w-4 h-4 text-primary" /> },
    { action: "Swapped tokens", time: "1d ago", icon: <Zap className="w-4 h-4 text-yellow-500" /> },
    { action: "Voted on proposal", time: "3d ago", icon: <Clock className="w-4 h-4 text-accent" /> },
  ];

export default function GardenPage({ params }: { params: { id: string } }) {
  const user = users[params.id as keyof typeof users] || users.bob;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
      <div className="lg:col-span-2 flex items-center justify-center h-[60vh] md:h-[70vh]">
        <PlantDisplay />
      </div>
      <div className="space-y-6">
        <Card className="glass">
          <CardHeader>
            <CardTitle>{user.name}'s Garden</CardTitle>
            <CardDescription>Member of the Grove</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Growth Points</span>
              <span className="font-bold text-primary">{user.points.toLocaleString()} GP</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Plant Age</span>
              <span className="font-bold">{user.age} days</span>
            </div>
             <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Species</span>
              <span className="font-bold">{user.species}</span>
            </div>
          </CardContent>
        </Card>
        
        <Button className="w-full" variant="outline">
            <Gift className="w-4 h-4 mr-2" /> Water {user.name}'s Plant (1 GP)
        </Button>

        <Card className="glass">
          <CardHeader>
            <CardTitle>Growth Rings</CardTitle>
            <CardDescription>Recent on-chain activity.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {recentActivities.map((activity, index) => (
                <li key={index} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-secondary/50 dark:bg-secondary/20 flex items-center justify-center">
                    {activity.icon}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
