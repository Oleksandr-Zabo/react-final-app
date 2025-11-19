import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

import logo from '../assets/img/components/logo.svg';
import facebook from '../assets/img/icons/facebook.svg';
import twitter from '../assets/img/icons/twitter.svg';
import instagram from '../assets/img/icons/instagram.svg';
import youtube from '../assets/img/icons/youtube.svg';
import chevron from '../assets/img/icons/chevron-down.svg';

const Footer = () => {
	// show sections expanded on desktop, collapsed on small screens
	const [expanded, setExpanded] = useState({
		tastebite: true,
		legal: true,
		follow: true,
	});

	useEffect(() => {
		const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 800;
		setExpanded({ tastebite: isDesktop, legal: isDesktop, follow: isDesktop });

		const onResize = () => {
			const desktop = window.innerWidth >= 800;
			setExpanded(prev => ({ tastebite: desktop ? true : prev.tastebite, legal: desktop ? true : prev.legal, follow: desktop ? true : prev.follow }));
		};

		window.addEventListener('resize', onResize);
		return () => window.removeEventListener('resize', onResize);
	}, []);

	const toggle = (key) => {
		setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
	};

	return (
		<footer className="site-footer">
			<div className="footer-inner container">
				<div className="footer-col footer-brand">
					<img src={logo} alt="Tastebite" className="footer-logo" />
					<p className="footer-quote">"On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment"</p>
				</div>

				<div className="footer-col footer-nav">
					<div className="section-header mobile-toggle">
						<button className="section-button" onClick={() => toggle('tastebite')} aria-expanded={expanded.tastebite}>
							<span className="section-title">Tastebite</span>
							<img className={`chev ${expanded.tastebite ? 'open' : ''}`} src={chevron} alt="toggle"/>
						</button>
					</div>
					<div className={`section-content ${expanded.tastebite ? 'expanded' : 'collapsed'}`}>
						<ul>
							<li><Link to="/about">About us</Link></li>
							<li><Link to="/careers">Careers</Link></li>
							<li><Link to="/contact">Contact Us</Link></li>
							<li><Link to="/feedback">Feedback</Link></li>
						</ul>
					</div>
				</div>

				<div className="footer-col footer-nav">
					<div className="section-header mobile-toggle">
						<button className="section-button" onClick={() => toggle('legal')} aria-expanded={expanded.legal}>
							<span className="section-title">Legal</span>
							<img className={`chev ${expanded.legal ? 'open' : ''}`} src={chevron} alt="toggle"/>
						</button>
					</div>
					<div className={`section-content ${expanded.legal ? 'expanded' : 'collapsed'}`}>
						<ul>
							<li><Link to="/terms">Terms</Link></li>
							<li><Link to="/conditions">Conditions</Link></li>
							<li><Link to="/cookies">Cookies</Link></li>
							<li><Link to="/copyright">Copyright</Link></li>
						</ul>
					</div>
				</div>

				<div className="footer-col footer-social">
					<div className="section-header mobile-toggle">
						<button className="section-button" onClick={() => toggle('follow')} aria-expanded={expanded.follow}>
							<span className="section-title">Follow</span>
							<img className={`chev ${expanded.follow ? 'open' : ''}`} src={chevron} alt="toggle"/>
						</button>
					</div>
					<div className={`section-content ${expanded.follow ? 'expanded' : 'collapsed'}`}>
						<ul className="follow-list">
							<li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
							<li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
							<li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
							<li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer">Youtube</a></li>
						</ul>
					</div>
				</div>
			</div>

			<div className="footer-bottom">
				<div className="container footer-bottom-inner">
					<div className="copyright">© 2020 Tastebite - All rights reserved</div>
					<div className="social-small">
						<a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><img src={facebook} alt="Facebook"/></a>
						<a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer"><img src={twitter} alt="Twitter"/></a>
						<a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><img src={instagram} alt="Instagram"/></a>
						<a href="https://youtube.com" aria-label="YouTube" target="_blank" rel="noopener noreferrer"><img src={youtube} alt="YouTube"/></a>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
