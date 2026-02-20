import type { ReactNode } from 'react';
import PlaceholderImage from '../../../public/placeholder.png'
import { Trash, YouTube } from '../icons'
import { Button } from './button';

import { apiRoute } from '../../utils/api';
import { useUser } from '../../context';
import { axiosClient } from '../../api/axiosClient';
import { YouTubeEmbed, XEmbed } from 'react-social-media-embed';

type CardProps = {
    _id: string,
    title: string,
    description: string,
    link: string,
    type: "Youtube" | "Twitter",
}


export const Card = (
    {
        _id,
        title,
        description,
        link,
        type,
    }
        :
        CardProps

) => {

    let headerIcon: ReactNode = <></>;
    let match = null;
  

    switch (type) {
        case "Youtube":
            const regExpYT = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*?[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
            match = link.match(regExpYT)
            headerIcon = <YouTube className='size-3 md:size-4 hover:scale-110 transition-all duration-100 ease-in ' />
            break;
        case "Twitter":
            const regExpTweet = /https?:\/\/(x|twitter)\.com\/.*\/status\/(\d+)/;
            match = link.match(regExpTweet);


           
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

            className="w-74 bg-white border rounded-md p-6 text-sm  md:text-base  flex flex-col  gap-4 h-min ">
            <div className='flex justify-between'>
                <div className='flex items-center gap-2'>
                    {headerIcon}
                    <p className='leading-relaxed'>{title}</p>
                </div>
                <div className='flex '>
                    <Button onClick={() => deleteContent(_id)}
                        variant='none' startIcon={<Trash className=' size-3  md:size-4 hover:scale-110 transition-all duration-100 ease-in' />} />
                </div>
            </div>
            {type === "Youtube" && <div className='rounded-md hover:cursor-pointer flex justify-center' onClick={() => handleClick(link)} ><YouTubeEmbed style={{ borderRadius: '8px' }} url={link} height={300} width={248} /></div>}
            {type === "Twitter" && <div className='rounded-md hover:cursor-pointer flex justify-center' onClick={() => handleClick(link)} > <XEmbed style={{ borderRadius: '8px' }} url={link} height={300} width={248} /> </div>}
            <p className='text-sm' >{description}</p>
        </div>
    </>
}