import { useParams } from "react-router-dom";
import { useAppSelector } from "../../services/type";
import css from "./styles.module.scss";
import Header from "../header";
import sprite from "../../assets/sprite.svg";


function UserDetail() {
  const id = useParams().id;

  const usersData = useAppSelector((state) => state.users.usersData)?.data;
  const userFound = usersData?.find((item) => item.id === Number(id));



  return (
    <>
      <Header data={userFound} />
      <div className={css.container}>
        <div className={css.info}>
          <p>
            Клиенты видят в нем эксперта по вопросам разработки комплексных
            решений финансовых продуктов, включая такие аспекты, как
            организационная структура, процессы, аналитика и ИТ-компоненты. Он
            помогает клиентам лучше понимать структуру рисков их бизнеса,
            улучшать процессы за счет применения новейших технологий и
            увеличивать продажи, используя самые современные аналитические
            инструменты.
          </p>
          <p>
            В работе с клиентами недостаточно просто решить конкретную проблему
            или помочь справиться с трудностями. Не менее важно уделять внимание
            обмену знаниями: "Один из самых позитивных моментов — это осознание
            того, что ты помог клиенту перейти на совершенно новый уровень
            компетентности, уверенность в том, что после окончания проекта у
            клиента есть все необходимое, чтобы дальше развиваться
            самостоятельно".
          </p>
          <p>
            Помимо разнообразных проектов для клиентов финансового сектора,
            Сорин ведет активную предпринимательскую деятельность. Он является
            совладельцем сети клиник эстетической медицины в Швейцарии,
            предлагающей инновационный подход к красоте, а также инвестором
            других бизнес-проектов.
          </p>
        </div>
        <div className={css.contacts}>
          <p>
            <svg width="22" height="16" viewBox="0 0 22 16">
              <use xlinkHref={`${sprite}#email`}></use>
            </svg>
            <a href={`mailto: ${userFound?.email}`}>{userFound?.email}</a>
          </p>
        </div>
      </div>
    </>
  );
}

export default UserDetail;
