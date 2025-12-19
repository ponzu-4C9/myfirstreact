'use client';
import { useState, useEffect, useRef } from 'react';
import "./style.css"

interface post {
  date: Date;
  mainText: string;
}

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [posts, setPosts] = useState<post[]>([]);

  const handleClick = () => {
    if (inputText === "") return;

    setPosts([...posts, { date: new Date(), mainText: inputText }]);

    setInputText("");
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
