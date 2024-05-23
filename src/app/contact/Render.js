"use client";

import React from "react";
import emailjs, {init} from "@emailjs/browser";
import Head from "next/head";
import bg from '../../../public/images/contact/pacific_1920_2560.jpg';
import {FaPaperPlane} from "react-icons/fa6";
import toast, {Toaster} from "react-hot-toast";


const Render = () => {
    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        suggestion: "",
        images: [],
    });
    const form = React.useRef();

    function updateForm(e) {
        const value = e.currentTarget.value;
        const name = e.currentTarget.name;
        setFormData((prevForm) => {
            return {
                ...prevForm,
                [name]: value,
            };
        });
    }

    function submitSuggestion(e) {
        e.preventDefault();
        const myPromise = emailjs
            .sendForm(
                "service_3hso67w",
                "template_cxvs4sn",
                form.current,
                "VuMtr83gozV6G7IIc"
            );

        toast.promise(myPromise, {
            loading: "Sending message...",
            success: "Successfully sent",
            error: "Failed to send message"
        });


        clearForm();
    }

    function clearForm() {
        init("VuMtr83gozV6G7IIc");

        setFormData((prevForm) => {
            return {
                name: "",
                email: "",
                suggestion: "",
                images: [],
            };
        });
    }


    return (

        <div style={{backgroundImage: `url(${bg.src})`, width: "100%"}}
             className='bg-cover bg-no-repeat py-16 bg-center min-h-screen'>
            <Toaster/>
            <div
                className=' flex flex-col justify-between mx-auto w-[95%] md:w-[80%] max-w-screen-md bg-white px-4 py-2 md:px-8 md:py-4 rounded shadow-xl md:flex-row'>
                {/** Form text */}
                <div className='mb-8 md:mb-0'>
                    <h1 className="res-heading-base font-bold mb-4">
                        Send me a message
                    </h1>

                    <p className='mb-2'>Feedback, business inquiries, questions & more</p>

                    <p className="text-slate-500 mb-2">
                        Email
                    </p>
                    <a className='link--secondary cursor-pointer break-all'
                       href="mailto:primalenjoyer@hotmail.com">
                        primalenjoyer@hotmail.com
                    </a>
                </div>
                {/** End of form text */}

                {/** Input form */}
                <form ref={form} onSubmit={submitSuggestion}>
                    <div className="form-line line">
                        <h4 className='mb-2'>
                            Name
                        </h4>
                        <input
                            type="text"
                            name="name"
                            onChange={updateForm}
                            value={formData.name}
                            className='p-2 border  rounded w-full border-slate-300 focus:border-slate-900 mb-4'
                            placeholder="Name"
                        />
                        <div className="field">
                            <h4 className='mb-2'>
                                Email
                            </h4>
                            <input
                                name="email"
                                onChange={updateForm}
                                className='p-2 border  rounded w-full border-slate-300 focus:border-slate-900 mb-4'
                                value={formData.email}
                                placeholder="Email"
                            />
                        </div>
                    </div>
                    <div className="field line">
                        <h4 className='mb-2'>What Is Your Suggestion or Feedback? *</h4>
                        <textarea
                            required
                            name="suggestion"
                            placeholder="Message"
                            onChange={updateForm}
                            className='p-2 border resize-none rounded w-full border-slate-300 focus:border-slate-900 mb-4'
                            value={formData.suggestion}
                        ></textarea>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type='submit'
                            className="transition bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center">
                            <p className='mr-2 text-blue-50'>
                                Send
                            </p>
                            <FaPaperPlane

                            />
                        </button>
                    </div>
                </form>
                {/** End of input form */}


            </div>

        </div>
    );
};

export default Render;