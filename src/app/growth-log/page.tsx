import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, GitCommit, Zap, Leaf, Sprout } from "lucide-react";

export default function GrowthLog() {
  const log = [
    { id: 1, text: "Plant sprouted! Welcome to the garden.", time: "128d ago", icon: <Sprout className="w-4 h-4" /> },
    { id: 2, text: "First transaction recorded.", time: "127d ago", icon: <GitCommit className="w-4 h-4" /> },
    { id: 3, text: "Swapped ETH for USDC.", time: "98d ago", icon: <Zap className="w-4 h-4" /> },
    { id: 4, text: "Minted 'Cosmic Wanderer' NFT.", time: "65d ago", icon: <CheckCircle className="w-4 h-4" /> },
    { id: 5, text: "Reached 'Blooming' stage.", time: "30d ago", icon: <Leaf className="w-4 h-4" /> },
    { id: 6, text: "Voted on a DAO proposal.", time: "3d ago", icon: <GitCommit className="w-4 h-4" /> },
    { id: 7, text: "New growth ring appeared.", time: "2h ago", icon: <CheckCircle className="w-4 h-4" /> },
  ].reverse();

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center md:text-left mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Growth Log</h1>
        <p className="text-lg text-muted-foreground mt-2">A timeline of your on-chain life.</p>
      </div>
      <div className="relative pl-8">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary/20"></div>

        <ul className="space-y-10">
          {log.map((item) => (
            <li key={item.id} className="relative">
              <div className="absolute -left-[23px] top-1 w-6 h-6 bg-background rounded-full flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                  {item.icon}
                </div>
              </div>
              <Card className="glass">
                <CardContent className="pt-6 flex justify-between items-center">
                  <p className="text-sm md:text-base">{item.text}</p>
                  <p className="text-xs md:text-sm text-muted-foreground shrink-0 ml-4">{item.time}</p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
