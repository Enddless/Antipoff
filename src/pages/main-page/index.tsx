import Header from "../../components/header";
import MainContent from "../../components/main-content";
import css from "./styles.module.scss";

function MainPage() {
  return (
    <div className={css.main}>
      <Header />
      <MainContent />
    </div>
  );
}

export default MainPage;
