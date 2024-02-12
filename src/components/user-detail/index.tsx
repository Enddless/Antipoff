import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services/type";
import css from "./styles.module.scss";
import Header from "../header";
import { useEffect } from "react";
import { getUsers } from "../../store/thunk/usersThunk";

function UserDetail() {
  const id = useParams().id;
  const dispatch = useAppDispatch();
  const usersData = useAppSelector((state) => state.users.usersData)?.data;
  const userFound = usersData?.find((item) => item.id === Number(id));
  const page = localStorage.getItem("currentPage");
  useEffect(() => {
    if (page) {
      dispatch(getUsers(JSON.parse(page)));
    }
  }, [dispatch, page]);

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
              <g>
                <path
                  d="M20 0.5H2C1.60218 0.5 1.22064 0.658035 0.93934 0.93934C0.658035 1.22064 0.5 1.60218 0.5 2V14C0.5 14.3978 0.658035 14.7794 0.93934 15.0607C1.22064 15.342 1.60218 15.5 2 15.5H20C20.3978 15.5 20.7794 15.342 21.0607 15.0607C21.342 14.7794 21.5 14.3978 21.5 14V2C21.5 1.60218 21.342 1.22064 21.0607 0.93934C20.7794 0.658035 20.3978 0.5 20 0.5ZM18.35 2L11 7.085L3.65 2H18.35ZM2 14V2.6825L10.5725 8.615C10.698 8.7021 10.8472 8.74877 11 8.74877C11.1528 8.74877 11.302 8.7021 11.4275 8.615L20 2.6825V14H2Z"
                  fill="#512689"
                />
              </g>
            </svg>
            <a href={`mailto: ${userFound?.email}`}>{userFound?.email}</a>
          </p>
        </div>
      </div>
    </>
  );
}

export default UserDetail;
