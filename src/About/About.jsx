import React from "react";
import "./About.css";
import YunaDevin from "../../images/yuna-devin.png";

function About() {
  return (
    <section className="about">
      <div className="about__content">
        <div className="about__image-container">
          <img src={YunaDevin} alt="Me and my wife" className="about__image" />
        </div>
        <div className="about__text-content">
          <h1 className="about__title">About the Engineer</h1>
          <p className="about__text">
            Hello! My name is Parth Sonanitwala and I'm a passionate aspiring
            Software Engineer I also plan on becoming a TripleTen tutor where I
            will assist students in this amazing journey of becoming Software
            Engineers. Throughout TripleTen's program, I've developed
            proficiency in the following programs : React, Javascript, HTML,
            CSS, Github, Webpack. Going back to me and Software Engineering what
            I can bring to customers is well designed applications and websites
            that deliver value for customers. With an expertise and speciality
            in the backend development and a good amount of experience in
            frontend. I Parth, from wanting to join the Connecticut State Police
            and becoming a Connecticut State-Trooper to now a Software Engineer
            I'm ready to do any project, assignment and provide meaningful
            solutions for my company that I work with .
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
