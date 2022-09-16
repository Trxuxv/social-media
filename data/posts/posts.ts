import { Post } from './../models/post.model';
export const
  posts: Post[] = [
    {
      postId: 1,
      title: 'Post I',
      content: 'I think I know a lot about Undertale and want to test my knowledge, ask me any question relating to the game and Ill try to answer it!',
      imageUrl: '2',
      date: new Date('10/02/2022').toLocaleString()
    },
    {
      postId: 2,
      title: 'Post II',
      content: 'I think I know a lot about Undertale and want to test my knowledge, ask me any question relating to the game and Ill try to answer it!',
      imageUrl: '3',
      date: new Date('10/02/2022').toLocaleString()
    },
  ]
