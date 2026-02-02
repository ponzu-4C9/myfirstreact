'use client';
import { useState, useEffect, useRef } from 'react';
import "./style.css"

interface Post {
  date: Date;
  mainText: string;
}

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);

  const handleClick = () => {
    if (inputText === "") return;

    setPosts([...posts, { date: new Date(), mainText: inputText }]);

    setInputText("");
  }

  return (
    <div className='root'>


      {posts.map((post) => (
        <PostBlock postData={post} key={post.date.toISOString()} />
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
function PostBlock({ postData }: { postData: Post }) {
  return (
    <div className='postBlock' key={postData.date.toISOString()}>
      <p className='postDate'>{postData.date.toLocaleString("ja-JP")}</p>
      <p className="postMainText">{postData.mainText}</p>
    </div>
  )
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

    if (e.key === 'Enter') {
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
