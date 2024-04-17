"use client";
import {
  AwaitedReactNode,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  SetStateAction,
  useState,
} from "react";
interface Tweet {
  title: string;
  position: string;
  snippet: string;
  displayed_link: string;
  link: string; // Assuming there's a direct link property
}

export default function Home() {
  const [positive, setPositive] = useState<string[]>([]);
  const [newPositive, setNewPositive] = useState(""); // Estado para armazenar a nova palavra digitada

  const [negative, setNegative] = useState<string[]>([]);
  const [newNegative, setNewNegative] = useState("");

  const [termo, setTermo] = useState("");

  const [newNegativeTweets, setNewNegativeTweets] = useState<Tweet[]>([]);
  const [newPositiveTweets, setNewPositiveTweets] = useState<Tweet[]>([]);
  const [allTweets, setAllTweets] = useState<Tweet[]>([]);

  async function pegarTweets() {
    const payload = {
      api_key: "67fbab56fad83e9eb05574e9e141618d",
      query: termo,
      num: "100",
      country: "br",
    };

    const queryString = new URLSearchParams(payload).toString();
    const response = await fetch(
      `https://api.scraperapi.com/structured/twitter/search?${queryString}`
    );
    const data = await response.json();
    console.log(data);
    const allTweets = data.organic_results;

    setAllTweets(data.organic_results || []);

    console.log(positive);
    console.log(negative);

    // Filter for negative tweets
    const filteredNegativeTweets = data.organic_results.filter(
      (tweet: { snippet: string }) =>
        tweet.snippet &&
        negative.some((negWord: string) =>
          tweet.snippet.toLowerCase().includes(negWord.toLowerCase())
        )
    );
    setNewNegativeTweets(filteredNegativeTweets);

    // Filter for positive tweets
    const filteredPositiveTweets = data.organic_results.filter(
      (tweet: { snippet: string }) =>
        tweet.snippet &&
        positive.some((posWord) =>
          tweet.snippet.toLowerCase().includes(posWord.toLowerCase())
        )
    );
    setNewPositiveTweets(filteredPositiveTweets);
  }

  const handleInputChangeTermo = async (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setTermo(event.target.value);

    // Atualiza o estado com o valor do input
  };

  const handleInputChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setNewPositive(event.target.value); // Atualiza o estado com o valor do input
  };

  const handleAddPositive = (event: { preventDefault: () => void }) => {
    event.preventDefault(); // Evita o comportamento padrão de enviar o formulário

    if (newPositive.trim() !== "") {
      // Verifica se a nova palavra não está vazia
      setPositive([...positive, newPositive]); // Adiciona a nova palavra ao estado positive
      setNewPositive(""); // Limpa o input
    }
  };

  const handleInputChangeNegative = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setNewNegative(event.target.value); // Atualiza o estado com o valor do input
  };

  const handleAddNegative = (event: { preventDefault: () => void }) => {
    event.preventDefault(); // Evita o comportamento padrão de enviar o formulário

    if (newNegative.trim() !== "") {
      // Verifica se a nova palavra não está vazia
      setNegative([...negative, newNegative]); // Adiciona a nova palavra ao estado positive
      setNewNegative(""); // Limpa o input
    }
  };
  return (
    <div className="container-fluid d-flex justify-content-start">
      {/* Divisão à esquerda */}
      <div
        className="me-4 bg-dark p-3"
        style={{ height: "100vh", marginLeft: -15 }}
      >
        {" "}
        {/* Defina a altura da div para 100% da altura da tela */}
        <div className="card mb-2">
          <div className="card-body">
            <h5>Termo</h5>

            <input
              className="form-control me-2 ms-2 "
              type="search"
              placeholder="Inserir palavra"
              aria-label="Search"
              onChange={handleInputChangeTermo}
              value={termo}
            />
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <h5>Palavra Chave Positiva</h5>
            <form className="d-flex mt-3 mb-3" onSubmit={handleAddPositive}>
              <input
                className="form-control me-2 ms-2"
                type="search"
                placeholder="Inserir palavra"
                aria-label="Search"
                value={newPositive} // Define o valor do input como o estado newPositive
                onChange={handleInputChange} // Chama a função handleInputChange ao digitar
              />
              <button className="btn btn-success" type="submit">
                Adicionar
              </button>
            </form>

            <h5>Palavra Chave Negativa</h5>
            <form
              className="d-flex mt-3 mb-3"
              role="search"
              onSubmit={handleAddNegative}
            >
              <input
                className="form-control me-2 ms-2 "
                type="search"
                placeholder="Inserir palavra"
                aria-label="Search"
                value={newNegative} // Define o valor do input como o estado newPositive
                onChange={handleInputChangeNegative} // Chama a função handleInputChange ao digitar
              />
              <button className="btn btn-danger" type="submit">
                Adicionar
              </button>
            </form>

            {/* <div className="d-flex mt-2  justify-content-between ps-3 pe-3 pt-3">
              <div className="form-check d-flex align-items-center me-5">
                <input
                  className="form-check-input me-2"
                  type="checkbox"
                  value=""
                  id="flexCheckChecked"
                />
                <label
                  className="form-check-label d-flex align-items-center"
                  htmlFor="flexCheckChecked"
                >
                  <div
                    id="instagram-filter-icon"
                    className="sc-gDiTby hjSIGA me-2"
                  >
                    {" "}
              
                    <span className="sc-bcXHqe hOuhoX">
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fab"
                        data-icon="x-twitter"
                        className="svg-inline--fa fa-x-twitter fa-fw fa-1x "
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        color="#000"
                        style={{ width: "25px", height: "25px" }}
                      >
                        <path
                          fill="currentColor"
                          d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
                        ></path>
                      </svg>
                    </span>
                  </div>
                  X (Twitter)
                </label>
              </div>

              <div className="form-check d-flex align-items-center">
                <input
                  className="form-check-input me-2"
                  type="checkbox"
                  value=""
                  id="flexCheckChecked"
                />
                <label
                  className="form-check-label d-flex align-items-center"
                  htmlFor="flexCheckChecked"
                >
                  <div
                    id="instagram-filter-icon"
                    className="sc-gDiTby hjSIGA me-2"
                  >
                    {" "}
                
                    <span className="sc-bcXHqe hOuhoX">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 50 50"
                        width="50px"
                        height="50px"
                        style={{ width: "30px", height: "30px" }}
                      >
                        <path d="M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z" />
                      </svg>
                    </span>
                  </div>
                  Instagram
                </label>
              </div>
            </div> */}
            <button
              className="btn btn-success mt-3 w-100"
              onClick={pegarTweets}
            >
              Buscar
            </button>
          </div>
        </div>
        <div className="text-light">
          <hr />
        </div>
        <h5 className="text-light text-center">Palavras chave</h5>
        <div className="container-fluid ps-5 pe-5">
          <div className="row">
            <div className="col-md-6">
              {positive.map((word, index) => (
                <div key={index} className="mt-3">
                  <span className="badge text-bg-success fs-6">{word}</span>
                </div>
              ))}
            </div>
            <div className="col-md-6">
              {negative.map(
                (
                  word:
                    | string
                    | number
                    | bigint
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | ReactPortal
                    | Promise<AwaitedReactNode>
                    | null
                    | undefined,
                  index: Key | null | undefined
                ) => (
                  <div key={index} className="mt-3">
                    <span className="badge text-bg-danger fs-6">{word}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Divisão à direita */}
      <div className="container-fluid">
        <nav
          className="navbar navbar-expand-lg bg-dark text-light"
          style={{ marginLeft: -36, marginRight: -24 }}
        >
          <div className="container-fluid">
            <p className="navbar-brand text-light">Tweets</p>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              {/* <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a
                    className="nav-link active text-light"
                    aria-current="page"
                    href="#"
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-light" href="#">
                    Link
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link text-light dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Dropdown
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        Action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-light disabled"
                    aria-disabled="true"
                  >
                    Disabled
                  </a>
                </li>
              </ul> */}
            </div>
          </div>
        </nav>

        <div className="d-flex mt-2 justify-content-center">
          {allTweets.length > 0 && (
            <div style={{ maxHeight: "90vh", overflowY: "scroll" }}>
              <button
                className="btn btn-primary me-2 w-100 sticky-top"
                type="submit"
              >
                Todos
              </button>
              {allTweets.map((tweet, index) => (
                <div className="card mb-3 mt-3" key={index}>
                  <h5 className="card-header">{tweet.title}</h5>
                  <div className="card-body">
                    <h5 className="card-title">{tweet.position}</h5>
                    <p className="card-text">{tweet.snippet}</p>
                    <a
                      href={tweet.displayed_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      Visit Link
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
          {newNegativeTweets.length > 0 && (
            <div style={{ maxHeight: "90vh", overflowY: "scroll" }}>
              <button className="btn btn-danger w-100 sticky-top" type="submit">
                Negativos
              </button>
              {newNegativeTweets.map((tweet, index) => (
                <div className="card mb-3 mt-3" key={index}>
                  <h5 className="card-header">{tweet.title}</h5>
                  <div className="card-body">
                    <h5 className="card-title">{tweet.position}</h5>
                    <p className="card-text">{tweet.snippet}</p>
                    <a
                      href={tweet.displayed_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      Visit Link
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
          {newPositiveTweets.length > 0 && (
            <div style={{ maxHeight: "90vh", overflowY: "scroll" }}>
              <button
                className="btn btn-success me-2 w-100 sticky-top"
                type="submit"
              >
                Positivos
              </button>
              {newPositiveTweets.map((tweet, index) => (
                <div className="card mb-3 mt-3" key={index}>
                  <h5 className="card-header">{tweet.title}</h5>
                  <div className="card-body">
                    <h5 className="card-title">{tweet.position}</h5>
                    <p className="card-text">{tweet.snippet}</p>
                    <a
                      href={tweet.displayed_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      Visit Link
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Outros cartões aqui */}
      </div>
    </div>
  );
}
