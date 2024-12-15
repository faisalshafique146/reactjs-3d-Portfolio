import { useState, useRef } from "react";
import "./contact.css";
import emailjs from "@emailjs/browser";
import { motion, useInView } from "motion/react"
import ContactSvg from "./ContactSvg";

const listVariants = {
  initial: {
    x: 100,
    opacity: 0,
},
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2,
    },
  },
}

const Contact = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const form = useRef();
  const ref = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        form.current,
        {
          publicKey: import.meta.env.VITE_PUBLIC_KEY,
        }
      )
      .then(
        () => {
          setSuccess(true);
          setError(false);
        },
        (error) => {
          setError(true);
          setSuccess(false);
        }
      );
  };

  const isInView = useInView(ref, {margin: "-200px"});

  return (
    <div className="contact" ref={ref}>
      <div className="cSection">
        <motion.form variants={listVariants} animate={isInView ? "animate" : "initial"} ref={form} onSubmit={sendEmail}>
          <motion.h1 variants={listVariants} className="cTitle">Let's keep in touch</motion.h1>
          <motion.div variants={listVariants} className="formItem">
            <label>Name</label>
            <input type="text" name="user_username" placeholder="Jhon Doe" />
          </motion.div>
          <motion.div variants={listVariants} className="formItem">
            <label>Email</label>
            <input
              type="email"
              name="user_email"
              placeholder="jhon@gmail.com"
            />
          </motion.div>
          <motion.div variants={listVariants} className="formItem">
            <label>Message</label>
            <textarea
              rows={10}
              name="user_message"
              placeholder="Write your message..."
            ></textarea>
          </motion.div>
          <motion.button variants={listVariants} className="formButton">Send</motion.button>
          {success && (
            <span className="formMessage">Thanks, I'll reply ASAP :)</span>
          )}
          {error && (
            <span className="formMessage">Something went wrong :(</span>
          )}
        </motion.form>
      </div>
      <div className="cSection"><ContactSvg/></div>
    </div>
  );
};

export default Contact;
