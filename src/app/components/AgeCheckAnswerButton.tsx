import Link from 'next/link'

type AgeCheckIsYesProps = {
    isYes: boolean;
}

export default function AgeCheckAnswerButton({ isYes }: AgeCheckIsYesProps) {
    return (
        <Link href={`${isYes ? '/' : '/no-available-service'}`}>
            <button className={`
            as="a"
            ${isYes ? '' : 'mr-10'}
            text-lg
            w-56
            h-12
            rounded-full
            border-blue-500
            font-bold
            ${isYes ? 'bg-red-500' : 'bg-white'}
            ${isYes ? 'text-white' : 'text-black'}
            `}>
                {isYes ? 'はい' : 'いいえ'}
            </button>
        </Link>
    );
}