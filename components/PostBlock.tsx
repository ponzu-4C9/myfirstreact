'use client';
import { useState, useEffect, useRef } from 'react';
import { Post } from '../types/post';

export default function PostBlock({ postData }: { postData: Post }) {
    const [showMenu, setShowMenu] = useState(false);
    const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        setMenuPos({ x: e.pageX, y: e.pageY });
        setShowMenu(true);
    };

    useEffect(() => {
        const closeMenu = () => setShowMenu(false);
        window.addEventListener('mousedown', closeMenu);
        return () => window.removeEventListener('mousedown', closeMenu);
    }, []);

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
                >
                    <ul>
                        <li onClick={() => {

                        }}>削除する</li>
                        <li onClick={() => alert("コピーしました")}>コピーする</li>
                    </ul>
                </div>
            )}
        </div>
    )
}