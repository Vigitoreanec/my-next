import { LikeButton } from '@/components/Like-Button';

export default function LBPage() {
    return <div>
        <LikeButton />
        <LikeButton big step="11"/>
        <LikeButton start ={100}/>
        <LikeButton color = "red" border/>

    </div>
}