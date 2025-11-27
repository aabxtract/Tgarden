import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Gift, Zap } from "lucide-react";

const dailyQuests = [
  { id: 'd1', title: "Water Your Plant", description: "A happy plant is a happy wallet.", reward: 10, status: "completed", icon: <CheckCircle className="w-6 h-6 text-green-500" /> },
  { id: 'd2', title: "Visit the Community Grove", description: "See how other gardens are growing.", reward: 20, status: "unclaimed", icon: <Gift className="w-6 h-6 text-primary" /> },
];

const weeklyQuests = [
  { id: 'w1', title: "Perform a Token Swap", description: "Diversify your portfolio.", reward: 150, status: "completed", icon: <CheckCircle className="w-6 h-6 text-green-500" /> },
  { id: 'w2', title: "Mint an NFT", description: "Create or collect a new piece of digital art.", reward: 200, status: "in-progress", icon: <Clock className="w-6 h-6 text-yellow-500" /> },
  { id: 'w3', title: "Customize Your Plant", description: "Use the Forge to change your plant's species or palette.", reward: 100, status: "in-progress", icon: <Clock className="w-6 h-6 text-yellow-500" /> },
];

function QuestCard({ quest }: { quest: any }) {
  return (
    <Card className="glass">
      <CardContent className="pt-6 flex items-center gap-6">
        <div className="w-12 h-12 flex items-center justify-center bg-secondary/50 dark:bg-secondary/20 rounded-lg">
          {quest.icon}
        </div>
        <div className="flex-grow">
          <h3 className="font-semibold">{quest.title}</h3>
          <p className="text-sm text-muted-foreground">{quest.description}</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-primary text-lg">{quest.reward} GP</p>
          {quest.status === 'unclaimed' && <Button size="sm" className="mt-1">Claim</Button>}
          {quest.status === 'completed' && <p className="text-sm text-green-500">Completed</p>}
          {quest.status === 'in-progress' && <p className="text-sm text-yellow-500">In Progress</p>}
        </div>
      </CardContent>
    </Card>
  );
}


export default function QuestsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Quests</h1>
        <p className="text-lg text-muted-foreground mt-2">Complete tasks to earn Growth Points.</p>
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Daily Quests</h2>
          <div className="space-y-4">
            {dailyQuests.map(quest => <QuestCard key={quest.id} quest={quest} />)}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Weekly Quests</h2>
          <div className="space-y-4">
            {weeklyQuests.map(quest => <QuestCard key={quest.id} quest={quest} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
