/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import React, {useState, useEffect} from "react";
import Image from "next/image";
import Link from "next/link";
import pokemonlogo from "../assets/pokemonlogo.png";
import pokemon from '../dummy_data'
import '../styles/Home.module.css'
export async function getStaticProps() {
  const res = await fetch ('https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json')
 

  return{
    props:{
      pokemons: await res.json(),
    },
  }
}

export default function Home ({pokemons}) {

  return (
    <div className="home-container bg-gray-200">
      <Head>
        <title>Pokemon Index</title>
      </Head>
      <div className="pokemon-logo flex justify-center p-6">
        <Image src={pokemonlogo} alt="Pokemon Logo" height={100} width={300} />
      </div>

      <div className="pokemon-header text-center text-xl font-semibold lg:text-2xl">
        <h1>Pokemon Index</h1>
      </div>
      <div  className="pokemon-wrapper flex flex-col justify-center items-center m-10 mt-10 sm:grid sm:grid-cols-2 sm:gap-x-6  md:grid md:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5 xl:mx-10">
        {pokemons.map((pokemon)=>
        {
          return(
            <>
             <Link href={`/pokemon/${pokemon.id}`}>
              <div className="pokemon-card w-full h-[250px] flex flex-col justify-center items-center bg-white rounded-xl shadow-xl my-3 hover:scale-105 transition-all hover:shadow-2xl cursor-pointer">
                    <img src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`} alt={pokemon.name} className="h-40 w-40 m-2" />
                     <h1 className="text-2xl"> {pokemon.name} </h1> 

              </div>
                </Link>

           </>
          )
        })}
      </div>
    </div>
  );
}



