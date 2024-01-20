import c from "./Home.module.css";

const Home = (p) => {
  return (
    <div className={c.wrapper}>
      <h1 className={c.slogan}>Together On Time: <span>Get teams there quicker, together.</span></h1>
    </div>
  );
};

export default Home;
