type AgeCheckIsYesProps = {
    isYes: boolean;
}

export default function AgeCheckAnswerButton({ isYes }: AgeCheckIsYesProps) {
    return (
        <button
            className={`
            ${isYes ? '' : 'mr-10'}
            text-lg
            w-56
            h-12
            rounded-full
            border-blue-500
            font-bold
            ${isYes ? 'bg-red-500' : 'bg-white'}
            ${isYes ? 'text-white' : 'text-black'}
            `}
        >
            {isYes ? 'はい' : 'いいえ'}
        </button>
    );
}