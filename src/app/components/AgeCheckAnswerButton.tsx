'use client'
import Link from 'next/link'
import { setCookie } from 'nookies'

type AgeCheckIsYesProps = {
    isYes: boolean;
}

export default function AgeCheckAnswerButton({ isYes }: AgeCheckIsYesProps) {
    const handleAgeChecked = () => {
        setCookie(null, 'isAgeCheckedThrough', isYes ? 'true' : 'false', {
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
        })
    }

    return (
        <Link
            href={`${isYes ? '/' : '/no-available-service'}`}
        >
            <button
                className={`
                text-lg font-bold
                rounded-full border-gray-500
                sm:w-56 w-full h-12
                ${isYes ? '' : 'sm:mr-10'}
                ${isYes ? '' : 'sm:mb-4'} mb-4
                ${isYes ? 'bg-red-500' : 'bg-white'}
                ${isYes ? 'text-white' : 'text-black'}
                `}
                onClick={handleAgeChecked}
            >
                {isYes ? 'はい' : 'いいえ'}
            </button>
        </Link>
    );
}