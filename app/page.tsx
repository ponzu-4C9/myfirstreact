'use client';
import { useState, useEffect } from 'react';
import "./style.css";
import { Post } from '../types/post';
import PostBlock from '../components/PostBlock';
import Txtbox from '../components/Txtbox';

export default function Home() {
  const [inputText, setInputText] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [isEditing, setIsEditing] = useState<number>(-1);
  const [editText, setEditText] = useState<string>("");

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
  }, []);

  async function handleClick() {
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

  function handlesetIsEditing(id: number) {
    setIsEditing(id);
    setEditText(posts.find(p => p.id === id)?.mainText || "");
  }

  async function handleEditSubmit(id: number) {
    if (editText === "") return;
    setPosts(
      posts.map(p =>
        p.id === id ? { ...p, mainText: editText } : p
      )
    );
    setIsEditing(-1);
    setEditText(""); // 編集が終わったら中身をクリアする
  }


  return (
    <div className='root'>
      {posts
        .slice()
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .map((post) => (
          isEditing === post.id ?
            <div className='postBlock' key={post.id}>
              <Txtbox value={editText} onChange={(e) => setEditText(e.target.value)} onSubmit={() => handleEditSubmit(post.id)} />
              <button onClick={() => handleEditSubmit(post.id)}>保存</button>
            </div>
            :
            <PostBlock postData={post} key={post.id} posts={posts} setPosts={setPosts} handlesetIsEditing={handlesetIsEditing} />
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