import React from 'react';
import { useState } from 'react';

const Contact = () => {
    const mail = 'fhos@gmail.com'

    const copy = async () => {
        await navigator.clipboard.writeText(mail);
        alert('Text copied');
    }

    return (
           <main>
               <div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <p>For any inquires please send a Email to:</p>
                    <br />
                    <br />
                    <input type='email' placeholder='fhos@gmail.com' value={ mail } disabled />
                    <button onClick={copy} > Copy </button>
               </div>
           </main>
        );
}

export default Contact;