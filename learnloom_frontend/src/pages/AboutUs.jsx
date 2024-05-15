import React from 'react';

const AboutUs = () => {
  return (
    <div style={styles.container}>
      <h2>About Us</h2>
      <p>Welcome to Learnloom, your go-to platform for online learning! We strive to provide high-quality educational content to learners worldwide. Our mission is to make learning accessible, engaging, and effective for everyone.</p>
      <p>At Learnloom, we offer a wide range of courses covering various subjects, from programming and technology to arts and humanities. Whether you're a beginner or an advanced learner, you'll find courses tailored to your needs.</p>
      <p>Our team of experienced instructors is dedicated to delivering engaging and interactive lessons that will help you achieve your learning goals. With Learnloom, you can learn at your own pace, anytime and anywhere.</p>
      <p>Join our community of learners today and embark on a journey of knowledge and growth with Learnloom!</p>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: 'auto',
    padding: '20px',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
  },
};

export default AboutUs;
