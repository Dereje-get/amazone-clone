import React from 'react'
import CatagoryCard from './CatagoryCard'
import classes from './Catagory.module.css'
import {catagoryImage} from './CatagoryFullInfos'

function Catagory() {
  return (
    <section className={classes.catagory__container}>
      {
        catagoryImage.map((Infos) => (
          <CatagoryCard data={Infos} key={Infos.title}/>
        ))
      }
    </section>
  );
}

export default Catagory