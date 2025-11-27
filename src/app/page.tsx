import { PlantDisplay } from "@/components/plant-display";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Clock, Zap } from "lucide-react";

export default function Home() {
  const recentActivities = [
    { action: "Minted an NFT", time: "2h ago", icon: <Leaf className="w-4 h-4 text-primary" /> },
    { action: "Swapped tokens", time: "1d ago", icon: <Zap className="w-4 h-4 text-yellow-500" /> },
    { action: "Voted on proposal", time: "3d ago", icon: <Clock className="w-4 h-4 text-accent" /> },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
      <div className="lg:col-span-2 flex items-center justify-center h-[60vh] md:h-[70vh]">
        <PlantDisplay />
      </div>
      <div className="space-y-6">
        <Card className="glass">
          <CardHeader>
            <CardTitle>My Garden</CardTitle>
            <CardDescription>0x1234...abcd</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Growth Points</span>
              <span className="font-bold text-primary">1,204 GP</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Plant Age</span>
              <span className="font-bold">128 days</span>
            </div>
             <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Species</span>
              <span className="font-bold">Luminous Bloom</span>
            </div>
          </CardContent>
        </Card>
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
