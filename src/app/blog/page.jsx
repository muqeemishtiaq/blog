

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import style from './page.module.css'; // adjust the path based on your file structure

async function getData() {
  const res = await fetch('http://localhost:3000/api/posts', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Blog() {
  const data = await getData();

  return (
    <div className={style.maincontainer}>
      {data.map((item) => (
        <Link href={`/blog/${item._id}`} className={style.container} key={item._id}>
          <div className={style.imgContainer}>
            <Image
              src={item.img}
              alt={item.title}
              width={400}
              height={250}
              className={style.img}
            />
          </div>

          <div className={style.content}>
            <h1 className={style.title}>{item.title}</h1>
            <p className={style.desc}>{item.desc}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

