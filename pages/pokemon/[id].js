/* eslint-disable @next/next/no-img-element */
import React, {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import pokemonlogo from "../../assets/pokemonlogo.png";
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export async function getStaticPaths()
{
    const res = await fetch ('https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json');
    const pokemon = await res.json();

    return{
        paths: pokemon.map((pokemon)=> ({
            params: {id: pokemon.id.toString()},
        })),
        fallback:false,
    }
}

export async function getStaticProps ({params})
{
    const res = await fetch (`https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.id}.json`);

    return {
        props:{
            pokemon: await res.json()
        }
    }
}
const PokemonDetails = ({pokemon}) => {
    const router = useRouter();
    const {id} = router.query;

    
  return (
    <div className="details-container p-5 flex flex-col justify-center items-center bg-gray-100 h-screen">
        <Head>
            <title>{pokemon.name}</title>
        </Head>
        <div className="go-back-button fixed top-0 left-0 m-5">

        <Link href="/" >
            <button type="button" className='bg-yellow-600 px-4 py-1 rounded-xl text-white font-semibold hover:scale-110 transition'>  Go Back </button>
        </Link>
        
        
        </div>
        <div className="pokemon-details-wrapper flex flex-col justify-center bg-white p-8 rounded-xl shadow-xl md:flex-row ">
            <div className="image-and-name">

            <div className="pokemon-details-image flex justify-center items-center">

                <img src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`} alt={pokemon.name} className="h-[300px] w-[320px] lg:h-[350px] lg:w-[370px] " />
            </div>
            <div className="pokemon-name-and-type">
                <h1 className='text-center text-3xl font-bold mt-6'>{pokemon.name}</h1>
                <h2 className='text-center mt-2 text-lg italic'>{pokemon.type.join(", ")}</h2>
            </div>
            </div>

            <div className="pokemon-attributes md:m-5 md:px-7">
               
                <h1 className='text-md font-semibold md:text-lg '>Attributes: </h1>
                <div className="stat-list m-2 mt-3 text-md md:text-lg md:w-full">

                {pokemon.stats.map(({name, value})=>
                {
                    return (
                        <div className='flex w-full justify-between md:w-[200px] xl:w-[300px] ' key={name}>
                        <div className="name-of-att font-medium" >
                            {name}
                        </div>
                        <div className="stat-of-att">
                            {value}
                        </div>
                        </div>
                    )
                })}
                </div>
                <div className="pokemon-logo flex justify-center">

                <Image src={pokemonlogo} alt={pokemon.name} height={50} width={150}/>
                </div>
            </div>

        </div>



    </div>
  )
}

export default PokemonDetails