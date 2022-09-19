<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
<h1 align="center">[FE] Travelbook</h1>

  <p align="center">
    Travelbook jest to serwis społecznościowy, dzięki któremu udokumentujemy nasze podróże.
    <br />
    <br />
    <a href="https://travelbook.networkmanager.info/">Demo</a><br>
    <a href="https://github.com/ezterr/travel-journal-backend">Backend-repo</a>

  <b>Username:</b> tester
  <br>
  <b>Password:</b> Test1234
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Spis treści</summary>
  <ol>
    <li>
      <a href="#o-projekcie">O projekcie</a>
      <ul>
        <li><a href="#technologie">Technologie</a></li>
      </ul>
    </li>
    <li>
      <a href="#jak-zacząć">Jak zacząć</a>
      <ul>
        <li><a href="#warunki-wstepne">Warunki wstępne</a></li>
        <li><a href="#instalacja">Instalacja</a></li>
      </ul>
    </li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## O projekcie

![Product Name Screen Shot][product-screenshot]

Aplikacja pozwala na stworzenie własnego dziennika podróży i podzielenia się nim ze znajomymi. Posty znajomych są wyświetlane na stronie głównej, z możliwością zobaczenia przebiegu całej podróży.

<p align="right">(<a href="#top">back to top</a>)</p>

### Technologie
![html][html]
![css][css]
[![Typescript][Typescript]][Typescript-url]
[![React][React.js]][React-url]
[![Reactrouter][Reactrouter]][Reactrouter-url]
[![Bootstrapicons][Bootstrapicons]][Bootstrapicons-url]
[![Rcpagination][Rcpagination]][Rcpagination-url]

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Jak zacząć

### Warunki wstępne

  ```sh
  yarn
  ```

### Instalacja

1. Sklonuj repozytorium
   ```sh
   git clone https://github.com/ezterr/travel-journal-frontend.git
   ```
2. Przejdź do katalogu projektu
   ```sh
   cd travel-journal-frontend
   ```
2. Zainstaluj wszystkie zależności
   ```sh
   yarn
   ```
3. Podaj adres url do api `src/config.js`
   ```js
   export const apiUrl = process.env.REACT_APP_API_URL ?? 'http://localhost:3001/api';
   ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/ezterr/travel-journal-frontend.svg?style=for-the-badge
[contributors-url]: https://github.com/ezterr/travel-journal-frontend/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/ezterr/travel-journal-frontend.svg?style=for-the-badge
[forks-url]: https://github.com/ezterr/travel-journal-frontend/network/members
[stars-shield]: https://img.shields.io/github/stars/ezterr/travel-journal-frontend.svg?style=for-the-badge
[stars-url]: https://github.com/ezterr/travel-journal-frontend/stargazers
[issues-shield]: https://img.shields.io/github/issues/ezterr/travel-journal-frontend.svg?style=for-the-badge
[issues-url]: https://github.com/ezterr/travel-journal-frontend/issues
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Typescript]: https://img.shields.io/badge/typescript-20232A?style=for-the-badge&logo=typescript&logoColor=3178c6
[Typescript-url]: https://www.typescriptlang.org/
[Reactrouter]: https://img.shields.io/badge/React%20Router-20232A?style=for-the-badge&logo=reactrouter&logoColor=fff
[Reactrouter-url]: https://reactrouter.com/
[html]: https://img.shields.io/badge/HTML-20232A?style=for-the-badge&logo=html5&logoColor=f06529
[css]: https://img.shields.io/badge/CSS-20232A?style=for-the-badge&logo=css3&logoColor=2965f1
[Bootstrapicons]: https://img.shields.io/badge/bootstrap_icons-20232A?style=for-the-badge&logo=bootstrap&logoColor=563d7c
[Bootstrapicons-url]: https://icons.getbootstrap.com/
[Rcpagination]: https://img.shields.io/badge/rc_pagination-20232A?style=for-the-badge&logo=rc-pagination&logoColor=563d7c
[Rcpagination-url]: https://www.npmjs.com/package/rc-pagination
[product-screenshot]: readme/app.png


