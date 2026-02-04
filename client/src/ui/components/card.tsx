import type { ReactNode } from 'react';
import PlaceholderImage from '../../../public/placeholder.png'
import { Trash, YouTube } from '../icons'
import { Button } from './button';
import { Tweet } from 'react-tweet';
import { apiRoute } from '../../utils/api';
import { useUser } from '../../context';
import { axiosClient } from '../../api/axiosClient';

type CardProps = {
    _id: string,
    title: string,
    description: string,
    link: string,
    type: "Youtube" | "Twitter",
    tags?: string[]
}


export const Card = (
    {
        _id,
        title,
        description,
        link,
        type,
        tags
    }
        :
        CardProps

) => {

    let thumbnailURL = null;
    let headerIcon: ReactNode = <></>;
    let match = null;
    let tweetID = null;

    switch (type) {
        case "Youtube":
            const regExpYT = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*?[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
            match = link.match(regExpYT)
            const videoID = match && match[1].length === 11 ? match[1] : null
            thumbnailURL = `https://img.youtube.com/vi/${videoID}/maxresdefault.jpg`
            headerIcon = <YouTube className='size-4 hover:scale-110 transition-all duration-100 ease-in ' />
            break;
        case "Twitter":
            const regExpTweet = /https?:\/\/(x|twitter)\.com\/.*\/status\/(\d+)/;
            match = link.match(regExpTweet);


            if (match && match[2]) {
                tweetID = match[2];
            }
            break;
    }

    const { setContent } = useUser()

    const handleClick = (link: string) => {
        window.open(link, '_blank')
    }

    const deleteContent = async (_id: string) => {
        await axiosClient.delete(`${apiRoute.content}/${_id}`)
        setContent(prev => prev.filter(element => element._id !== _id))
    }

    return <>
        <div

            className="w-75 bg-white border rounded-md p-4 flex flex-col   h-min ">
            <div className='flex justify-between '>
                <div className='flex items-center gap-2'>
                    {headerIcon}
                    <p className='leading-none'>{title}</p>
                </div>
                <div className='flex '>
                    <Button onClick={() => deleteContent(_id)}
                        variant='none' startIcon={<Trash className='size-4 hover:scale-110 transition-all duration-100 ease-in' />} />
                </div>
            </div>
            {type === "Youtube" && <img className='rounded-md hover:cursor-pointer' onClick={() => handleClick(link)} src={thumbnailURL ? thumbnailURL : PlaceholderImage}></img>}
            {type === "Twitter" && <div className='rounded-md hover:cursor-pointer' onClick={() => handleClick(link)} > <Tweet id={tweetID ? tweetID : ""} /></div>}
            <p>{description}</p>
            {tags && <p>{tags}</p>}
        </div>
    </>
}