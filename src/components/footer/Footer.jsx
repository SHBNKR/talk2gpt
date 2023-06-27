import React from 'react';

import './Footer.css';

function Footer () {

    return (
        <section className="footer">
            <hr className="footer-seperator" />
            <section className="footer-social-media">
                <a href="/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </section>
            <section className="footer-info">
                <section className="footer-info-left">
                    <section className="footer-info__name">
                        Sinan Harkci
                    </section>

                </section>
                <section className="footer-info-center">
                    <section className="footer-info__email">
                        sinan.harkci@hs-furtwangen.de
                    </section>
                </section>
                <section className="footer-info-right">
                    <section className="footer-info__number">
                        271211
                    </section>
                </section>
            </section>
            <hr className="footer-seperator" />
        </section>
    )

}

export default Footer;