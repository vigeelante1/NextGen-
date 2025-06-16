import React from "react";
import styles from "./Footer.module.css";

function Footer() {
    return (
        <footer>
            <p>&copy; {new Date().getFullYear()} NextGen. All rights reserved.</p>
        </footer>
    );
}

export default Footer;
