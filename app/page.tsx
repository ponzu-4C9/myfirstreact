'use client';
import { useState, useEffect, useRef } from 'react';
import { db } from './firebase';
import { collection, addDoc, onSnapshot, query, orderBy, Timestamp } from 'firebase/firestore';
import "./style.css"

interface post {
  date: Date;
  mainText: string;
}

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [posts, setPosts] = useState<post[]>([]);

  useEffect(() => {
    // Firestoreからデータを取得（作成日時順）
    const q = query(collection(db, "posts"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postData = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          date: (data.date as Timestamp).toDate(),
          mainText: data.mainText,
        } as post;
      });
      setPosts(postData);
    });
    return () => unsubscribe(); // クリーンアップ
  }, []);


  const handleClick = async () => {
    if (inputText === "") return;

    // Firestoreへ追加
    try {
      await addDoc(collection(db, "posts"), {
        date: Timestamp.now(),
        mainText: inputText
      });
      setInputText("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  return (
    <div className='root'>


      {posts.map((post) => (
        <div className='postBlock' key={post.date.toISOString()}>
          <p className='postDate'>{post.date.toLocaleString("ja-JP")}</p>
          <p className="postMainText">{post.mainText}</p>
        </div>
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

function Txtbox({ value, onChange, onSubmit }: {
  value: string,
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
  onSubmit: () => void
}) {

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {

    if (e.nativeEvent.isComposing) return;

    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <textarea className='inputbox'
      ref={textareaRef}
      value={value}
      onChange={onChange}
      onKeyDown={handleKeyDown}
    />
  )
}
