import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

async function getCardData (){
  const result = await fetch("http://localhost:4000/recipes");
  // console.log("result---",result.json());
  await new Promise((resolve)=>setTimeout(resolve,3000)) //resolve after 3s
  return result.json();
}
export default async function Home() {
  const cardData = await getCardData()
  // console.log("response--",cardData);
  return (
   <main>
    <div className="grid grid-cols-3 gap-8">
      {
        cardData && cardData.map(item=>(
          // {console.log("item--",item);}
          // <p>data not render</p>
          <Card key={item.id} className="flex flex-col justify-between" >
          <CardHeader className="flex-row gap-4 items-center"> 
           <Avatar>
             <AvatarImage src={`/img/${item.image}`} alt="recipe img"/>
             <AvatarFallback>
              {item.title.slice(0,2)}
             </AvatarFallback>
           </Avatar>
            <div>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.time} mins to cook.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
             <p>{item.description}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button>View Recipe </Button>
            {item.vegan && <Badge>Vegan!</Badge>}

          </CardFooter>

        </Card>
        ))
      }
    </div>
   </main>
  );
}
