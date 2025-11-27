import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { StaticPlant } from "@/components/static-plant";
import { Paintbrush, Trees, Sparkles, Wand2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const species = ["Luminous Bloom", "Aether-Weave", "Starpetal", "Chrono-Fern"];
const palettes = [
  { name: "Dawn", colors: ["#A8D093", "#E0F2BE", "#D0B8DE"] },
  { name: "Dusk", colors: ["#5B7553", "#2F4F4F", "#6A5ACD"] },
  { name: "Biolume", colors: ["#48D1CC", "#98FB98", "#FFD700"] },
  { name: "Crystal", colors: ["#ADD8E6", "#E6E6FA", "#FFFFFF"] },
];
const effects = ["Pollen Dust", "Floating Embers", "Glimmering Aura", "None"];

export default function Forge() {
  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">The Forge</h1>
        <p className="text-lg text-muted-foreground mt-2">Spend Growth Points to customize your plant.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card className="glass sticky top-24">
            <CardHeader>
              <CardTitle>Your Creation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center mb-4">
                <StaticPlant state="bloomed" />
              </div>
              <Button className="w-full">Save Changes (150 GP)</Button>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Tabs defaultValue="species">
            <div className="flex justify-between items-center mb-4">
                <TabsList className="glass">
                  <TabsTrigger value="species"><Trees className="w-4 h-4 mr-2" />Species</TabsTrigger>
                  <TabsTrigger value="palettes"><Paintbrush className="w-4 h-4 mr-2" />Palettes</TabsTrigger>
                  <TabsTrigger value="effects"><Sparkles className="w-4 h-4 mr-2" />Effects</TabsTrigger>
                </TabsList>
                <AIIdentifierTool />
            </div>

            <TabsContent value="species">
              <div className="grid grid-cols-2 gap-4">
                {species.map(s => (
                  <Card key={s} className="glass hover:border-primary cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-base">{s}</CardTitle>
                      <CardDescription>Cost: 200 GP</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="palettes">
              <div className="grid grid-cols-2 gap-4">
                {palettes.map(p => (
                  <Card key={p.name} className="glass hover:border-primary cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-base">{p.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex gap-2">
                      {p.colors.map(c => <div key={c} className="w-6 h-6 rounded-full border" style={{backgroundColor: c}}></div>)}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="effects">
               <div className="grid grid-cols-2 gap-4">
                {effects.map(e => (
                  <Card key={e} className="glass hover:border-primary cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-base">{e}</CardTitle>
                       <CardDescription>Cost: 50 GP</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}


function AIIdentifierTool() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline"><Wand2 className="w-4 h-4 mr-2" />Discover with AI</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] glass">
                <DialogHeader>
                    <DialogTitle>AI Plant Identifier</DialogTitle>
                    <DialogDescription>
                        Describe a plant from your imagination. Our AI will try to bring it to life.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Input id="name" placeholder="e.g. Moonpetal Flower" className="col-span-4" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Textarea placeholder="Describe its appearance, colors, and any special properties..." className="col-span-4" />
                    </div>
                </div>
                <Button type="submit" className="w-full">Generate Species (500 GP)</Button>
            </DialogContent>
        </Dialog>
    )
}
