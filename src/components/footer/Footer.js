import {Twitter, Instagram, Facebook} from 'react-feather';

export default function Footer() {
    return (
        <div className="footer">
        <a href="https://twitter.com/">
            <i className="fa fa-twitter"><Twitter /></i>
        </a>
        <a href="https://www.instagram.com/">
            <i className="fa fa-instagram"><Instagram /></i>
        </a>
        <a href="https://www.facebook.com/">
            <i className="fa fa-facebook"> <Facebook/></i>
        </a>
        </div>
    );
}