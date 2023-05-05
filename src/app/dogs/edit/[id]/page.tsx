import kv from "@vercel/kv";

import React from 'react';
import { revalidatePath } from 'next/cache';

interface DogEditProps {
    name: string;
    image: number;
}

interface DogType {
    name: string;
    image: string;
    breed: string;
}

const DogEditProps = async ({params}: {params: {id: string;}}) => {
    const {id} = params;
    const key = `dogs:${id}`;
    const dog = await kv.get<DogType>(key);


    async function upDog(formData: FormData){
        "use server";
        await kv.set(key, {
            name: formData.get("name"),
            image: formData.get("image") ,
            breed: formData.get("breed"),
        })
        revalidatePath("/dogs/edit/"+id);
    }

    return (
        <div className={"text-blue-600"}>
            <span>{dog?.name}</span>

        <form action={upDog}>
            <label htmlFor="">Name</label>
            <input type="text" name={"name"} defaultValue={dog?.name || ""}/>
            <label htmlFor="">Image</label>
            <input type="text" name={"image"}  defaultValue={dog?.image || ""}/>
            <label
                htmlFor="">Breed</label>
            <input type="text" name={"breed"} defaultValue={dog?.breed || ""}/>
            <button type={"submit"}>submit</button>

        </form>
        </div>
    )
};

export default DogEditProps;