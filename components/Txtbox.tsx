'use client';
import { useState, useEffect, useRef } from 'react';
import { Post } from '../types/post';

export default function Txtbox({ value, onChange, onSubmit }: {
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

        if (e.key === 'Enter' && !e.shiftKey) {
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