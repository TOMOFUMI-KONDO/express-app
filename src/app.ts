import express, { Request, Response, NextFunction } from "express";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

app.get("", (req, res) => res.send("Hello World!"));

type User = {
  id: number;
  name: string;
  email: string;
};
const users: User[] = [
  { id: 1, name: "User1", email: "user1@example.com" },
  { id: 2, name: "User2", email: "user2@example.com" },
  { id: 3, name: "User3", email: "user3@example.com" },
];
app.get("/users", (req: Request, res: Response) => {
  res.send(JSON.stringify(users));
});
