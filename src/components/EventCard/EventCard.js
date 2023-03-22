import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './EventCard.module.css'
import { Card } from "react-bootstrap";
import React from "react";
import Image from 'next/image'

export default function EventCard() {
    return (
        <div>
            <div className={styles.active}>
                <div className={styles.top}>
                    <h1 className='head' id={styles.title}>Study at Moffitt</h1>
                    <div className={styles.iconText}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="#CBCBCB" d="M12 12q-1.65 0-2.825-1.175Q8 9.65 8 8q0-1.65 1.175-2.825Q10.35 4 12 4q1.65 0 2.825 1.175Q16 6.35 16 8q0 1.65-1.175 2.825Q13.65 12 12 12Zm-8 8v-2.8q0-.85.438-1.563q.437-.712 1.162-1.087q1.55-.775 3.15-1.163Q10.35 13 12 13t3.25.387q1.6.388 3.15 1.163q.725.375 1.162 1.087Q20 16.35 20 17.2V20Z"/>
                        </svg>
                        <p className='secondary'>7/8</p>
                    </div>
                </div>
                <div className={styles.body}>
                    <Image className={styles.mainImage} src="/moffitt.jpeg" alt="lib" width="134" height="134"/>
                    <div className={styles.info}>
                        <div className={styles.iconText}>
                            <Image className={styles.pfp} src="/dylan.jpeg" alt="face" width="21" height="21" />
                            <p id={styles.para}>Dylan Hopkins</p>
                        </div>
                        <div className={styles.iconText}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24">
                                <path fill="#CBCBCB" d="m13 12.175l2.25 2.25q.275.275.275.688q0 .412-.275.712q-.3.3-.712.3q-.413 0-.713-.3L11.7 13.7q-.35-.35-.525-.775Q11 12.5 11 12V9q0-.425.288-.713Q11.575 8 12 8t.713.287Q13 8.575 13 9ZM12 4q.425 0 .713.287Q13 4.575 13 5t-.287.713Q12.425 6 12 6t-.712-.287Q11 5.425 11 5t.288-.713Q11.575 4 12 4Zm8 8q0 .425-.288.712Q19.425 13 19 13t-.712-.288Q18 12.425 18 12t.288-.713Q18.575 11 19 11t.712.287Q20 11.575 20 12Zm-8 6q.425 0 .713.288q.287.287.287.712t-.287.712Q12.425 20 12 20t-.712-.288Q11 19.425 11 19t.288-.712Q11.575 18 12 18Zm-6-6q0 .425-.287.712Q5.425 13 5 13t-.713-.288Q4 12.425 4 12t.287-.713Q4.575 11 5 11t.713.287Q6 11.575 6 12Zm6 10q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-2q3.35 0 5.675-2.325Q20 15.35 20 12q0-3.35-2.325-5.675Q15.35 4 12 4Q8.65 4 6.325 6.325Q4 8.65 4 12q0 3.35 2.325 5.675Q8.65 20 12 20Zm0-8Z"/>
                            </svg>
                            <p id={styles.para}>Wednesday, March 15, 10:00am</p>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        
    )
}