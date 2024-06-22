import styles from './SideBar.module.css';
import Logo from '../Logo/Logo.jsx';
import {AppNavigation} from "../Navigation/AppNavigation";
import Footer from "./Footer";

export default function SideBar() {

    return (
        <div className={styles.sidebar}>
            <Logo />
            <AppNavigation/>
            <p>List of cities</p>
            <Footer/>
        </div>
    );
}