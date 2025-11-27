import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StaticPlant } from "@/components/static-plant";

const users = [
  { id: "alice", name: "0xAlice", state: "bloomed", age: 256 },
  { id: "bob", name: "0xBob", state: "growing", age: 128 },
  { id: "charlie", name: "0xCharlie", state: "wilting", age: 90 },
  { id: "dave", name: "0xDave", state: "growing", age: 150 },
  { id: "eve", name: "0xEve", state: "sprout", age: 5 },
  { id: "fiona", name: "0xFiona", state: "bloomed", age: 312 },
  { id: "george", name: "0xGeorge", state: "growing", age: 78 },
  { id: "heidi", name: "0xHeidi", state: "bloomed", age: 500 },
];

export default function CommunityGrove() {
  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">The Community Grove</h1>
        <p className="text-lg text-muted-foreground mt-2">A forest of on-chain activity.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {users.map(user => (
          <Link href={`/garden/${user.id}`} key={user.name}>
            <Card className="glass text-center h-full hover:border-primary transition-colors">
              <CardHeader>
                <CardTitle className="text-base font-medium">{user.name}</CardTitle>
                <CardDescription>{user.age} days old</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48 flex items-center justify-center">
                  <StaticPlant state={user.state as any} />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
