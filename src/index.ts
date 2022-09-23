import { routerTesting } from './routers/tetstingRouter';
import express, {Request, Response, NextFunction} from 'express';
import { routerBlogs } from './routers/blogRouter';
import { routerPosts } from './routers/postsRouter';

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.use('/posts', routerPosts);
app.use('/blogs', routerBlogs);
app.use('/testing', routerTesting);

app.use((req: Request, res: Response) => {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Не найдено');
})

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.type('text/plain');
  res.status(500);
  res.send('500 - Ошибка сервера');
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
