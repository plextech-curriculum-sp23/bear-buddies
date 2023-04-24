import React, { use } from "react";
import styles from './SignupPage.module.css';
import Button from 'react-bootstrap/Button';
import {useState} from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { useAtom, atom} from "jotai";
import {currUser} from '../../atoms.js';
import ErrorBar from '@/components/ErrorBar/ErrorBar';
import {useRouter} from 'next/router'
// import {Navigate, useNavigate} from 'react-router-dom';


function SignupPage() {

    const [user, setUser] = useAtom(currUser);

    const [requestSuccessful, setRequestSuccessful] = useState(false);

    const [path, setPath] = useState();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [graduationYear, setGraduationYear] = useState(0);
    const [major, setMajor] = useState('');
    
    const [error, setError] = useState(null);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        console.log(firstName)
        setError(null);
        //const emptyFields = inputs.some(input => !input);
        const emptyFields = firstName == '' || lastName == '' || email == '' 
            || password == '' || confirmPassword == '' || gender == '' 
            || graduationYear == '' || major == '';


        if (confirmPassword != password) {
            setError("Make sure passwords match");
            e.preventDefault();
            return;
        }

        if (emptyFields) {
            // If any fields are empty, set an error message
            setError("Please fill in all fields");
            console.log("not null");
            e.preventDefault();
            return;
        }

        fetch('http://127.0.0.1:5000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
                first_name: firstName,
                last_name: lastName,
                gender,
                phone_number: phoneNumber,
                graduation_year: graduationYear,
                major
            })
        }).then((response) => {
            if (response.ok) {
                console.log("success");
                router.push('/LoginPage/LoginPage')
                return response.json()
            } else {
                throw new Error("<insert error mssage>")
            }
        }).then((responseJson) => {
            // do something
        }).catch((error) => {
            console.log(error)
        })
    }

        // try {
        //     const response = await fetch('http://127.0.0.1:5000/signup', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({
        //             email,
        //             password,
        //             first_name: firstName,
        //             last_name: lastName,
        //             gender,
        //             phone_number: phoneNumber,
        //             graduation_year: graduationYear,
        //             major
        //         }),
        //     });
        //     if (response.ok) {
        //         //setPath("../LoginPage/LoginPage");
        //         console.log(response.json())
        //         //navigate('/LoginPage/Log`inPage');
        //     } else {
        //         setError('This email is already registered');
        //         e.preventDefault();
        //     }
        //     const data = await response.json();
        //     console.log(data);
        //     setUser(data);
        //     //also need to check if the email is valid
        //     //is there a way to check if data['success'] exits, if yes, then redirect to home
        //     console.log(path);
        // } catch (error) {
        //     console.log(error.response);
        // }

    //------------------------------------------------

    const [year, setYear] = useState("select year ");
    const handleSelectYear = (y) => {
        setYear(y);
        setGraduationYear(y);
    }

    const [chooseGender, setChooseGender] = useState("select gender ");
    const handleSelectGender = (g) => {
        setChooseGender(g);
        setGender(g);
    }

    return (
        <div>
            <ErrorBar e={error}></ErrorBar>
            <div className={styles.container}>
                <div className={styles.signup_title}>
                    <h1>Sign Up for Bear Buddies</h1>
                </div>
                <div>
                    <h4>Create a free account or <a className={styles.blue_txt} href="../LoginPage/LoginPage" style={{textDecoration: 'none', font: 'inherit'}}>login</a></h4>
                </div>
                <div className={styles.data_container}>
                    <form>
                        <div className={styles.col_cont}>
                            <div className={styles.col_items}>
                                <label>first name</label>
                                <input type="text" name="first_name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="form-control" required></input>
                            </div>
                            <div className={styles.col_items}>
                                <label>last name</label>
                                <input type="text" name="last_name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="form-control" required></input>
                            </div>
                        </div>
                        <div className={styles.long_text_box}>
                            <label>email</label>
                            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" required></input>
                        </div>
                        <div className={styles.col_cont}>
                            <div className={styles.col_items}>
                                <label>gender</label>
                                <div className="form-control">
                                    <DropdownButton
                                        className={styles.dropdown_container_button}
                                        menuVariant="dark"
                                        variant=""
                                        title={chooseGender}
                                        id="dropdown-menu-align-right"
                                        size="sm"
                                        required
                                        bsPrefix={styles.dropdown_button2}
                                        onSelect={handleSelectGender}
                                        name="gender"
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                    >
                                        <Dropdown.Item eventKey="female">female</Dropdown.Item>
                                        <Dropdown.Item eventKey="male">male</Dropdown.Item>
                                        <Dropdown.Item eventKey="other">other</Dropdown.Item>
                                    </DropdownButton>
                                </div>
                            </div>
                            <div className={styles.col_items}>
                                <label>major</label>
                                <input type="text" name="major" value={major} onChange={(e) => setMajor(e.target.value)} className="form-control" requiredTxt = "hello" required></input>
                            </div>
                        </div>
                        <div className={styles.col_cont}>
                            <div className={styles.col_items}>
                                <label>graduation year</label>
                                <div className="form-control">
                                    <DropdownButton
                                        className={styles.dropdown_container_button}
                                        menuVariant="dark"
                                        variant=""
                                        value={year}
                                        title={year}
                                        id="graduation_year"
                                        size="sm"
                                        bsPrefix={styles.dropdown_button2}
                                        onSelect={handleSelectYear}
                                        required
                                        name="graduation_year"
                                    >
                                        <Dropdown.Item eventKey="2026" onChange={((e) => setGraduationYear(e.target.value))}>2026</Dropdown.Item>
                                        <Dropdown.Item eventKey="2025" onChange={((e) => setGraduationYear(e.target.value))}>2025</Dropdown.Item>
                                        <Dropdown.Item eventKey="2024" onChange={((e) => setGraduationYear(e.target.value))}>2024</Dropdown.Item>
                                        <Dropdown.Item eventKey="2023" onChange={((e) => setGraduationYear(e.target.value))}>2023</Dropdown.Item>
                                    </DropdownButton>
                                </div>
                            </div>
                            <div className={styles.col_items}>
                                <label>phone number</label>
                                <input type="text" name="phone_number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="form-control" required></input>
                            </div>
                        </div>
                        <div className={styles.col_cont}>
                            <div className={styles.col_items}>
                                <label>password</label>
                                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" required></input>
                            </div>
                            <div className={styles.col_items}>
                                <label>confirm password</label>
                                <input type="password" className="form-control" name="confirm_password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required></input>
                            </div>
                        </div>
                        <div className="signup-btn-cont">
                            <Button 
                                variant="primary" type="submit" className={styles.btn} onClick={handleSubmit}>
                            Sign Up
                            </Button>
                        </div> 
                    </form>
                </div>
            </div>
        </div>
        
    )
}

export default SignupPage;
