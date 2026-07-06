* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --primary: #0066B1;
    --dark: #111;
    --light: #f5f5f5;
    --white: #fff;
    --gray: #666;
    --border: #ddd;
}

body {
    font-family: Arial, Helvetica, sans-serif;
    background: #fff;
    color: var(--dark);
}

img {
    width: 100%;
    display: block;
}

a {
    text-decoration: none;
    color: inherit;
}

.container {
    width: 90%;
    max-width: 1300px;
    margin: auto;
}

.header {
    display: flex;
    align-items: center;
    padding: 0 30px;
    height: 100px;
    background: linear-gradient(
        135deg,
        rgb(170, 166, 166) 0%,
        rgb(172, 170, 170) 5%,
        #ffffff 10%,
        #ffffff 90%,
        rgb(172, 170, 170) 95%,
        rgb(170, 166, 166) 100%
    );
    flex-wrap: nowrap;
}

.header_logo {
    height: 70%;
}

.header_logo img {
    height: 100%;
    width: 300px;
    display: block;
}

#nav {
    display: inline-flex;
    flex: 1;
    height: 80px;
    justify-content: center;
    align-items: center;
    gap: 50px;
    list-style: none;
    margin: 30px 20px;
}

#nav li a {
    color: black;
    text-decoration: none;
    font-weight: 600;
    font-size: 26px;
}

#nav .header_a--active {
    color: darkblue;
}

#nav .header_a:hover {
    color: darkblue;
}

.header_icon {
    display: flex;
    align-items: center;
    gap: 20px;
}

.icon_group {
    display: flex;
    align-items: center;
    gap: 10px;
}

.chuong img {
    height: 28px;
    width: auto;
}

.basket img {
    height: 30px;
    width: auto;
}

.header_button {
    padding: 10px 20px;
    font-size: 16px;
    font-weight: 600;
    background: #fff;
    color: #000;
    border: 2px solid #a2a5aa;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s;
}

.header_button:hover {
    background: #0d6efd;
    color: white;
}

.hero {
    width: 100%;
    height: 85vh;
    background: linear-gradient(rgba(0, 0, 0, .45), rgba(0, 0, 0, .45)), url("images/2025_BMW_3-series_3_1600.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
}

.hero-content {
    width: 100%;
}

.hero-text {
    max-width: 550px;
    color: #fff;
}

.tag {
    display: inline-block;
    padding: 8px 18px;
    border: 1px solid rgba(255, 255, 255, .4);
    border-radius: 30px;
    color: #ddd;
    background: rgba(255, 255, 255, .1);
    margin-bottom: 20px;
}

.hero h1 {
    font-size: 90px;
    font-weight: 800;
    line-height: 1;
    color: #fff;
    text-shadow: 2px 2px 8px rgba(0, 0, 0, .6);
}

.hero h3 {
    margin: 20px 0 40px;
    font-size: 24px;
    color: #cfcfcf;
    text-shadow: 2px 2px 8px rgba(0, 0, 0, .6);
}

.hero-buttons {
    display: flex;
    gap: 20px;
}

.btn {
    padding: 16px 36px;
    border-radius: 4px;
    font-weight: 600;
    transition: .3s;
}

.btn-primary {
    background: var(--primary);
    color: #fff;
}

.btn-primary:hover {
    background: #004f87;
}

.btn-outline {
    border: 2px solid #fff;
    color: #fff;
}

.btn-outline:hover {
    background: #fff;
    color: #111;
}

.main .container {
    margin-top: 70px;
}

.subtitle {
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 50px;
}

.product-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
}

.card {
    background: #fff;
    border-radius: 12px;
    padding: 25px;
    text-align: center;
    transition: .3s;
    cursor: pointer;
}

.card:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, .15);
}

.card img {
    height: 180px;
    object-fit: contain;
}

.card h3 {
    margin: 20px 0 10px;
    font-size: 22px;
}

.card p {
    color: #666;
}

footer {
    height: 80px;
    margin-top: 60px;
    background: #111;
}

/* Tablet & Laptop */
@media (max-width: 992px) {

    .header {
        flex-wrap: wrap;
        height: auto;
        padding: 20px;
        justify-content: center;
    }

    .header_logo {
        width: 100%;
        text-align: center;
        margin-bottom: 20px;
    }

    .header_logo img {
        width: 220px;
        margin: auto;
    }

    #nav {
        width: 100%;
        gap: 30px;
        margin: 20px 0;
        flex-wrap: wrap;
    }

    #nav li a {
        font-size: 20px;
    }

    .header_icon {
        width: 100%;
        justify-content: center;
        margin-top: 15px;
    }

    .hero {
        height: 70vh;
    }

    .hero-content {
        text-align: center;
    }

    .hero-text {
        max-width: 100%;
    }

    .hero-buttons {
        justify-content: center;
    }

    .hero h1 {
        font-size: 60px;
    }

    .hero h3 {
        font-size: 22px;
    }

    .product-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}


/* Tablet */
@media (max-width: 768px) {

    .header {
        flex-direction: column;
        padding: 20px 15px;
    }

    .header_logo img {
        width: 180px;
    }

    #nav {
        flex-direction: column;
        gap: 15px;
        margin: 20px 0;
    }

    #nav li a {
        font-size: 18px;
    }

    .header_icon {
        flex-direction: column;
        gap: 15px;
    }

    .hero {
        height: 60vh;
    }

    .hero h1 {
        font-size: 42px;
    }

    .hero h3 {
        font-size: 18px;
    }

    .hero-buttons {
        flex-direction: column;
        align-items: center;
        gap: 15px;
    }

    .btn {
        width: 100%;
        max-width: 280px;
        text-align: center;
    }

    .product-grid {
        grid-template-columns: 1fr;
    }

    .subtitle {
        font-size: 24px;
    }
}


/* Mobile nhỏ */
@media (max-width: 480px) {

    .hero {
        height: 55vh;
    }

    .hero h1 {
        font-size: 32px;
        line-height: 1.2;
    }

    .hero h3 {
        font-size: 16px;
    }

    .tag {
        font-size: 12px;
        padding: 6px 12px;
    }

    .subtitle {
        font-size: 20px;
    }

    .card {
        padding: 15px;
    }

    .card h3 {
        font-size: 18px;
    }

    .card img {
        height: 150px;
    }

    .header_button {
        padding: 8px 16px;
        font-size: 14px;
    }
}