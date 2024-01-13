import { createGlobalStyle } from 'styled-components'


const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        // cursor: url('img/stand.png'), auto;
    }

    // ! constrain this to just the sliding doors
    img {
        user-select: none;
        user-drag: none;
        pointer-events: none;
    }

    body {
        background: pink;
        overflow: hidden;
        // cursor: url('img/stand.png'), auto;
    }

    #bg {
        // ! temorary homepage
        background-image: url("https://cdn.shopify.com/s/files/1/0070/7032/files/image9_539cd00d-4068-4f63-8e97-42329a21798b.png?v=1694443713");
        background-size: cover;
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
    }
`

export { GlobalStyles }