import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect} from "react";
import Image from 'next/image'
import Button from 'react-bootstrap/Button';
import Badge from '../../../public/badge';
import Clock from '../../../public/clock';
import Location from '../../../public/location';
import Paragraph from '../../../public/paragraph';
import Person from '../../../public/person';
import styles from './EventCard.module.css';


function OwnerBadge() {
    return (
        <div className={styles.iconText}>
            <Badge />
            <p id={styles.badgeText}>Your Group</p>
        </div>
    )
}

function formatDate(string){
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(string).toLocaleDateString([],options);
}

function EventCard( {title, image, author, authorPic, maxCap, currCap, location, time, description, eventID} ) {
    EventCard.propTypes = {
        title: String,
        image: String,
        author: String,
        authorPic: String,
        maxCap: Number,
        currCap: Number,
        location: String,
        time: String,
        description: String,
        joined: Boolean,
        owner: Boolean,
    }
    const [userName, setUserName] = useState("");

    useEffect(() => {
        if (author) {
            const url = "http://localhost:5000/get-user?id=" + author
            console.log(url)
            fetch(url)
            .then(response => response.json())
            .then(data => {
                setUserName(data.first_name + " " + data.last_name)
            })
        } 
    }, [])

    const [joined, setJoined] = useState(false);
/* 
    useEffect(() => {
        if (author) {
            const url = "http://localhost:5000/get-user?id=" + <CURRENT USER ID>
            console.log(url)
            fetch(url)
            .then(response => response.json())
            .then(data => {
                setJoined((data.groups_participating).includes(eventID))
            })
        } 
    }, []) */

    const [owner, setOwner] = useState(false);
/* 
    useEffect(() => {
        if (author) {
            const url = "http://localhost:5000/get-user?id=" + <CURRENT USER ID>
            console.log(url)
            fetch(url)
            .then(response => response.json())
            .then(data => {
                setOwner((data.groups_owned).includes(eventID))
            })
        } 
    }, []) */

    const date = formatDate(time)

    let buttonText;
    if (joined) {
        buttonText = "Happening Soon!";
    } else {
        buttonText = "Join!"
    }

    let badge;
    if (owner) {
        badge = <OwnerBadge />
    } else {
        badge = <div />
    }
    return (
        <div>
            <div className={styles.active}>
                <div className={styles.top}>
                    <h1 className='head' id={styles.title}>{title}</h1>
                    <div className={styles.iconText}>
                        <Person />
                        <p>{currCap}/{maxCap}</p>
                    </div>
                </div>
                <div className={styles.body}>
                    <Image className={styles.mainImage} src={image} alt="lib" width="134" height="134"/>
                    <div className={styles.info}>
                        <div className={styles.iconText}>
                            <Image className={styles.pfp} src={authorPic} alt="face" width="21" height="21" />
                            <p id={styles.para}>{userName}</p>
                        </div>
                        <div className={styles.iconText}>
                            <Clock />
                            <p id={styles.para}>{date}</p>
                        </div>
                        <div className={styles.iconText}>
                            <Location />
                            <p id={styles.para}>{location}</p>
                        </div>
                        <div className={styles.iconText}>
                            <Paragraph />
                            <p id={styles.para}>{description}</p>
                        </div>
                    </div>
                </div>
                <div className={styles.bottom}>
                    {badge}
                    <Button className={styles.button}>
                        <p id={styles.buttonText}>{buttonText}</p>
                    </Button>
                </div>
            </div>
        </div>
        
    )
}

export default EventCard;
