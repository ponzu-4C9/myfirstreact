'use client';
import { useState, useEffect } from 'react';
import "./style.css";
import { Post } from '../types/post';
import PostBlock from '../components/PostBlock';
import Txtbox from '../components/Txtbox';

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/posts');
      const data = await response.json();

      const mappedPosts = data.map((p: any) => ({
        id: p.id,
        date: new Date(p.created_at),
        mainText: p.main_text
      }));

      setPosts(mappedPosts);
    };

    fetchPosts();

    const interval = setInterval(fetchPosts, 3000);
    return () => clearInterval(interval); // クリーンアップ
  }, []);

  const handleClick = async () => {
    if (inputText === "") return;

    const currentMaxId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) : 0;
    const nextId = currentMaxId + 1;


    setPosts([...posts, { id: nextId, date: new Date(), mainText: inputText }]);

    setInputText("");

    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mainText: inputText }),
    });
    const newPost = await response.json(); // 保存された新しい投稿1件が取得できる
  }

  return (
    <div className='root'>


      {posts
        .slice()
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .map((post) => (
          <PostBlock postData={post} key={post.id} posts={posts} setPosts={setPosts} />
        ))}

      <div >
        <Txtbox
          value={inputText}
          onChange={(e) => { setInputText(e.target.value) }}
          onSubmit={handleClick}
        />

        {/* ボタンをクリックしたら handleClick を実行 */}
        <button onClick={handleClick}>追加</button>
      </div>
    </div>
  );
}