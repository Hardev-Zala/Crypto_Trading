import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import styles from "./NotFoundPage.module.css";
import { HomeIcon } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main_wrapper}>
        <div className={styles.main}>
          {/* Antenna Section */}
          <div className={styles.antenna}>
            <div className={styles.antenna_shadow}></div>
            <div className={styles.a1}></div>
            <div className={styles.a1d}></div>
            <div className={styles.a2}></div>
            <div className={styles.a2d}></div>
            <div className={styles.a_base}></div>
          </div>

          {/* TV Section */}
          <div className={styles.tv}>
            {/* Curve SVG */}
            <div className={styles.cruve}>
              <svg
                className={styles.curve_svg}
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 189.929 189.929"
                xmlSpace="preserve"
              >
                <path
                  d="M70.343,70.343c-30.554,30.553-44.806,72.7-39.102,115.635l-29.738,3.951C-5.442,137.659,11.917,86.34,49.129,49.13
          C86.34,11.918,137.664-5.445,189.928,1.502l-3.95,29.738C143.041,25.54,100.895,39.789,70.343,70.343z"
                ></path>
              </svg>
            </div>

            {/* Display Section */}
            <div className={styles.display_div}>
              <div className={styles.screen_out}>
                <div className={styles.screen_out1}>
                  {/* Screen with NOT FOUND text */}
                  <div className={styles.screen}>
                    <span className={styles.notfound_text}> NOT FOUND</span>
                  </div>
                  {/* Alternate Screen (for smaller screens) */}
                  <div className={styles.screenM}>
                    <span className={styles.notfound_text}> NOT FOUND</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Lines */}
            <div className={styles.lines}>
              <div className={styles.line1}></div>
              <div className={styles.line2}></div>
              <div className={styles.line3}></div>
            </div>

            {/* Buttons and Speakers */}
            <div className={styles.buttons_div}>
              <div className={styles.b1}>
                <div></div>
              </div>
              <div className={styles.b2}></div>
              <div className={styles.speakers}>
                <div className={styles.g1}>
                  <div className={styles.g11}></div>
                  <div className={styles.g12}></div>
                  <div className={styles.g13}></div>
                </div>
                <div className={styles.g}></div>
                <div className={styles.g}></div>
              </div>
            </div>
          </div>

          {/* Bottom Base */}
          <div className={styles.bottom}>
            <div className={styles.base1}></div>
            <div className={styles.base2}></div>
            <div className={styles.base3}></div>
          </div>
        </div>

        {/* 404 Text */}
        <div className={styles.text_404}>
          <div className={styles.text_4041}>4</div>
          <div className={styles.text_4042}>0</div>
          <div className={styles.text_4043}>4</div>
        </div>
        {/* Go Back to Home Link */}
        <div className={styles.go_home}>
          <Link to="/" className={`${styles.go_home_link}`}>
            ← Go back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
