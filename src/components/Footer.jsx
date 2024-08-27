import React from 'react';

const Footer = () => {
  return (
    <footer className="footer p-10 bg-base-300 text-base-content">
      <div>
        <span className="footer-title">Services</span> 
        <a className="link link-hover" href='/getweather'>Weather</a> 
        <a className="link link-hover" href='/'>Home</a> 
      </div> 
      <div>
        <span className="footer-title">Aditya ( Astrobot )</span> 
        <a className="link link-hover" href='https://x.com/astrobot_me' target='_blank'> Twitter</a> 
        <a className="link link-hover" href='https://github.com/Astrobot-me/buggyWeather' target='_blank'> Github</a> 
        <a className="link link-hover" href='https://x.com/astrobot_me' target='_blank'> Project</a> 
        <a className="link link-hover" href='https://linkedin.com/in/astro-adityaraj/' target='_blank'> Linked In</a> 
      </div> 
      <div>
        <span className="footer-title">Legal</span> 
        <a className="link link-hover">Terms of use</a> 
        <a className="link link-hover">Privacy policy</a> 
        <a className="link link-hover">Cookie policy</a>
      </div>
      <div>
        <span className="footer-title">Weather Updates</span> 
        <div className="form-control w-80">
          <label className="label">
            <span className="label-text">Enter your email address</span>
          </label> 
          <div className="relative">
            <input type="text" placeholder="username@site.com" className="input input-bordered w-full pr-16" disabled/> 
            <button className="btn btn-primary absolute top-0 right-0 rounded-l-none" disabled>Subscribe</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
