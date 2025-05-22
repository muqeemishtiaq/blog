
import Image from "next/image";
import style from "./page.module.css";
import Button from "@/components/Button/Button";

export default function Home() {
  return (
    <div className={style.container}>
  <div className={style.item}>
    <h1 className={style.title}>
      Better design for your digital products.
    </h1>
    <p className={style.desc}>
      Turning your Idea into Reality. We bring together the teams from the
      global tech industry.
    </p>
    <Button url="/portfolio" text="See Our Works" />
  </div>
  <div className={`${style.item} ${style.imgContainer}`}>
    <Image src="/hero.png" alt="Hero" className={style.img} fill />
  </div>
</div>

  );
}