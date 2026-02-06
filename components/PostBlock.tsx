'use client';
import { useState, useEffect, useRef } from 'react';
import { Post } from '../types/post';

export default function PostBlock({ postData, posts, setPosts }: { postData: Post, posts: Post[], setPosts: React.Dispatch<React.SetStateAction<Post[]>> }) {
    const [showMenu, setShowMenu] = useState(false);
    const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        setMenuPos({ x: e.pageX, y: e.pageY });
        setShowMenu(true);
    };

    useEffect(() => {
        const closeMenu = () => setShowMenu(false);
        window.addEventListener('click', closeMenu);
        return () => window.removeEventListener('click', closeMenu);
    }, []);

    const handleDelete = async (id: number) => {
        await fetch(`/api/posts`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(id),
        });
        setShowMenu(false);
        setPosts(posts.filter(p => p.id !== id));
    }

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setShowMenu(false);
    }

    return (
        <div
            className='postBlock'
            onContextMenu={handleContextMenu}
        >
            <p className='postDate'>{postData.date.toLocaleString("ja-JP")}</p>
            <p className="postMainText">{postData.mainText}</p>

            {/* 右クリックメニューの実体 */}
            {showMenu && (
                <div
                    className="contextMenu"
                    style={{ top: menuPos.y, left: menuPos.x }}
                    onMouseDown={(e) => e.stopPropagation()}
                >
                    <ul>
                        <li onClick={() => handleDelete(postData.id)}>削除する</li>
                        <li onClick={() => handleCopy(postData.mainText)}>コピーする</li>
                    </ul>
                </div>
            )
            }
        </div >
    )
}